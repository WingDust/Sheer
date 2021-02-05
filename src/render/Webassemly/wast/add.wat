(module 
    (import "console" "log" (func $log (param i64)))
    (func $add (param $width i64) (param $x i64) (param $y i64) (result i64)
        get_local $x
        get_local $width
        i64.mul
        get_local $y
        i64.add
        )
    (export "add" (func $add))
)