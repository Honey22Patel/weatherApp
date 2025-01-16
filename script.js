$(document).ready(function () {
  checkWeather(city);

  $("#search").on("click", function () {
    city = $("#city").val().trim();
    console.log(city);
    checkWeather(city);
    $('#farenheit').removeAttr('disabled').css('color', '#949494');
    $("#celcius").attr('disabled','disabled').css('color', '#3f3f3f');
  });
  // C TO F
  $("#celcius").on("click", function () {
    temp = $(".temperature").text().trim();
    let celcius = (temp - 32) * 5/9 ;
    $(".temperature").html(Math.round(celcius));
    $(this).attr('disabled','disabled').css('color', '#3f3f3f');
    $("#farenheit").removeAttr('disabled').css('color', '#949494');
  });
  // F TO C
  $("#farenheit").on("click", function () {
    temp = $(".temperature").text().trim();
    let farenheit = (temp * 9) / 5 + 32;
    $(".temperature").html(Math.round(farenheit));
    $(this).attr('disabled','disabled').css('color', '#3f3f3f');
    $("#celcius").removeAttr('disabled').css('color', '#949494');
  });
  
});

let temp = null;
let city = "ahmedabad";
let apiKey = "f197477d651230b4ef1754e654d4ac4f";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
// search.addEventListner('click', function () {
//   var search = document.getElementById("#search");
//   console.log("click");
// });
// $("#search").onclick = function () {
//   console.log("click");
// };


function checkWeather(city) {
  $.ajax({
    type: "GET",
    url: apiUrl + "&q=" + city + "&appid=" + apiKey,
    success: function (data) {
      $(".city-name").html(data.name + ", " + data.sys.country);
      setImage(data.weather[0].main);
      $(".temperature").html(Math.round(data.main.temp));
      $(".description").html(data.weather[0].main);
      $(".humidity-level").html(data.main.humidity + " %");
      $(".wind-speed").html(data.wind.speed + " km/h");
      $("#city").val("");
      $('.date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));

      let tzMinutes = data.timezone / 60;
      let localTime = data.dt - tzMinutes;
      let formattedData = moment.unix(localTime).format('dddd, MMMM Do YYYY, h:mm:ss A');
      console.log(formattedData);

      // let tzSeconds = data.timezone;
      // let tzMinutes = tzSeconds / 60;
      // console.log(tzMinutes);
      // let timezoneName  = getTimezoneName(tzMinutes);
      
      // function getTimezoneName(tzMinutes){
      //   let timezone = moment.tz.names().find((zone)=>{
      //     return moment.tz(zone).utcOffset() === tzMinutes;
      //   })
      //   return timezone || 'unknown';
      // }
      // console.log(timezoneName);

      // const date = moment.unix(data.dt).format("MM/DD/YYYY HH:mm:ss");
      // console.log(date);
      // const dateNum = moment.unix(data.dt);
      // let x = dateNum._i;
      // console.log(x);
      // console.log(dateNum._i);
      // let y = data.timezone / 60;
      // console.log(y);
      // let local = x / y;
      // console.log(local);
      // console.log(moment.unix(local).format("DD/MM/YYYY HH:mm:ss"));

      // $('.date').html(formattedData);

    },
  });
}

function setImage(data) {
  switch (data) {
    case "Mist":
      $("#temperature-img").prop("src", "images/mist.png");
      break;
    case "Clouds":
      $("#temperature-img").attr("src", "images/clouds.png");
      break;
    case "Fog":
      $("#temperature-img").attr("src", "images/fog.png");
      break;
    case "Haze":
      $("#temperature-img").attr("src", "images/haze.png");
      break;
    case "Rain":
      $("#temperature-img").attr("src", "images/rain.png");
      break;
    case "Smoke":
      $("#temperature-img").attr("src", "images/smoke.png");
      break;
    case "Snow":
      $("#temperature-img").attr("src", "images/snow.png");
      break;
    case "Haze":
      $("#temperature-img").attr("src", "images/haze.png");
      break;
    default:
      $("#temperature-img").attr("src", "images/clear.png");
      break;
  }
}

