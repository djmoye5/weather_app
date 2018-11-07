//select our elements and create variables
API_KEY = "b09c46f4810f6350f813498e89ca5ef4";
var ROOT_URL ="http://api.openweathermap.org/data/2.5/weather?zip=";
// select the elements cityTitle, zip input bar, weather div, img with class icon, span with class temp, span with class humid, select the cpan with the class deg
var cityTitle = document.querySelector(".city_title");
var zip = document.querySelector(".zip");
var weather = document.querySelector(".weather");
var icon = document.querySelector(".icon");
var temp = document.querySelector(".temp");
var humid = document.querySelector(".humid");
var deg = document.querySelector(".deg");
var convert = document.querySelector(".convert");
var kelvin;
var icons = {
    "Snow": "img/snow.png",
    "Clouds": "img/cloudy.png",
    "Rain": "img/rain.png",
    "Partly Cloudy": "img/partly-cloudy.png",
    "Thunderstorms": "img/thunderstorm.png",
    "Clear": "img/sun.png" 
}
// define functions
//   convert kelvin to farenheit
function KtoF(kelvin){
//   console.log("Converting to Farenheit")
  return Math.round ((kelvin -273.15) * 1.8 + 32);

} 
function KtoC(kelvin){
//   convert kelvin to celsius
  return Math.round(kelvin - 273.15);
} 
function getWeather(zipCode){
    // console.log("Getting Weather");
    // "http://api.openweathermap.org/data/2.5/weather?zip=11111,us
    fetch(`${ROOT_URL}${zipCode},us&appid=${API_KEY}`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
      console.log(data);
      cityTitle.textContent = data.name;
      weather.textContent = data.weather[0].main
      humid.textContent = data.main.humidity;
      kelvin = data.main.temp;
      temp.textContent = KtoF(kelvin);
      icon.src = icons[data.weather[0].main]; 
    })
    .catch(function(error){
        console.log("There was an error");
    })
}

// call functions and add event listeners
zip.addEventListener("keypress", function(event){
  // console.log(event);
  if(event.key == "Enter"){
    //   console.log("Hit enter");
    getWeather(zip.value);
  }
});

convert.addEventListener("click", function(){
  //   console.log("Ready to convert");
  if(convert.textContent == "Convert to C"){
    temp.textContent = KtoC(kelvin);
  // change the degree textContent to &deg; C using innerHTML
    deg.innerHTML = '&deg; C';
  // change the textContent of the button to Convert to F
    convert.textContent = "Convert to F";
  } else {
      temp.textContent = KtoF(kelvin);
      deg.innerHTML = '&deg; F';
      convert.textContent = "Convert to C";
  }
})

getWeather('33144');
  