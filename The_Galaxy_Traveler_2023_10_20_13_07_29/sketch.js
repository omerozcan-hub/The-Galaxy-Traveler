//The Galaxy Traveler
//by Ömer Özcan
//Eger oynanmakta zorlanılırsa adminFunction içerisinden pathout fonksiyonu yorum satırına alınabilir.
var xspeed=0,yspeed=0,speed=1,p=0,s=0,r=0,t=0,f=1,heart=3,nesneYon=1,timer=5,animation1=0,pause=3;
var Gmode;
var nesneX=350,nesneY=210,nesneB=20;
let img1,img2,img3,startScreen,finishScreen,heartImg;
let font1;
let wormhole1,wormhole2,wormhole3;
var Smusic,Gmusic,GOmusic;

function preload(){
  img1=loadImage('images/1foto.jpg');
  img2=loadImage('images/2foto.jpg');
  img3=loadImage('images/3foto.jpg');
  startScreen=loadImage('images/kapak1.jpg');
  finishScreen=loadImage('images/kapak2.jpg');
  font1=loadFont('fonts/font.TTF');
  wormhole1=loadImage('images/wormhole1.png');
  wormhole3=loadImage('images/wormhole4.png');
  wormhole2=loadImage('images/wormhole3.png');
  heartImg=loadImage('images/heart.png');
  Smusic = loadSound('musics/the-lonely-tower.mp3');
  Gmusic = loadSound('musics/indignant-divinity.mp3');
  GOmusic = loadSound('musics/stairway-to-revelation.mp3');
}

function setup() {
  let canvas = createCanvas(700, 500); 
  canvas.position(500,0);
  frameRate(60);
  
  Gmode = createSelect();
  Gmode.option("expert");
  Gmode.option("hard");
  Gmode.option("normal");
  Gmode.option("easy");
  Gmode.style("border-radius:10px");
  Gmode.style("background-color:blue");
  Gmode.style("color:white");
  Gmode.style("outline:none");
  
}

function draw(){
  
  adminFunction();
  
}

function adminFunction(){
  
  if(f==1){
    GameStart();
    nesne();
    mode();
  }
  else if(f==2){
    lines();
    nesne();
    pathout();
    gates();
    motion();
  }
  else if(f==3){
    GameFinish();
  }
  else if(f==4){
    GameOver();
  }
  
}

function GameStart(){
  
  image(startScreen,0,0);
  textSize(40);
  textFont(font1);
  text("The Galaxy Traveler",170,50);
  textSize(25);
  stroke('#f4bfe3');
  textFont(BOLD);
  text("PRESS SPACE TO START ",200,400);
  textSize(20);
  text("LEFT CLICK - CHANGE DIRECTION",180,430);
  text("ESC - PAUSE/RESUME",240,460);
  Gmode.position(830,470);
  noStroke();
    
  if(animation1==1){
    if(frameCount%60==0 && timer>0){
       timer--;
    }
    if(timer==4){nesneYon=2;}
    else if(timer==3){nesneYon=3;}

    if(timer>0 && timer<=3){
      nesneB-=0.1;
      nesneY+=0.5;
    }

    if(timer==0){
      nesneB=2;
      nesneX=10;
      nesneY=10;
      xspeed=0;
      yspeed=0;
      f=2;
      p=0;
      Gmode.position(-50,-50);
    }
  }
}

function GameFinish(){
  
    image(finishScreen,0,0,700,500);
    fill(255,255,255);
    textFont(font1);
    textSize(100);
    text("WIN",220,150);
    textFont(ITALIC);
    textSize(40);
    text("PRESS SPACE TO RESTART",120,350);
  
}

function GameOver(){
  
    image(finishScreen,0,0,700,500);
    fill(255,255,255);
    textFont(font1);
    textSize(100);
    text("Game Over",130,150);
    textFont(ITALIC);
    textSize(40);
    text("PRESS SPACE TO RESTART",120,350);
  
}

