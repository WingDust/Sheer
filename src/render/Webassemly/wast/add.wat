(module 
    ;; (import "console" "log" (func $log (param i32)))
    (func $add (param $width i32) (param $x i32) (param $y i32) (result i32)
        get_local $x
        get_local $width
        i32.mul
        get_local $y
        i32.add
        )
    (export "add" (func $add))
)