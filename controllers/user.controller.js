const pool = require('../database/index')
const bcrypt = require('bcrypt')
const crypt = require('crypto')
const emailSender = require('../utils/emailSender')
const moment = require('moment')
// const redis = require('redis')
// const client = redis.createClient(process.env.REDIS_URL)
// async function createConntect(){
//     await client.connect()
// }
// createConntect()
const cacheControll = require('../utils/cacheControl')
const userController = {
    deleteUserInfo:async(req,res)=>{
        try{
            const api_key = req.headers.api_key
            console.log(req.headers.api_key)
            if(api_key===process.env.HEADER){
                const { token } = req.body
                const [rows,fields] = await pool.query("select * from emails_table where token = ?",[token])
                const [subsc,failse] = await pool.query("select * from user_subscribes where token = ?",[token])
                const cachedSubscribes = await cacheControll.getCache(`subscribes-${token}`)
                const strikeModeCache = await cacheControll.getCache(`strikeModeUsers222-${token}`)
                const [coursesBUy,failes] = await pool.query("select * from user_courseBuy where token = ?",[token])
                const adsLimitCache = await cacheControll.getCache(`adsViewCache-${token}`)
                const termCache = await cacheControll.getCache(`termhourse-${token}`)
                 if(rows[0]!=null){
                     if(strikeModeCache){
                        await cacheControll.deleteCache(`strikeModeUsers222-${token}`)
                     }

                     if(adsLimitCache){
                        await cacheControll.deleteCache(`adsViewCache-${token}`)
                     }
                    if(termCache){
                        await cacheControll.deleteCache(`termhourse-${token}`)
                    }
                    if(cachedSubscribes){
                        await cacheControll.deleteCache(`subscribes-${token}`)
                    }
                    if(subsc[0]!=null){  
                        const  [reslt234,fie432l] = await pool.query("delete from user_subscribes where token = ?",[token])
                    }
                     if(coursesBUy[0]!=null){
                        await pool.query("delete from user_courseBuy where token = ?",[token])
                     }
                    const  [reslt,fiel] = await pool.query("delete from emails_table where token = ?",[token])
                    const[red,fal] = await pool.query("delete from user_infos where token = ?",[token])
                 }else{
                    if(strikeModeCache){
                        await cacheControll.deleteCache(`strikeModeUsers222-${token}`)
                     }

                     if(adsLimitCache){
                        await cacheControll.deleteCache(`adsViewCache-${token}`)
                     }
                    if(termCache){
                        await cacheControll.deleteCache(`termhourse-${token}`)
                    }
                    if(cachedSubscribes){
                        await cacheControll.deleteCache(`subscribes-${token}`)
                    }
                    if(subsc[0]!=null){
                        const  [reslt234,fie432l] = await pool.query("delete from user_subscribes where token = ?",[token])
                    }
                     if(coursesBUy[0]!=null){
                        await pool.query("delete from user_courseBuy where token = ?",[token])
                    }
                    const[red,fal] = await pool.query("delete from user_infos where token = ?",[token])
                 }
                 res.send({
                    codeAnswer: 212,
                    status: true,
                    message:"vprkepgkprekgpekrgpkerpg"
                })
                res.status(200)
            }
        }catch(error){
            console.log(error)
            res.send({
                codeAnswer: 606,
                status: false,
                message:"gtkorkgoekgoekrgokrpetgkoprk"
            })
            res.status(400)
        }
    },
    emailSignIn: async (req,res) =>{
        try{
            const api_key = req.headers.api_key
            console.log(req.headers.api_key)
            if(api_key===process.env.HEADER){
                const { email, password} = req.body
                console.log(`password:${password}`)
                const [rows,fields] = await pool.query("select * from emails_table where email = ?",[email])
                if(rows[0]!=null){
                    const isValid = await bcrypt.compare(password,rows[0].password)
                    if(isValid){
                        res.send({
                            token: rows[0].token,
                            isRegister:false,
                            codeAnswer: 212,
                            status: true
                        })
                        res.status(200)
                    }else{
                        res.send({
                            token: "isEmpty",
                            isRegister:false,
                            codeAnswer: 888,
                            status: false
                        })
                    }
                }else{
                    const token = crypt.randomUUID()
                    const passwordHash = await bcrypt.hash(password,10)
                    const sql = "insert into emails_table (email, password, token) values(?,?,?)"
                    const [result,fiel] = await pool.query(sql,[email,passwordHash,token])
                    const username = email.split('@')[0].concat("Dev");
                    const sqlCreateUser = "insert into user_infos (token,name) values(?,?)"
                    const [reseee,fails] = await pool.query(sqlCreateUser,[token,username])
                    res.send({
                        token: token,
                        isRegister:true,
                        codeAnswer: 212,
                        status: true
                    })
                    res.status(200)
                }
            }
        
        }catch(error){
            console.log(error)
            res.send({
                token: "isEmpty",
                isRegister:false,
                codeAnswer: 606,
                status: false
            })
            res.status(400)
        }
    }, 
    getUserInfo: async (req,res) =>{
        try{
            const api_key = req.headers.api_key
            if(api_key===process.env.HEADER){
                const { name,token } = req.body
     
                const [rows,fields] = await pool.query("select * from user_infos where token = ?",[token])
                // if(resul!=null){
                //     const sqlUpdate = "update user_infos set name = ?,image = ?,userlanguage = ?,andropointCount = ?,lastOnlineDate = ? where token = ?"
                //     const [ras,feai] = await pool.query(sqlUpdate,[name,image,userlanguage,andropointCount,lastOnlineDate,token])
                //     res.send({
                //      status: true,
                //      message: "success update userInfo",
                //      codeAnswer: 212
                //     })
                //     res.status(200)
                // }else{
                    console.log(`0004feug90eu0g4f4SHHUHUHUHUH ${rows}`)
                    if(rows.length===0){
                 const sqlCreateUser = "insert into user_infos (token,name) values(?,?)"
                 const [rows,fields] = await pool.query(sqlCreateUser,[token,name])
                 res.send({
                  status: true,
                  message: "success save userInfo",
                  codeAnswer: 212
                 })
                 res.status(200)
                 return
                }
                res.send({
                    status: true,
                    message: "success save userInfo",
                    codeAnswer: 212
                   })
                   res.status(200)
            }
        }catch(error){
            console.log(error)
          res.send({
            status:false,
            message:"catch exception: "+error,
            codeAnswer: 606
          })
          res.status(400)
        }
    },
    updateUserInfo: async (req,res) =>{
        try{
            const api_key = req.headers.api_key
            if(api_key===process.env.HEADER){
                const { name,image,token,userlanguage,andropointCount,strikeModeDay,isInfinity,heartsCount} = req.body
                const sql = "update user_infos set name = ?,image = ?,userlanguage = ?,andropointCount = ?, isInfinity = ?,heartsCount = ? where token = ?"
                const [rows,fields] = await pool.query(sql,[name,image,userlanguage,andropointCount,isInfinity,heartsCount,token])
                res.send({
                    status: true,
                    message: "success update userInfo",
                    codeAnswer: 212
                   })
                   res.status(200)
            }
        }catch(error){
            console.log(error)
            res.send({
                status:false,
                message:"catch exception: "+error,
                codeAnswer: 606
              })
              res.status(400)
        }
    },
    sendUserInfoForClient: async (req,res) =>{
        try{
            const api_key = req.headers.api_key
            if(api_key===process.env.HEADER){
                const token = req.query.token
                const sqlGet = "select * from user_infos where token = ?"
                const [rows,fields] = await pool.query(sqlGet,[token])
                res.send(
                    rows[0]
                )
                res.status(200)
            }
        }catch(error){
            console.log(error)
            res.status(400)
        }
    },
    recoverPassword: async (req,res) =>{
        try{
            const api_key = req.headers.api_key
            if(api_key===process.env.HEADER){
                const { email, code, newPassword,lang} = req.body
                const sqlGetForEmail = "select * from emails_table where email = ?"
               const [rows,field] = await pool.query(sqlGetForEmail,[email])
               ////Если кода еще нет создаем его
               if(rows[0].email===null){
                   res.send({
                       codeAnswer:508,
                       message:"email is not exist",
                       status: false
                   })
                   res.status(200)
                   return
               }
               if(rows[0].recover_code===null){
                       const min = 10000000
                       const max = 99999999
                       const codeEmail = Math.floor(Math.random()*(max-min+1))+min
                       const crytpEmailCode = await bcrypt.hash(codeEmail.toString(),10)
                       const sqlUpdateRecoverCode = "update emails_table set recover_code = ? where email = ?"
                       const [resul,fail] = await pool.query(sqlUpdateRecoverCode,[crytpEmailCode,email])
                       emailSender(email,codeEmail)
                       res.send({
                           codeAnswer: 103,
                           message: "code send email please check your email",
                           status: true
                       })
                       console.log("send email cpode")
                       res.status(200)
                       return
               }else{
                   /////Это если код уже есть
                   console.log("code exist")
                   if(code!=""&&email!=""&&newPassword===""){
                       const sqlGetTbles = "select * from emails_table where email = ?"
                      const [resu,feil] = await pool.query(sqlGetTbles,[email])
                      const isValid = await bcrypt.compare(code,resu[0].recover_code)
                      if(isValid){
                       console.log("code valid please update pass")
                        res.send({
                           codeAnswer: 222,
                           message: "code is correct please update your old password",
                           status:true
                        })
                        res.status(200)
                      }else{
                       console.log("code invalid please update code")
                       res.send({
                           codeAnswer: 989,
                           message: "code is incorrect please try again",
                           status:false
                        })
                        res.status(200)
                      }
                      return
                   }else if(email!=""&&code===""){
                       console.log("code is exist please check your email and send code")
                       res.send({
                           codeAnswer : 124,
                           message: "code is exist please check your email and send code",
                           status: false
                       })
                       res.status(200)
                       return
                   } else if(code!=""&&email!=""&&newPassword!=""){
                       const getTablesForEmail = "select * from emails_table where email = ?"
                       const [resuk,feilk] = await pool.query(getTablesForEmail,[email])
                       const isValids = await bcrypt.compare(code,resuk[0].recover_code)
                       if(isValids){
                           const newPasswordCrypt = await bcrypt.hash(newPassword,10)
                           const updatePasswordSql = "update emails_table set password = ?, recover_code = ? where email = ?"
                              const [rrr,fiels] = await pool.query(updatePasswordSql,[newPasswordCrypt,null,email])
                              console.log("password succes changed")
                         res.send({
                           codeAnswer : 206,
                           message: "password succes changed",
                           status: true
                       })
                       res.status(200)
                       }else{
                           console.log("code is incorrect please try again")
                           res.send({
                               codeAnswer : 989,
                               message: "code is incorrect please try again",
                               status: false
                           })
                           res.status(200)
                       }
                       return
                   }
               }
            }
        }catch(error){
            res.send({
                codeAnswer : 606,
                message: "Backend error please try again error:" + error,
                status: false
            })
            console.log(error)
            res.status(400)
        }
    },
    getBuyCourse: async(req,res) =>{
        try{
            const api_key = req.headers.api_key
            if(api_key===process.env.HEADER){
                const { courseNumber,dateBuy,token,promoCode,transactionId,andropointBuy,andropointMinus} = req.body
           
                    const sql = "insert into user_courseBuy (courseNumber,dateBuy,token,promoCode,transactionId,andropointBuy) values(?,?,?,?,?,?)"
                    const [rows,field] = await pool.query(sql,[courseNumber,dateBuy,token,promoCode,transactionId,andropointBuy])
                    const sqlUpdateUserInfo = "update user_infos set lastCourseNumber = ?, lastThemeNumber = ?, lastCourseThemePasses = ? where token = ?"
                    const [result,fails] = await pool.query(sqlUpdateUserInfo,[courseNumber,1,false,token])
                
                    // const sqlUpdatwUser = "update user_infos set lastCourseNumber = ?,lastThemeNumber = ? where token = ?"
                    // const [roweee,fails] = await pool.query(sqlUpdatwUser,[courseNumber,1,token])
                res.send({
                   status: true,
                   codeAnswer: 212
                })
                res.status(200)
            }
        }catch(error){
            console.log(error)
            res.send({
                status: false,
                codeAnswer: 606
             })
        }
    },
    getBuyThemes: async(req,res) =>{
        try{
            const api_key = req.headers.api_key
            if(api_key===process.env.HEADER){
                const {token,dateBuyApi,dateBuyForDate,uniqueThemeId,themeNumber,courseNumber,promoCode,transactionId} = req.body
                const sql = "insert into user_themeBuy (courseNumber,dateBuyApi,dateBuyForDate,token,promoCode,transactionId,andropointBuy,themeNumber,uniqueThemeId) values(?,?,?,?,?,?,?,?,?)"
                const [rows,field] = await pool.query(sql,[courseNumber,dateBuyApi,dateBuyForDate,token,promoCode,transactionId,andropointBuy,themeNumber,uniqueThemeId])
                res.send({
                 status: true,
                 codeAnswer: 212
              })
              res.status(200)
            }
        }catch(error){
            console.log(error)
            res.send({
                status: false,
                codeAnswer: 606
             })
             res.status(400)
        }
    },
    getBuySubscribe: async(req,res) =>{
        try{
            const api_key = req.headers.api_key
            if(api_key===process.env.HEADER){
                const {dateBuy,promoCode,term,token,transactionId} = req.body
                const cachedSubscribes = await cacheControll.getCache(`subscribes-${token}`)
                if(cachedSubscribes){
                    const subsObject = JSON.parse(cachedSubscribes)
                   await cacheControll.deleteCache(`subscribes-${token}`)
                  await  cacheControll.saveCache(`subscribes-${token}`,JSON.stringify({
                        dateBuy:dateBuy,
                        promoCode:promoCode,
                        term:term+subsObject.term,
                        token:token,
                        transactionId:transactionId
                    }))
                    const updateSql = "update user_subscribes set term = ? where token = ?"
                    const [result,fiel] = await pool.query(updateSql,[subsObject.term+term,token])
                    res.send({
                        status: true,
                        codeAnswer: 212
                     })
                     res.status(200)
                     return
                }
     
                
                const getSql = "select * from user_subscribes where token = ?"
                const [rows,fields] = await pool.query(get,[token])
                if(rows[0]!=null){
                 const updateSql = "update user_subscribes set term = ? where token = ?"
                 const [result,fiel] = await pool.query(updateSql,[rows[0].term+term,token])
                 await cacheControll.saveCache(`subscribes-${token}`,JSON.stringify({
                    dateBuy:dateBuy,
                    promoCode:promoCode,
                    term:rows[0].term+term,
                    token:token,
                    transactionId:transactionId
                }))
                 res.send({
                     status: true,
                     codeAnswer: 212
                  })
                  res.status(200)
                }else{
                    await cacheControll.saveCache(`subscribes-${token}`,JSON.stringify({
                        dateBuy:dateBuy,
                        promoCode:promoCode,
                        term:term,
                        token:token,
                        transactionId:transactionId
                    }))
                 const insertSql = "insert into user_subscribes (dateBuy,promoCode,term,token,transactionId) values (?,?,?,?,?))"
                 const [resu,fail] = await pool.query(insertSql,[dateBuy,promoCode,term,token,transactionId])
                 res.send({
                     status: true,
                     codeAnswer: 212
                  })
                  res.status(200)
                }
            }
        }catch(error){
            console.log(error)
            res.send({
                status: false,
                codeAnswer: 606
             })
             res.status(400)
        }
    },
    checkUserSubcribe: async (req,res) =>{
        try{
            const api_key = req.headers.api_key
            if(api_key===process.env.HEADER){
                const { token, currentDate } = req.body
                const cachedSubscribes = await cacheControll.getCache(`subscribes-${token}`)
                if(cachedSubscribes){
                    const subObject = JSON.parse(cachedSubscribes)
                    const purchaseDate = new Date(subObject.dateBuy)
                    const currentDateLocal = new Date()
                    const expirationDate = new Date(purchaseDate.getFullYear(), purchaseDate.getMonth() + subObject.term, purchaseDate.getDate(), purchaseDate.getHours(), purchaseDate.getMinutes(), purchaseDate.getSeconds())
                    if (currentDateLocal > expirationDate) {
                        await cacheControll.deleteCache(`subscribes-${token}`)
                        const sqlDelete = "delete from user_subscribes where token = ?"  
                        const [results,fails] = await pool.query(sqlDelete,[token])
                        res.status(200)
                        res.send({
                            status: true,
                            codeAnswer: 212,
                            message: "subscription has expired",
                            subscribeIsActual: false
                         })
                      
                    }else{
                        console.log('Срок подписки не истек');
                        res.status(200)
                        res.send({
                          status: true,
                          codeAnswer: 212,
                          message: "subscription is actual",
                          subscribeIsActual: true
                       })
               
                    }
                    return
                }
                const sqlGet = "select * from user_subscribes where token = ?"
                const [rows,fields] = await pool.query(sqlGet,[token])
                console.log(`rows:${rows}`)
                if(rows.length===0){
                    res.status(200)
                    res.send({
                        status: true,
                        codeAnswer: 212,
                        message: "subscription is not exist",
                        subscribeIsActual: false
                     })
                     console.log(`rows is emptuy`)
                } else{
                    const purchaseDate = new Date(rows[0].dateBuy)
                    const currentDateLocal = new Date()
                    const expirationDate = new Date(purchaseDate.getFullYear(), purchaseDate.getMonth() + rows[0].term, purchaseDate.getDate(), purchaseDate.getHours(), purchaseDate.getMinutes(), purchaseDate.getSeconds())
                    if (currentDateLocal > expirationDate) {
                        const sqlDelete = "delete from user_subscribes where token = ?"  
                        const [results,fails] = await pool.query(sqlDelete,[token])
                        res.status(200)
                     res.send({
                        status: true,
                        codeAnswer: 212,
                        message: "subscription has expired",
                        subscribeIsActual: false
                     })
                 
                    } else {
                        await cacheControll.saveCache(`subscribes-${token}`,JSON.stringify(
                        {
                            dateBuy:rows[0].dateBuy,
                            promoCode:rows[0].promoCode,
                            term:rows[0].term,
                            token:rows[0].token,
                            transactionId:rows[0].transactionId
                        }
                        ))
                      console.log('Срок подписки не истек');
                      res.status(200)
                      res.send({
                        status: true,
                        codeAnswer: 212,
                        message: "subscription is actual",
                        subscribeIsActual: true
                     })
                     
                    }
                }
            }
        }catch(error){
              console.log(error)
              res.status(400)
        }
    },
    checkUserCoursesBuy: async (req,res) =>{
        try{
            const api_key = req.headers.api_key
            if(api_key===process.env.HEADER){
              const token = req.query.token
              const sqlGet = "select * from user_courseBuy where token = ?"
              const [rows,fields] = await pool.query(sqlGet,[token])
              if(rows.length===0){
                res.send(
                    [
                        {
                            courseNumber: 0,
                            dateBuy: "",
                            dateBuy: null,
                            token: token,
                            promoCode: null,
                            transactionId: "",
                            codeAnswer:707,
                            andropointBuy: 1
                        }
                    ]
                )
                res.status(200)
              } else {
                   res.status(200)
                  
                   res.send(rows)
              }
            }
        }catch(error){
            res.status(400)
              console.log(error)
        }
    },
    checkUserThemesBuy: async (req,res) =>{
        try{
            const api_key = req.headers.api_key
            if(api_key===process.env.HEADER){
                const token = req.query.token
                const sqlGet = "select * from user_themeBuy where token = ?"
                const [rows,fields] = await pool.query(sqlGet,[token])
                if(rows.length===0){
               
                    res.send([
                        {
                            token:token,
                            dateBuyApi:"",
                            dateBuyForDate:null,
                            uniqueThemeId:0,
                            themeNumber:0,
                            courseNumber:0,
                            codeAnswer:707,
                            promoCode:"",
                            transactionId:""
                        }
                    ])
                    res.status(200)
                }
            }else{
     
                res.send(rows)
                res.status(200)
            }
        }catch(error){
            res.status(400)
            console.log(error)
        }
    },
    getMySubcribe: async (req,res) =>{
        try{
            const api_key = req.headers.api_key
            if(api_key===process.env.HEADER){
             const token = req.query.token 
             const caacheSusbcribe = await cacheControll.getCache(`subscribes-${token}`)
             if(caacheSusbcribe){
                const subscObject = JSON.parse(caacheSusbcribe)
                res.send({
                    dateBuy:subscObject.dateBuy,
                    promoCode:subscObject.promoCode,
                    term:subscObject.term,
                    token:token,
                    transactionId:subscObject.transactionId
                })
                res.status(200)
                return
             }
             const sqlGet = "select * from user_subscribes where token = ?"
             const [rows,field] = await pool.query(sqlGet,[token])
             console.log(rows)
             if(rows.length === 0){
                res.send({
                    dateBuy:"",
                    promoCode:"",
                    term:0,
                    token:token,
                    codeAnswer:707,
                    transactionId:"",
                    dateBuyForDate:null
                })
                res.status(200)
             }else{
                res.send({
                    dateBuy:rows[0].dateBuy,
                    promoCode:rows[0].promoCode,
                    term:rows[0].term,
                    token:token,
                    transactionId:rows[0].transactionId
                })
                 res.status(200)
             }
          
            }
        }catch(error){
            res.status(400)
            console.log(error)
        }
    },
    getAndCheckPromoCode: async (req,res) =>{
        try{
            const api_key = req.headers.api_key
            if(api_key===process.env.HEADER){
              const { token,promoCode,dateApi } = req.body
              console.log(`token:${token},promoCode:${promoCode},dateApi:${dateApi}`)
              const sqlSearchUser = "select * from user_infos where token = ?"
              const [user,fails] = await pool.query(sqlSearchUser,[token])
              console.log(`usertInfo:${user}`)
              if(user.length===0){
                const sqlSearchPromo = "select * from promocodes_and_authors where promoCode = ?"
                const [rows,fields] = await pool.query(sqlSearchPromo,[promoCode])
                // const sqlInsertUserInfo = "insert into user_infos "
                if(rows.length!=0){
                    res.send({
                        status:true,
                        promoExist:true,
                        message:"promo code exist",
                        codeAnswer:212,
                        promoDate:dateApi,
                        userPromoExist:false
                      })
                      res.status(200)
                }else if(rows.length===0){
                    res.send({
                      status:true,
                      promoExist:false,
                      message:"promo code is not exist",
                      codeAnswer:707,
                      promoDate:dateApi,
                      userPromoExist:false
                    })
                    res.status(200)
                }
              } else if(user[0].promoCode===null){
                const sqlSearchPromo = "select * from promocodes_and_authors where promoCode = ?"
                const [rows,fields] = await pool.query(sqlSearchPromo,[promoCode])
                if(rows.length!=0){
                  const sqlUpdate = "update user_infos set promoCode = ?, promoCodeSubDay = ? where token = ?"
                  const [resulte,fail] = await pool.query(sqlUpdate,[promoCode,dateApi,token])
                  res.send({
                      status:true,
                      promoExist:true,
                      message:"promo code exist",
                      codeAnswer:212,
                      promoDate:dateApi,
                      userPromoExist:false
                    })
                    res.status(200)
                } else if(rows.length===0){
                    res.send({
                      status:true,
                      promoExist:false,
                      message:"promo code is not exist",
                      codeAnswer:707,
                      promoDate:dateApi,
                      userPromoExist:false
                    })
                    res.status(200)
                }
              }else{
                res.send({
                    status:true,
                    promoExist:true,
                    message:"promo code user registered",
                    codeAnswer:212,
                    promoDate:dateApi,
                    userPromoExist:true
                  })
                  res.status(200)
              }
            }
        }catch(error){
            res.status(400)
            console.log(error)
        }
    },
    checkPromoCodeSubActual: async (req,res) =>{
        try{
            const api_key = req.headers.api_key
            if(api_key===process.env.HEADER){
              const { token,promoCode,dateApi } = req.body
               const sqlSearchUser = "select * from user_infos where token = ?"
               const [rows,fields] = await pool.query(sqlSearchUser,[token])
               if(rows[0].promoCode!=null){
                const term = 3
                const purchaseDate = new Date(dateApi)
                const currentDate = new Date()
                const diffTime = Math.abs(currentDate - purchaseDate)
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                const endDate = new Date(purchaseDate);
                endDate.setDate(purchaseDate.getDate() + term);
                if (diffDays > term) {
                    console.log("Срок подписки истек")
                    res.send({
                        isActual:false,
                        status:true,
                        endActualDate:endDate,
                        promoCode:promoCode
                    })
                    res.status(200)
                } else {
                    console.log("Срок подписки еще действителен")
                    res.send({
                        isActual:true,
                        status:true,
                        endActualDate:endDate,
                        promoCode:promoCode
                    })
                    res.status(200)
                 }
               }else{
                res.send({
                    isActual:false,
                    status:true,
                    endActualDate:Date(),
                    promoCode:promoCode
                })
                res.status(200)
               }
            }   
        }catch(error){
            res.status(400)
             console.log(error)
        }
    },
    strikeModeUserCheck: async (req,res) =>{
        console.log("strike mode start")
        try{
            const api_key = req.headers.api_key
            console.log("strike mode start")
            if(api_key===process.env.HEADER){
                const { token,lastDateApi,currentDateApi } = req.body
                const cacheUserStrike = await cacheControll.getCache(`strikeModeUsers222-${token}`)
                if(cacheControll){
                    console.log("strike mode кэш есть ")
                    const strikeObject = JSON.parse(cacheUserStrike)
                    if(strikeObject&&strikeObject.lastOnlineDate){
                    const currentDate = moment();
                    const daysPassed = currentDate.diff(moment(lastDateApi),'days');
                    console.log(`Прошло ${daysPassed} дней с последнего онлайна.`);
                    if(daysPassed===0){
                         if(strikeObject.strikeModeDay==0){
                            await cacheControll.deleteCache(`strikeModeUsers222-${token}`)
                            await cacheControll.saveCache(`strikeModeUsers222-${token}`,JSON.stringify({
                                lastOnlineDate:currentDateApi,
                                strikeModeDay:1
                            }))
                            const sqlUpdateUser = "update user_infos set strikeModeDay = ?,lastOnlineDate = ? where token = ?"
                            const [results,fails] = await pool.query(sqlUpdateUser,[1,currentDateApi,token])
                            res.send({
                                lastOnlineDate:currentDateApi,
                                strikeModeDay:1,
                                token:token
                            })
                            res.status(200)
                                
                         } else if(strikeObject.strikeModeDay===null){
                            await cacheControll.deleteCache(`strikeModeUsers222-${token}`)
                            await cacheControll.saveCache(`strikeModeUsers222-${token}`,JSON.stringify({
                                lastOnlineDate:currentDateApi,
                                strikeModeDay:1
                            }))
                            const sqlUpdateUser = "update user_infos set strikeModeDay = ?,lastOnlineDate = ? where token = ?"
                            const [results,fails] = await pool.query(sqlUpdateUser,[1,currentDateApi,token])
                            res.send({
                                lastOnlineDate:currentDateApi,
                                strikeModeDay:1,
                                token:token
                            })
                            res.status(200)
                                
                         } else{
                            res.send({
                                lastOnlineDate:currentDateApi,
                                strikeModeDay:0,
                                token:token
                            })
                            res.status(200)
                            
                         }
                    }
                    if(daysPassed>1){
                        console.log("sbros do 1day")
                        await cacheControll.deleteCache(`strikeModeUsers222-${token}`)
                        await cacheControll.saveCache(`strikeModeUsers222-${token}`,JSON.stringify({
                            lastOnlineDate:currentDateApi,
                            strikeModeDay:1
                        }))
                        const sqlUpdateUser = "update user_infos set strikeModeDay = ?,lastOnlineDate = ? where token = ?"
                        const [results,fails] = await pool.query(sqlUpdateUser,[1,currentDateApi,token])
                        res.send({
                            lastOnlineDate:currentDateApi,
                            strikeModeDay:1,
                            token:token
                        })
                        res.status(200)
                        
                    } else if(daysPassed===1){
                        console.log("next strike day")
                        // const sqlGetUser = "select * from user_infos where token = ?"
                        // const [rows,field] = await pool.query(sqlGetUser,[token])
                        if(strikeObject.strikeModeDay===7){
                            await cacheControll.deleteCache(`strikeModeUsers222-${token}`)
                            await cacheControll.saveCache(`strikeModeUsers222-${token}`,JSON.stringify({
                                lastOnlineDate:currentDateApi,
                                strikeModeDay:1
                            }))
                            const sqlUpdateUser = "update user_infos set strikeModeDay = ?,lastOnlineDate = ? where token = ?"
                            const [results,fails] = await pool.query(sqlUpdateUser,[1,currentDateApi,token])
                            res.send({
                                lastOnlineDate:currentDateApi,
                                strikeModeDay:1,
                                token:token
                            })
                            res.status(200)
                            
                    }else{
                        await cacheControll.deleteCache(`strikeModeUsers222-${token}`)
                        await cacheControll.saveCache(`strikeModeUsers222-${token}`,JSON.stringify({
                            lastOnlineDate:currentDateApi,
                            strikeModeDay:strikeObject.strikeModeDay+1
                        }))
                        const sqlUpdateUser = "update user_infos set strikeModeDay = ?,lastOnlineDate = ? where token = ?"
                        const [results,fails] = await pool.query(sqlUpdateUser,[strikeObject.strikeModeDay+1,currentDateApi,token])
                        res.send({
                            lastOnlineDate:currentDateApi,
                            strikeModeDay:strikeObject.strikeModeDay+1,
                            token:token
                        })
                        res.status(200)
                        
                    }
                }
                return
               }
            }
                const sqlGetUser = "select lastOnlineDate from user_infos where token = ?"
                const [rows,field] = await pool.query(sqlGetUser,[token])
                const currentDate = moment();
                const daysPassed = currentDate.diff(moment(lastDateApi),'days');
                console.log(`Прошло ${daysPassed} дней с последнего онлайна.`);
                if(daysPassed===0){
                    const sqlGetUser = "select * from user_infos where token = ?"
                    const [rows,field] = await pool.query(sqlGetUser,[token])
                    if(rows[0].strikeModeDay===0){ 
                        await cacheControll.saveCache(`strikeModeUsers222-${token}`,JSON.stringify({
                            lastOnlineDate:currentDateApi,
                            strikeModeDay:1
                        }))
                        const sqlUpdateUser = "update user_infos set strikeModeDay = ?,lastOnlineDate = ? where token = ?"
                        const [results,fails] = await pool.query(sqlUpdateUser,[1,currentDateApi,token])
                        res.send({
                            lastOnlineDate:currentDateApi,
                            strikeModeDay:1,
                            token:token
                        })
                        res.status(200)
                        return

                    } else if(rows[0].strikeModeDay===null){
                        await cacheControll.saveCache(`strikeModeUsers222-${token}`,JSON.stringify({
                            lastOnlineDate:currentDateApi,
                            strikeModeDay:1
                        }))
                        const sqlUpdateUser = "update user_infos set strikeModeDay = ?, lastOnlineDate = ? where token = ?"
                        const [results,fails] = await pool.query(sqlUpdateUser,[1,currentDateApi,token])
                        res.send({
                            lastOnlineDate:currentDateApi,
                            strikeModeDay:1,
                            token:token
                        })
                        res.status(200)
                        return
                    } else {
                        res.send({
                            lastOnlineDate:currentDateApi,
                            strikeModeDay:0,
                            token:token
                        })
                        res.status(200)
                        return
                    }
                 
                }
                if(daysPassed>1){
                    console.log("sbros do 1day")
                    await cacheControll.saveCache(`strikeModeUsers222-${token}`,JSON.stringify({
                        lastOnlineDate:currentDateApi,
                        strikeModeDay:1
                    }))
                    const sqlUpdateUser = "update user_infos set strikeModeDay = ?, lastOnlineDate = ? where token = ?"
                    const [results,fails] = await pool.query(sqlUpdateUser,[1,currentDateApi,token])
                    res.send({
                        lastOnlineDate:currentDateApi,
                        strikeModeDay:1,
                        token:token
                    })
                    res.status(200)
                    return
                } else if(daysPassed===1){
                    console.log("next strike day")
                    const sqlGetUser = "select * from user_infos where token = ?"
                    const [rows,field] = await pool.query(sqlGetUser,[token])
                    if(rows[0].strikeModeDay===7){
                        await cacheControll.saveCache(`strikeModeUsers222-${token}`,JSON.stringify({
                            lastOnlineDate:currentDateApi,
                            strikeModeDay:1
                        }))
                        const sqlUpdateUser = "update user_infos set strikeModeDay = ?, lastOnlineDate = ? where token = ?"
                        const [results,fails] = await pool.query(sqlUpdateUser,[1,currentDateApi,token])
                        res.send({
                            lastOnlineDate:currentDateApi,
                            strikeModeDay:1,
                            token:token
                        })
                        res.status(200)
                        return
                    }else{
                        await cacheControll.saveCache(`strikeModeUsers222-${token}`,JSON.stringify({
                            lastOnlineDate:currentDateApi,
                            strikeModeDay:rows[0].strikeModeDay+1
                        }))
                        const sqlUpdateUser = "update user_infos set strikeModeDay = ?, lastOnlineDate = ? where token = ?"
                        const [results,fails] = await pool.query(sqlUpdateUser,[rows[0].strikeModeDay+1,currentDateApi,token])
                        res.send({
                            lastOnlineDate:currentDateApi,
                            strikeModeDay:rows[0].strikeModeDay+1,
                            token:token
                        })
                        res.status(200)
                        return
                    }
                } 
            }
        }catch(error){
            res.status(400)
            console.log(error)
        }
    }
    ,
    checkTermUserTheme: async (req,res) =>{
        try{
            const api_key = req.headers.api_key
            if(api_key===process.env.HEADER){
            const {token,currentDateApi,uniqueThemeId,themeNumber,courseNumber,termHourse,terDateApi} = req.body
            if(terDateApi==""&&termHourse==0){
                res.send({
                    remainingHours:0,
                    isEnding:true,
                    themeNumber:0,
                    courseNumber:0
                })
                res.status(200)
                return
            }
            // const cacheTerm = await cacheControll.getCache(`termhourse-${token}`)
            // if(cacheTerm){
            //     console.log(`cache term exist:${cacheTerm}`)
            //     const termObject = JSON.parse(cacheTerm)
            //     const startMoment = moment(termObject.termDateApi)
            //     const deadline = startMoment.add(termHourse, 'hours')
            //     const currentMoment = moment()
            //     if(termObject.termHourse===null&&termDateApi===null){
            //         await cacheControll.deleteCache(`termhourse-${token}`)
            //         res.send({
            //             remainingHours:0,
            //             isEnding:true
            //         })
            //         res.status(200)
            //         return
            //     }

            //     if (currentMoment.isAfter(deadline)) {
            //         const sqlUpdateUserInfo = "update user_infos set themeTermHourse = ?,termDate = ? where token = ?"
            //         const [result,fail] = await pool.query(sqlUpdateUserInfo,[null,null,token])
            //         await cacheControll.deleteCache(`termhourse-${token}`)
            //         res.send({
            //             remainingHours:0,
            //             isEnding:true
            //         })
            //         res.status(200)
            //     }else{
            //         const hoursRemaining = deadline.diff(currentMoment, 'hours')
            //         res.send({
            //           remainingHours:hoursRemaining,
            //           isEnding:false
            //       })
            //       res.status(200)
            //     }
            //     return
            // }
            const cacheTerm = await cacheControll.getCache(`termhourse-${token}`)
            if(cacheTerm){
                const termCacheObject = JSON.parse(cacheTerm)
                const startMoment = moment(termCacheObject.termDateApi)
                const deadline = startMoment.add(termHourse, 'hours')
                const currentMoment = moment()
                if (currentMoment.isAfter(deadline)) {
                    console.log("Задержка прошла");
                    const sqlUpdateUserInfo = "update user_infos set themeTermHourse = ?, termDate = ? where token = ?"
                    const [result,fail] = await pool.query(sqlUpdateUserInfo,[null,null,token])
                    await cacheControll.deleteCache(`termhourse-${token}`)
                    res.send({
                        remainingHours:0,
                        isEnding:true,
                        themeNumber:0,
                        courseNumber:0
                    })
                    res.status(200)
                } else {  
                  const hoursRemaining = deadline.diff(currentMoment, 'hours')
                  res.send({
                    remainingHours:hoursRemaining,
                    isEnding:false,
                    themeNumber:termCacheObject.themeNumber,
                    courseNumber:termCacheObject.courseNumber
                })
                res.status(200)
                }
                // termHourse:updateThemes.termHourse,
                // termDateApi:updateThemes.termDateApi
                return
            }
            const sqlSearchUser = "select termDate,themeTermHourse,lastThemeNumber,lastCourseNumber from user_infos where token = ?"
            const [rows,fails] = await pool.query(sqlSearchUser,[token])
                if(rows[0].themeTermHourse===null){
                    await cacheControll.deleteCache(`termhourse-${token}`)
                    res.send({
                        remainingHours:0,
                        isEnding:true,
                        themeNumber:0,
                        courseNumber:0
                    })
                    res.status(200)
                    return
                }
                const startMoment = moment(rows[0].termDate)
                const deadline = startMoment.add(termHourse, 'hours')
                const currentMoment = moment()
                if (currentMoment.isAfter(deadline)) {
                    console.log("Задержка прошла");
                    const sqlUpdateUserInfo = "update user_infos set themeTermHourse = ?, termDate = ? where token = ?"
                    const [result,fail] = await pool.query(sqlUpdateUserInfo,[null,null,token])
                    await cacheControll.deleteCache(`termhourse-${token}`)
                    res.send({
                        remainingHours:0,
                        isEnding:true,
                        themeNumber:0,
                        courseNumber:0
                    })
                    res.status(200)
                } else {
                    await cacheControll.saveCache(`termhourse-${token}`,JSON.stringify({
                        termHourse:rows[0].themeTermHourse,
                        termDateApi:rows[0].termDate,
                        themeNumber:rows[0].lastThemeNumber,
                        courseNumber:rows[0].lastCourseNumber
                    }))
             
                  const hoursRemaining = deadline.diff(currentMoment, 'hours')
                  res.send({
                    remainingHours:hoursRemaining,
                    isEnding:false,
                    themeNumber:rows[0].lastThemeNumber,
                    courseNumber:rows[0].lastCourseNumber
                })
                res.status(200)
                }


          }  
        }catch(error){
            res.status(400)
            console.log(error)
        }
    },
    getUserProgress: async (req,res) =>{
        try{
            const api_key = req.headers.api_key
            if(api_key===process.env.HEADER){
              const { updateThemes,updateCourses,AndropointCount,token} = req.body
              ////проверка пуста ли тема
                    if(AndropointCount!=0&&AndropointCount!=null){
                        const sqlUpdateUserInfo = "update user_infos set andropointCount = ? where token = ?"
                        const [result,fails] = await pool.query(sqlUpdateUserInfo,[AndropointCount,token])
                    }
               
                   if(updateThemes!=null){
              
                       
                        console.log(`termisNotNull`)
                        const sqlUpdateUserInfo = "update user_infos set themeTermHourse = ?, termDate = ?, lastCourseThemePasses = ?,lastThemeNumber = ? where token = ?"
                        const [result,fails]  = await pool.query(sqlUpdateUserInfo,[updateThemes.termHourse,updateThemes.termDateApi,updateThemes.lasThemePassed,updateThemes.themeNumber,token])
                        const checkCacheExist = await cacheControll.getCache(`termhourse-${token}`)
                        if(checkCacheExist){
                            console.log(`termisNotNull2 ${updateThemes.termHourse} date:${updateThemes.termDateApi}`)
                            if(updateThemes.termHourse===null&&updateThemes.termDateApi===null){
                                await cacheControll.deleteCache(`termhourse-${token}`)
                            }else if(updateThemes.termHourse===0&&updateThemes.termDateApi===""){
                                await cacheControll.deleteCache(`termhourse-${token}`)
                            }else{
                                await cacheControll.deleteCache(`termhourse-${token}`)
                                await cacheControll.saveCache(`termhourse-${token}`,JSON.stringify({
                                    termHourse:updateThemes.termHourse,
                                    termDateApi:updateThemes.termDateApi,
                                    themeNumber:updateThemes.themeNumber,
                                    courseNumber:updateThemes.courseNumber
                                }))
                            }
                      
                        }else{
                            if(updateThemes.termHourse!=null&&updateThemes.termDateApi!=null&&updateThemes.termHourse!=0&&updateThemes.termDateApi!=""){
                                console.log(`termisNotbjtgnbtnbtrnbntbn5Null ${updateThemes.termHourse} date:${updateThemes.termDateApi}`)
                            await cacheControll.saveCache(`termhourse-${token}`,JSON.stringify({
                                termHourse:updateThemes.termHourse,
                                termDateApi:updateThemes.termDateApi,
                                themeNumber:updateThemes.themeNumber,
                                courseNumber:updateThemes.courseNumber
                            }))
                        }
                        }
                        const startMoment = moment(updateThemes.termDateApi);
                        const endMoment = startMoment.add(updateThemes.termHourse, 'hours');
                        const endTimeFormatted = endMoment.format('DD.MM.YYYY HH:mm');
                        res.send({
                            termToDate:endTimeFormatted,
                            token:token,
                            status:true
                        })
                  
                    //  if(updateThemes.isOpenTheme===true&&updateThemes.uniqueThemeId!=0){
                    //     const sqlUpdateUserInfo = "update user_infos set andropointCount = ?, lastThemeNumber = ?, lastCourseNumber = ?, themeTermHourse = ?, termDate = ?, lastCourseThemePasses = ? where token = ?"
                    //     const [result,fails]  = await pool.query(sqlUpdateUserInfo,[AndropointCount,updateThemes.themeNumber,updateThemes.courseNumber,updateThemes.termHourse,updateThemes.termDateApi,updateThemes.lasThemePassed,token])
                
                    //  }
                 
                    //  if(updateThemes.uniqueThemeId===0&&updateThemes.courseNumber===0&&updateThemes.termDateApi===null){
                    //     const sqlUpdateUserInfo = "update user_infos set andropointCount = ?, themeTermHourse = ?, termDate = ? where token = ?"
                    //     const [result,fails] = await pool.query(sqlUpdateUserInfo,[AndropointCount,null,null,token])
                    //  }
                    //  if(updateThemes.termHourse===null){
                    //     const sqlUpdateUserInfo = "update user_infos set andropointCount = ?, themeTermHourse = ?, termDate = ? where token = ?"
                    //     const [result,fails] = await pool.query(sqlUpdateUserInfo,[AndropointCount,updateThemes.termHourse,updateThemes.termDateApi,token])
             
                    //  }
                   }
                   if(updateCourses!=null&&updateCourses.courseNumber!=0){
                    if(updateCourses.courseFirstTheme!=null){
                        const sqlUpdateUserInfo = "update user_infos set  lastCourseNumber = ?, lastThemeNumber = ?, lastCourseThemePasses = ? where token = ?"
                        const [result,fails] = await pool.query(sqlUpdateUserInfo,[updateCourses.courseNumber,updateCourses.courseFirstTheme,false,token])
                    }else{
                        const sqlUpdateUserInfo = "update user_infos set lastCourseNumber = ?,  lastCourseThemePasses = ? where token = ?"
                        const [result,fails] = await pool.query(sqlUpdateUserInfo,[updateCourses.courseNumber,false,token])
                    }
                
                    
                   }
                   res.send({
                    termToDate:"endTimeFormatted",
                    token:token,
                    status:true
                })
                   res.status(200)
            }
        }catch(error){
            res.status(400)
            console.log(error)
        }
    },
    getCrashUser: async (req,res) =>{
        try{
            const api_key = req.headers.api_key
            if(api_key===process.env.HEADER){
             const { crashInfoModels } = req.body
             crashInfoModels.forEach( async (crash)=>{
                const insertSql = "insert into crashs (className,dateCrash,brandPhone,exception) values(?,?,?,?)"
                const [rows,failse] = await pool.query(insertSql,[crash.className,crash.dateCrash,crash.brandPhone,crash.exception])
                res.send({
                    status:true,
                    message:"success crash save",
                    codeAnswer:212
                })
                res.status(200)
             })
            }
        }catch(error){
            res.status(400)
            console.log(error)
        }
    },

 
   

    checkHowTermUser: async(req, res) => {
        try {
          const api_key = req.headers.api_key;
          if (api_key === process.env.HEADER) {
            const token = req.query.token
            console.log("token: "+token)
            const cacheTerm = await cacheControll.getCache(`termhourse-${token}`)
            if(cacheTerm){
                const termCacheObject = JSON.parse(cacheTerm)
                const startMoment = moment(termCacheObject.termDateApi)
                const endMoment = startMoment.add(termCacheObject.termHourse, 'hours')
                const currentMoment = moment()
                if (endMoment.isBefore(currentMoment)) {
                    const updateSql = "update user_infos set termDate = ?, themeTermHourse = ? where token = ?"
                    const [reseue,error] = await pool.query(updateSql,[null,null,token])
                    await cacheControll.deleteCache(`termhourse-${token}`)
                    res.status(200).send({
                        token: token,
                        dateEnding: "Invalid date",
                        courseNumber: 1,
                        themeNumber: 1
                      });
                }else{
                    const endTimeFormatted = endMoment.format('DD.MM.YYYY HH:mm')
                    console.log("endDate: "+endTimeFormatted)
                    res.status(200).send({
                      token: token,
                      dateEnding: endTimeFormatted,
                      courseNumber: termCacheObject.courseNumber,
                      themeNumber: termCacheObject.themeNumber
                    });
                   }
                   return
                }
            const sql = "select lastCourseNumber,lastThemeNumber,termDate,themeTermHourse from user_infos where token = ?"
            const [results, fails] = await pool.query(sql, [token])
            const startMoment = moment(results[0].termDate)
            const endMoment = startMoment.add(results[0].themeTermHourse, 'hours')
            const currentMoment = moment()
            if (endMoment.isBefore(currentMoment)) {
                 const updateSql = "update user_infos set termDate = ?, themeTermHourse = ? where token = ?"
                 const [reseue,error] = await pool.query(updateSql,[null,null,token])
                 await cacheControll.deleteCache(`termhourse-${token}`)
                 res.status(200).send({
                    token: token,
                    dateEnding: "Invalid date",
                    courseNumber: results[0].lastCourseNumber,
                    themeNumber: results[0].lastThemeNumber
                  });
            }else{
                const endTimeFormatted = endMoment.format('DD.MM.YYYY HH:mm')
                console.log("endDate: "+endTimeFormatted)
                res.status(200).send({
                  token: token,
                  dateEnding: endTimeFormatted,
                  courseNumber: results[0].lastCourseNumber,
                  themeNumber: results[0].lastThemeNumber
                });
            }
        
          }
        } catch (error) {
          console.log(error);
          res.status(400).send(error);
        }
      },
      adsViewTermCheck:async (req,res)=>{
        try{
            const api_key = req.headers.api_key;
            if (api_key === process.env.HEADER) {
                const {dateTerm}  = req.body
                const currentDate = moment();
                const hoursPassed = currentDate.diff(moment(dateTerm),'hours')
                if(hoursPassed>=2){
                    res.status(200).send({
                        isLimitActual:true
                    })
                }else{
                    res.status(200).send({
                        isLimitActual:false
                    })
                }
            }
        }catch (error) {
          console.log(error);
          res.status(400).send(error);
        }
      },
      adsViewCheckLimit:async (req,res)=>{
        try{
            const api_key = req.headers.api_key;
            if (api_key === process.env.HEADER) {
                const {dateTerm}  = req.body
                const currentDate = moment();
                const hoursPassed = currentDate.diff(moment(dateTerm),'hours')
                if(2>=hoursPassed){
                    res.send({
                        isLimitActual:true
                    })
                    res.status(200)
                }else{
                    res.send({
                        isLimitActual:false
                    })
                    res.status(200)
                }
            }
        }catch (error) {
          console.log(error);
          res.status(400).send(error);
        }
      },
      userSendAdsTerm: async(req,res)=>{
        try{
            const api_key = req.headers.api_key;
            if (api_key === process.env.HEADER) {
              const { adsTermDate,token } = req.body
                const sqlUpdate = "update user_infos set termAdsDate = ? where token = ?"
                const [result,error] = await pool.query(sqlUpdate,[adsTermDate,token])
                await cacheControll.saveCache(`adsViewCache-${token}`,JSON.stringify({
                       adsTermDate:adsTermDate
                }))
                res.send({
                    message:"Success update term"
                })
                res.status(200)
            }
        }catch(error){
            console.log(error);
            res.status(400).send(error);
        }
      },
      userDeleteAdsTerm:async(req,res)=>{
        try{
            const api_key = req.headers.api_key;
            if (api_key === process.env.HEADER) {
             const token = req.query.token
              const cacheterm = await cacheControll.getCache(`adsViewCache-${token}`)
              if(cacheterm){
                await cacheControll.deleteCache(`adsViewCache-${token}`)
              }
              const sqlUpdate = "update user_infos set termAdsDate = ? where token = ?"
              const [resu,error] = await pool.query(sqlUpdate,[null,token])
              res.send({
                message:"Success update term"
            })
            res.status(200)
            }
        }catch(error){
            console.log(error);
            res.status(400).send(error);
        }
      },
      getCheckMethodResetUser:async(req,res)=>{
        try{
            const api_key = req.headers.api_key;
            if (api_key === process.env.HEADER) {
                const email = req.query.email
              const [emailGet,error] = await pool.query("select clueDateReset,clueKeyTextReset,resetDate,resetKeyText from emails_table where email = ?",[email])
                 if(emailGet[0]!=null){
                     if(emailGet[0].clueDateReset!=null&&emailGet[0].resetDate!=null){
                        res.status(200).send({
                            isResetDate:true,
                            isResetText:false,
                            queryText:emailGet[0].clueDateReset,
                            codeAnswer:2018
                        })
                     }
                     if(emailGet[0].clueKeyTextReset!=null&&emailGet[0].resetKeyText!=null){
                        res.status(200).send({
                            isResetDate:false,
                            isResetText:true,
                            queryText:emailGet[0].clueKeyTextReset,
                            codeAnswer:2018
                        })
                     }
                 }else{
                    res.status(200).send({
                        isResetDate:false,
                        isResetText:false,
                        queryText:"",
                        codeAnswer:2013
                    })
                 }
            }
        }catch(error){
            console.log(error)
            res.status(400).send(error)
        }
      },
      checkTextResetUserPass:async(req,res)=>{
         try{
            const api_key = req.headers.api_key;
            if (api_key === process.env.HEADER) {
               const {text,email} = req.body
               const [emailGet,error] = await pool.query("select resetKeyText from emails_table where email = ?",[email])
               const isValid = await bcrypt.compare(text,emailGet[0].resetKeyText)
               if(isValid){
                res.status(200).send({
                    status:true,
                    codeAnswer:2002
                })
               }else{
                res.status(200).send({
                    status:true,
                    codeAnswer:2005
                })      
               }
            }

         }catch(error){
            console.log(error)
            res.status(400).send(error)
        }
      },
      checkDateResetUserPass:async(req,res)=>{
        try{
            const api_key = req.headers.api_key;
            if (api_key === process.env.HEADER) {
               const {date,email} = req.body
               const [emailGet,error] = await pool.query("select resetDate from emails_table where email = ?",[email])
               const isValid = await bcrypt.compare(date,emailGet[0].resetDate)
               if(isValid){
                res.status(200).send({
                    status:true,
                    codeAnswer:2002
                })
               }else{
                res.status(200).send({
                    status:true,
                    codeAnswer:2005
                })      
               }
            }

         }catch(error){
            console.log(error)
            res.status(400).send(error)
        }
      },
      getTextUserResetMethod:async(req,res)=>{
        try{
            const api_key = req.headers.api_key;
            if (api_key === process.env.HEADER) {
               const {questionAnswerReset,correctText,email} = req.body
               const textKeySiphr = await bcrypt.hash(correctText,10)
               const [result,error] = await pool.query("update emails_table set resetKeyText = ?,clueKeyTextReset = ?,resetDate = ?,clueDateReset = ? where email = ?",[textKeySiphr,questionAnswerReset,null,null,email])
               res.status(200).send({
                status:true,
                message:"Success save new data",
                codeAnswer:2000
               })
             
            }
        }catch(error){
            console.log(error)
            res.status(400).send(error)
        }
      
      },
      getDateUserResetMethod:async(req,res)=>{
        try{
            const api_key = req.headers.api_key;
            if (api_key === process.env.HEADER) {
              const {questionAnswerReset,correctDate,email} = req.body
              const dateKeySiphr = await bcrypt.hash(correctDate,10)
              const [result,error] = await pool.query("update emails_table set resetDate = ?,clueDateReset = ?,resetKeyText = ?,clueKeyTextReset = ? where email = ?",[dateKeySiphr,questionAnswerReset,null,null,email])
              res.status(200).send({
                status:true,
                message:"Success save new data",
                codeAnswer:2000
               })
            }
        }catch(error){
            console.log(error)
            res.status(400).send(error)
        }
      },
      resetPassword:async(req,res)=>{
        try{
            const api_key = req.headers.api_key;
            if (api_key === process.env.HEADER) {
               const { newPassword,email } = req.body
               const passwordHash = await bcrypt.hash(newPassword,10)
               const [result,error] = await pool.query("update emails_table set password = ? where email = ?",[passwordHash,email])
               res.status(200).send({
                status:true,
                message:"Success update password",
                codeAnswer:2000
               })
            }
        }catch(error){
            console.log(error)
            res.status(400).send(error)
        }
      }
      
}

module.exports = userController

