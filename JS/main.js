

//& Current day variables
let dayName = document.getElementById('dayName');
let currentMonth=document.getElementById('currentMonth');
let currendate=document.getElementById('currendate');
let updatedlocation=document.getElementById('updatedlocation');
let curentTemp= document.getElementById('curentTemp');
let weatherInfo=document.getElementById('weatherInfo');
let todayImg=document.getElementById('todayImg');
let humidity=document.getElementById('humidity');
let wind=document.getElementById('wind');
let directionWind=document.getElementById('directionWind');

//& tomorrow variables
let tomorrowName =document.getElementById('tomorrowName');
let tomImg=document.getElementById('tomImg');
let tomorrowTemp=document.getElementById('tomorrowTemp');
let weatherInfoTom=document.getElementById('weatherInfoTom');



//& After tomorrow variables
let afterTomorrowName =document.getElementById('afterTomorrowName');
let afterTomImg=document.getElementById('afterTomImg');
let afterTomorrowTemp=document.getElementById('afterTomorrowTemp');
let weatherInfoAfter=document.getElementById('weatherInfoAfter');

//& search vaiables
let searchBar=document.getElementById('searchBar');
let findResult=document.getElementById('findResult');

let inputValue = "";




// Geolocation 

navigator.geolocation.getCurrentPosition(  (position)=>{

  // console.log(position.coords)

  let myLatitude =position.coords.latitude;

  let myLongitude = position.coords.longitude;
  getWeather(`${myLatitude},${myLongitude}`)
// 
}
   
)

searchBar.addEventListener('input' ,function(e){
  let inputValue= e.target.value;
  inputValue = e.target.value.trim();


})




//! I tried to put it add button but didn't work
// findResult.addEventListener('click' ,function(){

//   getWeather(inputValue);



// })


searchBar.addEventListener('input' ,function(e){
  let inputValue= e.target.value;

  getWeather(inputValue)

})


async function getWeather(term){
  let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=221529b9ef734e50bcb95519241712&q=${term}&days=3&aqi=no&alerts=no`)
  let data = await response.json();

  console.log(data);

  displayWeatherData(data);

  nextDay(data);

  afterTomoData(data)
}


function displayWeatherData(data){
let todayDate = data.current.last_updated   // data.current ====>last_updated  
console.log(todayDate)

let myDateName = new Date(todayDate) //*  object Date(date) method => ex: date 17-12-2024 

let todayName =myDateName.toLocaleString('en-us' , {weekday:'long'})  // get day  ==> object helper
dayName.innerHTML=todayName;

let weatherMonth =myDateName.toLocaleString('en-us' , {month:'long'}) // get month  ==> object helper
currentMonth.innerHTML=weatherMonth;

let dateMonth =myDateName.getDate();
currendate.innerHTML=dateMonth  // get number such as: 17    ==> object helper


updatedlocation.innerHTML = data.location.country;   // data.location ====> country 

curentTemp.innerHTML=data.current.temp_c;

weatherInfo.innerHTML=data.current.condition.text


let currentImg= data.current.condition.icon
let srcImg =`https:${currentImg}`   //* don't forget https because HTML SIDE

todayImg.setAttribute('src' , srcImg)  //* Img sytanx[     setAttribute('src' , srcImg)       ]

humidity.innerHTML = data.current.humidity
wind.innerHTML = data.current.wind_kph
directionWind.innerHTML = data.current.wind_dir

}


function nextDay(data){
  let forcastDay = data.forecast.forecastday[1]
  console.log(forcastDay.date)

  let tomDay = new Date(forcastDay.date) //*  object Date(date) method => ex: date 17-12-2024 

  let forcastTomo =tomDay.toLocaleString('en-us' , {weekday:'long'}) ; // get day  ==> object helper
  tomorrowName.innerHTML = forcastTomo

  let currentImgTom= forcastDay.day.condition.icon;
  let tomSrcImg =`https:${currentImgTom}`   //* don't forget https because HTML SIDE
  tomImg.setAttribute('src' , tomSrcImg) 

  tomorrowTemp.innerHTML=forcastDay.day.maxtemp_c;

  weatherInfoTom.innerHTML=forcastDay.day.condition.text;


}


function afterTomoData(data){
  let forcastDay = data.forecast.forecastday[2]
  console.log(forcastDay.date)

  let tomDay = new Date(forcastDay.date) //*  object Date(date) method => ex: date 17-12-2024 

  let forcastTomo =tomDay.toLocaleString('en-us' , {weekday:'long'}) ; // get day  ==> object helper
  afterTomorrowName.innerHTML = forcastTomo

  let currentImgTom= forcastDay.day.condition.icon;
  let tomSrcImg =`https:${currentImgTom}`   //* don't forget https because HTML SIDE
  afterTomImg.setAttribute('src' , tomSrcImg) 

  afterTomorrowTemp.innerHTML=forcastDay.day.maxtemp_c;

  weatherInfoAfter.innerHTML=forcastDay.day.condition.text;


}