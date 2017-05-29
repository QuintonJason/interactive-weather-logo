$(function(){
  $.ajax({
	  url : "http://api.aerisapi.com/observations/70816?client_id=CLIENTID&client_secret=CLIENTSECRET",
	  dataType : "jsonp",
	  success : function(parsed_json) {
      // console.log(parsed_json);
		  var location = parsed_json.response['place']['name'];
		  var temp_f = parsed_json.response['ob']['tempF'];
		  var icon = parsed_json.response['ob']['icon'];
      var clear = icon.indexOf('clear') || icon.indexOf('sunny');
      var cloudy = icon.indexOf('cloudy');
      var rain = icon.indexOf('rain');
      var tstorm = icon.indexOf('tstorm');
      var unknown = icon.indexOf('unknown');

      // console.log('parsed json', parsed_json);
      console.log('icon', icon);
      // console.log('cloudy', cloudy);
      
// 	  	$('body').addClass(icon);
		  alert("Current temperature in " + location + " is: " + temp_f + ". It is " + icon + ".");


      if (clear > 0) {
		  	$('h1.brand').removeClass('hide');
		  } else if (tstorm > 0 || unknown > 0) {
		  	$('path[id^="Drop"],path[id^="Spark"]').removeClass('hide');
		  } else if (rain > 0) {
        $('path[id^="Drop"]').removeClass('hide');
		  } else if (cloudy > 0) {
		  	$('#cloud').addClass('dark');
		  }
	  }


  });
});

const sunmoon = 'http://api.aerisapi.com/sunmoon/70816?client_id=AMPdX2M3lA8yrTcPuW78c&client_secret=bvfG6TyVlv7odrhIcgWMbiVdC0UPU9orVEZiGJLW';
const moon = document.getElementById('moon');

$.getJSON(sunmoon, ( res => {
  const currentTime = new Date().getTime() / 1000;
  let data = res.response[0]
  const sunset = data.sun.set;
  const moonPhase = data.moon.phase.phase; //moonphase from 0 to 1
  const moonPercent = moonPhase * 100;
  const moonAngle = data.moon.phase.angle * 100;
  console.log(moonAngle);
  const moonY = moonPhase * Math.tan(moonAngle) * 100;
  moon.style.transform = `translate(${moonPercent}% ${moonY}%)`;
  moon.style.webkitTransform = `translate(${moonPercent}%, ${moonY}%)`;
  console.log(moonY);
  // moon.dataset.moonAngle = `rotate(${moonAngle}deg)`;
  moon.dataset.moonPhase = `${moonPercent}%`;
  if(currentTime > sunset){
    console.log('sun has set');
    moon.classList.add('sunset');
  }
  // epochTimeConvert(sunset);
  // console.log('sunset', epochTimeConvert(sunset));
}));

function epochTimeConvert (time) {
  let d = new Date(0);
  d.setUTCSeconds(time);
  return d;
};

$('#weather').on('change', function(){
  // console.log(icon);
  weatherType();
});

function weatherType(){
  // init();
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