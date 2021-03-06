import { combinedDisposable, Disposable } from "./disposable/disposable";
import { DisposableStore } from "./disposable/disposableStore";
import { onUnexpectedError } from "./errors";
import { IDisposable } from "./interface";
import { LeakageMonitor, _globalLeakWarningThreshold } from "./leakageMonitor";
import { LinkedList } from "./linkedList";


/** 定义事件类型 为一个函数
 * 其中的泛型的定义为要被处理的事件对象
 * listener 为处理事件对象的函数
 * @export
 * @interface IMessagePassingProtocol
 */
export type Event<T> = ( // 函数是不能有属性的，所以它使用参数为函数来实现监听
  listener: (e: T) => any,//监听函数，使用回调实现监听效果 为事件触发后的处理函数，或叫监听函数
  thisArgs?: any,
  disposables?: IDisposable[] | DisposableStore,
) => IDisposable;


export namespace Event {
  export const None: Event<any> = () => Disposable.None;

	/**
	 * Given an event, returns another event which only fires once.
	 */
	export function once<T>(event: Event<T>): Event<T> {
		return (listener, thisArgs = null, disposables?) => {
			// we need this, in case the event fires during the listener call
			let didFire = false;
			let result: IDisposable;
			result = event(e => {
				if (didFire) {
					return;
				} else if (result) {
					result.dispose();
				} else {
					didFire = true;
				}
				// 函数、方法才能call 指定 this 值，e 为传入函数中参数
				return listener.call(thisArgs, e);
			}, null, disposables);

			if (didFire) {
				result.dispose();
			}

			return result;
		};
	}

	/**
	 * Given an event and a `map` function, returns another event which maps each element
	 * through the mapping function.
	 */
	export function map<I, O>(event: Event<I>, map: (i: I) => O): Event<O> {
		return snapshot((listener, thisArgs = null, disposables?) => event(i => listener.call(thisArgs, map(i)), null, disposables));
	}

	/**
	 * Given an event and an `each` function, returns another identical event and calls
	 * the `each` function per each element.
	 */
	export function forEach<I>(event: Event<I>, each: (i: I) => void): Event<I> {
		return snapshot((listener, thisArgs = null, disposables?) => event(i => { each(i); listener.call(thisArgs, i); }, null, disposables));
	}

	/**
	 * Given an event and a `filter` function, returns another event which emits those
	 * elements for which the `filter` function returns `true`.
	 */
	export function filter<T>(event: Event<T>, filter: (e: T) => boolean): Event<T>;
	export function filter<T, R>(event: Event<T | R>, filter: (e: T | R) => e is R): Event<R>;
	export function filter<T>(event: Event<T>, filter: (e: T) => boolean): Event<T> { // 这里 event 相当于 onHello
		return snapshot((listener, thisArgs = null, disposables?) => event(e => filter(e) && listener.call(thisArgs, e), null, disposables));
		// 接收一个事件函数和一个过滤函数
		// 而 snapshot 是接收一个事件函数
		// 所以它传入了一个事件函数的定义，所以它也是一个闭包
	}

	/**
	 * Given an event, returns the same event but typed as `Event<void>`.
	 */
	export function signal<T>(event: Event<T>): Event<void> {
		return event as Event<any> as Event<void>;
	}

	/**
	 * Given a collection of events, returns a single event which emits
	 * whenever any of the provided events emit.
	 */
	export function any<T>(...events: Event<T>[]): Event<T>;
	export function any(...events: Event<any>[]): Event<void>;
	export function any<T>(...events: Event<T>[]): Event<T> {
		return (listener, thisArgs = null, disposables?) => combinedDisposable(...events.map(event => event(e => listener.call(thisArgs, e), null, disposables)));
	}

	/**
	 * Given an event and a `merge` function, returns another event which maps each element
	 * and the cumulative result through the `merge` function. Similar to `map`, but with memory.
	 */
	export function reduce<I, O>(event: Event<I>, merge: (last: O | undefined, event: I) => O, initial?: O): Event<O> {
		let output: O | undefined = initial;

		return map<I, O>(event, e => {
			output = merge(output, e);
			return output;
		});
	}

