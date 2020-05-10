// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
KNN Classification on Webcam Images with poseNet. Built with p5.js
=== */
// let video;
// // Create a KNN classifier
// let knn;
let poseNet;
let poses = [];

// // Create the label of the target pose
// let targetLabel;

// Set the aethetics of the page
let bg;
let y = 0;

// Create the variables needed for detect the right hand coordination
let timer;
let count = 0;
let rwx = 0;
let rwy = 0;
let time_count = 0;
let time = 60;
let model = 1;
let goin_b = true;
let remaining = 0;
let rem = 0;
let frm = 0; 

function preload(){
  bg = loadImage('pic/bg.jpg');
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('videoContainer');
  video = createCapture(VIDEO);
  video.size(width, height);

  src = createVideo('video/tQuarrel1.mp4');
  src.play();

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
}

function draw() {
  background(bg);

  image(src, windowWidth/2 - windowHeight/9*4, windowHeight/4, windowHeight/9*8, windowHeight/2);
  //mirror the video
  translate(video.width, 0)
  scale(-1.0, 1.0);
  
  stroke(226, 204, 0);
  strokeWeight(1);
  line(0, y, width, y);
  y++;
  if (y > height) {
    y = 0;
  }

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
}


// Click 's' to save the examples
function keyPressed(){
  // if (key == 's'){
  //   knn.save('pose.json');
  // }
}

function modelReady() {
  // select('#status').html('model Loaded');
  // knn = ml5.KNNClassifier()
  // knn.load('pose.json', function(){
  //   console.log('data loaded');
  //   // classify();
  // });
}

// Add the current frame from the video to the classifier
function addExample(label) {
  // // Convert poses results to a 2d array [[score0, x0, y0],...,[score16, x16, y16]]
  // const poseArray = poses[0].pose.keypoints.map(p => [p.score, p.position.x, p.position.y]);
  // if (poseArray) {
  // // Add an example with a label to the classifier
  //   knn.addExample(poseArray, label);
  //   updateCounts();
  // }
}

// Predict the current frame.
function classify() {
//   setInterval(function(){
//   // Get the total number of labels from knnClassifier
//   const numLabels = knn.getNumLabels();
//   if (numLabels <= 0) {
//     console.error('There is no examples in any label');
//     return;
//   }

//   const firstPose = poses[0];
//   if (firstPose) {
//     console.log('now is classifying');
//   // Convert poses results to a 2d array [[score0, x0, y0],...,[score16, x16, y16]]
//     const poseArray = poses[0].pose.keypoints.map(p => [p.score, p.position.x, p.position.y]);
//   // Use knnClassifier to classify which label do these features belong to
//   // You can pass in a callback function `gotResults` to knnClassifier.classify function
//     knn.classify(poseArray, gotResults);
//   }
// },5000)
}

// A util function to create UI buttons
function createButtons() {
  // // When the button is pressed, add the current frame
  // // from the video with a label of "1" to the classifier
  // button1 = select('#addClass1');
  // button1.mousePressed(function() {
  //   addExample('1');
  // });
  // button2 = select('#addClass2');
  // button2.mousePressed(function() {
  //   addExample('2');
  // });
  // button3 = select('#addClass3');
  // button3.mousePressed(function() {
  //   addExample('3');
  // });
  // button4 = select('#addClass4');
  // button4.mousePressed(function() {
  //   addExample('4');
  // });
  // button5 = select('#addClass5');
  // button5.mousePressed(function() {
  //   addExample('5');
  // });
  // button6 = select('#addClass6');
  // button6.mousePressed(function() {
  //   addExample('6');
  // });
  // button7 = select('#addClass7');
  // button7.mousePressed(function() {
  //   addExample('7');
  // });
  // button8 = select('#addClass8');
  // button8.mousePressed(function() {
  //   addExample('8');
  // });

    // // Reset buttons
    // resetBtn1 = select('#reset1');
    // resetBtn1.mousePressed(function() {
    //   clearLabel('1');
    // });

    // resetBtn2 = select('#reset2');
    // resetBtn2.mousePressed(function() {
    //   clearLabel('2');
    // });

  //   resetBtn3 = select('#reset3');
  //   resetBtn3.mousePressed(function() {
  //     clearLabel('3');
  //   });

  //   resetBtn4 = select('#reset4');
  //   resetBtn4.mousePressed(function() {
  //     clearLabel('4');
  //   });


  //   resetBtn5 = select('#reset5');
  //   resetBtn5.mousePressed(function() {
  //     clearLabel('5');
  //   });


  //   resetBtn6 = select('#reset6');
  //   resetBtn6.mousePressed(function() {
  //     clearLabel('6');
  //   });


  //   resetBtn7 = select('#reset7');
  //   resetBtn7.mousePressed(function() {
  //     clearLabel('7');
  //   });


  //   resetBtn8 = select('#reset8');
  //   resetBtn8.mousePressed(function() {
  //     clearLabel('8');
  //   });

  // // Predict button
  // start = select('#start');
  // start.mousePressed(classify);

  // // Clear all classes button
  // buttonClearAll = select('#clearAll');
  // buttonClearAll.mousePressed(clearAllLabels);
}
   
