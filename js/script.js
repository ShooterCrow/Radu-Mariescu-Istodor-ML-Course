const canvas = document.querySelector("#canvas");
const container = document.querySelector("#content");
const instructionDiv = document.querySelector(".instructionDiv");
let userInputBox = document.querySelector("#username");

const sp = new SketchPad(container, canvas, 300);
const undoBtn = document.querySelector("#undoBtn");
let index = 0;
const itemsToDraw = ["car", "tree", "jug", "door", "tree", "hanger", "bulb", "cup", "bottle"]

const data = {
    username: null,
    session: new Date().getTime(),
    drawin: {}
}

function start (evt) {
    let uname = userInputBox.value.trim()
    if (evt.key === "Enter") {
        if (uname) {
            data.username = uname;
            userInputBox.value = ""
            userInputBox.style.display = "none";
            let instructions = document.createElement("p");
            let nxtBtn = document.createElement("button");
            nxtBtn.innerText = "Next";
            nxtBtn.addEventListener("click", next)
            instructions.innerText = "Please draw a " + itemsToDraw[index]
            instructionDiv.appendChild(instructions)
            instructionDiv.appendChild(nxtBtn)
            userInputBox.innerHTML = "YYY";
            canvas.style.display = "block";
            undoBtn.style.display = "block";
        } else {
            alert("Please enter your username");
        }

    }
}

function next() {
    alert()
}