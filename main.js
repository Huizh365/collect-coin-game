/**
 * Work with strings.
 */
window.addEventListener("DOMContentLoaded", function() {
  'use strict';
  let rockford = document.getElementById('baddie1'),
    area = document.getElementById('flash'),
    left = area.offsetLeft,
    top  = area.offsetTop,
    posLeft = 0, 
    posTop = 0,
    tileSize = 32,
    gridSize = 24,



    /**
     * This is the background for the game area.
     */
    gameArea = [
      13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,
      12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,
      14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,
      13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,
      12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,
      14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,
      13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,
      12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,
      14,12,13,14,12,13,14,16,16,14,12,16,12,12,13,14,12,13,14,12,13,14,12,13,
      13,14,12,13,14,12,13,14,16,12,14,12,13,15,12,13,14,12,13,14,12,13,14,12,
      12,13,14,12,13,14,12,13,15,15,13,14,12,16,14,12,13,14,12,13,14,12,13,14,
      14,12,13,14,12,13,14,12,15,15,12,12,16,12,13,14,12,13,14,12,13,14,12,13,
      13,14,12,13,14,12,13,14,12,12,12,15,13,14,12,13,14,12,13,14,12,13,14,12,
      12,13,14,12,13,14,12,13,14,12,13,14,12,12,12,12,13,14,12,13,14,12,13,14,
      14,12,13,14,12,13,14,16,13,14,12,13,14,12,16,16,16,13,14,12,13,14,19,21,
      13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,16,16,12,13,19,18,18,21,21,
      12,13,14,12,13,14,12,13,14,12,13,14,12,13,12,12,13,19,18,21,21,21,21,21,
      14,12,13,14,12,13,14,12,13,14,12,13,14,15,16,14,12,20,21,21,21,21,21,21,
      13,14,12,13,14,12,13,14,12,13,14,12,13,15,15,13,19,21,21,21,21,21,21,21,
      12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,20,21,21,21,21,21,21,21,
      14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,22,21,21,21,21,21,21,21,
      13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,22,21,21,21,21,21,21,
      12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,22,21,21,21,21,17,
      14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,22,21,21,21,21,
    ],

    /**
     * These are blocks that cant be moved to, or something happens when you try to move on them.
     * The blocks are drawn "on top" of the gamearea. Block 10 is empty, should be 0 but looks nicer with two figures.
     */
    gameBlocks = [
      19,19,19,19,19,19,13,19,19,19,19,19,19,19,19,19,19,19,19,14,14,14,14,14,
      18,10,10,10,19,14,19,19,13,13,19,19,19,19,19,19,13,19,19,14,13,13,13,14,
      20,20,20,10,19,14,19,12,13,12,19,10,10,10,19,19,19,19,19,14,14,12,14,14,
      26,20,20,10,19,19,19,19,19,19,19,10,20,10,19,19,19,19,19,14,13,13,13,14,
      27,20,20,10,10,10,10,10,10,10,10,10,20,10,19,10,10,10,19,21,14,14,14,14,
      20,28,20,20,20,20,20,20,20,20,20,20,20,10,19,10,20,10,19,10,19,19,19,19,
      20,20,29,20,20,20,20,29,20,20,20,20,20,10,10,10,20,10,10,10,19,19,19,19,
      20,28,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,10,19,14,19,14,
      20,20,20,20,20,20,28,20,20,20,20,20,20,20,20,20,20,20,20,10,19,14,13,19,
      20,20,20,20,20,20,20,20,20,20,26,29,20,20,22,10,10,10,10,10,19,14,13,19,
      20,20,20,26,20,20,20,20,20,20,20,20,20,20,20,10,19,19,19,10,19,19,19,19,
      20,20,20,20,20,20,20,28,20,20,20,20,20,20,20,10,19,19,19,10,19,19,19,19,
      20,29,20,20,23,20,20,20,20,20,20,20,20,10,10,10,19,19,19,10,19,19,13,19,
      20,20,20,20,10,10,10,10,10,20,20,20,20,10,19,19,19,19,19,10,19,12,13,12,
      20,20,20,20,10,19,19,19,10,10,20,20,20,10,19,19,19,19,19,10,19,19,12,19,
      20,27,20,20,10,19,13,19,19,10,10,10,10,10,19,10,10,10,10,10,19,19,19,19,
      20,20,20,20,10,19,19,19,19,19,19,19,19,19,19,10,20,20,10,24,19,19,14,19,
      20,20,20,20,10,10,19,19,13,19,14,19,12,14,19,10,20,20,10,19,19,14,19,19,
      20,20,20,20,20,10,19,19,19,19,19,19,19,19,19,10,20,20,10,19,14,19,19,19,
      20,28,20,20,20,10,25,19,19,10,10,10,10,10,10,10,20,20,10,10,10,19,19,19,
      20,20,20,20,20,10,19,19,19,10,20,20,20,20,20,20,20,20,20,20,10,19,19,19,
      20,20,20,20,20,10,10,10,10,10,20,20,20,20,20,20,27,20,20,20,10,19,19,19,
      20,28,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,10,10,10,18,
      20,20,20,20,20,26,20,20,20,20,20,20,28,20,20,20,20,20,20,20,20,20,20,20,
    ];

    /**
     * Draw the initial gameplan
    */
   function drawGamePlan(gameArea, gameBlocks) {
     var i,e,b;
     for(i = 0; i < gameArea.length; i++) {
       e = document.createElement('div');
       e.innerHTML = '';
       e.className = 'tile t' + gameArea[i] + (gameBlocks[i] ? ' b' + gameBlocks[i] : '');
       e.id = 'n' + i;
       area.appendChild(e);
      } 
    };
    console.log('Drawing gameplan.');  
    drawGamePlan(gameArea, gameBlocks);
    
    
    /**
     * Move Rockford
    */
   var move = function(moveLeft, moveTop, which) {
     
     function moveIt() {
       rockford.style.left = (area.offsetLeft + posLeft*tileSize + tileSize/2) + 'px';
       rockford.style.top  = (area.offsetTop + posTop*tileSize + tileSize/2) + 'px';      
      //  console.log("
      // Moved to: " + rockford.style.left + "x" + rockford.style.top);
      };
      if(which) { rockford.className='baddie ' + which; }
      
      //change picture
      function takeCoins(id) {
        let element = document.getElementById(id);
        let classList = element.classList;
        if (classList.length > 2) {
          element.classList.remove(classList[classList.length - 1]);
        }
      }

      // First if means the baddie can movie
      let count = 0;
      if(!(gameBlocks[(posLeft+moveLeft)+(posTop+moveTop)*gridSize]-10)) {
        posLeft += moveLeft; 
        posTop  += moveTop;
        moveIt();
      } else if((gameBlocks[(posLeft+moveLeft)+(posTop+moveTop)*gridSize] === 18) && count < 5) {
        let audio = new Audio("sounds/locked-door.mp3");
        audio.play();
        alert('Oj då, dörren är låst! Du måste samla alla mynt för att dörren ska öppnas.');
      } else if((gameBlocks[(posLeft+moveLeft)+(posTop+moveTop)*gridSize] === 19)) {
        let audio = new Audio("sounds/fire.mp3");
        audio.play();
        alert('Aj! Vad varmt! Jag brände mig!')
      } else if((gameBlocks[(posLeft+moveLeft)+(posTop+moveTop)*gridSize] === 20)) {
        let audio = new Audio("sounds/water.mp3");
        audio.play();
        alert('Oj! Jag kan inte simma! Jag druknar!')
      } else if((gameBlocks[(posLeft+moveLeft)+(posTop+moveTop)*gridSize] === 21)) {
        let audio = new Audio("sounds/cash.mp3");
        takeCoins("n115");
        audio.play();
        count++;
      } else if((gameBlocks[(posLeft+moveLeft)+(posTop+moveTop)*gridSize] === 22)) {
          let audio = new Audio("sounds/cash.mp3");
        takeCoins("n230");
          audio.play();  
          count++;

      } else if((gameBlocks[(posLeft+moveLeft)+(posTop+moveTop)*gridSize] === 23)) {
        let audio = new Audio("sounds/cash.mp3");
        takeCoins("n292");
        audio.play();
        count++;

      } else if((gameBlocks[(posLeft+moveLeft)+(posTop+moveTop)*gridSize] === 25)) {
        let audio = new Audio("sounds/cash.mp3");
        takeCoins("n462");
        audio.play();
        count++;

      } else if((gameBlocks[(posLeft+moveLeft)+(posTop+moveTop)*gridSize] === 24)) {
        let audio = new Audio("sounds/cash.mp3");
        takeCoins("n403");
        audio.play();
        count++;

      } else {  // Else means the baddie cannot move because of a wall 
        console.log('Block detected, cant move.');
      }
      
      // if (){
      //   takeCoins("n551");
      //   }
      const coin1 = document.getElementById("n115");
      const coin2 = document.getElementById("n230");
      const coin3 = document.getElementById("n292");
      const coin4 = document.getElementById("n462");
      const coin5 = document.getElementById("n403");
      if ((gameBlocks[(posLeft+moveLeft)+(posTop+moveTop)*gridSize] === 18) && count === 5) {
        takeCoins("n551");
        alert('Woho! Dörren är öppen, bra jobbat!');
        
      } 
      
      console.log("area.offsetLeft", area.offsetLeft);
      console.log("area.offsetTop", area.offsetTop);
      console.log("posLeft", posLeft)
      console.log("posTop", posTop)
    };
    console.log('Moving Mickey Mos (Rockford) to initial spot.');  
    move(1, 1, 'down');
    
    
    /**
     * Keep track on keys pressed and move Rockford accordingly.
    */
   document.onkeydown = function(event) {
     var key;
     key = event.keyCode || event.which;
     switch(key) {
       case 37: move(-1, 0, 'left'); break;
       case 39: move(1, 0, 'right'); break;
       case 38: move(0, -1, 'up'); break;
       case 40: move(0, 1, 'down'); break; 
       default: move(0, 0, 'down'); break;
      };
      console.log('Keypress: ' + event + ' key: ' + key + ' new pos: ' + rockford.offsetLeft + ', ' + rockford.offsetTop);
    };
    
    console.log('Everything is ready.');  
  });

