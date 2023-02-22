const typingText = document.querySelector(".typing-text p");
inputField = document.querySelector(".wrapper .input-field ");
mistakeTag = document.querySelector(".mistake span");
timeTag = document.querySelector(".time span b");
wpmTag = document.querySelector(".wpm span ");
cpmTag = document.querySelector(".cpm span ");
tryAgainBtn = document.querySelector("button");

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex =  mistakes = isTyping = 0;

function randomPara(){
    let randomValue = Math.floor(Math.random() * para.length);
    typingText.innerHTML = '';
    para[randomValue].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown",()=> inputField.focus());
    typingText.addEventListener("click",()=> inputField.focus());
};
function initType(){
    const character = typingText.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];
    if(charIndex < character.length - 1 && timeLeft > 0){
        if(!isTyping){ 
            timer = setInterval(initTimer,1000);
            isTyping = true;
        }
        if(typedChar == null){
            charIndex--;
            if(character[charIndex].classList.contains("incorrect")){
                mistakes--;
        }
        character[charIndex].classList.remove("correct","incorrect")
        }else{
            if(character[charIndex].innerText === typedChar){
                character[charIndex].classList.add("correct");
            }else{
                mistakes++;
                character[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        let wpm = Math.round((((charIndex - mistakes)/5) / (maxTime - timeLeft)) * 60)
        wpm = wpm<0 || !wpm || wpm === Infinity ? 0 : wpm; 
        wpmTag.innerText = wpm;
        character.forEach(span => span.classList.remove("active"));
        character[charIndex].classList.add("active");
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    }else{
        inputField.value ="";
        clearInterval(timer)
    }
   

function initTimer(){
    if(timeLeft>0){
        timeLeft--;
        timeTag.innerText = timeLeft;
    }else{
        clearInterval(timer)
    }
}

} 
function resetGame(){
    randomPara();
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
    inputField.value = '';
}
randomPara();
inputField.addEventListener("input",initType);
tryAgainBtn.addEventListener("click",resetGame);