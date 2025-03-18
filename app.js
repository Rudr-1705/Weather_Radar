const BASE_URL_weather = `http://api.weatherapi.com/v1/current.json?key=e7abc30223c54bb2ac9140254251503&q=`
const BASE_URL_image = `https://api.unsplash.com/search/photos?per_page=1&client_id=zb6rCIOXddELXsNMgcVSmW5lY5ZUPcntipJ_41nKm2k&query=`

let place_field = document.querySelector(".container input");
const latitude = document.querySelector(".lat p");
const longitude = document.querySelector(".lon p");
const last_updated = document.querySelector(".last_updated p");
const time = document.querySelector(".ans_field_time");
const condition_text = document.querySelector(".ans_field_condition .text_condition");
const condition_icon = document.querySelector(".ans_field_condition .condition-icon");
const temp = document.querySelector(".ans_field_temp");
const feels = document.querySelector(".ans_field_feels");
const humidity = document.querySelector(".ans_field_humidity");
const precipitation = document.querySelector(".ans_field_precipitation");
const windspeed = document.querySelector(".ans_field_wind-mph");
const win_dir = document.querySelector(".ans_field_wind-dir");
const btn1 = document.querySelectorAll(".temp_tab .scale-select input");
const btn2 = document.querySelectorAll(".feels_tab .scale-select input");
const submit_btn = document.querySelector(".submit");

let temp_c = "";
let temp_f = "";
let feels_f = "";
let feels_c = "";

const updateInfo = async () => {
    let place = place_field.value.toLowerCase().trim();
    let true_place = "";
    for (let i = 0; i < place.length; i++) {
        if ((place[i] >= 'a' && place[i] <= 'z') || (place[i] === ' ')) {
            true_place += (place[i] === ' ') ? "%20" : place[i];
        } else {
            true_place = "new%20delhi"
            document.querySelector(".container input").value = "New Delhi"
            break;
        }
    }
    place = true_place;
    let URL_weather = `${BASE_URL_weather}${place}`;
    let response = await fetch(URL_weather);
    let data = await response.json();
    condition_text.innerText = `${data.current.condition.text}`;
    condition_icon.style.backgroundImage = `url(${data.current.condition.icon})`
    humidity.innerText = `${data.current.humidity}`;
    precipitation.innerText = `${data.current.precip_mm}`;
    humidity.innerText = `${data.current.humidity}`;
    last_updated.innerText = `${data.current.last_updated}`;
    windspeed.innerText = `${data.current.wind_mph}`;
    win_dir.innerText = `${data.current.wind_degree}° ${data.current.wind_dir}`
    latitude.innerText = `${data.location.lat}°`;
    longitude.innerText = `${data.location.lon}°`;
    time.innerText = `${data.location.localtime}`;
    temp.innerText = `${data.current.temp_c}`;
    feels.innerText = `${data.current.feelslike_c}`;

    temp_c = `${data.current.temp_c}`
    temp_f = `${data.current.temp_f}`
    feels_f = `${data.current.feelslike_f}`
    feels_c = `${data.current.feelslike_c}`

    console.log(data);
}

const updateBackground = async () => {
    let place = place_field.value.toLowerCase().trim();
    let true_place = "";
    for (let i = 0; i < place.length; i++) {
        if ((place[i] >= 'a' && place[i] <= 'z') || (place[i] === ' ')) {
            true_place += (place[i] === ' ') ? "%20" : place[i];
        } else {
            true_place = "new%20delhi"
            document.querySelector(".container input").value = "New Delhi"
            break;
        }
    }
    place = true_place;
    let URL_background = `${BASE_URL_image}${place};`
    let response = await fetch(URL_background);
    let data = await response.json();
    document.body.style.backgroundImage = `url(${data.results[0].urls.raw})`
}

btn1.forEach((radio) => {
    radio.addEventListener("change", () => {
        if (radio.value === "Far")
            temp.innerText = `${temp_f}`
        else
            temp.innerText = `${temp_c}`
    })
})

btn2.forEach((radio) => {
    radio.addEventListener("change", () => {
        if (radio.value === "Far")
            feels.innerText = `${feels_f}`
        else
            feels.innerText = `${feels_c}`
    })
})

window.addEventListener("load", async () => {
    document.querySelector(".loader").style.visibility = 'visible';
    document.querySelector(".blurscreen").style.visibility = 'visible';
    await updateInfo();
    await updateBackground();
    document.querySelector(".loader").style.visibility = 'hidden';
    document.querySelector(".blurscreen").style.visibility = 'hidden';
})

submit_btn.addEventListener("click", async () => {
    document.querySelector(".loader").style.visibility = 'visible';
    document.querySelector(".blurscreen").style.visibility = 'visible';
    await updateInfo();
    await updateBackground();
    document.querySelector(".loader").style.visibility = 'hidden';
    document.querySelector(".blurscreen").style.visibility = 'hidden';
})

document.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        document.querySelector(".loader").style.visibility = 'visible';
        document.querySelector(".blurscreen").style.visibility = 'visible';
        await updateInfo();
        await updateBackground();
        document.querySelector(".loader").style.visibility = 'hidden';
        document.querySelector(".blurscreen").style.visibility = 'hidden';
    }
})