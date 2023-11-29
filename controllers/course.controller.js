const pool = require('../database/index')
const moment = require('moment')
const cacheControll = require('../utils/cacheControl')
// const redis = require('redis')
// const client = redis.createClient(process.env.REDIS_URL)
// async function createConntect(){
//     await client.connect()
// }
// createConntect()
const courseController = {
    getAllCourse: async (req,res) =>{
       try{
        console.log("sus course")
        const api_key = req.headers.api_key
        if(api_key===process.env.HEADER){
          const token = req.query.token
          const language = req.query.languageUser
          console.log("lllalala"+language)
          const cachedCourses = await cacheControll.getCache(`courses-${language}`)
          if(cachedCourses){
            const sqlGetUserInfo = "select * from user_infos where token = ?"
               const courseObjectCache = JSON.parse(cachedCourses)
               const [user,fails] = await pool.query(sqlGetUserInfo,[token])
               ////
               const cacheterm = await cacheControll.getCache(`adsViewCache-${token}`)
               if(cacheterm){
                   const cacheTermObj = JSON.parse(cacheterm)
                   const currentDate = moment();
                   const hoursPassed = currentDate.diff(moment(cacheTermObj.adsTermDate),'hours')
                   if(hoursPassed>=2){
                     await cacheControll.deleteCache(`adsViewCache-${token}`)      
                      const [rolne,eraw] = await pool.query("update user_infos set termAdsDate = ? where token = ?",[null,token])
                      res.send({
                        courses:courseObjectCache.courses,
                        themes:courseObjectCache.themes,
                        victorines:courseObjectCache.victorines,
                        victorinesAnswerVariants:courseObjectCache.victorinesAnswerVariants,
                        victorineClues:courseObjectCache.victorineClues,
                        themeLessons:courseObjectCache.themeLessons,
                        themeLessonContents:courseObjectCache.themeLessonContents,
                        userProgress:{
                            lastOpenCourse:user[0].lastCourseNumber,
                            lastOpenTheme:user[0].lastThemeNumber,
                            termHourse:user[0].themeTermHourse,
                            termDateApi:user[0].termDate,
                            lastCourseThemePasses:user[0].lastCourseThemePasses,
                            termAds:null
                        }
                      })
                   }else{
                    res.send({
                        courses:courseObjectCache.courses,
                        themes:courseObjectCache.themes,
                        victorines:courseObjectCache.victorines,
                        victorinesAnswerVariants:courseObjectCache.victorinesAnswerVariants,
                        victorineClues:courseObjectCache.victorineClues,
                        themeLessons:courseObjectCache.themeLessons,
                        themeLessonContents:courseObjectCache.themeLessonContents,
                        userProgress:{
                            lastOpenCourse:user[0].lastCourseNumber,
                            lastOpenTheme:user[0].lastThemeNumber,
                            termHourse:user[0].themeTermHourse,
                            termDateApi:user[0].termDate,
                            lastCourseThemePasses:user[0].lastCourseThemePasses,
                            termAds:cacheTermObj.adsTermDate
                        }
                      })
                   }
                   return
               }
               const sqlQueryTermAds = "select termAdsDate from user_infos where token = ?"
               const [ki,eral] = await pool.query(sqlQueryTermAds,[token])
               const currentDate = moment();
               const hoursPassed = currentDate.diff(moment(ki[0].termAdsDate),'hours')
               if(hoursPassed>=2){
                res.send({
                    courses:courseObjectCache.courses,
                    themes:courseObjectCache.themes,
                    victorines:courseObjectCache.victorines,
                    victorinesAnswerVariants:courseObjectCache.victorinesAnswerVariants,
                    victorineClues:courseObjectCache.victorineClues,
                    themeLessons:courseObjectCache.themeLessons,
                    themeLessonContents:courseObjectCache.themeLessonContents,
                    userProgress:{
                        lastOpenCourse:user[0].lastCourseNumber,
                        lastOpenTheme:user[0].lastThemeNumber,
                        termHourse:user[0].themeTermHourse,
                        termDateApi:user[0].termDate,
                        lastCourseThemePasses:user[0].lastCourseThemePasses,
                        termAds:null
                    }
                  })
                  console.log('cached exist')
                  res.status(200)
               }else{
                res.send({
                    courses:courseObjectCache.courses,
                    themes:courseObjectCache.themes,
                    victorines:courseObjectCache.victorines,
                    victorinesAnswerVariants:courseObjectCache.victorinesAnswerVariants,
                    victorineClues:courseObjectCache.victorineClues,
                    themeLessons:courseObjectCache.themeLessons,
                    themeLessonContents:courseObjectCache.themeLessonContents,
                    userProgress:{
                        lastOpenCourse:user[0].lastCourseNumber,
                        lastOpenTheme:user[0].lastThemeNumber,
                        termHourse:user[0].themeTermHourse,
                        termDateApi:user[0].termDate,
                        lastCourseThemePasses:user[0].lastCourseThemePasses,
                        termAds:ki[0].termAdsDate
                    }
                  })
                  console.log('cached exist')
                  res.status(200)
               }
               ////
              return
          }
          const sqlGetUserInfo = "select * from user_infos where token = ?"
          const sqlGetAllCourse = "select * from course_global where language = ?"
          const sqlGetAllThemes = "select * from themes_global where language = ?"
          const sqlGetAllLessons = "select * from lesson where language = ?"
          const sqlGetAllLessonContents = "select * from lesson_content where language = ?"
          const sqlGetAllVictorineTests = "select * from victorines where language = ?"
          const sqlGetAllVictorineVariants = "select * from victorines_answer_variant where language = ?"
          const sqlGetAllVictorineClues = "select * from victorines_clue where language = ?"

          const [courses,fields] = await pool.query(sqlGetAllCourse,[language])
          const [user,filds] = await pool.query(sqlGetUserInfo,[token])
          const [themes,lll] = await pool.query(sqlGetAllThemes,[language])
          const [lessons,errr] = await pool.query(sqlGetAllLessons,[language])
          const [lessonContents,frfrf] = await pool.query(sqlGetAllLessonContents,[language])
          const [victorines,jjjuj] = await pool.query(sqlGetAllVictorineTests,[language])
          const [victorineVariants,frfrfrf] = await pool.query(sqlGetAllVictorineVariants,[language])
          const [victorineClues,fielddfg] = await pool.query(sqlGetAllVictorineClues,[language])
          console.log(`cached save course:${themes}`)
          await cacheControll.saveCache(`courses-${courses[0].language}`,JSON.stringify({
            courses:courses,
            themes:themes,
            victorines:victorines,
            victorinesAnswerVariants:victorineVariants,
            victorineClues:victorineClues,
            themeLessons:lessons,
            themeLessonContents:lessonContents
          }))


/////////////////
          const cacheterm = await cacheControll.getCache(`adsViewCache-${token}`)
          if(cacheterm){
              const cacheTermObj = JSON.parse(cacheterm)
              const currentDate = moment();
              const hoursPassed = currentDate.diff(moment(cacheTermObj.adsTermDate),'hours')
              if(hoursPassed>=2){
                await cacheControll.deleteCache(`adsViewCache-${token}`)      
                 const [rolne,eraw] = await pool.query("update user_infos set termAdsDate = ? where token = ?",[null,token])
                 res.send({
                    courses:courses,
                    themes:themes,
                    victorines:victorines,
                    victorinesAnswerVariants:victorineVariants,
                    victorineClues:victorineClues,
                    themeLessons:lessons,
                    themeLessonContents:lessonContents,
                    userProgress:{
                        lastOpenCourse:user[0].lastCourseNumber,
                        lastOpenTheme:user[0].lastThemeNumber,
                        termHourse:user[0].themeTermHourse,
                        termDateApi:user[0].termDate,
                        lastCourseThemePasses:user[0].lastCourseThemePasses,
                        termAds:null
                    }
                  })
              }else{
                res.send({
                    courses:courses,
                    themes:themes,
                    victorines:victorines,
                    victorinesAnswerVariants:victorineVariants,
                    victorineClues:victorineClues,
                    themeLessons:lessons,
                    themeLessonContents:lessonContents,
                    userProgress:{
                        lastOpenCourse:user[0].lastCourseNumber,
                        lastOpenTheme:user[0].lastThemeNumber,
                        termHourse:user[0].themeTermHourse,
                        termDateApi:user[0].termDate,
                        lastCourseThemePasses:user[0].lastCourseThemePasses,
                        termAds:cacheTermObj.adsTermDate
                    }
                  })
              }
              return
          }
/////////////
const sqlQueryTermAds = "select termAdsDate from user_infos where token = ?"
const [ki,eral] = await pool.query(sqlQueryTermAds,[token])
const currentDate = moment();
const hoursPassed = currentDate.diff(moment(ki[0].termAdsDate),'hours')
if(hoursPassed>=2){
    res.send({
        courses:courses,
        themes:themes,
        victorines:victorines,
        victorinesAnswerVariants:victorineVariants,
        victorineClues:victorineClues,
        themeLessons:lessons,
        themeLessonContents:lessonContents,
        userProgress:{
            lastOpenCourse:user[0].lastCourseNumber,
            lastOpenTheme:user[0].lastThemeNumber,
            termHourse:user[0].themeTermHourse,
            termDateApi:user[0].termDate,
            lastCourseThemePasses:user[0].lastCourseThemePasses,
            termAds:null
        }
      })
      res.status(200)
}else{
    res.send({
        courses:courses,
        themes:themes,
        victorines:victorines,
        victorinesAnswerVariants:victorineVariants,
        victorineClues:victorineClues,
        themeLessons:lessons,
        themeLessonContents:lessonContents,
        userProgress:{
            lastOpenCourse:user[0].lastCourseNumber,
            lastOpenTheme:user[0].lastThemeNumber,
            termHourse:user[0].themeTermHourse,
            termDateApi:user[0].termDate,
            lastCourseThemePasses:user[0].lastCourseThemePasses,
            termAds:ki[0].termAdsDate
        }
      })
      res.status(200)
}
        }
       }catch(error){
        console.log(error)
        res.status(400)
       }
    },
    getAllLastUpdateDates: async (req,res) =>{
        try{
            const api_key = req.headers.api_key
            if(api_key===process.env.HEADER){
                const cacheLastDats = await cacheControll.getCache(`lastDates`)
                if(cacheLastDats){
                    res.send({
                        lastDatesCourses:JSON.parse(cacheLastDats)
                       })
                       return
                }
               const sqlDateSearch = "select lastUpdateDate,courseNumber from course_global"
               const [rows,fields] = await pool.query(sqlDateSearch)
               await cacheControll.saveCache(`lastDates`,JSON.stringify(rows))
               res.send({
                lastDatesCourses:rows
               })
            }
        }catch(error){
           console.log(error)
           res.status(400)
        }
    },
    insertCourses: async (req,res) =>{
        try{
            const api_key = req.headers.adminKey
            if(api_key===process.env.ADMIN_KEY){
                const {adminKey,course,themes,lessons,lessonsContents,victorineTests,victorineAnswerVariants,victorineClueModel} = req.body
                
            }
        }catch(error){
            console.log(error)
            res.status(400)
        }
    }
}

module.exports = courseController