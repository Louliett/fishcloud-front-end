 var map;
    google.charts.load('current', {'packages':['corechart']});
   google.charts.load('current', {'packages':['bar']});

function initMap() {
  // The location of Uluru
  var uluru = {lat: 63.238581, lng: 14.251906};
  // The map, centered at Uluru
  map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: uluru});
  // The marker, positioned at Uluru

}

document.addEventListener('load',()=>{initMap()})



// Draw the chart and set the chart values
function drawChart(fishData) {
    //piechartstart
    //var uniqueFish=[...new Set(fishData.map(x=>x.fish_name))];
        var uniqueFish=[...fishData.map(x=>x.fish_name)];
    var uniqueColors=[...new Set(fishData.map(x=>x.colour))];

var fishArray=[];

var count = {};
uniqueFish.forEach(function(i) { count[i] = (count[i]||0) + 1;});
console.log(count);
console.log(uniqueFish);
    console.log(Object.entries(count));
        var anootherArray=Object.entries(count);
    anootherArray.unshift(['Type', 'Quantity'])
        
  var data = google.visualization.arrayToDataTable(anootherArray);

  var options = {'title':'Fish caught lifetime',  pieHole: 0.2,'width':580, 'height':400, slices: {  
      0:{color:uniqueColors[0]},
      1:{color:uniqueColors[1]},
      2: {color:uniqueColors[2],offset: 0.2}
}};

  var chart = new google.visualization.PieChart(document.getElementById('piechartlifetime'));
  chart.draw(data, options);
    //piechartend
    var chartArray=[['Type', 'Quantity', { role: 'style' }],['none',1,'gold']]
    //piechartstart
      var data = google.visualization.arrayToDataTable(chartArray);

    
    
      var options = {'title':'Fish caught last month',pieHole: 0.2,'width':580, 'height':400, slices: {  
      0:{color:'#cccccc'}}};

  var chart = new google.visualization.PieChart(document.getElementById('piechartmonth'));
  chart.draw(data, options);
    //piechartend
 //columnchart
var data = google.visualization.arrayToDataTable([
        ['Type', 'Lax', 'Squid', 'Octopus', 'Magicarp',
         'Plastic Bag', 'Literature', { role: 'annotation' } ],
        ['Januari', randomShit(), randomShit(), randomShit(), randomShit(), randomShit(), randomShit(), ''],
        ['Februari', randomShit(), randomShit(), randomShit(), randomShit(), randomShit(), randomShit(), ''],
        ['Mars', randomShit(),randomShit(),randomShit(),randomShit(),randomShit(),randomShit(), ''],
        ['April', randomShit(),randomShit(),randomShit(),randomShit(),randomShit(),randomShit(), ''],
        ['Maj', randomShit(),randomShit(),randomShit(),randomShit(),randomShit(),randomShit(), ''],
        ['Juni', randomShit(),randomShit(),randomShit(),randomShit(),randomShit(),randomShit(), ''],
        ['Juli', randomShit(),randomShit(),randomShit(),randomShit(),randomShit(),randomShit(), ''],
        ['Augusti', randomShit(),randomShit(),randomShit(),randomShit(),randomShit(),randomShit(), ''],
        ['September', randomShit(),randomShit(),randomShit(),randomShit(),randomShit(),randomShit(), ''],
        ['October', randomShit(),randomShit(),randomShit(),randomShit(),randomShit(),randomShit(), ''],
        ['November', randomShit(),randomShit(),randomShit(),randomShit(),randomShit(),randomShit(), ''],
        ['December', randomShit(),randomShit(),randomShit(),randomShit(),randomShit(),randomShit(), '']
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,{ calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },2,3,4,5]);

            var options = {title:'Total amount of fish caught per moonth',
        width: document.width,
        height: 590,
        legend: { position: 'top', maxLines: 24 },
        bar: { groupWidth: '88%' },
        isStacked: true,
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("columnchart1"));
      chart.draw(view, options);
    //columnchart
    
}






