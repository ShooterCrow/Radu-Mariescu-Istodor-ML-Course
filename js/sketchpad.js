class SketchPad {
    constructor(container, canvas, size = 500) {
        this.canvas = canvas;
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style = `
        background-color:white;
        border: 1px solid;
        display: none;
        `;

        this.undoBtn = document.createElement("button");
        this.undoBtn.innerText = "Undo";
        this.undoBtn.setAttribute("id", "undoBtn");
        this.undoBtn.disabled = true
        this.undoBtn.style = `
        padding: 10px 7px;
        display: none;
        `;
        this.lineBr = document.createElement("br");
        container.appendChild(this.lineBr)
        container.appendChild(this.undoBtn)

        this.isDrawin = false;
        this.ctx = this.canvas.getContext("2d");
        this.paths = [];
        this.#addEventListeners();
    }

    #addEventListeners() {
        this.canvas.onmousedown = (e) => {
            const mouse = this.#mouseLocation(e)
            this.paths.push([mouse]);
            this.isDrawin = true
            if (this.paths.length) this.undoBtn.disabled = false
        }


        this.canvas.onmousemove = (e) => {
            if (this.isDrawin) {
                this.mouse = this.#mouseLocation(e)
                const lastPath = this.paths[this.paths.length - 1];
                lastPath.push(this.mouse)
                this.#redraw();
            }
        }
        

        this.canvas.onmouseup = () => {
            this.isDrawin = false
        }

        this.undoBtn.onclick = () => {
            this.paths.pop()
            this.#redraw()
            if (!this.paths.length) this.undoBtn.disabled = true
        }
        this.undoBtn.ondblclick = () => {
            this.paths = []
            this.#redraw()
            if (!this.paths.length) this.undoBtn.disabled = true
        }

        //for mobile devices
        this.canvas.ontouchstart = (e) => {
            const toucheLocation = e.touches[0]
            this.canvas.onmousedown(toucheLocation)
        }
        this.canvas.ontouchmove = (e) => {
            const toucheLocation = e.touches[0]
            this.canvas.onmousemove(toucheLocation)
        }
        this.canvas.ontouchend = () => {
            this.canvas.onmouseup()
        }
    }
    
    #redraw() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        draw.paths(this.ctx,this.paths)
    }

    #mouseLocation(x) {
        const rect = this.canvas.getBoundingClientRect();
        return [Math.round(x.clientX - rect.left), Math.round(x.clientY - rect.top)]

    }

}
