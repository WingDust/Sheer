(module 
(func $add (param $line i64) (param $rhs i64) (param $lhs i64) (result i32)
    get_local $line
    get_local $rhs
    i32.add)
(export "add" (func $add))
)