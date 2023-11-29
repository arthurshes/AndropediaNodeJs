const redis = require('redis')
const client = redis.createClient(process.env.REDIS_URL)
async function createConntect(){
    try{
        await client.connect()
    }catch(error){
        console.log(error)
    }
}
createConntect()

async function saveCache(key,value){
    try{
        await client.set(key,value)
    }catch(error){
        console.log(error)
    }
}

async function deleteCache(key){
    try{
        await client.del(key)
    }catch(error){
        console.log(error)
    }
}

async function getCache(key){
    try{
       return await client.get(key)
    }catch(error){
        console.log(error)
        return error
        Promise.reject(error)
    }
}

module.exports = {
    saveCache,
    deleteCache,
    getCache
}