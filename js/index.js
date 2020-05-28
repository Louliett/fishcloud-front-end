

//fetch all the functionality scripts after this script is loaded

$.getScript("generateCharts.js", function() {
    
});
$.getScript("fishTypes.js", function() {
    
});
$.getScript("loadUserGallery.js", function() {
    
});
$.getScript("populateData.js", function() {
    
});

//a global variable to hold map instance and char package loading for use by the generateCharts script
var map;
    google.charts.load('current', {'packages':['corechart']});
   google.charts.load('current', {'packages':['bar']});


var mainMarkers=[];
var localMarkers=[];

var globalData=[];


var selected='none';


//On page scroll events handler
$('#viewdatabutton').click(function(){

 $('html, body').animate({
        scrollTop: $('.scrollto').offset().top
    }, 800);
    
     $('#select').attr('class', 'selectinactive');
    $('#viewdatabutton').attr('class', 'viewinactive');
    
})

//Initialize google map on page load
function initMap() {
  // The location of Uluru
  var uluru = {lat: 63.238581, lng: 14.251906};
  // The map, centered at Uluru
  map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: uluru});
  // The marker, positioned at Uluru

google.maps.event.addListener(map, 'zoom_changed', function() {
    if (map.getZoom()<11) {
                showMainMarkers();

        deleteLocalMarkers();
    } 
});
}

//execute google map load on page load done
document.addEventListener('load',()=>{initMap()})

//loading pointers for a specific user selection
function localPointers(locationName){
        hideMainMarkers();

    var shape = {
          coords: [1, 1, 1, 20, 18, 20, 18, 1],
          type: 'poly'
        };

    var iconBase =
            'https://developers.google.com/maps/documentation/javascript/examples/full/images/'

        var icons = {
          icon1: {
            icon: iconBase + 'location.png'
          },
          icon2: {
            icon: iconBase + 'location.png'
          },
          fish: {
            icon: iconBase + 'beachflag.png'

          }
        };
    var features =[];
for(var i=0;i<globalData.length;i++){
         
         features.push( {
            position: new google.maps.LatLng(globalData[i]['latitude'], globalData[i]['longitude']),
            type: 'fish'
          })
        
    }

        // Create markers.
        for (var i = 0; i < features.length; i++) {
          var marker = new google.maps.Marker({
            position: features[i].position,
            icon: icons[features[i].type].icon,
            title: locationName,
            map: map
          });
             marker.addListener('click',()=>{

        loadData(event.target.title)
        $('.markerInfo').css('visibility','visible');
       
    })
            localMarkers.push(marker);
        };
      
    
}

//below are various methods for marker visibility manipulation
   function hideMainMarkers(){
       for(var i=0; i<mainMarkers.length; i++){
        mainMarkers[i].setMap(null);


    }
   }

function showMainMarkers(){
    for(var i=0; i<mainMarkers.length; i++){
        mainMarkers[i].setMap(map);
    } 
}
function  deleteLocalMarkers(){
      for(var i=0; i<localMarkers.length; i++){
        localMarkers[i].setMap(null);
    }
    localMarkers=[];
}


//this method generates markers on the map by taking as an argument the responce from the locations get method being called further down the code
function generateMap(data){
    var lake=$('#lake');
    
    for(var i=0;i<data.length;i++){
          var uluru = {lat: parseFloat(data[i]['latitude']), lng: parseFloat(data[i]['longitude'])};

lake.append($("<option></option>")
                    .attr("value", data[i]['name'])
                    .attr("data-lat", data[i]['latitude'])
                    .attr("data-lon", data[i]['longitude'])
                    .text( data[i]['name'])); 
        
  var marker = new google.maps.Marker({position: uluru, map: map, title: data[i]['name']});
    marker.addListener('click',()=>{
    map.setCenter(marker.getPosition());
                    map.setZoom(12);
        loadData(event.target.title);
    })
        mainMarkers.push(marker);
            }
    
    lake.change(function(){
              var option= $(this).find(":selected");
            var lat=parseFloat(option.attr('data-lat'));
            var lon=parseFloat(option.attr('data-lon'));
        loadData($(this).val());
              map.setCenter({lat: lat, lng: lon});
                    map.setZoom(12);
        })
   
}




//deprecated function
function randomShit(){
    return Math.floor(Math.random()*80);
}




//A fetch that runs automatically when the script is loaded and makes a call to the API to retrieve all lake location stored on the server
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch('https://fishcloud.azurewebsites.net/locations', requestOptions)
    .then(response => response.json())
    .then(result => 
generateMap(result))
    .catch(error => console.error(error));





//an event listener to scroll the page to the vizualized data on user selection
$('.locationpickertext').click(
function(){$('html, body').animate({
        scrollTop: 0
    }, 400);
          });

//modify the header on page scroll detected
  $(window).scroll(function() {

    if ($(this).scrollTop() >= 19) {
            $('.logo').attr('class','logomoved');
    $('.stolen').attr('class','stolenmoved');
   


    }
    else {
                 $('.logomoved').attr('class','logo');
    $('.stolenmoved').attr('class','stolen');

    }
          if ($(this).scrollTop() >= 768) {
                  
     $('#select').attr('class', 'selectinactive');
    $('#viewdatabutton').attr('class', 'viewinactive');
          }

      
    });

//extract float numbers from text strings returned by the server
function returnFloat(numberstring){

    var number= numberstring.match(/\d+/)[0];
    
    return number;
    
    
    
}

//Convert a timestamp in milis to date
function timestamp(time){
    var timeObject={year:0, month:0, day:0, hour:0, minute:0, seconds:0};

var date = new Date(time);
    timeObject.year=date.getFullYear();
    timeObject.month=date.getMonth()+1;
    timeObject.day=date.getDay()+3;
    timeObject.hour=date.getHours();
    timeObject.minute=date.getMinutes();
    timeObject.seconds=date.getSeconds();


//var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    
    
    return timeObject;
    
    
}


//this function takes in timestamped fish data and sorts it by date caught pefore it is analyzed by the generate charts  script
function organizeFish(data){
  var months=[{month:'Januari'}, {month:'Februari'}, {month:'Mars'}, {month:'April'}, {month:'Maj'}, {month:'Juni'}, {month:'Juli'}, {month:'Augusti'}, {month:'September'}, {month:'Oktober'}, {month:'November'}, {month:'December'}];
    
    for(var i=0; i<data.length; i++){
        if(!months[data[i]['time'].month-1][data[i]['name']]){
        months[data[i]['time'].month-1][data[i]['name']]= {name:data[i]['name'], count:1, color:data[i]['color']};
        }else{
           months[data[i]['time'].month-1][data[i]['name']].count++; 
        }
        
        
        
    }
return months;    
    
}



