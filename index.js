const fs = require("fs")
var FuncReadyTable = []

module.exports.databases = {}
module.exports.debug = false


function ModuleReady(){
    for (a = 0; a < FuncReadyTable.length; a++){
        var c = FuncReadyTable[a]
        c()
    }
}


module.exports.CreateDb = async function(name="", Callback){
    if (name && Callback) {
        if (fs.existsSync(__dirname + "/saves/" + name + ".txt") == false) {
            await fs.writeFile(__dirname + "/saves/" + name + ".txt", JSON.stringify({}), function(error){
                if (error) {
                    console.warn("[RedDb] - FS error at CreateDb.")
                    return false
                }
                module.exports.databases[name] = {}
                //console.log(module.exports.databases[name])
                return Callback(true)
            })
            
        } else {
            console.warn("[RedDb] - Database name already taken.")
            return Callback(false)
        }
    } else {
        console.warn("[RedDb] - Invalid arguments at CreateDb.")
        return false
    }
    
}

module.exports.OnReady = function(functionready){
    if (functionready){
        FuncReadyTable.push(functionready)
        return true
    } else {
        console.warn("[RedDb] - Invalid arguments at onready.")
        return false
    }
}

module.exports.DeleteDb = function(name,Callback){
    if (Callback && name){
        fs.unlinkSync(__dirname + "/saves/" + name + ".txt")
        module.exports.databases[name] = undefined
        return Callback(true)
    } else {
        console.warn("[RedDb] - Invalid arguments at DeleteDb.")
        return false
    }
}


fs.readdir(__dirname + "/saves", (err, files)=>{
    if (err){
        console.error("[RedDb] - FS error while reading saves directory.\nTurn on debug to see the full error.")

        if (module.exports.debug){
            console.log(err)
        }
    } else {
        files.forEach(async (f) => {
            var realname = f.replace(".txt", "")
            fs.readFile(__dirname + "/saves/" + f, function(err1,filef){
               module.exports.databases[realname] = JSON.parse(filef) 
            })
        })
        setInterval(() => {
            fs.readdir(__dirname + "/saves", (err,files)=>{
                if (err){
                    console.error("[RedDb] - FS error while reading saves directory.\nTurn on debug to see the full error.")
        
                    if (module.exports.debug){
                        console.log(err)
                    }
                } else {
                    files.forEach(f => {
                        var realname = f.replace(".txt", "")
                        var savetable = module.exports.databases[realname]
        
                        fs.writeFileSync(__dirname + "/saves/" + f, JSON.stringify(savetable))
                        
                    })
                }
            })
        }, 50)
    }
})



setTimeout(()=>{
    ModuleReady()
},3000)