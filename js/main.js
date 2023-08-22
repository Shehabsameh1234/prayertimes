async function PrayerTimes(){

    let myUrl= await fetch("https://api.aladhan.com/v1/timingsByCity/today?city=liverpool&country=england&method=5").catch(error=>console.log(error))
    let data=await myUrl.json()
    console.log(data.data.timings.Fajr);

}

PrayerTimes()