function drawChart1(fishData){
       /*    //columnchart
     var data = google.visualization.arrayToDataTable([
        ['Type', 'Lax', 'Squid', 'Octopus', 'Magicarp',
         'Plastic Bag'],
        ['Januari', randomShit(), randomShit(), randomShit(), randomShit(), randomShit()],
        ['Februari', randomShit(), randomShit(), randomShit(), randomShit(), randomShit(),],
        ['Mars', randomShit(),randomShit(),randomShit(),randomShit(),randomShit()],
        ['April', randomShit(),randomShit(),randomShit(),randomShit(),randomShit()],
        ['Maj', randomShit(),randomShit(),randomShit(),randomShit(),randomShit()],
        ['Juni', randomShit(),randomShit(),randomShit(),randomShit(),randomShit()],
        ['Juli', randomShit(),randomShit(),randomShit(),randomShit(),randomShit()],
        ['Augusti', randomShit(),randomShit(),randomShit(),randomShit(),randomShit()],
        ['September', randomShit(),randomShit(),randomShit(),randomShit(),randomShit()],
        ['October', randomShit(),randomShit(),randomShit(),randomShit(),randomShit()],
        ['November', randomShit(),randomShit(),randomShit(),randomShit(),randomShit()],
        ['December', randomShit(),randomShit(),randomShit(),randomShit(),randomShit()]
      ]);


    
    
    
        var options = {
          chart: {
            title: 'Fish caught per month not aggregated',
            subtitle: 'Stats from 2019',
                   legend: { position: 'top', maxLines: 20 },
        bar: { groupWidth: '75%' },
        isStacked: true,
          }
        };


   var chart = new google.charts.Bar(document.getElementById('columnchartyear'));

        chart.draw(data, google.charts.Bar.convertOptions(options));

    //columnchart
    */
}


function randomShit(){
    return Math.floor(Math.random()*80);
}






  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch('https://fishcloud.azurewebsites.net/locations/locations', requestOptions)
    .then(response => response.json())
    .then(result => 
generateMap(result))
    .catch(error => console.error(error));

function generateMap(data){
    var lake=$('#lake');
    
 
    
    for(var i=0;i<data.length;i++){
          var uluru = {lat: parseFloat(data[i]['latitude']), lng: parseFloat(data[i]['longitude'])};

lake.append($("<option></option>")
                    .attr("value", data[i]['loc_name'])
                    .attr("data-lat", data[i]['latitude'])
                    .attr("data-lon", data[i]['longitude'])
                    .text( data[i]['loc_name'])); 
        lake.change(function(){
              var option= $(this).find(":selected");
            var lat=parseFloat(option.attr('data-lat'));
            var lon=parseFloat(option.attr('data-lon'));
              map.setCenter({lat: lat, lng: lon});
                    map.setZoom(12);
        })
  var marker = new google.maps.Marker({position: uluru, map: map, title: data[i]['loc_name']});
    marker.addListener('click',()=>{
        loadData(event.target.title)
        $('.markerInfo').css('visibility','visible');
        $('html, body').animate({
        scrollTop: $('.scrollto').offset().top
    }, 800);
    }) 
            }
}

function loadData(name){
    $('.noInfo').attr('hidden','hidden');
    $('.markerInfo').removeAttr('hidden');
$('.scrollto').html('<h3 class="name scrollto">'+name+'</h3>')

const data = {
      location: name
    };

    var raw = JSON.stringify(data);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch('https://fishcloud.azurewebsites.net/fish/fish-in-location', requestOptions)
      .then(response => response.json())
      .then(data => {
        generateData(data);
      }).catch(error => console.error(error));
}
function generateData(data){
    console.log(data);

drawChart(data);
    
    
    
    drawChart1(data);
    
}
$('.locationpickertext').click(
function(){$('html, body').animate({
        scrollTop: 0
    }, 400);
          });


  $(window).scroll(function() {

    if ($(this).scrollTop() >= 19) {
            $('.logo').attr('class','logomoved');
    $('.stolen').attr('class','stolenmoved');
   


    }
    else {
                 $('.logomoved').attr('class','logo');
    $('.stolenmoved').attr('class','stolen');

    }
    });
