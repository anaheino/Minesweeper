// defaultti taulukonkoko. 
var nro = 8;
// defaultti miinamÃ¤Ã¤rÃ¤.
var miina = 4;
var arr =[];
var arr2 =[];
var laheiset =[];
var peliohi = 0;
var clicked = 0;
//ladattaessa tÃ¤stÃ¤ alkaa ohjelma. LisÃ¤Ã¤ kuuntelijan newRow-eventtiin
// kun submit painetaan
window.onload = function()
{
	var subm = document.getElementById("ruudukko");
	subm.addEventListener("submit", newRow, false)
}

// tÃ¤ssÃ¤ functiossa poistetaan aiempi pelikenttÃ¤ ja luodaan tilalle uusi.
// aluksi poistetaan aiempi. Sitten laitetaan miina- ja kenttÃ¤koko kohdalleen.
function newRow(e)
{
e.preventDefault();
peliohi = 0;
nro = 8;
miina = 4;
//haetaan arvo kentÃ¤n koosta ja tarkistetaan, ettÃ¤ kaikki ok
nro = document.getElementsByName('x')[0].value;
if(isNaN(nro) || nro < 8 || nro > 32) return;

// haetaan arvo pommien mÃ¤Ã¤rÃ¤stÃ¤ ja tarkistetaan, ettÃ¤ k
miina = document.getElementsByName('pommit')[0].value;
if(isNaN(miina) || miina > (nro*nro)) return;

//poistetaan aiempi table
document.getElementsByTagName('table')[0].remove();
clicked = 0;
//tyhjennetÃ¤Ã¤n aiemmat
arr = [];
arr2 = [];
//tehdÃ¤Ã¤n div tablelle ja luodaan tarvittavia elementtejÃ¤
var myTableDiv = document.getElementsByTagName('body')[0];
var table = document.createElement('TABLE');
table.border='1';
var tableBody = document.createElement('TBODY');
tableBody.setAttribute("id", "tableBody");
table.appendChild(tableBody);

//tÃ¤ssÃ¤ luodaan varsinainen taulukko.
    for (var i=0; i<nro; i++){
       var tr = document.createElement('TR');
       tableBody.appendChild(tr);
       
       for (var j=0; j<nro; j++){
           var td = document.createElement('TD');
           var x = Math.random();
           var sp = document.createElement("SPAN");
           sp.id = (nro*(i)+(1+j)).toString();
           sp.addEventListener("click", peliklik, false);
           td.appendChild(sp);

           tr.appendChild(td);
       } 
   }
    myTableDiv.appendChild(table);
e.preventDefault();
addCord();
}


// lisÃ¤Ã¤ koordinaatit kahteen listaan. NÃ¤ihin sijainteihin sitten laitetaan pommit.
// eka = eka kord. toka = toka kord. arr & arr2 = taulukot. Tarkista = apumuuttuja, jolla katsotaan, onko
// jo pommi sijainnissa.
function addCord()
{

  for(var i=0; i<miina; i++)
  {
   var tarkista = 0;
   var eka = Math.floor(Math.random()*nro)+0;
   var toka = Math.floor(Math.random()*nro)+0;
   arr.push(eka);
   arr2.push(toka);
  //jos on jo laitettu pommeja, tÃ¤llÃ¤ varmistetaan etteivÃ¤t ne mene pÃ¤Ã¤llekkÃ¤in.
   if(arr.length > 1)
   {
   for(var j = 0; j < arr.length -1 ; j++)
     {
        if(arr[j] == eka && arr2[j] == toka ) 
        {
          tarkista = 1;
          break; 
        }
      }
  }
  //jos tÃ¤mÃ¤ =true, kordinaatit ovat menneet pÃ¤Ã¤llekkÃ¤in. poistetaan uusimmat arvot ja yritetÃ¤Ã¤n uudestaan.
  if(tarkista == 1)
  {
    arr.pop();
    arr2.pop();
    i--;  
    continue;
  }
  }
  addBomb();
}

// lisÃ¤Ã¤ varsinaiset pommien kuvat. 
function addBomb()
{

for(var i = 0; i<miina; i++)
{
  var img = document.createElement('img');
  img.src = "mine.svg"; 
  img.height = '100%';
  img.width = 'auto';

  var tableBody = document.getElementById("tableBody");
  var td = document.createElement('TD');
  var idi = tableBody.childNodes[arr[i]].childNodes[arr2[i]].firstChild.id;
  tableBody.childNodes[arr[i]].replaceChild(td, tableBody.childNodes[arr[i]].childNodes[arr2[i]]);
  var sp = document.createElement("SPAN");
  sp.id = idi;
  sp.addEventListener("click", peliklik, false);
  td.appendChild(sp);

  img.style.visibility = "hidden";
  img.style.overflow = "hidden";
  sp.appendChild(img);

}
}
//klikatessa tähän. Katsotaan osuttiinko pommiin,
//jos joo, miinat esiin ja peli loppuun.
function peliklik(e)
{

  if(e.target.firstChild)
  {
    for(var i = 0; i < arr.length; i++)
    {
      tableBody.childNodes[arr[i]].childNodes[arr2[i]].childNodes[0].childNodes[0].style.visibility = "visible";
    }
    peliohi = 1;
    return;
  }
  else if(peliohi == 1) return;

  else
  {
  
  countmines(e.target.id);
  
  }
   if(+clicked+ +miina >= (+nro * +nro)) youWon();

}
//lasketaan läheisten miinojen määrät.
function countmines(joku)
{
     var numba = parseInt(joku);
     var maara = 0;
     laheiset =[];
     laheiset.push(+nro+ +numba);
     laheiset.push(+numba- +nro);
     //siltä varalta, että klikattu on oikeassa tai vasemassa laidassa.
     if((+numba) % nro != 1)
     {
        laheiset.push(numba-1);
        laheiset.push((+nro+ +numba)-1);
        laheiset.push((+numba- +nro)-1);
     }
     if((+numba) % nro != 0) 
      {
        laheiset.push((+nro+ +numba)+1);
        laheiset.push(+numba+1);
        laheiset.push((+numba- +nro)+1);
      }          
     for(var i = 0; i<laheiset.length;i++)
     {
      try
      { 
          var a = document.getElementById(laheiset[i].toString());
          if(a.firstChild) maara++;
      }
      catch(exception){ }
 
     }
     //tehdään spesifioitu input-elementti spanin tilalle.
     var replace = document.getElementById(joku);
     var input = document.createElement('input');
     input.id = joku;
     input.className = 'display';
     if( maara == 2) input.style.color = 'green';
     if( maara == 3) input.style.color = 'orange';
     if(maara > 3) input.style.color = 'red';
     input.value = maara.toString();
     replace.parentNode.replaceChild(input, replace );
     clicked++;

}
function youWon()
{
  alert("You won!");
}