const fs = require('fs');
const constants = {};

constants.DATA_DIR = "../data";
constants.RAW_DIR = constants.DATA_DIR + "/raw";
constants.DATASET_DIR = constants.DATA_DIR + "/dataset";
constants.IMAGE_DIR = constants.DATASET_DIR + "/image";
constants.JSON_DIR = constants.DATASET_DIR + "/json";
constants.SAMPLES = constants.DATASET_DIR + "/samples.json";


const filenames = fs.readdirSync(constants.RAW_DIR);

const samples = [];
let id = 1;

filenames.forEach(fn => {
    const content = fs.readFileSync(constants.RAW_DIR+"/"+fn)
    const {session,student,drawings} = JSON.parse(content)
    for (let label in drawings) {
        samples.push({id,label,student,student_id:session})
        const paths = drawings[label]
        fs.writeFileSync(constants.JSON_DIR+"/"+id+".json", JSON.stringify(paths))
    }
    id++

})

fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples))