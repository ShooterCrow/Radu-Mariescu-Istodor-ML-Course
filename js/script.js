const canvas = document.querySelector("#canvas");
const container = document.querySelector("#content");
const userInputBox = document.querySelector("#username");

const sp = new SketchPad(container, canvas, 300);
const undoBtn = document.querySelector("#undoBtn");

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
            canvas.s
            canvas.style.display = "block";
            undoBtn.style.display = "block";
        } else {
            alert("Please enter your username");
        }

    }
}