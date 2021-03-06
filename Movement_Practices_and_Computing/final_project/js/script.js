let halo;
let sensorData;
let angle;
let glowing;
let ins;
//for the gradient
let c1, c2;
//for the tail
let c3, c4,c5;
let active = true;
let intro;
let done = false;
//for text blinking
let i = 0;
//for the end
let endNum = [];


function preload() {
  glowing = loadImage("pic/glow.png")
  surface = loadImage("pic/light.png")
  coral = loadImage("pic/coral.png")
  fish = loadImage("pic/fish.png")
  endPic = loadImage("pic/end.png")
  ins = loadSound("sound/first_ins.mp3")
}

function setup() {
  print('this is width'+windowWidth, 'this is height'+windowHeight)
  createCanvas(windowWidth, windowHeight);
  //load and play the video
  background(0)
  intro = createVideo("video/epiphany_intro.mp4")
  intro.size(windowWidth,windowHeight)
  intro.position(0,0);
  intro.play()
  //hide it when done and start draw()
  intro.onended(vidDone)
  imuConnection.onSensorData((device) => {
    sensorData = device.data;

  });
  //create the halo
  halo = new Halo(550,550,90);

  // Define colors

  c1 = color(0, 53, 138);
  c2 = color(0);
  c3 = color(255);
  c4 = color(133, 253, 255);
  c5 = color(198, 247, 204);
}

function draw() {

if(done){
  setGradient(0, 0, windowWidth, windowHeight, c1, c2);
  noStroke();
  image(coral,0,windowHeight-300,300,300)
  image(fish,windowWidth-450,180,450,450)
  image(surface,0,0,windowWidth,600)

    // create the blinking text
    i = i + 1
    // every 10th time, the condition is true
    if (i % 10 === 0){
      // fill with 50
      fill(50)
        .textSize(32);
      textFont('Courier')
      text('Swim to your desired places.',windowWidth/2-250,windowHeight-50);
    } else {
      // all the otehr times, fill with 255
      fill(255)
        .textSize(32);
      textFont('Courier')
      text('Swim to your desired places.',windowWidth/2-250,windowHeight-50);
    }



  if(!sensorData){
    return
  }

  angle = sensorData.euler[2];
  // console.log(angle)

  //show the halo
  halo.update(angle);
  halo.checkBoarder();
  halo.show();
//  let objPos = [[150,windowHeight-150],[windowWidth-225,405],[750,300]];

  if ((halo.pos.x >= 0 && halo.pos.x <= 300) && (halo.pos.y >=windowHeight-200)){
    setter(1)
  }
  else if ((halo.pos.x >=windowWidth-450) && (halo.pos.y >= 400 && halo.pos.y <= 600)){
    setter(2)
  }
  else if((halo.pos.x >=600 && halo.pos.x <= 900) && (halo.pos.y <=150)){
    setter(3)
  }
  else{
    active = true
  }

}


//if go through all go to end
  var unique = endNum.filter( onlyUnique );
  var array = [1,2,3]
  if ((unique.length === array.length) &&
    (unique.sort().every(function(value, index)
    { return value === array.sort()[index]}))){
      background(0);
      setGradient(0, 0, windowWidth, windowHeight, c1, c2);
      image(endPic,200,50);
    }
}




function setter(x){
  if (active && x ==1){
    console.log("one")
    window.open('infant.html','', 'width = 1536, height = 754')
    endNum.push(1)
    active = false
  }
  if (active && x ==2){
    console.log("two")
    window.open('teen.html','', 'width = 1536, height = 754')
    active = false
    endNum.push(2)
  }
  if (active && x ==3){
    console.log("three")
    window.open('ending.html', '','width = 1536, height = 754')
    active = false
    endNum.push(3)
  }

}
//hide the video, play the audio
function vidDone(){
  done = true
  intro.hide()
  ins.play()
}
//get the unique value in the array
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

//class halo
class Halo{
  constructor(x,y,angle){
    this.pos = createVector(x,y);
    this.vel = createVector();
    this.angle = radians(angle);
    this.trail = [];

  }
  checkBoarder(){
      if (this.pos.x < 0){
          this.pos.x = width;
      }else if (this.pos.x > width){
          this.pos.x = 0;
      }else if (this.pos.y < 0){
          this.pos.y = height;
      }else if (this.pos.y > height){
          this.pos.y = 0;
      }
  }
  update(angle){

    this.angle = radians(angle);
    this.vel = p5.Vector.fromAngle(this.angle);
    this.vel.normalize();
    this.pos.add(this.vel);
    if(this.trail.length > 150){
      this.trail.shift()

    }
//aliasing problem!!!!!ATTENTION!
      let pos2 = {x:this.pos.x,y: this.pos.y}
      this.trail.push(pos2);


  }
  show(){
    // stroke(255)
    // strokeWeight(10)
    image(glowing,this.pos.x-25,this.pos.y-25,80,80);
    // console.log(this.trail)

//draw the trail
    for (let i = 10; i < this.trail.length-10;i = i+2) {
      if(i <  40 && i % 5 == 0){
        continue
      }

      if(i % 7 == 0){
      c3.setAlpha(200)
      fill(c5)
      ellipse(this.trail[i].x + random(-10,10),this.trail[i].y + random(-10,10),random(5,10),random(5,10))
}
      if (i%5 == 0 && 60< i){
      c4.setAlpha(100)
      fill(c4)
      ellipse(this.trail[i].x + random(-10,15),this.trail[i].y + random(-15,10),random(15,20),random(15,20))
      }
      if (i % 3 == 0 && i >20 && i <60){
        c5.setAlpha(80)
        fill(c5)
        ellipse(this.trail[i].x + random(-10,10),this.trail[i].y + random(-10,10),random(12,17),random(12,17))

      }


    }


  }


}



//gradient
function setGradient(x, y, w, h, c1, c2) {
  noFill();

  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }

}