	/**
	 * Given a chain of event processing functions (filter, map, etc), each
	 * function will be invoked per event & per listener. Snapshotting an event
	 * chain allows each function to be invoked just once per event.
	 */
	export function snapshot<T>(event: Event<T>): Event<T> {
		let listener: IDisposable;
		const emitter = new Emitter<T>({ 
			onFirstListenerAdd() { 
				listener = event(emitter.fire, emitter);// event为 filter 传入的定义函数
				// 而这个定义函数在函数体中又调用 filter 函数的事件函数参数 ，即执行 onHello()
				// 这个是 on(listener) 执行 也同是
				// 执行了 fromNodeEventrEmitter 实例化时对 _option 的处理
			},
			onLastListenerRemove() {
				listener.dispose();
			}
		});

		return emitter.event;// 这返回的是一个新的默认事件函数
	}

	/**
	 * Debounces the provided event, given a `merge` function.
	 *
	 * @param event The input event.
	 * @param merge The reducing function.
	 * @param delay The debouncing delay in millis.
	 * @param leading Whether the event should fire in the leading phase of the timeout.
	 * @param leakWarningThreshold The leak warning threshold override.
	 */
	export function debounce<T>(event: Event<T>, merge: (last: T | undefined, event: T) => T, delay?: number, leading?: boolean, leakWarningThreshold?: number): Event<T>;
	export function debounce<I, O>(event: Event<I>, merge: (last: O | undefined, event: I) => O, delay?: number, leading?: boolean, leakWarningThreshold?: number): Event<O>;
	export function debounce<I, O>(event: Event<I>, merge: (last: O | undefined, event: I) => O, delay: number = 100, leading = false, leakWarningThreshold?: number): Event<O> {

		let subscription: IDisposable;
		let output: O | undefined = undefined;
		let handle: any = undefined;
		let numDebouncedCalls = 0;

		const emitter = new Emitter<O>({
			leakWarningThreshold,
			onFirstListenerAdd() {
				subscription = event(cur => {
					numDebouncedCalls++;
					output = merge(output, cur);

					if (leading && !handle) {
						emitter.fire(output);
						output = undefined;
					}

					clearTimeout(handle);
					handle = setTimeout(() => {
						const _output = output;
						output = undefined;
						handle = undefined;
						if (!leading || numDebouncedCalls > 1) {
							emitter.fire(_output!);
						}

						numDebouncedCalls = 0;
					}, delay);
				});
			},
			onLastListenerRemove() {
				subscription.dispose();
			}
		});

		return emitter.event;
	}

	/**
	 * Given an event, it returns another event which fires only once and as soon as
	 * the input event emits. The event data is the number of millis it took for the
	 * event to fire.
	 */
	export function stopwatch<T>(event: Event<T>): Event<number> {
		const start = new Date().getTime();
		return map(once(event), _ => new Date().getTime() - start);
	}

	/**
	 * Given an event, it returns another event which fires only when the event
	 * element changes.
	 */
	export function latch<T>(event: Event<T>): Event<T> {
		let firstCall = true;
		let cache: T;

		return filter(event, value => {
			const shouldEmit = firstCall || value !== cache;
			firstCall = false;
			cache = value;
			return shouldEmit;
		});
	}

	/**
	 * Buffers the provided event until a first listener comes
	 * along, at which point fire all the events at once and
	 * pipe the event from then on.
	 *
	 * ```typescript
	 * const emitter = new Emitter<number>();
	 * const event = emitter.event;
	 * const bufferedEvent = buffer(event);
	 *
	 * emitter.fire(1);
	 * emitter.fire(2);
	 * emitter.fire(3);
	 * // nothing...
	 *
	 * const listener = bufferedEvent(num => console.log(num));
	 * // 1, 2, 3
	 *
	 * emitter.fire(4);
	 * // 4
	 * ```
	 */
	export function buffer<T>(event: Event<T>, nextTick = false, _buffer: T[] = []): Event<T> {
		let buffer: T[] | null = _buffer.slice();

		let listener: IDisposable | null = event(e => {
			if (buffer) {
				buffer.push(e);
			} else {
				emitter.fire(e);
			}
		});

		const flush = () => {
			if (buffer) {
				buffer.forEach(e => emitter.fire(e));
			}
			buffer = null;
		};

		const emitter = new Emitter<T>({
			onFirstListenerAdd() {
				if (!listener) {
					listener = event(e => emitter.fire(e));
				}
			},

			onFirstListenerDidAdd() {
				if (buffer) {
					if (nextTick) {
						setTimeout(flush);
					} else {
						flush();
					}
				}
			},

			onLastListenerRemove() {
				if (listener) {
					listener.dispose();
				}
				listener = null;
			}
		});

		return emitter.event;
	}

