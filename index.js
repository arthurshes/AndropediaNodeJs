require('dotenv').config()
const fastify = require('fastify')({logger:true})




// const express = require('express'),
// app = express()
// const userRouter = require('./routes/user.router')
// const courseRouter = require('./routes/course.router')
const userController = require('./controllers/user.controller')
const courseControler = require('./controllers/course.controller')
const timerController = require('./controllers/time.controller')

fastify.get("/course/allCourses/get",courseControler.getAllCourse)
fastify.get("/course/dates/get",courseControler.getAllLastUpdateDates)

fastify.post("/user/account/delete",userController.deleteUserInfo)
fastify.post("/user/signIn/email",userController.emailSignIn)
fastify.get("/user/check/checkTerm",userController.checkHowTermUser)
fastify.post("/user/userInfo/send",userController.getUserInfo)
fastify.post("/user/userInfo/update",userController.updateUserInfo)
fastify.get("/user/userInfo/get",userController.sendUserInfoForClient)
fastify.post("/user/signIn/recover",userController.recoverPassword)
fastify.post("/user/courseBuy/send",userController.getBuyCourse)
fastify.post("/user/subscribe/send",userController.getBuySubscribe)
fastify.post("/user/themeBuy/send",userController.getBuyThemes)
fastify.post("/user/subscribe/check",userController.checkUserSubcribe)
fastify.get("/user/courseBuy/check",userController.checkUserCoursesBuy)
fastify.get("/user/themeBuy/check",userController.checkUserThemesBuy)
fastify.get("/user/subscribe/get",userController.getMySubcribe)
fastify.post("/user/promo/send",userController.getAndCheckPromoCode)
fastify.post("/user/promo/check",userController.checkPromoCodeSubActual)
fastify.post("/user/userInfo/strikeMode",userController.strikeModeUserCheck)
fastify.post("/user/theme/checkTerm",userController.checkTermUserTheme)
fastify.post("/user/progress/update",userController.getUserProgress)
fastify.post("/user/ads/checkLimitAds",userController.adsViewTermCheck)
fastify.post("/user/ads/checkTwoHoursLimit",userController.adsViewCheckLimit)
fastify.post("/user/adsTerm/get",userController.userSendAdsTerm)
fastify.get("/user/resetPassword/getCheckMethod",userController.getCheckMethodResetUser)
fastify.post("/user/resetPassword/checkText",userController.checkTextResetUserPass)
fastify.post("/user/resetPassword/checkDate",userController.checkDateResetUserPass)
fastify.post("/user/resetPassword/resetPassword",userController.resetPassword)
fastify.post("/user/resetPassword/sendText",userController.getTextUserResetMethod)
fastify.post("/user/resetPassword/sendDate",userController.getDateUserResetMethod)



fastify.get("/user/adsTerm/delete",userController.userDeleteAdsTerm)
fastify.get("/currentTime/time/get",timerController.getCurrentTimeBeta)






// fastify.register(userRouter)
// fastify.use(fastify.json())
// fastify.register((fastify,opts,done)=>{
//     fastify.use("/user",userRouter)
//     fastify.use("/course",courseRouter)
//     done()
// })
// fastify.register(userRouter,{prefix:'/user'})
// fastify.register(courseRouter,{prefix:'/course'})

// app.use(express.json())
// app.use(express.urlencoded({extended:false}))
// app.use("/user",userRouter)
// app.use("/course",courseRouter)

// app.listen(PORT,()=>{
//     console.log(`server start to post ${PORT}`)
// })

const PORT = process.env.PORT || 8080



fastify.listen({port:PORT}, (error) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    console.log(`Сервер слушает по адресу `);
});


