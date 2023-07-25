var reddb = require(__dirname + "/index.js")

reddb.OnReady(()=>{
  console.log("ready!")
  console.log(reddb.databases)
})