	export interface IChainableEvent<T> {
		event: Event<T>;
		map<O>(fn: (i: T) => O): IChainableEvent<O>;
		forEach(fn: (i: T) => void): IChainableEvent<T>;
		filter(fn: (e: T) => boolean): IChainableEvent<T>;
		filter<R>(fn: (e: T | R) => e is R): IChainableEvent<R>;
		reduce<R>(merge: (last: R | undefined, event: T) => R, initial?: R): IChainableEvent<R>;
		latch(): IChainableEvent<T>;
		debounce(merge: (last: T | undefined, event: T) => T, delay?: number, leading?: boolean, leakWarningThreshold?: number): IChainableEvent<T>;
		debounce<R>(merge: (last: R | undefined, event: T) => R, delay?: number, leading?: boolean, leakWarningThreshold?: number): IChainableEvent<R>;
		on(listener: (e: T) => any, thisArgs?: any, disposables?: IDisposable[] | DisposableStore): IDisposable;
		once(listener: (e: T) => any, thisArgs?: any, disposables?: IDisposable[]): IDisposable;
	}

	class ChainableEvent<T> implements IChainableEvent<T> {

		constructor(readonly event: Event<T>) { }

		map<O>(fn: (i: T) => O): IChainableEvent<O> {
			return new ChainableEvent(map(this.event, fn));
		}

		forEach(fn: (i: T) => void): IChainableEvent<T> {
			return new ChainableEvent(forEach(this.event, fn));
		}

		filter(fn: (e: T) => boolean): IChainableEvent<T>;
		filter<R>(fn: (e: T | R) => e is R): IChainableEvent<R>;
		filter(fn: (e: T) => boolean): IChainableEvent<T> {
			return new ChainableEvent(filter(this.event, fn));
		}

		reduce<R>(merge: (last: R | undefined, event: T) => R, initial?: R): IChainableEvent<R> {
			return new ChainableEvent(reduce(this.event, merge, initial));
		}

		latch(): IChainableEvent<T> {
			return new ChainableEvent(latch(this.event));
		}

		debounce(merge: (last: T | undefined, event: T) => T, delay?: number, leading?: boolean, leakWarningThreshold?: number): IChainableEvent<T>;
		debounce<R>(merge: (last: R | undefined, event: T) => R, delay?: number, leading?: boolean, leakWarningThreshold?: number): IChainableEvent<R>;
		debounce<R>(merge: (last: R | undefined, event: T) => R, delay: number = 100, leading = false, leakWarningThreshold?: number): IChainableEvent<R> {
			return new ChainableEvent(debounce(this.event, merge, delay, leading, leakWarningThreshold));
		}

		on(listener: (e: T) => any, thisArgs: any, disposables: IDisposable[] | DisposableStore) {
			return this.event(listener, thisArgs, disposables);
		}

		once(listener: (e: T) => any, thisArgs: any, disposables: IDisposable[]) {
			return once(this.event)(listener, thisArgs, disposables);
		}
	}

	export function chain<T>(event: Event<T>): IChainableEvent<T> {
		return new ChainableEvent(event);
	}

	// electron 中 ipMain... 已带有监听性质的发射器
	export interface NodeEventEmitter {
		on(event: string | symbol, listener: Function): unknown;
		removeListener(event: string | symbol, listener: Function): unknown;
	}

	// 将原生 electron 的 已带有监听、通信性质的ipMain ipRenderer...
	//（所以它已经是一个原始的发射器了）转成自己定义的发射器Emitter
	// 并以自己发射器回调实例化时添加事件的监听、监听取消