// Show the results
function gotResults(error, result, targetLabel) {
  // // Display any error
  // if (error) {
  //   console.error(error);
  // }

  // if (result.confidencesByLabel) {  
  //   const confidences = result.confidencesByLabel;    
  //   // result.label is the label that has the highest confidence
  //   if (confidences){
  //     console.log('this is the confidence:'+confidences);
  //   }

  //     if (result.label) {
  //     select('#confidence').html(`${confidences[result.label] * 100} %`);
  //   }
  //   select('#confidence1').html(`${confidences['1'] ? confidences['1'] * 100 : 0} %`);
  //   // select('#confidence2').html(`${confidences['2'] ? confidences['2'] * 100 : 0} %`); 
  //   // select('#confidence3').html(`${confidences['3'] ? confidences['3'] * 100 : 0} %`);  
  //   // select('#confidence4').html(`${confidences['4'] ? confidences['4'] * 100 : 0} %`);  
  //   // select('#confidence5').html(`${confidences['5'] ? confidences['5'] * 100 : 0} %`);  
  //   // select('#confidence6').html(`${confidences['6'] ? confidences['6'] * 100 : 0} %`);  
  //   // select('#confidence7').html(`${confidences['7'] ? confidences['7'] * 100 : 0} %`);   
  //   // select('#confidence8').html(`${confidences['8'] ? confidences['8'] * 100 : 0} %`);   

  //   for (targetLabel = 1; targetLabel ++; targetLabel < 8) {
  //     console.log('this is the result label:'+result.label);
  //       if (str(targetLabel) == str(result.label)){
  //       let strLabel = str(targetLabel)+'.png';
  //       console.log('this is the strLabel:'+strLabel);
  //       img = loadImage(strLabel); 
  //       console.log('this is the targetLabel:'+targetLabel);
  //     }
  //       if(targetLabel == 9){targetLabel == 1;break;};
  //   }

  // }

  // classify();
}

// Update the example count for each label	
function updateCounts() {
  // const counts = knn.getCountByLabel();

  // select('#example1').html(counts['1'] || 0);
  // select('#example2').html(counts['2'] || 0);
  // select('#example3').html(counts['3'] || 0);
  // select('#example4').html(counts['4'] || 0);
  // select('#example5').html(counts['5'] || 0);
  // select('#example6').html(counts['6'] || 0);
  // select('#example7').html(counts['7'] || 0);
  // select('#example8').html(counts['8'] || 0);
}

// // Clear the examples in one label
function clearLabel(classLabel) {
  // knn.clearLabel(classLabel);
  // updateCounts();
}

// Clear all the examples in all labels
function clearAllLabels() {
  // knn.clearAllLabels();
  // updateCounts();
}

// Draw an ellipse on the wrist
function wristEllipse(x, y, size){
  fill(map(x, 0, width, 0, 255), map(y, 0, height, 0, 255), map(x + y, 0, width+height, 0, 255));
  noStroke();
  ellipse(x, y, size, size)
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        let eyeR = pose.rightEye;
        let eyeL = pose.leftEye;
        let d = dist(eyeL.x, eyeL.y, eyeR.x, eyeR.y);
        fill(255, 255, 255);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, d / 3.5, d / 3.5);
      }
    }
  }

  // When the confidence score is larger than 0.5, use right hand as the parameter
  if (poses.length > 0){
    if (poses[0].pose.rightWrist.confidence > 0.5){
      rwy = poses[0].pose.rightWrist.y;
      rwx = width - poses[0].pose.rightWrist.x;
    }else{
      rwx = mouseX;
      rwy = mouseY;
    }
  }

  push();
  translate(width, 0)
  scale(-1.0, 1.0);
  // Draw the ellipse
  wristEllipse(rwx, rwy, 50);
  print(rwx, rwy)
  
  if (rwx > 720 && rwx < 750 && rwy > 670 && rwy < 700) {
    print('hi2');
    src = createVideo('./video/iCatch2.mp4');
    src.play();
  } else if (rwx > 580 && rwx < 610 && rwy > 660 && rwy < 690) {
    print('hi3');
    src = createVideo('./video/iCatch3.mp4');
    src.play();
  } else if (rwx > 700 && rwx < 720 && rwy > 250 && rwy < 270) {
    print('hi4');
    src = createVideo('./video/iCatch4.mp4');
    src.play();
  } else if (rwx > 470 && rwx < 490 && rwy > 430 && rwy < 450) {
    print('hi5');
    src = createVideo('./video/iCatch5.mp4');
    src.play();
  } else if (rwx > 630 && rwx < 650 && rwy > 340 && rwy < 360) {
    print('hi6');
    src = createVideo('./video/iCatch6.mp4');
    src.play();
  } else if (rwx > 480 && rwx < 500 && rwy > 270 && rwy < 280) {
    print('bye');
    window.open('index.html');
    window.close();
  }
  pop();
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      strokeWeight(5);
      stroke(random(0,255), random(0,255), random(0,255));
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}