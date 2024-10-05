const canvas = document.querySelector("#canvas");
const container = document.querySelector("#content");
const instructionDiv = document.querySelector(".instructionDiv");
let userInputBox = document.querySelector("#username");
let instructions
let nxtBtn
const sp = new SketchPad(container, canvas, 300);
const undoBtn = document.querySelector("#undoBtn");
let index = 0;
const itemsToDraw = ["car", "tree", "jug", "fish", "tree", "hanger", "bulb", "cup", "bottle"]

const data = {
    username: null,
    session: new Date().getTime(),
    drawin: {}
}

function start(evt) {
    let uname = userInputBox.value.trim()
    if (evt.key === "Enter") {
        if (uname) {
            data.username = uname;
            userInputBox.value = ""
            userInputBox.style.display = "none";
            instructions = document.createElement("p");
            nxtBtn = document.createElement("button");
            nxtBtn.innerText = "Next";
            nxtBtn.addEventListener("click", next)
            const label = itemsToDraw[index]
            instructions.innerText = "Please draw a " + label
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
    if (!sp.paths.length) {
        alert("Please Draw Sometin")
        return
    }
    let label = itemsToDraw[index]
    index++
    let nextLabel = itemsToDraw[index]
    if (nextLabel) {
        instructions.innerText = "Nice, now draw a " + nextLabel
        data.drawin[label] = sp.paths
        sp.reset(1)
    }
    else if (!nextLabel) {
        undoBtn.style.display = "none";
        canvas.style.display = "none";
        nxtBtn.innerText = "Save";
        nxtBtn.onclick = save;
        instructions.innerText = "Thank you for participating"
    }
}

function save() {
    nxtBtn.style.display = "none";
    instructions.innerText = "Add file to project folder";
    setTimeout(() => {
        const m = document.createElement("marquee");
        m.innerHTML = "<h1>PRESS ENTER<h1>";
        container.appendChild(m)
    }, 1000);

    const el = document.createElement('a');
    el.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify(data)))

    const fileName = data.session+".json";
    el.setAttribute("download", fileName);

    document.body.onkeydown = (e) => {
        if (e.key === "Enter") {
            document.body.appendChild(el)
            el.click()
            document.body.removeChild(el)
        }
    }
}