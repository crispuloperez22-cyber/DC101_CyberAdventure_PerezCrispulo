const sceneImage = document.getElementById("sceneImage");
const storyText = document.getElementById("storyText");
const choices = document.getElementById("choices");
const overlayPlayer = document.getElementById("overlayPlayer");
const overlayTeacher = document.getElementById("overlayTeacher");

let currentLevel = 0;

// LEVELS
const levels = [
  {
    question: "Crispulo Perez, you received a suspicious email claiming 'Free exam answers'. What will you do?",
    choices: ["Open the email","Ignore and report to Ma'am Arlyn"],
    gifs: ["assets/level1_open.gif","assets/level1_ignore.gif"],
    next: [1,1],
    showPlayer: true,
    showTeacher: false
  },
  {
    question: "While browsing the school portal, a pop-up appears asking for personal info. What do you do?",
    choices: ["Click the pop-up","Ignore it"],
    gifs: ["assets/level2_click.gif","assets/level2_ignore.gif"],
    next: [2,2],
    showPlayer: true,
    showTeacher: true
  },
  {
    question: "Ma'am Arlyn asks you to create a new password for your school account. Choose wisely!",
    choices: ["123456","P@ssw0rd!","qwerty"],
    gifs: ["assets/level3_wrong.gif","assets/level3_correct.gif","assets/level3_wrong.gif"],
    next: [3,3,3],
    showPlayer: true,
    showTeacher: true
  },
  {
    question: "You receive a friend request from 'Unknown Student' on school chat. Accept or Reject?",
    choices: ["Accept","Reject"],
    gifs: ["assets/level4_accept.gif","assets/level4_reject.gif"],
    next: [4,4],
    showPlayer: true,
    showTeacher: false
  },
  {
    question: "A quiz link promises bonus points. Click or Verify first with Ma'am Arlyn?",
    choices: ["Click","Verify first"],
    gifs: ["assets/level5_wrong.gif","assets/level5_correct.gif"],
    next: [5,5],
    showPlayer: true,
    showTeacher: true
  },
  {
    question: "Free Wi-Fi offered in the library. Connect or wait for secure network?",
    choices: ["Connect","Wait"],
    gifs: ["assets/level6_wrong.gif","assets/level6_correct.gif"],
    next: [6,6],
    showPlayer: true,
    showTeacher: false
  },
  {
    question: "You found a USB on the school lab floor. Plug it in or give it to Ma'am Arlyn?",
    choices: ["Plug it in","Give to Ma'am Arlyn"],
    gifs: ["assets/level7_wrong.gif","assets/level7_correct.gif"],
    next: [7,7],
    showPlayer: true,
    showTeacher: true
  },
  {
    question: "Group project files are shared online. Download without checking or verify first?",
    choices: ["Download","Verify first"],
    gifs: ["assets/level8_wrong.gif","assets/level8_correct.gif"],
    next: [8,8],
    showPlayer: true,
    showTeacher: false
  },
  {
    question: "School portal asks you to re-enter your password due to 'session expired'. Enter or confirm with Ma'am Arlyn?",
    choices: ["Enter password","Confirm with Ma'am Arlyn"],
    gifs: ["assets/level9_wrong.gif","assets/level9_correct.gif"],
    next: [9,9],
    showPlayer: true,
    showTeacher: true
  },
  {
    question: "Final Challenge! Ma'am Arlyn asks: 'Enable two-factor authentication for your school account?'",
    choices: ["Yes","No"],
    gifs: ["assets/level10_success.gif","assets/level10_fail.gif"],
    next: [null,null],
    showPlayer: true,
    showTeacher: true
  }
];

// SOUND
function playSound(type){
  let sound;
  switch(type){
    case "correct": sound = new Audio("assets/correct.mp3"); break;
    case "wrong": sound = new Audio("assets/wrong.mp3"); break;
    case "finalsuccess": sound = new Audio("assets/finalsuccess.mp3"); break;
    case "finalfail": sound = new Audio("assets/finalfail.mp3"); break;
  }
  if(sound) sound.play();
}

// START LEVEL
function startLevel(level){
  const lvl = levels[level];
  storyText.textContent = lvl.question;
  sceneImage.src = lvl.gifs[0];

  overlayPlayer.style.display = lvl.showPlayer ? "block" : "none";
  overlayTeacher.style.display = lvl.showTeacher ? "block" : "none";

  choices.innerHTML = "";
  lvl.choices.forEach((choice,index)=>{
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => selectChoice(level,index);
    choices.appendChild(btn);
  });
}

// SELECT CHOICE
function selectChoice(level,choiceIndex){
  const lvl = levels[level];
  const btn = choices.children[choiceIndex];
  sceneImage.src = lvl.gifs[choiceIndex];

  if(lvl.gifs[choiceIndex].includes("wrong")){
    btn.classList.add("wrong");
    playSound("wrong");
  } else if(lvl.gifs[choiceIndex].includes("correct") || lvl.next[choiceIndex] === null){
    btn.classList.add("correct");
    if(lvl.next[choiceIndex] === null && choiceIndex === 0) playSound("finalsuccess");
    else if(lvl.next[choiceIndex] === null) playSound("finalfail");
    else playSound("correct");
  }

  setTimeout(()=> btn.classList.remove("wrong","correct"),500);

  if(lvl.next[choiceIndex] === null){
    storyText.textContent = "🎉 Congratulations Crispulo Perez! You completed the Cyber Adventure safely with guidance from Ma'am Arlyn!";
    choices.innerHTML = `<button onclick="restartGame()">Play Again</button>`;
  } else {
    setTimeout(()=>{
      currentLevel = lvl.next[choiceIndex];
      startLevel(currentLevel);
    },1200);
  }
}

// RESTART
function restartGame(){
  currentLevel = 0;
  startLevel(currentLevel);
}

// INIT
startLevel(currentLevel);
