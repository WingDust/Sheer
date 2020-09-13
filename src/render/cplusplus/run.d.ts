/// <reference types="emscripten"/>
export declare interface em_module extends EmscriptenModule {
    ccall:typeof ccall;
    hi(arg:string):number;
}