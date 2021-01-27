(module 
(func $add (param $line i32) (param $rhs i32) (param $lhs i32) (result i32)
    get_local $line
    get_local $rhs
    i32.add)
(export "add" (func $add))
)