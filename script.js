const button = document.querySelector(".btn");
const jokeBox = document.querySelector(".joke-box");

function speakText(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 1;

    window.speechSynthesis.cancel(); 
    window.speechSynthesis.speak(speech);
}

async function tellJoke() {
    try {
        const response = await fetch("https://official-joke-api.appspot.com/jokes/programming/random");
        const data = await response.json();

        const joke = `${data[0].setup} ... ${data[0].punchline}`;

        jokeBox.classList.add("show-joke");
        jokeBox.textContent = joke;
        speakText(joke);
        setTimeout(() => {
            jokeBox.classList.remove("show-joke");
            jokeBox.textContent = "";
        }, 5000);
    } catch (error) {
        console.error("Error fetching joke:", error);
    }
}

button.addEventListener("click", tellJoke);

document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "j") {
        tellJoke(); 
    }
});

// const button=document.querySelector(".btn");
// const jokeBox=document.querySelector(".joke-box");

// button.addEventListener("click",async()=>{   
//     try{
//         const response=await fetch("https://official-joke-api.appspot.com/jokes/programming/random");
//         const data=await response.json();
//         jokeBox.classList.add("show-joke");
//         jokeBox.textContent=`${data[0].setup} - ${data[0].punchline}`;
//         setTimeout(()=>{
//             jokeBox.classList.remove("show-joke");   
//             jokeBox.textContent="";
//         },4000);
//     }catch(error){
//         console.error("Error fetching joke:",error);
//     }
// });
// // use J to tell a joke
// document.addEventListener("keydown",(event)=>{
//     if(event.key.toLowerCase()==="j"){
//         button.click();
//     }
// });