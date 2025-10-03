let allbox = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#btn");
let newGamebtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winpatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Reset game function
const resetgame = () => {
  turnO = true;
  msgcontainer.classList.add("hide"); // hide winner message
  for (let box of allbox) {
    box.innerHTML = "";   // clear X/O
    box.disabled = false; // enable all boxes
  }
};

// Game box click
allbox.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerHTML = "O";
      turnO = false;
    } else {
      box.innerHTML = "X";
      turnO = true;
    }
    box.disabled = true;

    // Add animation class
    box.classList.add("animate-symbol");
    setTimeout(() => {
      box.classList.remove("animate-symbol");
    }, 300); // duration same as CSS animation

    checkwinner();
  });
});

// Disable all boxes
const disableBoxes = () => {
  for (let box of allbox) box.disabled = true;
};

// Show winner
const showwinner = (winner) => {
  msg.innerHTML = `Congratulations, Winner is ${winner}`;
  msgcontainer.classList.remove("hide");
  disableBoxes();
};

// Check winner
const checkwinner = () => {
  for (let pattern of winpatterns) {
    let pos1val = allbox[pattern[0]].innerHTML;
    let pos2val = allbox[pattern[1]].innerHTML;
    let pos3val = allbox[pattern[2]].innerHTML;

    if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showwinner(pos1val);
      }
    }
  }
};

// Event listeners
resetBtn.addEventListener("click", resetgame);
newGamebtn.addEventListener("click", resetgame);
