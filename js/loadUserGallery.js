//this function takes in user data and displays it on the bottom of the page in a gallery format

function loadGallery(data){
        var gallery=document.getElementById('galleryContent');
gallery.innerHTML='<tr></tr>';
    for(var i=0; i<data[0][0].length; i++){
    var time=timestamp(parseInt(data[2][0][i]))
    var timetext='Date: '+time.hour+':'+time.minute+' '+time.day+'/'+time.month+'/'+time.year;
    var row = gallery.rows[gallery.rows.length-1];
            var cellsLength=row.cells.length;

    if(cellsLength >= 3){
       gallery.insertRow(gallery.rows.length) 
    row = gallery.rows[gallery.rows.length-1];
    var cellsLength=row.cells.length;
        var x = row.insertCell(row.cells.length-1);
   x.innerHTML = '<div class=photo> <img src="'+data[0][0][i].replace('.','https://fishcloud.azurewebsites.net')+'"> <table class="photoTable"> <thead> <tr> <td colspan="2"><p class="photoFishType phototext">'+data[1][0][i]+'</p></td></tr><tr> <td><p class="photoDate phototext">'+timetext+'</p></td><td><p class="photoOwner phototext">BY: '+data[3][0][i]+'</p></td></tr></thead></table></div>'; 
    }else{
            var cellsLength=row.cells.length;

    var x = row.insertCell(row.cells.length-1);
     x.innerHTML = '<div class=photo> <img src="'+data[0][0][i].replace('.','https://fishcloud.azurewebsites.net')+'"> <table class="photoTable"> <thead> <tr> <td colspan="2"><p class="photoFishType phototext">'+data[1][0][i]+'</p></td></tr><tr> <td><p class="photoDate phototext">'+timetext+'</p></td><td><p class="photoOwner phototext">BY: '+data[3][0][i]+'</p></td></tr></thead></table></div>';

    }
        }
}