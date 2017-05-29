$(function(){
  $.ajax({
	  url : "http://api.aerisapi.com/observations/70816?client_id=XXXXXXXXXXXXXXXXXXX&client_secret=XXXXXXXXXXXXXXXXXX",
	  dataType : "jsonp",
	  success : function(parsed_json) {
      console.log(parsed_json);
		  var location = parsed_json.response['place']['name'];
		  var temp_f = parsed_json.response['ob']['tempF'];
		  var icon = parsed_json.response['ob']['icon'];
      var clear = icon.indexOf('clear');
      var cloudy = icon.indexOf('cloudy');
      var rain = icon.indexOf('rain');
      var tstorm = icon.indexOf('tstorm');
      var unknown = icon.indexOf('unknown');

      console.log('parsed json', parsed_json);
      console.log('icon', icon);
      console.log('cloudy', cloudy);
      
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