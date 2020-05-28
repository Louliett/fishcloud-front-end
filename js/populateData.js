

//this function receives a location name from the user selection made in the html and makes an api call to retrieve all data related to the selected location.
function loadData(name){
    
    if(selected.toLowerCase()===name.toLowerCase()){
        return
    }else{
        selected=name;
    }
    
            $('.markerInfo').css('visibility','visible');

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
console.log(data);

        globalData=data;

        generateData(data, name);
      }).catch(error => console.error(error));
}



//The received data from the api call responce is prossed and divided and shipped to appropriate methods for vizualization.
function generateData(fishData, locationName){
            var uniqueFish=[...(fishData.map(x=>x.name))];
    var average=[];
    var weight=[];
    var length=[];
    var height=[];
    for(var i=0; i<fishData.length;i++){
         weight=[];
    length=[];
    height=[];
      for(var q=0; q<uniqueFish.length; q++){
          if(uniqueFish[q]===fishData[i]['name']){
            weight.push(returnFloat(fishData[i]['kg']));  
            length.push(returnFloat(fishData[i]['length']));  
            height.push(returnFloat(fishData[i]['width']));  
              
          }
          
      }
        average.push([fishData[i]['kg'], fishData[i]['length'], fishData[i]['width']]);
    }

    var uniqueBoss=[{name:[...new Set(fishData.map(x=>x.name))],colour:[...new Set(fishData.map(x=>x.colour))],default_image:[...new Set(fishData.map(x=>x.default_image))]}]
    
   
var fishArray=[];

var count = {};
uniqueFish.forEach(function(i) { count[i] = (count[i]||0) + 1;});

        var combined1=[];
    for(var q=0; q<uniqueBoss[0]['name'].length; q++){
        combined1.push({name:uniqueBoss[0]['name'][q], count: count[uniqueBoss[0]['name'][q]], colour:uniqueBoss[0]['colour'][q], default_image:uniqueBoss[0]['default_image'][q], average: average[q]})
        
    }

    
    var betterFishArray=[];
    for(var i=0; i<fishData.length; i++){
        betterFishArray.push({name:fishData[i]['name'], color:fishData[i]['colour'], time:timestamp(parseInt(fishData[i]['timestamp']))})
    }
    
    var userUploads=[[fishData.map(x=>x.url)], [fishData.map(x=>x.name)], [fishData.map(x=>x.timestamp)], [fishData.map(x=>x.user)]]
    
    
    console.log(userUploads);

drawChart(combined1, betterFishArray);
    
    
    
    
    fishinlake(combined1);
localPointers(locationName);    
    
    $('#select').attr('class', 'selectactive');
    $('#viewdatabutton').attr('class', 'viewactive');
    
    
    loadGallery(userUploads);
    
    
    
    
    
}