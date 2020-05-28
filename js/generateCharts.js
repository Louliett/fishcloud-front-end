
function drawChart(fishData1, betterFishArray) {
    var fishData=[]
    var fuckingColoursAgain=[...new Set(fishData1.map(x=>x.colour))]

    for(var i=0; i<fishData1.length;i++){
        fishData.push(Object.values(fishData1[i]))
        }
    fishData.unshift(['Type', 'Quantity', { role: 'style' }, { role: 'style' }, { role: 'style' }])
    var stupidArray=[];
    for(var i=0; i<fuckingColoursAgain.length;i++){
        stupidArray.push({color:fuckingColoursAgain[i]})
    }
    var stupidObject=Object.assign({},stupidArray);
  var data = google.visualization.arrayToDataTable(fishData);

  var options = {'title':'Fish caught lifetime',  pieHole: 0.2,'width':580, 'height':400, slices:stupidObject
};
    
  var chart = new google.visualization.PieChart(document.getElementById('piechartlifetime'));
  chart.draw(data, options);
    //piechartend
    //piechartstart
    
    
        var uniqueFish=[...new Set(betterFishArray.map(x=>x.name))];

    var organizedFish=organizeFish(betterFishArray);
    var date=new Date();
    organizedFish=organizedFish[date.getMonth()]
    var organizedOganizedFish=[];
    for(var i=0; i<uniqueFish.length; i++){
        if(organizedFish[uniqueFish[i]]){
            organizedOganizedFish.push([organizedFish[uniqueFish[i]].name, organizedFish[uniqueFish[i]].count, organizedFish[uniqueFish[i]].color])
        }
        
    }
    organizedOganizedFish.unshift(['Type', 'Quantity', { role: 'style' }]);
console.log(organizedOganizedFish,'never work from the frist time')
        var chartArray=organizedOganizedFish;

      var data = google.visualization.arrayToDataTable(chartArray);

    
    
      var options = {'title':'Fish caught last month',pieHole: 0.2,'width':580, 'height':400, slices:stupidObject};

  var chart = new google.visualization.PieChart(document.getElementById('piechartmonth'));
  chart.draw(data, options);
    //piechartend
    
    
    
    
 //columnchart
    var uniqueFish=[...new Set(betterFishArray.map(x=>x.name))];
    var uniqueFishWithColor=[];
    for(var i=0; i<uniqueFish.length; i++){
        uniqueFishWithColor.push(uniqueFish[i]);
        uniqueFishWithColor.push({role:'style'});
        
    }
    uniqueFishWithColor.unshift('Type');
    var organizedFish=organizeFish(betterFishArray);
    var dataData=[uniqueFishWithColor];
    
    for(var i=0; i<organizedFish.length; i++){
        var rowData=[organizedFish[i].month]
        for(var q=0; q<uniqueFishWithColor.length;q++){
            
            if(organizedFish[i][uniqueFishWithColor[q]]){
            rowData.push(organizedFish[i][uniqueFishWithColor[q]].count)
            rowData.push(organizedFish[i][uniqueFishWithColor[q]].color)
            }
        }
        
        while(rowData.length<uniqueFishWithColor.length){
            rowData.push(0);
            rowData.push('#cccccc');
        }
        dataData.push(rowData);
    }
    
    
var data = google.visualization.arrayToDataTable(dataData);

      var view = new google.visualization.DataView(data);
      /*view.setColumns([0, 1,{ calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },2,3]);*/

            var options = {title:'Total amount of fish caught per moonth',
        width: document.width,
        height: 590,
        legend: { position: 'none', maxLines: 24 },
        bar: { groupWidth: '88%' },
        isStacked: true,
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("columnchart1"));
      chart.draw(view, options);
    //columnchart
    
}