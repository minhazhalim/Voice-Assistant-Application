const talk = document.querySelector('.talk');
const content = document.querySelector('.content');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition =  new SpeechRecognition();
function speak(text){
    const speechSynthesisUtterance = new SpeechSynthesisUtterance(text);
    speechSynthesisUtterance.rate = 1;
    speechSynthesisUtterance.volume = 1;
    speechSynthesisUtterance.pitch = 1;
    window.speechSynthesis.speak(speechSynthesisUtterance);
}
function wishMe(){
    const day = new Date();
    const hour = day.getHours();
    if(hour>=0 && hour<12){
        speak("Good Morning Boss...")
    }
    else if(hour>12 && hour<17){
        speak("Good Afternoon Master...")
    }
    else{
        speak("Good Evening Sir...")
    }
}
window.addEventListener('load', ()=>{
    speak("Initializing JARVIS..");
    wishMe();
});
function takeCommand(message){
    if(message.includes('hey') || message.includes('hello')){
        speak("Hello Sir, How May I Help You?");
    }
    else if(message.includes("open google")){
        window.open("https://google.com","_blank");
        speak("Opening Google...")
    }
    else if(message.includes("open youtube")){
        window.open("https://youtube.com","_blank");
        speak("Opening Youtube...")
    }
    else if(message.includes("open facebook")){
        window.open("https://facebook.com","_blank");
        speak("Opening Facebook...")
    }
    else if(message.includes('what is') || message.includes('who is') || message.includes('what are')){
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`,"_blank");
        const finalText = "This is what i found on internet regarding " + message;
	    speak(finalText);
    }
    else if(message.includes('wikipedia')){
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`,"_blank");
        const finalText = "This is what i found on wikipedia regarding " + message;
        speak(finalText);
    }
    else if(message.includes('time')){
        const time = new Date().toLocaleString(undefined,{hour: "numeric",minute: "numeric"})
        const finalText = time;
        speak(finalText);
    }
    else if(message.includes('date')){
        const date = new Date().toLocaleString(undefined,{month: "short",day: "numeric"})
        const finalText = date;
        speak(finalText);
    }
    else if(message.includes('calculator')){
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
    }
    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on google";
        speak(finalText);
    }
}
recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
}
talk.addEventListener('click',() => {
    content.textContent = "Listening...."
    recognition.start();
});