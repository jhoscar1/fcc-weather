var units = 'imperial';
var apiCall = '';

var getLocation = function(data) {
  var city = data.city;
  var region = data.region;
  var lat = data.lat;
  var lon = data.lon;
  if (data.country != 'United States') {
    units = 'metric';
  }
  apiCall = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=b08e653b14da4861659e1fd22323306c' + '&units=';
  $.getJSON(apiCall + units, getWeather, 'jsonp');
}

var getWeather = function(data) {
  var system = units === 'imperial' ? 'F' : 'C';
  var sysRep = "<a href='#' id='ForC'>" + system + "</a>";
  var city = data.name;
  var temp = Math.round(data.main.temp);
  var sky = data.weather[0].main;
  $("#location").html(data.name + "'s weather today is: ");
  $("#weather").html("<span id='temperature'>" + temp + "</span>" + '&deg' + sysRep);
  getIcon(temp, sky);
  changeUnit(temp, sky);
} 

function changeUnit(temp, sky) {
  $('#ForC').on('click', function() {
     var temperatureSystem = '';
     if (units == 'imperial') {
       temp = Math.round((temp - 32) * (5/9));
       temperatureSystem = 'C';
       units = 'metric';
    }
    else {
      temp = Math.round(temp * (9/5) + 32);
      temperatureSystem = 'F';
      units = 'imperial';
    }
    $(this).html(temperatureSystem);
    $('#temperature').html(temp);
  });
}

function getIcon(temperature, sky) {
  var icon = $(".wi");
  if (units == 'imperial') {
    if (temperature < 0 && sky == 'Clear') {
      icon.addClass('wi-thermometer-exterior');
    }
    else if (temperature > 90 && sky == 'Clear') {
      icon.addClass('wi-hot');
    }
  }
  else {
    if (temperature < -18 && sky == 'Clear') {
      icon.addClass('wi-thermometer-exterior');
    }
    if (temperature > 32 && sky == 'Clear') {
      icon.addClass('wi-hot');
    }
  }
  if (sky != 'Clear') {
    switch(sky) {
      case 'Clouds':
        icon.addClass('wi-day-cloudy');
        break;
      case 'Rain':
        icon.addClass('wi-showers');
        break;
      case 'Snow':
        icon.addClass('wi-snowflake-cold');
        break;
      case 'Thunderstorm':
        icon.addClass('wi-storm-showers');
        break;
    } 
  }
}

$(document).ready(function() {
  $.getJSON('http://ip-api.com/json', getLocation, 'jsonp');
  $.getJSON(apiCall, getWeather, 'jsonp');
});