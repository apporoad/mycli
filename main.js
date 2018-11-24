
var program = require('commander');
var util = require('./util')

program.version('0.1.0').parse(process.argv)


//console.log(program.args)

// commands 
/*
mc install []
mc list/ls  find all

mc . 
mc yourdir
mc test.js 
mc /temp/test.js
mc ../test.js
mc ./test.js

*/
var main =()=>{
  //origin clis 
  if(program.args && program.args.length>0){
    switch(program.args[0]){
      case "i":
      case "install":
        console.log("todo")
        return
      case "remove":
      case "u":
      case "un":
      case "r":
      case "uninstall":
        console.log("todo")
        return
      case "list":
      case 'ls':
        console.log('todo')
        return
    }
  }
  //exts
  var ep = util.solvePath(process.cwd(),program.args.length>0 ? program.args[0] : '.') 
  //load tgt 
  try
  {
    var dm = require(ep)
  }catch(ex){
    console.log(ep +' : must be a node module')
  }
}


main()