const e = require('express')
const moment = require('moment')

const getTimeController = {
    getCurrentTimeBeta: async (req,res) =>{
        try{
            const api_key = req.headers.api_key
            if(api_key===process.env.HEADER){
                const currentTime = moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ')
                res.status(200)
                res.send({
                    datetime:currentTime
                })
            }
        }catch(error){
            console.log(error)
            res.status(400)
        }
    }
}

module.exports = getTimeController