function nesne(){
  if(nesneYon==1){
    //düz
  applyMatrix(1,0,0,1,xspeed,yspeed);
  stroke('yellow');
  strokeWeight(nesneB/6);
  fill("black");
  circle(nesneX, nesneY, 5*nesneB); 
  rect(nesneX-1.5*nesneB, nesneY+4*nesneB, 8/10*nesneB, 3*nesneB,10);//sag bacak
  rect(nesneX+0.7*nesneB, nesneY+4*nesneB, 4/5*nesneB, 3*nesneB,10);//sol bacak
  rect(nesneX-2.5*nesneB, nesneY,5*nesneB, 5*nesneB,10);//gövde
  rect(nesneX-3.5*nesneB, nesneY,8/10*nesneB, 4.5*nesneB, 10);//kollar
  rect(nesneX+2.7*nesneB, nesneY,8/10*nesneB, 4.5*nesneB, 10);
  
  //yüz
  fill("white");
  circle(nesneX-nesneB, nesneY-1.5*nesneB, nesneB/2);
  circle(nesneX+nesneB, nesneY-1.5*nesneB, nesneB/2);
  noStroke();
  rect(nesneX-nesneB, nesneY-nesneB/2, 2*nesneB, nesneB/3, 2*nesneB);
  }
  else if(nesneYon==2){
    //yan 
  applyMatrix(1,0,0,1,xspeed,yspeed);
  stroke('yellow');
  strokeWeight(nesneB/6);
  fill("black");
  circle(nesneX-nesneB, nesneY-1/2*nesneB, 3*nesneB); 
  rect(nesneX-nesneB, nesneY+4*nesneB, 8/10*nesneB, 3*nesneB,10);//sol bacak
  rect(nesneX-1.5*nesneB, nesneY+4*nesneB, 8/10*nesneB, 3*nesneB,10);//sag bacak
  rect(nesneX-2.5*nesneB, nesneY, 3*nesneB, 5*nesneB,10);//gövde
  rect(nesneX-3/2*nesneB, nesneY,8/10*nesneB, 4.5*nesneB, 10);//kollar
    
  //yüz
  fill("white");
  noStroke();
  circle(nesneX-6/10*nesneB, nesneY-1.5*nesneB, nesneB/2.5);
  rect(nesneX-1/2*nesneB, nesneY-nesneB/2, nesneB, nesneB/4, 2*nesneB);
  }
  else if(nesneYon==3){
     //ters
  applyMatrix(1,0,0,1,xspeed,yspeed);
  stroke('yellow');
  strokeWeight(nesneB/6);
  fill("black");
  circle(nesneX, nesneY, 5*nesneB); 
  rect(nesneX-1.5*nesneB, nesneY+4*nesneB, 8/10*nesneB, 3*nesneB,10);//sag bacak
  rect(nesneX+0.7*nesneB, nesneY+4*nesneB, 4/5*nesneB, 3*nesneB,10);//sol bacak
  rect(nesneX-2.5*nesneB, nesneY,5*nesneB, 5*nesneB,10);//gövde
  rect(nesneX-3.5*nesneB, nesneY,8/10*nesneB, 4.5*nesneB, 10);//kollar
  rect(nesneX+2.7*nesneB, nesneY,8/10*nesneB, 4.5*nesneB, 10);
  fill('white');
  noStroke();
  }
}

function motion(){
  
  //yön
  if(p==0){
     if(s%2==0){xspeed+=speed;nesneYon=2;}  
     else if(s%2==1){xspeed-=speed;}   
  }
  else if(p==1){
     if(r%2==0){yspeed+=speed;nesneYon=1;}  
     else if(r%2==1){yspeed-=speed;nesneYon=3;}
  }
  
  //kenarlardan sekme
  if(xspeed > width - 10 || xspeed < -10) {
      s++;
  }
  if(yspeed > height - 20 || yspeed < -10) {
      r++;
  }

    
}

function mode(){
  if(Gmode.value()=='expert'){speed=2.7;}
  else if(Gmode.value()=='hard'){speed=2.3;}
  else if(Gmode.value()=='normal'){speed=1.9;}
  else if(Gmode.value()=='easy'){speed=1.5;}
}

