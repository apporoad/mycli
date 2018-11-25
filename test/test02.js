var mc = require('../micli')

var path = require('path')



var testPrint = p=>{
    console.log( "findconfig: " + path.join(__dirname, p)+ "++++++++++++++++++")
    console.log(mc.findConfig(path.join(__dirname,p)))
}

testPrint("test02")
testPrint("test02/LiSA.js")
testPrint("test02/test02_1")
testPrint("test02/test02_1/LiSA.js")

testPrint("test02.js")