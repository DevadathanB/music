song = "";
song1 = "";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
scoreleftwrist = 0;
scorerightwrist = 0;

function setup() {
    video = createCapture(VIDEO);
    canvas = createCanvas(500, 400);
    video.hide();
    canvas.position(390, 200);
    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 500, 400);
    fill('red')
    stroke('red')
    if (scoreleftwrist > 0.1) {
        song1.stop()
        circle(leftWristx, leftWristy, 20);
        if (song1.isPlaying() == false) {
            song1.play()
        }
        document.getElementById('volume').innerHTML = "Volume = " + volume;
        song1.setVolume(volume);
    }
    if (scorerightwrist > 0.1) {
        song2.stop()
        circle(rightWristx, rightWristy, 20);
        if (song2.isPlaying() == false) {
            song2.play()
        }
        document.getElementById('volume').innerHTML = "Volume = " + volume;
        song2.setVolume(volume);
    }
}

function modelloaded() {
    console.log("Model Loaded!");
}

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreleftwrist = results[0].pose.leftWrist.confidence;
        scorerightwrist = results[0].pose.rightWrist.confidence;
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("leftWristx and leftWristy" + leftWristx + "and" + leftWristy);
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("rightWristx and rightWristy" + rightWristx + "and" + rightWristy);
    }
}