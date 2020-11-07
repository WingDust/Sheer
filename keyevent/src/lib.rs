use gloo::{events::EventListener};
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s:&str);
}

macro_rules! console_log {
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

pub fn eventlistener_keyboardevent_keydown(){
    let window = web_sys::window().expect("global window does not exists");
    let document = window.document().expect("expecting a document on window");
    let body = document.body().expect("document expect to have a body");

    let onkey = EventListener::new(&body,"keydown",move|event|{

        // web_sys::console::log_1(&"ok".into());
        console_log!("ok");

        let keyevent = event.clone().dyn_into::<web_sys::KeyboardEvent>().unwrap();

        let mut event_str = String::from("");
        event_str.push_str(&event.type_());
        event_str.push_str(&" : ");
        event_str.push_str(&keyevent.key());
        if keyevent.ctrl_key() && keyevent.alt_key(){
            console_log!("true");
        }
        console_log!("{}",event_str);
    });
    onkey.forget();
}


#[wasm_bindgen(start)]
pub fn start(){
//  eventlistener_keyboardevent_keydown();
}

#[wasm_bindgen]
pub fn hidesibebar(e:web_sys::KeyboardEvent){
        console_log!("ok");
        if e.ctrl_key() && e.alt_key(){
            console_log!("true");
        }
}