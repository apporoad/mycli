var util = require('./util')
var path = require('path')
var fs = require('fs')

/*
[
    {
        fn:"???",
        usage:"",
        params:[
            {
                name:"p1",
                alias:"p",
                type:"String",
                default: "",
                parser: (value,type,default)=>{},
                remark: ""
            },
            {
                ...
            }
        ]
    },
    {...}
]
*/

exports.guess= m=>{
    // when m is a path  or a module
    if(util.Type.isString(m))
        m = require(m)
//    console.log(Object.keys(m))
    var mcList = new Array()
    var fns = Object.keys(m)
    if(fns.length == 0)
        return mcList
    fns.forEach((fn,index)=>{
        var func = m[fn]
        var params=util.getFnParamNames(func)
        var funcG ={
            fn: fn,
            usage:"", // todo
            params:[]
        }
        params.forEach(pArray=>{
            funcG.params.push({
                name  : pArray[0],
                alias : pArray[0],
                type:"String",
                default: "",
                parser: null,
                remark: ""
            })
        })
        mcList.push(funcG)
    })
    return mcList
}

/* a micli config maybe:
test.js  : [test.micli.js]  [test.micli.json]  pos: same dir with test.js
    after all , will search micli.js and micli.json
.../yourModuleDir : [micli.js] [micli.json] pos : in yourModuleDir

content  is result of guess
*/

exports.findConfig = mPath =>{
   var state = fs.statSync(mPath) 
   var dir = null
   if(!state.isDirectory(mPath)){
       //if file
       var p = path.parse(mPath)
       dir = p.dir
        // xx.micli.js
        var tempP = path.join(dir,p.name + '.micli.js')
        if(fs.existsSync(tempP)){
            return tempP
        }
        // xx.micli.json
        tempP = path.join(dir,p.name + ".micli.json")
        if(fs.existsSync(tempP)){
            return tempP
        }
   }
   else{
        dir = mPath
   }
//    console.log(mPath)
//    console.log(dir)
   if(fs.existsSync(path.join(dir,"micli.js"))){
        return path.join(dir,"micli.js")
   }
   if(fs.existsSync(path.join(dir,"micli.json"))){
       return path.join(dir,"micli.json")
    }
   return null
}
