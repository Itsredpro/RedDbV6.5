# RedDbV6.5

RedDb V6.5 Faster and Efficienter.

Installation:

npm install reddbv6.5



Usage:

const RedDb = require("reddbv6.5")

RedDb.OnReady(() => {  // Required to do this before using the database, else it will error when trying to get items out of the db
  RedDb.CreateDb("database1", (successfull) => { // successfull = true or false depending on if the database already exists
    var database1 = RedDb.databases["database1"]  // get the database

    database1.examplekey = "examplevalue" // setting a value, can be anything. The key must be a string.

    console.log(database1.examplekey)  // get the value of a set key, returns undefined if not set
  })
  
  RedDb.DeleteDb("database2", (successfull) => { // it does what it says
    
  })
  
})


 RedDb migrating assistant coming soon for the people that for a reason want to migrate data
