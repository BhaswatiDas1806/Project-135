status = "";
objects = [];

var synth = window.speechSynthesis;
var utterThis = new SpeechSynthesisUtterance(object + " found");

function setup() {
    canvas = createCanvas(600, 600);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(600, 600);
    video.hide();
}

function draw() {
    image(video, 0, 0, 600, 600);
    
    if (status != "") {
        for (let i = 0; i < objects.length; i++) {
            document.getElementById('status').innerHTML = "Status: Object Detected";

            fill('#FF0000');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label = object) {
                video.stop();
                objectDetector.detect(gotResult);

                document.getElementById('object_found_status').innerHTML = object + " found";
                synth.speak(utterThis); 
            }
            else {
                document.getElementById('object_found_status').innerHTML = object + " not found";
            }
        }
    }
}

function start() {
    cocossd = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object =  document.getElementById("object_name_input").value;
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}