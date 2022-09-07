song1 = '';
song2 = '';
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_left_wrist = 0;
score_right_wrist = 0;
status_of_song1 = "";
status_of_song2 = ""; 

function preload(){
song1 = loadSound("HeatWaves.mp3");
song2 = loadSound("BadHabits.mp3");   
}
function setup(){
 canvas = createCanvas(500, 500);
 canvas.center();
 video = createCapture(VIDEO);
 video.hide();

poseNet = ml5.poseNet(video, modelLoaded); 
poseNet.on("pose", gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;  
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX = " + leftWristX + " and LeftWristY = " + leftWristY);
        
        rightWristX = results[0].pose.rightWrist.x;  
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX = " + rightWristX + " and RightWristY = " + rightWristY);

        score_left_wrist = results[0].pose.keypoints[9].score;
    }
}

function draw(){
    image(video, 0, 0, 500, 500);

    fill("#89CFF0");
    stroke("#89CFF0");

    status_of_song1 = song1.isPlaying();
    status_of_song2 = song2.isPlaying();

    if(score_left_wrist > 0.2){
        circle(leftWristX, leftWristY, 20);

			song1.stop();

		if(status_of_song2 == false)
		{
			song1.play();
			document.getElementById("song_name").innerHTML = "Playing - Heat Waves";
		}
	}


    
}