	/** 返回一个待传入处理回调函数的事件函数
	 * @export
	 * @template T
	 * @param {NodeEventEmitter} emitter
	 * @param {string} eventName
	 * @param {(...args: any[]) => T} [map=id => id]
	 * @return {*}  {Event<T>}
	 */
	export function fromNodeEventEmitter<T>(emitter: NodeEventEmitter, eventName: string, map: (...args: any[]) => T = id => id): Event<T> {
		// map 本身为fromNodeEventEmitter 函数的参数，而这个参数被定义为一个接收任意数量参数，返回泛型约束的类型
		// 而这个 fn 为一个新定义的函数，在事件触发时 map将用来接收并执行 fn 传入来的任意数量参数
		// 所以说是 fn 包装了 map 与 发射器触发函数
		const fn = (...args: any[]) => result.fire(map(...args));// 这个函数
		const onFirstListenerAdd = () => emitter.on(eventName, fn);
		const onLastListenerRemove = () => emitter.removeListener(eventName, fn);
		const result = new Emitter<T>({ onFirstListenerAdd, onLastListenerRemove });
		// Emitter 实例化时 执行了一次 get event

		// 它将事件发射器上的事件返回了出去 所以 onHello 是事件发射器生成的默认事件函数 ,所以传入值就是监听函数
		return result.event;
	}

	export interface DOMEventEmitter {
		addEventListener(event: string | symbol, listener: Function): void;
		removeEventListener(event: string | symbol, listener: Function): void;
	}

	export function fromDOMEventEmitter<T>(emitter: DOMEventEmitter, eventName: string, map: (...args: any[]) => T = id => id): Event<T> {
		const fn = (...args: any[]) => result.fire(map(...args));
		const onFirstListenerAdd = () => emitter.addEventListener(eventName, fn);
		const onLastListenerRemove = () => emitter.removeEventListener(eventName, fn);
		const result = new Emitter<T>({ onFirstListenerAdd, onLastListenerRemove });
		return result.event;
	}

	export function fromPromise<T = any>(promise: Promise<T>): Event<undefined> {
		const emitter = new Emitter<undefined>();
		let shouldEmit = false;

		promise
			.then(undefined, () => null)
			.then(() => {
				if (!shouldEmit) {
					setTimeout(() => emitter.fire(undefined), 0);
				} else {
					emitter.fire(undefined);
				}
			});

		shouldEmit = true;
		return emitter.event;
	}

	export function toPromise<T>(event: Event<T>): Promise<T> {
		return new Promise(c => once(event)(c));
	}
}


 // 用回调函数的方式添加 这些函数也是依赖注入进发射器中
export interface EmitterOptions {
  onFirstListenerAdd?: Function; // 第一次注册监听执行
  onFirstListenerDidAdd?: Function; // 第一次监听注册成功后执行
  onListenerDidAdd?: Function; // 监听注册后执行
  onLastListenerRemove?: Function; // 最后一个监听移除执行
  leakWarningThreshold?: number;
}

type Listener<T> = [(e: T) => void, any] | ((e: T) => void);

/** 事件发射器的定义，对事件进行触发、监听（监听释放）、
 * @export
 * @class Emitter
 * @template T
 */
export class Emitter<T> {
  private static readonly _noop = function () {}; // 空操作

  private readonly _options?: EmitterOptions;

  private readonly _leakageMon?: LeakageMonitor; // 泄漏监控器

  private _disposed = false; // 是否已经释放 默认没有释放

  private _event?: Event<T>; // 事件发射器提供地默认事件函数

  private _deliveryQueue?: LinkedList<[Listener<T>, T]>; // 分发队列 LinkedList 插入或者删除元素来说，操作方便，性能高

  protected _listeners?: LinkedList<Listener<T>>; // listener 队列

  constructor(options?: EmitterOptions) {
    this._options = options;

    // 如果设置了消息监控，则进行监控提示，否则不提示
    this._leakageMon =
      _globalLeakWarningThreshold > 0
        ? new LeakageMonitor(
            this._options && this._options.leakWarningThreshold,
          )
        : undefined;
  }

