// global var
let maincity=document.getElementById("city-main")
let dateToday=document.getElementById("date-today")
let cuttentTime=document.getElementById("current-time")
let nextPrayerText=document.getElementById("next-prayer-text")
let nextPrayerName=document.getElementById("next-prayer-name")
let remainingTimeText=document.getElementById("remainig-time-text")
let remainingTime=document.getElementById("remainig-time")
let fajrTime=document.getElementById("fajr-time")
let sunriseTime=document.getElementById("sunrise-time")
let dhuhrTime=document.getElementById("dhuhr-time")
let asrTime=document.getElementById("asr-time")
let ishaTime=document.getElementById("isha-time")
let inputCountry=document.getElementById("input-country")
let btn=document.getElementById("button")
// global var



// get current time
let today=new Date()
let todaySeconds =today.getSeconds();
let todayHours =today.getHours();
let todayMins=today.getMinutes();
function timeNow(){
   cuttentTime.innerHTML=  Date().slice(16,24);
}
setInterval(timeNow,1000)
// get current time

 





// my request
async function PrayerTimes(city="cairo",country="egypt"){
    let myUrl= await fetch(`https://api.aladhan.com/v1/timingsByCity/today?city=${city}&country=${country}&method=5`).catch(error=>console.log(error))
    let data=await myUrl.json()
let asrPrayer=data.data.timings.Asr


  

// put data in document
    dateToday.innerHTML= data.data.date.gregorian.weekday.en+" "+data.data.date.gregorian.date
    maincity.innerHTML=city



}
PrayerTimes()
// my request
















