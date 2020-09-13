#include "/usr/lib/emscripten/system/include/emscripten.h"
#include <string>
using namespace std;

#ifndef EM_PORT_API
# if defined(__EMSCRIPTEN__)
#   include <emscripten.h>
#   if defined(__cplusplus)
#       define EM_PORT_API(rettype) extern "C" rettype EMSCRIPTEN_KEEPALIVE
#   else
#       define EM_PORT_API(rettype) EMSCRIPTEN_KEEPALIVE
#   endif
# else
#   if defined(__cplusplus)
#       define EM_PORT_API(rettype) extern "C" rettype
#   else 
#       define EM_PORT_API(rettype) rettype
#   endif
# endif
#endif



//EMSCRIPTEN_KEEPALIVE void hi(const char* p){
  EM_PORT_API(int) hi(const char* p){
  // string a = "function show(arg){console.log(arg);};";
     string b = p;
    // string c = "show(\"";
    // string d = "\");";
    //
    string test = "const fs = require('fs');";
    string a = "function show(arg){let check = fs.existsSync(arg";
    string d = ");if(check){return 1}else{return 0};};show(\"";
    string e = "\");";

    // string run = a+c+p+d;
    string run = test+a+d+b+e;
    int num = emscripten_run_script_int(run.c_str());
    return num;
}
//const char* str = emscripten_run_script_string(R"(
//function show(){
// return "show 32";
//}
//show();
//)");