  // 初始化事件函数 即对 _optino 处理
  // 将传入的 _option 中的函数添加到事件函数的 即
  // 1. 注册各种事件监听生命周期回调：第一个监听添加、最后一个监听移除等。
  // 2. 返回事件取消监听函数，本质是从 linkedlist 中 移除对应监听。
  // get 定义的属性将生成在原型上，Object.defineProperty 的属性生成在实例上
  get event(): Event<T> {
    if (!this._event) { // 如果没有事件存在 就返回一个默认的事件函数
      this._event = (	// 返回一个事件函数的定义
        listener: (e: T) => any, // 即为 onHello 传入的第一个参数
        thisArgs?: any, // 指定事件执行对象
        disposables?: IDisposable[] | DisposableStore,) => {
          if (!this._listeners) { // 由于是类的可选属性所以要判断是否为存在
            this._listeners = new LinkedList();
          }
		  /**
		   * 在这个事件发射器中，_listeners 为默认为空
		   * 而当 _options 不为空时，依它属性名存在来调用函数
		   * 
		   */
          const firstListener = this._listeners.isEmpty();

        // 第一次监听，提供监听函数回调
        if ( 
          firstListener &&
          this._options &&
          this._options.onFirstListenerAdd
        ) {
		// this 在这里指的是 Emitter 实例 默认上它是会将实例传入进 _options 中函数中的
		// 但是大多数 _options 中的函数没有参数，所以也就没有这个实例
		  this._options.onFirstListenerAdd(this);
        }


		/**
		 * 默认上经常不传入 thisArgs 所以为 undefined 也就返回 push listener 函数 
		 * 当有 thisArgs 时 返回监听函数与 thisArgs 组成数组
		 * 这里添加了 listener 即
		 */
        const remove = this._listeners.push(
          !thisArgs ? listener : [listener, thisArgs],
        );

        // 第一个事件添加完成后回调
        if (
          firstListener &&
          this._options &&
          this._options.onFirstListenerDidAdd
        ) {
          this._options.onFirstListenerDidAdd(this);
        }

        // 事件添加完成回调
        if (this._options && this._options.onListenerDidAdd) {
          this._options.onListenerDidAdd(this, listener, thisArgs);
        }

        let removeMonitor: (() => void) | undefined;

        if (this._leakageMon) {
          removeMonitor = this._leakageMon.check(this._listeners.size);
        }

        // 事件监听后返回结果
        const result: IDisposable = {// 为一个对象
          dispose: () => {
            if (removeMonitor) {
              removeMonitor();
            }
            result.dispose = Emitter._noop;
            if (!this._disposed) { // 默认为 undefined
              remove(); // 移除当前监听事件节点
              if (this._options && this._options.onLastListenerRemove) {
                const hasListeners =
                  this._listeners && !this._listeners.isEmpty();
                if (!hasListeners) {
                  this._options.onLastListenerRemove(this);
                }
              }
            }
          }
        }

        if (disposables instanceof DisposableStore) {
          disposables.add(result);
        } else if (Array.isArray(disposables)) {
          disposables.push(result);
        }

        return result;

        }

    }
    return this._event as Event<T>;

  }

  // 触发事件
  fire(event: T): void { // event 为监听函数要处理的对象 如传入了信息为 interface re {e: Electron.IpcMainEvent;m: any;} 
    if (this._listeners) { // 如果有 _listeners

      if (!this._deliveryQueue) {
        this._deliveryQueue = new LinkedList();
      }

      for (
        let iter = this._listeners.iterator(), e = iter.next();
        !e.done;
        e = iter.next()
      ) {
        // 遍历 _listeners, 将所有的监听和事件对应的参数放一起
        this._deliveryQueue.push([e.value, event]);
		// 这里的 e.value 在下方变成了 listener
      }

      while (this._deliveryQueue.size > 0) {
        const [listener, event] = this._deliveryQueue.shift()!;
        try {
          if (typeof listener === 'function') {
            listener.call(undefined, event);
          } else {
            listener[0].call(listener[1], event);
          }
        } catch (e) {
          onUnexpectedError(e);
        }
      }
    }
  }


  // 解除所有事件监听
  dispose() {
    if (this._listeners) {
      this._listeners.clear();
    }
    if (this._deliveryQueue) {
      this._deliveryQueue.clear();
    }
    if (this._leakageMon) {
      this._leakageMon.dispose();
    }
    this._disposed = true;
  }
}

