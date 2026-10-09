var spielfeld_x=1000;
var spielfeld_y=600;
var zielradius=50;
var startzeit;
var stopzeit;
var zaehler;
var spielende=5;
var spielzeit;
var timer1;
var speed1 = 100;
var timer2;
var leben;

function malePunkt(){
    var x=Math.random()*(spielfeld_x - 2 * zielradius);
    var y=Math.random()*(spielfeld_y - 2 * zielradius);
    $("#ziel").css("left",x+"px").css("top",y+"px").show();
    timer2=setTimeout(malePunkt, 2000);
}
function maleStatus(){
    var jetzt=new Date();
    var zwischenzeit=jetzt.getTime();
    var zeit=(zwischenzeit - startzeit)/ 1000;
    var status="Treffer: " + zaehler + " Spielzeit: " + zeit +" Sekunden Leben: " + leben;
    $("#status").html(status);
    timer1=setTimeout(maleStatus,speed1);  
}

// Wenn Seite geladen ist
$(document).ready(function() {

	$("#spielfeld").css("width", spielfeld_x + "px").css("height", spielfeld_y + "px");
	$("#status").css("width", spielfeld_x + "px");

    $("#knopf").click(function(event){
	event.stopPropagation(); 
        $("#knopf").hide();
	    $("#ergebnis").hide();
        var jetzt=new Date();
	    startzeit=jetzt.getTime();
	    zaehler=0;
	    malePunkt();
	    maleStatus();
	    leben = 100;
    })
   
    $("#ziel").click(function(event){
	event.stopPropagation();   // Verhindert das der click auf das Ziel als click auf Spielfeld wargenommen wird
	    zaehler = zaehler + 1;
	    //maleStatus();
	    clearTimeout(timer2);

	    if(zaehler >= spielende){
	        clearTimeout(timer1)
		    $("#ziel").hide();
			var jetzt=new Date();
	        stopzeit=jetzt.getTime();
			spielzeit = (stopzeit - startzeit)/ 1000;
			var erg="Sie haben "+ spielzeit +" Sekunden gebraucht";
		    $("#ergebnis").html(erg).show();
			$("#knopf").show().html("Erneut Spielen");
			
	    }
	    else{
	    //Kasten neu malen
	    malePunkt();
	    }
    });
    $("#spielfeld").click(function(){
	    if(leben == 0){
		    var jetzt=new Date();
	        stopzeit=jetzt.getTime();
			spielzeit = (stopzeit - startzeit)/ 1000;
			var leg="Sie haben "+ spielzeit +" Sekunden überlebt bis sie gestorben sind";
		    $("#ergebnis").html(leg).show();
			$("#knopf").show().html("Erneut Spielen");
			clearTimeout(timer1)
			$("#ziel").hide();
	    }
	    else{
	        leben = leben - 10;
	    }
    })

})	// end of document.ready