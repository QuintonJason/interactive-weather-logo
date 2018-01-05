

/***************WEATHER INFO**************/
const suffix = '?client_id=' + keys.client_id + '&client_secret=' + keys.client_secret +''// let loc = '70816'
const gapiKey = keys.gapiKey;
const weatherSubmit = document.getElementById('weather-submit');

let weatherLocation = '70816';

weatherSubmit.addEventListener('click', () => {
  init();
  const weatherInput = document.getElementById('weather-input').value;
  if (weatherInput != '') {
    weatherLocation = weatherInput;
  }
  const mapCanvas = document.getElementById('map-canvas');
  mapCanvas.innerHTML = '';
  getWeatherInfo(weatherLocation);
  getRadarInfo(weatherLocation);
  weatherInput.value = '';

});

var getWeatherInfo = (loc) => {
  const weatherInfo = document.getElementById('weather-info');

  $(function(){
    $.ajax({  
      url : "http://api.aerisapi.com/observations/" + weatherLocation + suffix,
      dataType : "jsonp",
      success : function(parsed_json) {
        // console.log('parsed_json', parsed_json);
        var location = parsed_json.response['place']['name'];
        var temp_f = parsed_json.response['ob']['tempF'];
        var icon = parsed_json.response['ob']['icon'];
        var weather = parsed_json.response['ob']['weather'];
        var clear = icon.indexOf('clear') || icon.indexOf('sunny');
        var cloudy = icon.indexOf('cloudy');
        console.log('cloudy', cloudy);
        var rain = icon.indexOf('rain');
        var tstorm = icon.indexOf('tstorm');
        var unknown = icon.indexOf('unknown');

        weatherInfo.innerHTML = '';
        weatherInfo.append(`Current temperature in ${location} is: ${temp_f}. Estimate forecast ${weather}.`);

        if (clear > 0) {
          $('h1.brand').removeClass('hide');
        } else if (tstorm > -1 || unknown > -1) {
          $('path[id^="Drop"],path[id^="Spark"]').removeClass('hide');
          $('#cloud').addClass('dark');
        } else if (rain > -1) {
          $('path[id^="Drop"]').removeClass('hide');
          $('#cloud').addClass('dark');
        } else if (cloudy > -1) {
          console.log('cloudy');
          $('#cloud').addClass('dark');
        }
      }
    });
  });  
};
getWeatherInfo(weatherLocation);

const sunmoon = `http://api.aerisapi.com/sunmoon/70816${suffix}`;
const moon = document.getElementById('moon');

var getSunmoon = () => {
  $.getJSON(sunmoon, ( res => {
    const currentTime = new Date().getTime() / 1000;
    console.log(res);
    let data = res.response[0]
    const sunset = data.sun.set;
    const moonPhase = data.moon.phase.phase; //moonphase from 0 to 1
    const moonPercent = moonPhase * 100;
    const moonAngle = data.moon.phase.angle * 100;
    console.log(moonAngle);
    const moonY = moonPhase * Math.tan(moonAngle) * 100;
    // moon.style.transform = `translate(${moonPercent}% ${moonY}%)`;
    // moon.style.webkitTransform = `translate(${moonPercent}%, ${moonY}%)`;
    // console.log(moonY);
    // moon.dataset.moonAngle = `rotate(${moonAngle}deg)`;
    moon.dataset.moonPhase = `${moonPercent}%`;
    if(currentTime > sunset){
      console.log('sun has set');
      moon.classList.add('sunset');
    }
  }));  
};

getSunmoon();

function epochTimeConvert (time) {
  let d = new Date(0);
  d.setUTCSeconds(time);
  return d;
};

$('#weather').on('change', function(){
  weatherType();
});

function weatherType(){
  init();
  var icon = $('#weather').val();
  var clear = icon.indexOf('clear');
  var cloudy = icon.indexOf('cloudy');
  var rain = icon.indexOf('rain');
  var tstorm = icon.indexOf('tstorm');
  var unknown = icon.indexOf('unknown');
  if (clear == 0) {
    $('h1.brand').removeClass('hide');
  } else if (tstorm == 0 || unknown == 0) {
    $('#cloud').addClass('dark');
    $('path[id^="Drop"],path[id^="Spark"]').removeClass('hide');
  } else if (rain == 0) {
    $('#cloud').addClass('dark');
    $('path[id^="Drop"]').removeClass('hide');
  } else if (cloudy == 0) {
    $('#cloud').addClass('dark');
  } 

}

function init(){
  $('path[id^="Drop"],path[id^="Spark"]').addClass('hide');
  $('#cloud').removeClass('dark');
}

/*****************WEATHER-INFO-TRIGGER******************/

const weatherInfoTrigger = document.getElementById('dot');
const weatherInfoTarget = document.querySelector('.weather-wrapper');

dot.addEventListener('click', () => {
  weatherInfoTarget.classList.toggle('on');
});

/***************LOCATION RADAR**************/
var getRadarInfo = (loc) => {
  console.log('loc', loc);
  if(loc){
    var address = loc;  
  } else {
    var address = 70816;
  }
  var latLongFetch = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + weatherLocation + '&key=' + gapiKey;
  var lat = '';
  var lng = '';

  $.getJSON(latLongFetch, function(res){
    lat = res.results[0].geometry.location.lat;
    lng = res.results[0].geometry.location.lng;

    var aerisMapBuilder = new aeris.interactive.MapAppBuilder({
        apiId: keys.apiId,
        apiSecret: keys.apiSecret,
        el: '#map-canvas',
        modules: {
            map: {
                zoom: 5,
                center: [lat,lng],
                scrollZoom: true
            },
            geosearch: {
                geolocate: false
            },
            localWeather: {
                showOnInit: false
            },
            mapControls: {
                expandOnInit: false
            },
            animation: {
              speed: 100,
              futureSpeed: 200,
              from: new Date(Date.now() - 3600 * 1 * 1000),
              to: new Date(Date.now() + 3600 * 2* 1000),
              useBigTimeline: false
            }
        }
    });
    aerisMapBuilder.start(); 
    setTimeout(function(){
      var aerisBtn = document.querySelector('.aeris-icon-play');
      aerisBtn.click(); 
    }, 2000);
  });
};

getRadarInfo();


