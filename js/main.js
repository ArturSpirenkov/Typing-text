import { paragraphs } from "./paragraph.js";

const typingText = document.querySelector(".typing-text p");
const inputField = document.querySelector(".wrapper .input-field");
const mistakeTag = document.querySelector(".mistake span");
const timeCount = document.querySelector(".result-details .time span");
const speedTyping = document.querySelector(".result-details .wpm span");

let mistakes = 0;
let maxTime = 60;
let timeLeft = maxTime;


function randomParagraphs() {
  let randomIndex = ~~(Math.random() * paragraphs.length);
  paragraphs[randomIndex].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });
  //focusing inputField use keydown or click event
  document.addEventListener("keydown", () => inputField.focus());
  typingText.addEventListener("click", () => inputField.focus()); 
}

function initTyping(e) {
  let charsInput = inputField.value.length;
  let typedChar = inputField.value.split(''); 
  const textCharacters = typingText.querySelectorAll('span');  
  if (typedChar.length >= textCharacters.length) {
    inputField.value = e.target.value.slice(0, textCharacters.length);
  }  
  for (let i = 0; i < textCharacters.length; i++) {
    textCharacters[i].classList.remove("correct", "incorrect", "active");
    if(typedChar[i]) {
      if (typedChar[i] === textCharacters[i].textContent) {
        textCharacters[i].classList.add("correct");
      } else {
        textCharacters[i].classList.add("incorrect");
      }
    }
  }
  if (textCharacters[charsInput]) {
  textCharacters[charsInput].classList.add("active");
  }
}

function currentTyping() {
  if(60 - timeLeft == 0) {
    speedTyping.innerHTML = 0;
    return;
  }
  let speed = (inputField.value.length / (60 - timeLeft)) * 60;
  speedTyping.innerHTML = ~~speed;
}

function changeTime() {
  timeCount.innerHTML = timeLeft;
  if (timeLeft > 0) {
    timeLeft--;
    setTimeout(()=> changeTime(), 1000);
  } else {
    clearInterval();
  }
}

inputField.addEventListener("input", initTyping);
randomParagraphs();
initTyping();
changeTime();
setInterval(currentTyping, 1000);















