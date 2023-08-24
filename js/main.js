// global var
let maincity = document.getElementById("city-main")
let dateToday = document.getElementById("date-today")
let currentTime = document.getElementById("current-time")
let nextPrayerName = document.getElementById("next-prayer-name")
let remainingTime = document.getElementById("remaining-time")
let fajrTime = document.getElementById("fajr-time")
let sunriseTime = document.getElementById("sunrise-time")
let dhuhrTime = document.getElementById("dhuhr-time")
let asrTime = document.getElementById("asr-time")
let maghribTime = document.getElementById("maghrib-time")
let ishaTime = document.getElementById("isha-time")
let inputCity = document.getElementById("input-city")
let inputCountry = document.getElementById("input-country")
let btn = document.getElementById("button")

// global var



// get current time
function timeNow() {
    let date = new Date();
    let formattedTime = date.toLocaleTimeString({ hour12: true });;
    currentTime.innerHTML = formattedTime
}
setInterval(timeNow, 1000)
// get current time


// get date of today
let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();
let todayDate = `${month}-${day}-${year}`
// get date of today




// my request
async function PrayerTimes(city = "cairo", country = "egypt") {
    let myUrl = await fetch(`https://api.aladhan.com/v1/timingsByCity/today?city=${city}&country=${country}&fbclid=IwAR0D1g0U7gW-2c24FU7N7mrGfGbKW-Cp20_mzy7Mk9xIygxmshzQ4fn_pcU`).catch(error => console.log(error))
    let data = await myUrl.json()


















    // put data in document
    dateToday.innerHTML = data.data.date.gregorian.weekday.en + " " + data.data.date.gregorian.date
    maincity.innerHTML = city


    // fajr prayer time
    let fajrPrayer = data.data.timings.Fajr
    fajrTime.innerHTML = fajrPrayer + " AM"

    // sunrise  time
    let sunrisePrayer = data.data.timings.Sunrise
    sunriseTime.innerHTML = sunrisePrayer + " AM"

    // dhuhr prayer time
    let dhuhrPrayer = data.data.timings.Dhuhr
    let dhuhrFormatTime = dhuhrPrayer.slice(0, 2)
    if (dhuhrFormatTime != 12) {
        dhuhrTime.innerHTML = dhuhrPrayer + " AM"
    } else {
        dhuhrTime.innerHTML = dhuhrPrayer + " PM"
    } if (dhuhrFormatTime > 12) {
        dhuhrFormatTime = dhuhrPrayer.slice(0, 2) - 12
        dhuhrTime.innerHTML = dhuhrFormatTime + dhuhrPrayer.slice(2, 5) + " PM"
    }

    // asr prayer time
    let asrPrayer = data.data.timings.Asr
    let asrFormatTime = asrPrayer.slice(0, 2) - 12
    asrTime.innerHTML = asrFormatTime + asrPrayer.slice(2, 5) + " PM"


    // maghrib prayer time
    let maghribPrayer = data.data.timings.Maghrib
    let maghribFormatTime = maghribPrayer.slice(0, 2) - 12
    maghribTime.innerHTML = maghribFormatTime + maghribPrayer.slice(2, 5) + " PM"

    // isha prayer time
    let ishaPrayer = data.data.timings.Isha
    let ishaFormatTime = ishaPrayer.slice(0, 2) - 12
    ishaTime.innerHTML = ishaFormatTime + ishaPrayer.slice(2, 5) + " PM"



// send prayers time to localstorage to use it again

    localStorage.setItem("fajrPrayerTime",fajrPrayer)
    localStorage.setItem("dhuhrPrayerTime",dhuhrPrayer)
    localStorage.setItem("asrPrayerTime",asrPrayer)
    localStorage.setItem("maghribPrayerTime",maghribPrayer)
    localStorage.setItem("ishaPrayerTime",ishaPrayer)
// send prayers time to localstorage to use it again









}
PrayerTimes()
// my request




// click on the button to get the city times
btn.addEventListener("click", function () {
    if (inputCity.value != "") {
        let city = inputCity.value
        let country = inputCountry.value
        PrayerTimes(city, country)
    }
})
// click on the button to get the city times











 let fajrPrayer= localStorage.getItem("fajrPrayerTime")
 let dhuhrPrayer= localStorage.getItem("dhuhrPrayerTime")
 let asrPrayer= localStorage.getItem("asrPrayerTime")






    function setNextPrayer() {
        let end = new Date(`${todayDate} ${fajrPrayer + ":" + "00"}`);
        let second = 1000;
        let minute = second * 60;
        let hour = minute * 60;
        let day = hour * 24;
        let now = new Date();
        var distanceFajr = end - now;
        let hours = Math.floor((distanceFajr % day) / hour)
        let mins = Math.floor((distanceFajr % hour) / minute)
        if (mins < 10) { mins = "0" + mins }
        let seconds = Math.floor((distanceFajr % minute) / second)
        nextPrayerName.innerHTML = "Fajr"
        remainingTime.innerHTML = hours + ":" + mins + ":" + seconds
        if (distanceFajr <= 0) {
            let end = new Date(`${todayDate} ${dhuhrPrayer + ":" + "00"}`);
            var distancedhuhr = end - now;
            let hours = Math.floor((distancedhuhr % day) / hour)
            let mins = Math.floor((distancedhuhr % hour) / minute)
            if (mins < 10) { mins = "0" + mins }
            let seconds = Math.floor((distancedhuhr % minute) / second)
            nextPrayerName.innerHTML = "Dhuhr"
            remainingTime.innerHTML = hours + ":" + mins + ":" + seconds

        }
        if (distancedhuhr <= 0) {
            let end = new Date(`${todayDate} ${asrPrayer + ":" + "00"}`);
            var distancedhuhr = end - now;
            let hours = Math.floor((distancedhuhr % day) / hour)
            let mins = Math.floor((distancedhuhr % hour) / minute)
            if (mins < 10) { mins = "0" + mins }
            let seconds = Math.floor((distancedhuhr % minute) / second)
            nextPrayerName.innerHTML = "asr"
            remainingTime.innerHTML = hours + ":" + mins + ":" + seconds
     
        }

    }

    setInterval(setNextPrayer,1000)