function lines(){
  
  if(t==0){
    fill("#8deeee");
    
    image(img1,0,0);
    noStroke();
    rect(0,0,100,30);
    rect(100,0,30,130);
    rect(100,130,130,30);
    rect(230,130,30,70);
    rect(230,200,100,30);
    rect(330,200,30,30);
    rect(330,230,100,30);
    rect(430,230,30,110);
    rect(460,310,30,60);
    rect(490,340,110,30);
    
    //1. kapı
    image(wormhole1,585,330,50,50);
    
    //ok işareti
    fill("yellow");
    triangle(570,345,570,365,590,355);
    strokeWeight(1);
    stroke(0,0,0);
    line(550,355,570,355);
    noStroke();
  }
  
  else if(t==1){
    fill("#F0F977");
    
    image(img2,0,0);
    noStroke();
    rect(0,400,100,30);
    rect(70,340,30,60);
    rect(100,340,100,30);  
    rect(170,310,130,30);
    rect(270,280,30,30);
    rect(300,210,30,100);
    rect(330,210,100,30);
    rect(400,180,60,30);
    rect(430,150,100,30);
    rect(530,135,30,45);
    rect(530,105,110,30);
    
    //2. kapı
    image(wormhole2,620,95,50,50);
    
    //ok işareti
    fill("gray");
    triangle(600,110,600,130,620,120);
    strokeWeight(1);
    stroke(0,0,0);
    line(580,120,600,120);
    noStroke();
  }
  
  else if(t==2){
    
    image(img3,0,0,700,500);
    
    rect(0,240,70,30);
    rect(70,240,30,100);
    rect(100,310,30,80);
    rect(100,390,80,30);
    rect(180,390,30,80);
    rect(180,460,80,40);
    rect(230,390,30,80);
    rect(260,320,30,100);
    rect(290,320,80,30);
    rect(340,220,30,100);
    rect(370,150,30,100);
    rect(370,120,80,30);
    rect(420,90,60,30);
    rect(450,30,30,60);
    rect(450,0,80,40);
    rect(500,30,30,100);
    rect(500,130,60,30);
    rect(530,160,30,100);
    rect(560,230,90,30);

    //3. kapı
    image(wormhole3,620,220,50,50);
    
    //ok işareti
    fill("#ffc2fc");
    triangle(600,235,600,255,620,245);
    strokeWeight(1);
    stroke(0,0,0);
    line(580,245,600,245);
    noStroke();
  }
  
  if(heart==3){
    image(heartImg,322,0,28,24);
    image(heartImg,350,0,28,24);
    image(heartImg,378,0,28,24);
  }
  else if(heart==2){
    image(heartImg,322,0,28,24);
    image(heartImg,350,0,28,24);
  }
  else if(heart==1){
    image(heartImg,322,0,28,24);
  }
  if(pause!=3){
      textSize(40);
      textFont(BOLD);
      fill('#ff6c8c');
      stroke('yellow');
      text("ESC - PAUSE/RESUME",140,200);
      noStroke();
  }
  
}

function gates(){
  
    //1.kapıdan geçiş
    if(t==0 && xspeed>=590 && xspeed<=600 && yspeed<=380 && yspeed>=330){
      t=1;
      xspeed=10;
      yspeed=405;
      r++;
    }
  
    //2.kapıdan geçiş
    if(t==1 && xspeed>=610 && xspeed<=619 && yspeed<=135 && yspeed>=85){
      t=2;
      xspeed=10;
      yspeed=235;
      r++;
    }
  
    //3.kapıdan geçiş
    if(t==2 && xspeed>=620 && xspeed<=640 && yspeed<=270 && yspeed>=220){
      f=3;
    }
  
}

