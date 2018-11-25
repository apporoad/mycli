# mycli
private cli tools for anyone


# let us go

global install or use npx
```bash
npm i -g micli

```
## simply example
1. add a test file : test.js
```bash
vi test.js
```
```js

exports.add = (n1,n2)=>{return n1 + n2}

```
2. run dynamic cli : run test.js
```bash
--> npx micli test.js 
// or 
--> mc test.js
? n1 :  // here input 1
? n2 :  // here input 2
mc run add
n1 :1  | n2: 2
output : 3
```
3. run test.js with params 
```bash
--> mc test.js add -n1 1 -n2 2
//or
--> mc test.js -p1 1 -p2 2
output : 3
```
4. install your cli for os
```bash
--> mc install test.js
...
--> add 12 13
//or
--> mcadd 12 13
output : 25
```

