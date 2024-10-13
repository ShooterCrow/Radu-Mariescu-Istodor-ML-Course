const fs = require('fs');
const {createCanvas} = require('canvas')
const constants = require('../universal/constants.js');
const draw = require('../universal/draw.js');
const utils = require("../universal/utils.js")

const canvas = createCanvas(400, 400)
const ctx = canvas.getContext("2d")


//read tje file names, so we can submit it in tje forEacj functin 
//below in otjer to read tje content of tje file
const fileNames = fs.readdirSync(constants.RAW_DIR);
const samples = [];
let id = 1;

fileNames.forEach(fn => {
    const content = fs.readFileSync(constants.RAW_DIR + "/" + fn)
    const { session, student, drawings } = JSON.parse(content);
    for (let label in drawings) {
        samples.push({
            id,
            student,
            label,
            student_id: session
        })

        const paths = drawings[label]
        fs.writeFileSync(constants.JSON_DIR + "/" + id + ".json", JSON.stringify(drawings[label]))

        createImageFile(constants.IMG_DIR + "/" + id + ".png", paths)
        utils.displayPercent(id, fileNames.length * 8)
        id++ 
    }
});

fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));
fs.writeFileSync(constants.SAMPLES_JS, "const samples =" + JSON.stringify(samples) + ";");

function createImageFile (outputFile, paths) {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    draw.paths(ctx,paths)

    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(outputFile, buffer);
}