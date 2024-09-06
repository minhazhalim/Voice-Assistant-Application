const turn_on = document.querySelector('#turn_on');
const j_intro = document.querySelector('#j_intro');
const time = document.querySelector('#time');
const machine = document.querySelector('.machine');
let stoppingRecognition = false;
let fridayCommands = [];
let windowsB = [];
let weatherStatement = "";
let speech_language = 'hi-IN';
let date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();
let seconds = date.getSeconds();
let dd = date.getDate();
let mm = date.getMonth();
let yyyy = date.getFullYear();
let youtubeWindow;
let charge;
let chargeStatus;
let connectivity;
let currentTime;
changeStatus = 'unplugged';
fridayCommands.push('hi friday');
fridayCommands.push('what are your commands');
fridayCommands.push('close this - to close opened popups');
fridayCommands.push('change my information - information regarding your acoounts and you');
fridayCommands.push('whats the weather or temperature');
fridayCommands.push('show the full weather report');
fridayCommands.push('are you there - to check fridays presence');
fridayCommands.push('shut down - stop voice recognition');
fridayCommands.push('open google');
fridayCommands.push('search for "your keywords" - to search on google ');
fridayCommands.push('open whatsapp');
fridayCommands.push('open youtube');
fridayCommands.push('play "your keywords" - to search on youtube ');
fridayCommands.push('close this youtube tab - to close opened youtube tab');
fridayCommands.push('open firebase');
fridayCommands.push('open netlify');
fridayCommands.push('open twitter');
fridayCommands.push('open my twitter profile');
fridayCommands.push('open instagram');
fridayCommands.push('open my instagram profile');
fridayCommands.push('open github');
fridayCommands.push('open my github profile');
function readOut(message){
     const speechSynthesisUtterance = new SpeechSynthesisUtterance();
     speechSynthesisUtterance.text = message;
     speechSynthesisUtterance.volume = 1;
     window.speechSynthesis.speak(speechSynthesisUtterance);
}
function readOutHindi(message){
     const speechSynthesisUtterance = new SpeechSynthesisUtterance();
     speechSynthesisUtterance.text = message;
     speechSynthesisUtterance.volume = 1;
     speechSynthesisUtterance.lang = 'hi-IN';
     window.speechSynthesis.speak(speechSynthesisUtterance);
}
window.onload = () => {
     turn_on.addEventListener('ended',() => {
          setTimeout(() => {
               readOut('Ready to go sir');
               if(localStorage.getItem('jarvis_setup') === null){
                    readOut("Sir, kindly fill out the form on your screen so that you could access most of my features and if you want to see my commands see a warning in the console");
               }
          },200);
     });
     fridayCommands.forEach((event) => {
          document.querySelector('.commands').innerHTML += `<p>#${event}</p><br/>`;
     });
     if(navigator.onLine){
          document.querySelector('#internet').textContent = 'online';
          connectivity = 'online';
     }else{
          document.querySelector('#internet').textContent = 'offline';
          connectivity = 'offline';
     }
     setInterval(() => {
          if(navigator.onLine){
               document.querySelector('#internet').textContent = 'online';
               connectivity = 'online';
          }else{
               document.querySelector('#internet').textContent = 'offline';
               connectivity = 'offline';
          }
     },60000);
     function printBatteryStatus(batteryObject){
          document.querySelector('#battery').textContent = `${(batteryObject.level * 100).toFixed(2)}%`;
          charge = batteryObject.level * 100;
          if(batteryObject.charging === true){
               document.querySelector('.battery').style.width = '200px';
               document.querySelector('#battery').textContent = `${(batteryObject.level * 100).toFixed(2)}% Charging`;
               chargeStatus = 'plugged in';
          }
     }
     function batteryCallback(batteryObject){
          printBatteryStatus(batteryObject);
          setInterval(() => {
               printBatteryStatus(batteryObject);
          },5000);
     }
     const batteryPromise = navigator.getBattery();
     batteryPromise.then(batteryCallback);
};
function formatAmPm(date){
     let hours = date.getHours();
     let minutes = date.getMinutes();
     let aMpM = hours >= 12 ? 'pm' : 'am';
     hours = hours % 12;
     hours = hours ? hours : 12;
     minutes = minutes < 10 ? '0' +minutes : minutes;
     const startTime = hours + ':' + minutes + " " + aMpM;
     currentTime = startTime;
}
formatAmPm(date);
setInterval(() => {
     formatAmPm(date);
},60000);
function ktc(k){
     k = k - 273.15;
     return k.toFixed(2);
}
function weather(location){
     const weatherCont = document.querySelector('.temperature').querySelectorAll('*');
     let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;
     const xmlHTTPRequest = new XMLHttpRequest();
     xmlHTTPRequest.open('GET',url,true);
     xmlHTTPRequest.onload = function (){
          if(this.status === 200){
               let data = JSON.parse(this.responseText);
               weatherCont[0].textContent = `Location : ${data.name}`;
               weatherCont[1].textContent = `Country : ${data.sys.country}`;
               weatherCont[2].textContent = `Weather Type : ${data.weather[0].main}`;
               weatherCont[3].textContent = `Weather Description : ${data.weather[0].description}`;
               weatherCont[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
               weatherCont[5].textContent = `Original Temperature : ${ktc(data.main.temp)}`;
               weatherCont[6].textContent = `Feels Like ${ktc(data.main.feels_link)}`;
               weatherCont[7].textContent = `Minimum Temperature : ${ktc(data.main.temp_min)}`;
               weatherCont[8].textContent = `Maximum Temperature : ${ktc(data.main.temp_max)}`;
               weatherStatement = `Sir the Weather in ${data.name} is ${data.weather[0].description} and the Temperature Feels Like ${ktc(data.main.feels_link)}`;
          }else{
               weatherCont[0].textContent = 'Weather Info Not Fount';
          }
     };
     xmlHTTPRequest.send();
}
if(localStorage.getItem('jarvis_setup') !== null){
     weather(JSON.parse(localStorage.getItem('jarvis_setup')).location);
}
if(localStorage.getItem('lang') === null){
     localStorage.setItem('language','en-US');
}
const jarvis_setup = document.querySelector('.jarvis_setup');
function userInfo(){
     let setupInfo = {
          name: jarvis_setup.querySelectorAll('input')[0].value,
          bio: jarvis_setup.querySelectorAll('input')[1].value,
          location: jarvis_setup.querySelectorAll('input')[2].value,
          instagram: jarvis_setup.querySelectorAll('input')[3].value,
          twitter: jarvis_setup.querySelectorAll('input')[4].value,
          github: jarvis_setup.querySelectorAll('input')[5].value,
     };
     let testArray = [];
     jarvis_setup.querySelectorAll('input').forEach((event) => {
          testArray.push(event.value);
     });
     if(testArray.includes("")) readOut('Sir Enter Your Complete Information');
     else{
          localStorage.clear();
          localStorage.setItem('jarvis_setup',JSON.stringify(setupInfo));
          jarvis_setup.style.display = 'none';
          weather(JSON.parse(localStorage.getItem('jarvis_setup')).location);
     }
}
jarvis_setup.style.display = 'none';
const small_Jarvis = document.querySelector('#small_jarvis');
small_Jarvis.addEventListener('click',() => {
     window.open(`${window.location.href}`,"newWindow","menubar=true,location=true,resizable=false,scrollbars=false,width=200,height=200,top=0,left=0");
     window.close();
})
if(localStorage.getItem('jarvis_setup') === null){
     jarvis_setup.style.display = 'flex';
     jarvis_setup.querySelector('button').addEventListener('click',userInfo);
}
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const speechRecognition = new SpeechRecognition();
const speechSynthesis = window.speechSynthesis;
speechRecognition.continuous = true;
speechRecognition.lang = localStorage.getItem('lang');
speechRecognition.onstart = function (){
     document.querySelector('#stop_jarvis_button').style.display = 'flex';
};
speechRecognition.onresult = function (event){
     let current = event.resultIndex;
     let transcript = event.results[current][0].transcript;
     transcript = transcript.toLowerCase();
     let userData = localStorage.getItem('jarvis_setup');
     if(localStorage.getItem('lang') === 'en-US'){
          if(transcript.includes('hi jarvis')) readOut('hello sir');
          if(transcript.includes('switch to hindi')){
               readOut('switching to hindi');
               speech_language = 'hi-IN';
               localStorage.setItem('language','hi-IN');
               stoppingRecognition = true;
               speechRecognition.stop();
               location.reload();
               readOutHindi('मैं तैयार हूँ, सर');
          }
          if(transcript.includes('whats the current charge')) readOut(`the current charge is ${charge}`);
          if(transcript.includes('whats the charging status')) readOut(`the current charging status is ${chargeStatus}`);
          if(transcript.includes('current time')) readOut(currentTime);
          if(transcript.includes('connection status')) readOut(`you are ${connectivity} sir`);
          if(transcript.includes('what are your commands')){
               readOut('sir heres the list of commands i can follow');
               if(window.innerWidth <= 400){
                    window.resizeTo(screen.width,screen.height);
               }
               document.querySelector('.commands').style.display = 'block';
          }
          if(transcript.includes('Tell about yourself')) readOut('sir, i am a jarvis, a voice assistant made for browsers using javascript by one of the enthusiastic dev on the planet. i can do anything which can be done from a browser.');
          if(transcript.includes('close this')){
               readOut('closing the tab sir');
               document.querySelector('.commands').style.display = 'none';
               if(window.innerWidth >= 401){
                    window.resizeTo(250,250);
               }
               jarvis_setup.style.display = 'none';
          }
          if(transcript.includes('change my information')){
               readOut('opening the information tab sir');
               localStorage.clear();
               if(window.innerWidth <= 400){
                    window.resizeTo(screen.width,screen.height);
               }
               jarvis_setup.style.display = 'flex';
               jarvis_setup.querySelector('button').addEventListener('click',userInfo);
          }
          if(transcript.includes('whats the temperature')) readOut(weatherStatement);
          if(transcript.includes('full weather report')){
               readOut('opening the weather report sir');
               let a = window.open(`https://www.google.com/search?q=weather+in+${JSON.parse(localStorage.getItem('jarvis_setup')).location}`);
               windowsB.push(a);
          }
          if(transcript.includes('are you there')) readOut('yes sir');
          if(transcript.includes('shut down')){
               readOut('Ok sir i will take a nap');
               stoppingRecognition = true;
               speechRecognition.stop();
          }
          if(transcript.includes('open whatsapp')){
               readOut('opening whatsapp');
               let a = window.open('https://web.whatsapp.com');
               windowsB.push(a);
          }
          if(transcript.includes('open netlify')){
               readOut('opening netlify');
               let a = window.open('https://app.netlify.com');
               windowsB.push(a);
          }
          if(transcript.includes('open spotify')){
               readOut('opening spotify');
               let a = window.open('https://open.spotify.com');
               windowsB.push(a);
          }
          if(transcript.includes('open fire base') && transcript.includes('account')){
               readOut('opening firebase console');
               let accessId = transcript;
               accessId = accessId.split("");
               accessId.pop();
               accessId = accessId[accessId.length - 1];
               let a = window.open(`https://console.firebase.google.com/u/${accessId}`);
               windowsB.push(a);
          }
          if(transcript.includes('open my canva designs')){
               readOut('opening canva designs');
               window.open('https://www.canva.com/folder/all-designs');
          }
          if(transcript.includes('open canva') || transcript.includes('open camera')){
               readOut('opening canva');
               window.open('https://www.canva.com');
          }
          if(transcript.includes("what's my name")) readOut(`Sir, I know that you are ${JSON.parse(userData).name}`);
          if(transcript.includes("what's my bio")) readOut(`Sir, I know that you are ${JSON.parse(userData).bio}`);
          if(transcript.includes('open google')){
               readOut('opening google');
               let a = window.open('https://www.google.com/');
               windowsB.push(a);
          }
          if(transcript.includes('search for')){
               readOut('heres your result');
               let input = transcript.split("");
               input.splice(0,11);
               input.pop();
               input = input.join("").split(" ").join('+');
               let a = window.open(`https://www.google.com/search?q=${input}`);
               windowsB.push(a);
          }
          if(transcript.includes('open youtube')){
               readOut('opening youtube sir');
               let a = window.open('https://www.youtube.com');
               windowsB.push(a);
          }
          if(transcript.includes('play')){
               let playString = transcript.split("");
               playString.splice(0,5);
               let videoName = playString.join("");
               playString = playString.join("").split(" ").join('+');
               readOut(`searching youtube for ${videoName}`);
               let a = window.open(`https://www.youtube.com/search?q=${playString}`);
               windowsB.push(a);
          }
          if(transcript.includes('open instagram')){
               readOut('opening instagram sir');
               let a = window.open('https://www.instagram.com');
               windowsB.push(a);
          }
          if(transcript.includes('open my instagram profile')){
               if(JSON.parse(userData).instagram){
                    readOut('opening your instagram profile');
                    let a = window.open(`https://www.instagram.com/${JSON.parse(userData).instagram}`);
                    windowsB.push(a);
               }else readOut('sir i didnt found your instagram information');
          }
          if(transcript.includes('open my twitter profile')){
               readOut('opening your twitter profile');
               let a = window.open(`https://twitter.com/${JSON.parse(userData).twitter}`);
               windowsB.push(a);
          }
          if(transcript.includes('open twitter')){
               readOut('opening twitter sir');
               let a = window.open(`https://twitter.com/`);
               windowsB.push(a);
          }
          if(transcript.includes('open my github profile')){
               readOut('opening your github profile');
               let a = window.open(`https://github.com/${JSON.parse(userData).github}`);
               windowsB.push(a);
          }
          if(transcript.includes('open github')){
               readOut('opening github');
               let a = window.open('https://github.com/');
               windowsB.push(a);
          }
          if(transcript.includes('open calendar')){
               readOut('opening calendar');
               let a = window.open('https://calendar.google.com/');
               windowsB.push(a);
          }
          if(transcript.includes('close all tabs')){
               readOut('closing all tabs sir');
               windowsB.forEach((event) => {
                    event.close();
               });
          }
          if(transcript.includes('top headlines')){
               readOut('These are todays top headlines sir');
               getNews();
          }
          if(transcript.includes('news regarding')){
               let input = transcript;
               let a = input.indexOf('regarding');
               input = input.split("");
               input.splice(0,a + 9);
               input.shift();
               input.pop();
               readOut(`heres some headlines on ${input.join("")}`);
               getCategoryNews(input.join(""));
          }
     }
     if(localStorage.getItem('lang') === 'hi-IN'){
          if(transcript.includes('हैलो जार्विस')) readOutHindi('हैलो सर');
          if(transcript.includes('इंग्लिश में बदलो')){
               readOutHindi('इंग्लिश में बदल रहा हूँ');
               speech_language = 'en-US';
               localStorage.setItem('language','en-US');
               stoppingRecognition = true;
               speechRecognition.stop();
               location.reload();
               readOut('ready to go sir');
          }
     }
}
speechRecognition.onend = function (){
     if(stoppingRecognition === false){
          setTimeout(() => {
               speechRecognition.start();
          },500);
     }else if(stoppingRecognition === true){
          speechRecognition.stop();
          document.querySelector('#stop_jarvis_button').style.display = 'none';
     }
};
function autoJarvis(){
     setTimeout(() => {
          speechRecognition.start();
     },1000);
}
document.querySelector('#jarvis_start').addEventListener('click',() => {
     speechRecognition.start();
});
document.querySelector('#start_jarvis_button').addEventListener('click',() => {
     speechRecognition.start();
});
document.querySelector('#stop_jarvis_button').addEventListener('click',() => {
     stoppingRecognition = true;
     speechRecognition.stop();
});
const language = navigator.language;
let dayNumber = date.getDate();
let year = date.getFullYear();
let dayName = date.toLocaleString(language,{weekday: 'long'});
let monthName = date.toLocaleString(language,{month: 'long'});
document.querySelector('#month').innerHTML = monthName;
document.querySelector('#day').innerHTML = dayName;
document.querySelector('#date').innerHTML = dayNumber
document.querySelector('#year').innerHTML = year;
document.querySelector('.calender').addEventListener('click',() => {
     window.open('https://calender.google.com');
});
async function getNews(){
     const url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=b0712dc2e5814a1bb531e6f096b3d7d3';
     const request = new Request(url);
     await fetch(request).then((response) => response.json()).then((data) => {
          let arrayNews = data.articles;
          arrayNews.length = 10;
          let a = [];
          arrayNews.forEach((event,index) => {
               a.push(index + 1);
               a.push('..........');
               a.push(event.title);
               a.push('..........');
          });
          readOut(a);
     });
}
async function getCategoryNews(category){
     const url = 'https://newsapi.org/v2/everything?' + `q=${category}&` + `from=${yyyy}-${mm}-${dd}&` + 'sortBy=popularity&' + 'apiKey=b0712dc2e5814a1bb531e6f096b3d7d3';
     const request = new Request(url);
     await fetch(request).then((response) => response.json()).then((data) => {
          let arrayNews = data.articles;
          arrayNews.length = 10;
          let a = [];
          arrayNews.forEach((event,index) => {
               a.push(index + 1);
               a.push('..........');
               a.push(event.title);
               a.push('..........');
          });
          readOut(a);
     });
}