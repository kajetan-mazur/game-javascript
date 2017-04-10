window.requestAnimFrame = (function() {
  return window.requestAnimationFrame  ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

var wilk;
$(document).on('keydown', function(e) {

    if( e.keyCode == 81 ) wilk.position = 'left-top'//Q
    if( e.keyCode == 65 ) wilk.position = 'left-down'//A
    if( e.keyCode == 80 ) wilk.position = 'right-top'//p
    if( e.keyCode == 76 ) wilk.position = 'right-down'//l
});


window.addEventListener("load", function() {
    var canvas = document.getElementById("canvas5");
  var ctx = canvas.getContext("2d");
    var ctx1 = canvas.getContext("2d");
    var ctx2 = canvas.getContext("2d");
    var ctx3 = canvas.getContext("2d");
  var CANVAS_WIDTH = canvas5.width;

  var CANVAS_HEIGHT = canvas5.height;

  wilk = {
      // position : 'left-top',
      position : 'left-down'
      //position = 'right-top';
      //position = 'right-down';
    };

    var rect = [{
        x: 270,
        y: 230,
        w: 270,
        h: 60
    },{
        x: 50,
        y: 200,
        w: 100,
        h: 100
    },{
        x: 50,
        y: 300,
        w: 100,
        h: 100
    },{
        x: 550,
        y: 200,
        w: 100,
        h: 100
    },{
        x: 550,
        y: 300,
        w: 100,
        h: 100
    }];

    var jajko = {
        x: 0,
        y: 150,
        w: 20,
        h: 25,
        speedX: 1,
        speedY: 1
    };

    var jajko1 = {
        x: 0,
        y: 250,
        w: 20,
        h: 25,
        speedX: 1,
        speedY: 1
    };

    var jajko2 = {
        x: 680,
        y: 150,
        w: 20,
        h: 25,
        speedX: 1,
        speedY: 1
    };

    var jajko3 = {
        x: 680,
        y: 250,
        w: 20,
        h: 25,
        speedX: 1,
        speedY: 1
    };

  var img = new Image();
  img.src = 'images/jajkoz.png';

  var imgWolfLT = new Image();
  imgWolfLT.src = 'images/wilk-top-left.png';
  var imgWolfLD = new Image();
  imgWolfLD.src = 'images/wilk-bottom-left.png';
  var imgWolfRT = new Image();
  imgWolfRT.src = 'images/wilk-top-right.png';
  var imgWolfRD = new Image();
  imgWolfRD.src = 'images/wilk-bottom-right.png';

  var score = 0;
  var life = 3;
  var start = 1;
  var activeEgg = [jajko,jajko1];
  var plus = [1,1];
  var catchEgg = new Audio("sounds/claps3.mp3");
  var breakEgg = new Audio("sounds/lcwdaugh.mp3");
  var startNextEgg = 0;

  
  var speed = function(plus,egg){
    if (plus==1) {
      activeEgg[egg].y += activeEgg[egg].speedY;
      activeEgg[egg].x += activeEgg[egg].speedX;
      
    
    }else if(plus==2){
      activeEgg[egg].y += activeEgg[egg].speedY;
      activeEgg[egg].x -= activeEgg[egg].speedX;
      
    }
    
  };
  
  
  

  var update = function() {
      
    if(life>0 && start==0){
      for(var i = 0; i < activeEgg.length; i++){
        
          if (activeEgg[i].x==100 || activeEgg[i].x==600) {
            activeEgg[i].x = -100;
            
            //plus = 0;
            
                
  
                var losujjajko = Math.floor((Math.random() * 4) + 1);
                //console.log("losowanie: "+losujjajko);
                if (losujjajko === 1) {
                    activeEgg[i].x = 0;
                    activeEgg[i].y = 150;
                    plus[i] = 1;
                }
                if (losujjajko === 2) {
                    activeEgg[i].x = 0;
                    activeEgg[i].y = 250;
                    plus[i] = 1;
                }
                if (losujjajko === 3) {
                    activeEgg[i].x = 700;
                    activeEgg[i].y = 150;
                    plus[i] = 2;
                }
                if (losujjajko === 4) {
                    activeEgg[i].x = 700;
                    activeEgg[i].y = 250;
                    plus[i] = 2;
                }
        }
        if (i>0) {
          if (activeEgg[(i-1)].x>=50 || startNextEgg == 1) {
            speed(plus[i],i);
            startNextEgg = 1;
            console.log("jajko 2");
          }
          
        }else{
          speed(plus[i],i);
        }
        
        
          
          //console.log("pierwsze jajko")
        
        
        catch1(i);
      }
      
      
      
      
      
      
      
          
      }
      
      
  };


  var catch1 = function (i) {
    
    
      if (activeEgg[i].x == 100 && activeEgg[i].y == 250 && wilk.position=='left-top') {
          score+=1;
          catchEgg.play();
      } else if (activeEgg[i].x === 100 && activeEgg[i].y == 350 && wilk.position=='left-down') {
          score+=1;
          catchEgg.play();
      } else if (activeEgg[i].x == 600 && activeEgg[i].y == 250 && wilk.position=='right-top') {
          score+=1;
          catchEgg.play();
      } else if (activeEgg[i].x == 600 && activeEgg[i].y == 350 && wilk.position=='right-down') {
          score+=1;
          catchEgg.play();
      } else if (activeEgg[i].x == 100 && activeEgg[i].y == 250 && wilk.position !=='left-top') {
          life-=1;
          breakEgg.play();
      } else if (activeEgg[i].x === 100 && activeEgg[i].y == 350 && wilk.position !=='left-down') {
          life-=1;
          breakEgg.play();
      } else if (activeEgg[i].x == 600 && activeEgg[i].y == 250 && wilk.position !=='right-top') {
          life-=1;
          breakEgg.play();
      } else if (activeEgg[i].x == 600 && activeEgg[i].y == 350 && wilk.position !=='right-down') {
          life-=1;
          breakEgg.play();
      }
    
      
  };

  var gameOver = function () {
      if (life == 0) {
          ctx.font = "28px Bungee Shade";
          ctx.fillStyle = "#c1272c";
          ctx.fillText("GAME OVER", 250, 200);
          ctx.fillText("Restart", rect[0].x, rect[0].y + 16);
      }
  };
  
  var startGame = function () {
      if (start == 1) {
          ctx.font = "28px Bungee Shade";
          ctx.fillStyle = "#c1272c";
          ctx.fillText("Start", rect[0].x, rect[0].y + 16);
      }
  };



  var draw = function() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    for(var i = 0; i < activeEgg.length; i++){
          ctx.drawImage(img, 0, 0, activeEgg[i].w, activeEgg[i].h,
            activeEgg[i].x, activeEgg[i].y, activeEgg[i].w, activeEgg[i].h);
      
    }
      if( wilk.position =='left-top'){
          ctx3.drawImage(imgWolfLT, 0, 0, 199, 220, 100, 230, 199, 220);
      }
     if( wilk.position =='left-down'){
         ctx3.drawImage(imgWolfLD, 0, 0, 199, 220, 100, 250, 199, 220);
      }
      if( wilk.position =='right-top'){
          ctx3.drawImage(imgWolfRT, 0, 0, 199, 220, 420, 230, 199, 220);
      }
      if( wilk.position =='right-down'){
          ctx3.drawImage(imgWolfRD, 0, 0, 199, 220, 420, 250, 199, 220);
      }


  };
  
    function drawScore() {
        ctx.font = "18px Bungee Shade";
        ctx.fillStyle = "#c1272c";
        ctx.fillText("Score: "+score, 8, 20);
    }

    function drawLife() {
        ctx.font = "18px Bungee Shade";
        ctx.fillStyle = "#c1272c";
        ctx.fillText("Life: "+life, 500, 20);
    }
    
    canvas.addEventListener('click', checkStart, false);
    function getMousePos(e) {
      var r = canvas.getBoundingClientRect();
      return {
          x: e.clientX - r.left,
          y: e.clientY - r.top
      };
    }
    function checkStart(e) {
        var p = getMousePos(e);
    
        if (p.x >= rect[0].x && p.x <= rect[0].x + rect[0].w &&
            p.y >= rect[0].y && p.y <= rect[0].y + rect[0].h) {
    
            score = 0;
            life = 3;
            start = 0;
        }

        if (p.x >= rect[1].x && p.x <= rect[1].x + rect[1].w &&
            p.y >= rect[1].y && p.y <= rect[1].y + rect[1].h) {
            wilk.position = 'left-top';
        }
        if (p.x >= rect[2].x && p.x <= rect[2].x + rect[2].w &&
            p.y >= rect[2].y && p.y <= rect[2].y + rect[2].h) {
            wilk.position = 'left-down';
        }
        if (p.x >= rect[3].x && p.x <= rect[3].x + rect[3].w &&
            p.y >= rect[3].y && p.y <= rect[3].y + rect[3].h) {
            wilk.position = 'right-top';
        }
        if (p.x >= rect[4].x && p.x <= rect[4].x + rect[4].w &&
            p.y >= rect[4].y && p.y <= rect[4].y + rect[4].h) {
            wilk.position = 'right-down';
        }
    }

  var step = function() {
    update();
    draw();
    //catch1();
    drawScore();
    drawLife();
    startGame();
    gameOver();
    
    window.requestAnimationFrame(step); // Iteratively call step
  };

  step(); // Start application loop


});
