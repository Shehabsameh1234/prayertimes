// global var
let maincity = document.getElementById("city-main")
let dateToday = document.getElementById("date-today")
let currentTime = document.getElementById("current-time")
let nextPrayerText = document.getElementById("next-prayer-text")
let nextPrayerName = document.getElementById("next-prayer-name")
let remainingTimeText = document.getElementById("remainig-time-text")
let remainingTime = document.getElementById("remainig-time")
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







// my request
async function PrayerTimes(city = "cairo", country = "egypt") {
    let myUrl = await fetch(`https://api.aladhan.com/v1/timingsByCity/today?city=${city}&country=${country}&fbclid=IwAR0D1g0U7gW-2c24FU7N7mrGfGbKW-Cp20_mzy7Mk9xIygxmshzQ4fn_pcU`).catch(error => console.log(error))
    let data = await myUrl.json()

    console.log(data);









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



















