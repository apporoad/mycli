var util = require('./util')

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
.../yourModuleDir : [micli.js] [micli.json] pos : in yourModuleDir

content  is result of guess
*/

exports.findConfig = mPath =>{

}