function pathout(){
  
  //yol belirlendi ve dışına çıkıldığında ilerlemeyecek
  if(t==0){
    
  if(-10<=yspeed && 20>=yspeed && -10<=xspeed && 100>=xspeed || 
     -10<=yspeed && 120>=yspeed && 90<=xspeed && 120>=xspeed ||
     120<=yspeed && 150>=yspeed && 90<=xspeed && 220>=xspeed ||
     120<=yspeed && 190>=yspeed && 220<=xspeed && 250>=xspeed ||
     190<=yspeed && 220>=yspeed && 220<=xspeed && 320>=xspeed ||
     190<=yspeed && 220>=yspeed && 320<=xspeed && 350>=xspeed ||
     220<=yspeed && 250>=yspeed && 320<=xspeed && 420>=xspeed ||
     220<=yspeed && 330>=yspeed && 420<=xspeed && 450>=xspeed ||
     300<=yspeed && 360>=yspeed && 450<=xspeed && 480>=xspeed ||
     330<=yspeed && 360>=yspeed && 480<=xspeed && 600>=xspeed 
    ){}
  else{
    p=3;
    nesneB*=0.8;
  }
    
  }
  if(t==1){
    if(390<=yspeed && 420>=yspeed && -10<=xspeed && 90>=xspeed ||
       330<=yspeed && 390>=yspeed && 60<=xspeed && 90>=xspeed ||
       330<=yspeed && 360>=yspeed && 90<=xspeed && 190>=xspeed ||
       300<=yspeed && 330>=yspeed && 160<=xspeed && 290>=xspeed ||
       270<=yspeed && 300>=yspeed && 260<=xspeed && 290>=xspeed ||
       200<=yspeed && 300>=yspeed && 290<=xspeed && 320>=xspeed ||
       200<=yspeed && 230>=yspeed && 320<=xspeed && 420>=xspeed ||
       170<=yspeed && 200>=yspeed && 390<=xspeed && 450>=xspeed ||
       140<=yspeed && 170>=yspeed && 420<=xspeed && 520>=xspeed ||
       125<=yspeed && 170>=yspeed && 520<=xspeed && 550>=xspeed ||
       95<=yspeed && 125>=yspeed && 520<=xspeed && 620>=xspeed 
      ){}
  else{
      p=3;
      nesneB*=0.8;
  }
    
  }
  if(t==2){
    if(230<=yspeed && 260>=yspeed && -10<=xspeed && 60>=xspeed ||
      230<=yspeed && 330>=yspeed && 60<=xspeed && 90>=xspeed ||
      300<=yspeed && 480>=yspeed && 90<=xspeed && 120>=xspeed ||
      380<=yspeed && 410>=yspeed && 90<=xspeed && 170>=xspeed ||
      380<=yspeed && 460>=yspeed && 170<=xspeed && 200>=xspeed ||
      450<=yspeed && 490>=yspeed && 170<=xspeed && 250>=xspeed ||
      380<=yspeed && 460>=yspeed && 220<=xspeed && 250>=xspeed ||
      310<=yspeed && 410>=yspeed && 250<=xspeed && 280>=xspeed ||
      310<=yspeed && 340>=yspeed && 280<=xspeed && 360>=xspeed ||
      210<=yspeed && 310>=yspeed && 330<=xspeed && 360>=xspeed ||
      140<=yspeed && 240>=yspeed && 360<=xspeed && 390>=xspeed ||
      110<=yspeed && 140>=yspeed && 360<=xspeed && 440>=xspeed ||
      80<=yspeed && 110>=yspeed && 410<=xspeed && 470>=xspeed ||
      20<=yspeed && 80>=yspeed && 440<=xspeed && 470>=xspeed ||
      -11<=yspeed && 40>=yspeed && 440<=xspeed && 520>=xspeed ||
      20<=yspeed && 120>=yspeed && 490<=xspeed && 520>=xspeed ||
      120<=yspeed && 150>=yspeed && 490<=xspeed && 550>=xspeed ||
      150<=yspeed && 250>=yspeed && 520<=xspeed && 550>=xspeed ||
      220<=yspeed && 250>=yspeed && 550<=xspeed && 630>=xspeed 
      ){}
    else{
      p=3;
      nesneB*=0.8;
    }
    
  }
  
  //nesne düştüğünde küçültme
  if(nesneB<0.05){
    nesneB=2;
    heart--;
    p=0;
    
      //Can bittiği için oyun bitiyor
      if(heart==0){
        
        f=4;
        r=0;
        xspeed=0;
        yspeed=0;
        heart=3;
        t=0;
        if(Gmusic.isPlaying()){Gmusic.stop();}
        GOmusic.play();
        
      }
    
      //level'i baştan başlatıyor
      if(t==0){
        xspeed=0;
        yspeed=0;
        
      }
      else if(t==1){
        xspeed=10;
        yspeed=405;
      }
      else if(t==2){
        xspeed=10;
        yspeed=235;
        r=0;
      }
     
  }
}

function mouseClicked(){
  if(f==1){if(!Smusic.isPlaying() && !Gmusic.isPlaying()){Smusic.play();}}
  if(p==0){p=1;}
  else if(p==1){p=0;}
}

function keyPressed(){
  if(key=='Escape'){
    if(p==0 || p==1){
      pause=p; 
      p=3;
      }
    else if(p==3){p=pause;pause=3;}
  }
  if(key==' ' && f==1){
    animation1=1;
    if(Smusic.isPlaying()){Smusic.stop();}
    Gmusic.play();
  }
  if(key==' ' && f==3){
    xspeed=10;
    yspeed=10;
    t=0;
    p=0;
    r=0;
    s=0;
    f=2;
    if(GOmusic.isPlaying()){GOmusic.stop();}
    Gmusic.play();
  }
   if(key==' ' && f==4){
    xspeed=10;
    yspeed=10;
    t=0;
    p=0;
    r=0;
    s=0;
    f=2;
    if(GOmusic.isPlaying()){GOmusic.stop();}
    Gmusic.play();
  }
}