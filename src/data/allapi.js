export const BASE_URL="https://sikshartbackend2-0.onrender.com/api"

export const auth={
    register:"/auth/signup",
    verifyOtp:"/auth/verifyotp",
    resendotp:"/auth/resendotp",
    login:"/auth/login",
    forgotpassword:"/auth/forgotpassword",
    resetpassword:"/auth/resetpassword",
    forgotpasswordotpverify:"/auth/verifyforgotpasswordotp",
    getcalltoactions:"/public/getallcalltoactions",
    getallbenefits:"/public/getallcards",
    getallfaqs:"/public/getallfaqs",
    getallhackathon:"/public/getallhackathons",
    getsinglehackathon:"/public/gethackathonbyid/",
    hackathonregistration:"/public/applyforhackathon",
    createhakathoncontact:"/public/createhackathoncontact",
    getmdeia:"/public/getallmedia",
    USER_AUTHORIZATION_FOR_PROFILE:"/auth/profile"
    
}