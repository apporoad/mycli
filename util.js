var path = require('path')
var Type = (function() {
    var type = {};
    var typeArr = ['String', 'Object', 'Number', 'Array','Undefined', 'Function', 'Null', 'Symbol','Boolean','RegExp'];
    for (var i = 0; i < typeArr.length; i++) {
        (function(name) {
            type['is' + name] = function(obj) {
                return Object.prototype.toString.call(obj) == '[object ' + name + ']';
            }
        })(typeArr[i]);
    }
    return type;
})();

var endWith=function(str,s){
    if(s==null||s==""||str.length==0||s.length>str.length)
       return false;
    if(str.substring(str.length-s.length)==s)
       return true;
    else
       return false;
   }

exports.endTrim=(str,end) =>{
   if(endWith(str,end)){
      return str.substring(0,str.length - end.length)
   }
   return str
}
var startWith=function(str,s){
    if(s==null||s==""|| str==null || str==""||str.length==0||s.length>str.length)
       return false;
    if(str.substr(0,s.length)==s)
       return true;
    else
       return false;
   }



exports.Type = Type
exports.endWith =endWith
exports.startWith = startWith

exports.solvePath =(wp,rp)=>{
    if(path.isAbsolute(rp)){
        return rp
    }
    return path.resolve(wp,rp)
}

//console.log(exports.solvePath(process.cwd(),'.'))

const REGEX_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const REGEX_FUNCTION_PARAMS = /(?:\s*(?:function\s*[^(]*)?\s*)((?:[^'"]|(?:(?:(['"])(?:(?:.*?[^\\]\2)|\2))))*?)\s*(?=(?:=>)|{)/m
const REGEX_PARAMETERS_VALUES = /\s*(\w+)\s*(?:=\s*((?:(?:(['"])(?:\3|(?:.*?[^\\]\3)))((\s*\+\s*)(?:(?:(['"])(?:\6|(?:.*?[^\\]\6)))|(?:[\w$]*)))*)|.*?))?\s*(?:,|$)/gm

function getParams(func) {

  let functionAsString = func.toString()
  let params = []
  let match
  functionAsString = functionAsString.replace(REGEX_COMMENTS, '')
  functionAsString = functionAsString.match(REGEX_FUNCTION_PARAMS)[1]
  if (functionAsString.charAt(0) === '(') functionAsString = functionAsString.slice(1, -1)
  while (match = REGEX_PARAMETERS_VALUES.exec(functionAsString)) params.push([match[1], match[2]])
  return params

}

exports.getFnParamNames = getParams

// console.log(getParams(m=>{}))
// console.log(getParams((m,n)=>{}))

// console.log(getParams(function(){}));
// console.log(getParams(()=>{}));
// console.log(getParams(function(p1,p2){}));


// var defaultName = 'some name'

// function test1(param1, param2, param3) { return (param1) => param1 + param2 + param3 }
// function test2(param1, param2 = 4 * (5 / 3), param3) {}
// function test3(param1, param2 = "/root/" + defaultName + ".jpeg", param3) {}
// function test4(param1, param2 = (a) => a + 1) {}

// console.log(getParams(test1)) 
// console.log(getParams(test2))
// console.log(getParams(test3))
// console.log(getParams(test4))

// [ [ 'param1', undefined ], [ 'param2', undefined ], [ 'param3', undefined ] ]
// [ [ 'param1', undefined ], [ 'param2', '4 * (5 / 3)' ], [ 'param3', undefined ] ]
// [ [ 'param1', undefined ], [ 'param2', '"/root/" + defaultName + ".jpeg"' ], [ 'param3', undefined ] ]
// [ [ 'param1', undefined ], [ 'param2', '( a' ] ]
// --> This last one fails because of the inlined arrow function!


// var arrowTest1 = (a = 1) => a + 4
// var arrowTest2 = a => b => a + b
// var arrowTest3 = (param1 = "/" + defaultName) => { return param1 + '...' }
// var arrowTest4 = (param1 = "/" + defaultName, param2 = 4, param3 = null) => { () => param3 ? param3 : param2 }

// console.log(getParams(arrowTest1))
// console.log(getParams(arrowTest2))
// console.log(getParams(arrowTest3))
// console.log(getParams(arrowTest4))

// [ [ 'a', '1' ] ]
// [ [ 'a', undefined ] ]
// [ [ 'param1', '"/" + defaultName' ] ]
// [ [ 'param1', '"/" + defaultName' ], [ 'param2', '4' ], [ 'param3', 'null' ] ]


// console.log(getParams((param1) => param1 + 1))
// console.log(getParams((param1 = 'default') => { return param1 + '.jpeg' }))
