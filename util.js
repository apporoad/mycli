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