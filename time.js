const sendBtn = document.getElementById("send");
const namaz_time = document.getElementById("namaz_time");
const city = document.querySelector(".city");

const fajr_time = document.querySelector(".fajr");
const voshod_time = document.querySelector(".voshod");
const zuhr_time = document.querySelector(".zuhr");
const asr_time = document.querySelector(".asr");
const magrib_time = document.querySelector(".magrib");
const zakat_time = document.querySelector(".zakat");
const isha_time = document.querySelector(".isha");

const date_1 = document.querySelector(".date_1");
const date_2 = document.querySelector(".date_2");
const date_3 = document.querySelector(".date_3");

const hijri_1 = document.querySelector(".hij_1");
const hijri_2 = document.querySelector(".hij_2");
const hijri_3 = document.querySelector(".hij_3");

const weather_city = document.querySelector(".weather_city");
const weather_temp = document.querySelector(".weather_temp");
const weather_condition = document.querySelector(".weather_condition");
const local_time = document.querySelector(".local_time");


let namaz = (e) => {
    e.preventDefault();
    
    let cityValue = document.getElementById("city").value;
    let date = new Date(2022, 4, 25, 13, 30);

    //! LOCAL STORAGE OF PRAY TIMES
    fajr_time.append( JSON.parse(localStorage.getItem("fajr")))
    voshod_time.append( JSON.parse(localStorage.getItem("voshod")))
    zuhr_time.append( JSON.parse(localStorage.getItem("zuhr")))
    asr_time.append( JSON.parse(localStorage.getItem("asr")))
    magrib_time.append( JSON.parse(localStorage.getItem("magrib")))
    zakat_time.append( JSON.parse(localStorage.getItem("zakat")))
    isha_time.append( JSON.parse(localStorage.getItem("isha")))

    //! LOCAL STORAGE OF DATE
    date_1.append(JSON.parse(localStorage.getItem("gr_date")))
    date_2.append(JSON.parse(localStorage.getItem("gr_month")))
    date_2.append(JSON.parse(localStorage.getItem("gr_day")))
    date_3.append(JSON.parse(localStorage.getItem("gr_week")))

    hijri_1.append(JSON.parse(localStorage.getItem("hijri_date")))
    hijri_2.append(JSON.parse(localStorage.getItem("hijri_month")))
    hijri_2.append(JSON.parse(localStorage.getItem("hijri_day")))
    hijri_3.append(JSON.parse(localStorage.getItem("hijri_week")))

    if (city.value === "") {
        console.log("ВВЕДИТЕ ГОРОД");
        return false
    } else {
        let url = `https://api.aladhan.com/v1/timingsByCity/${date.getDate}-${date.getMonth}-${date.getFullYear}?city=${cityValue}&country=&method=3`;
        city.value = "";

        fajr_time.innerHTML = "";
        voshod_time.innerHTML = "";
        zuhr_time.innerHTML = "";
        asr_time.innerHTML = "";
        magrib_time.innerHTML = "";
        zakat_time.innerHTML = "";
        isha_time.innerHTML = "";
        

        date_1.innerHTML = "";
        date_2.innerHTML = "";
        date_3.innerHTML = "";

        hijri_1.innerHTML = "";
        hijri_2.innerHTML = "";
        hijri_3.innerHTML = "";

        hijri_1.classList.toggle("gr_date");
        hijri_2.classList.toggle("gr_date");
        hijri_3.classList.toggle("gr_date");

        date_1.classList.toggle("gr_date");
        date_2.classList.toggle("gr_date");
        date_3.classList.toggle("gr_date");

        fetch(url)
            .then((response) => response.json())
            .then((v1) => {
                console.log(v1);

                fajr_time.append(v1.data.timings.Fajr);
                voshod_time.append(v1.data.timings.Sunrise);
                zuhr_time.append(v1.data.timings.Dhuhr);
                asr_time.append(v1.data.timings.Asr);
                magrib_time.append(v1.data.timings.Maghrib);
                zakat_time.append(v1.data.timings.Sunset);
                isha_time.append(v1.data.timings.Isha);

                localStorage.setItem("fajr", JSON.stringify(v1.data.timings.Fajr))
                localStorage.setItem("voshod", JSON.stringify(v1.data.timings.Sunrise))
                localStorage.setItem("zuhr", JSON.stringify(v1.data.timings.Dhuhr))
                localStorage.setItem("asr", JSON.stringify(v1.data.timings.Asr))
                localStorage.setItem("magrib", JSON.stringify(v1.data.timings.Maghrib))
                localStorage.setItem("zakat", JSON.stringify(v1.data.timings.Sunset))
                localStorage.setItem("isha", JSON.stringify(v1.data.timings.Isha))

                date_1.append(v1.data.date.gregorian.date + "  ");
                date_2.append(v1.data.date.gregorian.month.en + "-");
                date_2.append(v1.data.date.gregorian.day + "  ");
                date_3.append(v1.data.date.gregorian.weekday.en);
                
                localStorage.setItem("gr_date", JSON.stringify(v1.data.date.gregorian.date))
                localStorage.setItem("gr_month", JSON.stringify(v1.data.date.gregorian.month.en + "-"))
                localStorage.setItem("gr_day", JSON.stringify(v1.data.date.gregorian.day))
                localStorage.setItem("gr_week", JSON.stringify(v1.data.date.gregorian.weekday.en))

                date_1.classList.toggle("gr_date");
                date_2.classList.toggle("gr_date");
                date_3.classList.toggle("gr_date");

                hijri_1.append(v1.data.date.hijri.date + "");
                hijri_2.append(v1.data.date.hijri.month.en + "-");
                hijri_2.append(v1.data.date.hijri.day + "");
                hijri_3.append(v1.data.date.hijri.weekday.en);
                localStorage.setItem("hijri_date", JSON.stringify(v1.data.date.hijri.date))
                localStorage.setItem("hijri_month", JSON.stringify(v1.data.date.hijri.month.en + "-"))
                localStorage.setItem("hijri_day", JSON.stringify(v1.data.date.hijri.day))
                localStorage.setItem("hijri_week", JSON.stringify(v1.data.date.hijri.weekday.en))


                hijri_1.classList.toggle("gr_date");
                hijri_2.classList.toggle("gr_date");
                hijri_3.classList.toggle("gr_date");
            })
            .catch((err) => console.error(err));
    }


    /* =========================WEATHER API=============================== */

    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key":
                "67ca77570amshd3344abea452451p19bb81jsnb6979ef7184f",
            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
    };


        //! WEATHER LOCAL STORAGE
        // weather_city.append(JSON.parse(localStorage.getItem("weather_city")))
        local_time.append(JSON.parse(localStorage.getItem("local_time")))
        weather_temp.append(JSON.parse(localStorage.getItem("temp")))
        weather_condition.append(JSON.parse(localStorage.getItem("condition")))

        
        let weather_url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${cityValue}`
    
        weather_city.innerHTML = ''
        local_time.innerHTML = "";
        weather_temp.innerHTML = "";
        weather_condition.innerHTML = "";

    fetch(weather_url,  options)

        .then((response) => response.json())
        .then((current) => {
 
            weather_city.append(current.location.name);
            local_time.append(current.location.localtime);
            weather_temp.append(current.current.temp_c + String.fromCodePoint(8451));
            weather_condition.append(current.current.condition.text);

            localStorage.setItem("weather_city", JSON.stringify(current.location.name))
            localStorage.setItem("local_time", JSON.stringify(current.location.localtime))
            localStorage.setItem("temp", JSON.stringify(current.current.temp_c + String.fromCodePoint(8451)))
            localStorage.setItem("condition", JSON.stringify(current.current.condition.text))

        })
        .catch((err) => console.error(err));

    /* =========================WEATHER API=============================== */



};
window.addEventListener("load", namaz);
sendBtn.addEventListener("click", namaz);
