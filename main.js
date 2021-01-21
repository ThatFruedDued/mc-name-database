let prev = "";
let minMax = [3, 16];
let num = 0;
let colors = ["red","orange","yellow","lime","#4682b4","pink","magenta","grey","purple"];

async function onChange(query){
  num++;
  let numCache = num, min = document.getElementById("min").value, max = document.getElementById("max").value;
  document.getElementById("results").innerHTML = "";
  if(query !== ""){
    let reg = new RegExp(query.split("*").join("."), "gi");
    let chance = ((Math.floor(Math.random() * 100) === 50) ? true:false);
    for(let i = 0; i < words.length; i++){
      if(numCache === num && words[i].match(reg) !== null && (words[i].length >= min && words[i].length <= max)){
        if(chance) {
          document.getElementById("results").innerHTML += `<br><a style="text-decoration:underline;cursor:pointer;color:${colors[Math.floor(Math.random() * colors.length - 1)]}" onclick="window.open('https://namemc.com/search?q=${words[i]}')">${words[i]}</a>`;
        }else {
          document.getElementById("results").innerHTML += `<br><a style="text-decoration:underline;cursor:pointer;color:#4682b4" onclick="window.open('https://namemc.com/search?q=${words[i]}')">${words[i]}</a>`;
        }
        await sleep(0);
      }
    }
  }
}

setInterval(function(){
  if(document.getElementById("name").value != undefined && document.getElementById("name").value !== prev){
    prev = document.getElementById("name").value;
    onChange(document.getElementById("name").value.toLowerCase());
  }
}, 10);

setInterval(function(){ // some black magic shit is occuring in this function
  let mi = parseInt(document.getElementById("min").value);
  let ma = parseInt(document.getElementById("max").value);
  if(mi > ma) {document.getElementById("min").value = ma;}
  if(mi !== minMax[0]) {
    minMax[0] = mi;
    document.getElementById("minVal").textContent = mi;
    onChange(document.getElementById("name").value.toLowerCase());
  }
  if(ma !== minMax[1]) {
    minMax[1] = ma;
    document.getElementById("maxVal").textContent = ma;
    onChange(document.getElementById("name").value.toLowerCase());
  }
}, 0);

function sleep(ms){
  return new Promise(r => setTimeout(r, ms));
}
