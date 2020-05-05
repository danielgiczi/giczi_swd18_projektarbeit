import './public/reset.css';
import './public/style.css';

import * as p5 from 'p5';

let sprite;

const s = ( sk ) => {
    let imgM0;
    let imgM1;
    let imgM2;
    let imgM3;
    let imgM4;
    let imgM5;

    let imgWidth = 64;
    let imgHeight = 64;

    let startCoordX = 2;
    let startCoordY = 8;

    let destinationCoordX = 7;
    let destinationCoordY = 1;

    let map = [
      [-2, -1, -1, -1, -1, -4,-2,-1, -4],
      [-1, 0, -3, -5, -1, -3,-3,-1, -3],
      [0, 0, -5, -5, -1, 0,-3,-5, -4],
      [0, -1, -5, -2, -1, -1,0,0, -5],
      [-1, -1, -4, -1, -1, -3,0,-1, -3],
      [-2, -1, -1, -1, -2, -3,-3, -2, -1],
      [-1, -1, -1, -1, -2, -3,-4, -4, -2],
      [0, -1, 0, -1, -1, -2,-3, -4, -1],
      [0, 0, 0, -1, -1, -2,-3, -3, -1],
      [-1, -1, -1, -1, -1, -1,-2, -1, -1]
    ]
    
    sk.preload = () => {
        imgM0 = sk.loadImage("public/tiles/tilemap_v1_07.png")
        imgM1 = sk.loadImage("public/tiles/tilemap_v1_01.png")
        imgM2 = sk.loadImage("public/tiles/tilemap_v1_02.png")
        imgM3 = sk.loadImage("public/tiles/tilemap_v1_03.png")
        imgM4 = sk.loadImage("public/tiles/tilemap_v1_04.png")
        imgM5 = sk.loadImage("public/tiles/tilemap_v1_05.png")
    }


    sk.setup = () => {
        document.documentElement.style.setProperty('--tile-size', imgWidth + "px");


        let canvasWidth = map[0].length*imgWidth;
        let canvasHeight = map.length*imgHeight;

        var topCoords = document.getElementById("top-coords")
        var rightCoords = document.getElementById("right-coords")
        var bottomCoords = document.getElementById("bottom-coords")
        var leftCoords = document.getElementById("left-coords")

        for(let x = 0; x < map.length; x++) {
          var thisCoord = document.createElement("div")
          thisCoord.innerText = x;
          leftCoords.append(thisCoord)
          rightCoords.append(thisCoord.cloneNode(true))          
        }

        for(let x = 0; x < map[0].length; x++) {
          var thisCoord = document.createElement("div")
          thisCoord.innerText = x;
          topCoords.append(thisCoord)
          bottomCoords.append(thisCoord.cloneNode(true))
        }

        var canvas = sk.createCanvas(canvasWidth, canvasHeight);
        canvas.parent('wrapper');

        sk.background("#eee");

        let currX=0;
        let currY=0;

        map.forEach((row,rowInx) => {
          currX = 0;
          row.forEach((val, colInx) => {
            let imgToDraw;
            switch(val) {
              case 0: imgToDraw = imgM0; break;
              case -1: imgToDraw = imgM1; break;
              case -2: imgToDraw = imgM2; break;
              case -3: imgToDraw = imgM3; break;
              case -4: imgToDraw = imgM4; break;
              case -5: imgToDraw = imgM5; break;
            }

            sk.image(imgToDraw, currX,currY,imgWidth,imgHeight)
            currX+=imgWidth;
          })
          currY+=imgHeight;
        })

        sk.fill("aqua");
        sk.circle(coordToCenteredPosition(startCoordX), coordToCenteredPosition(startCoordY), 24)        

        sk.fill("green")
        sk.circle(coordToCenteredPosition(destinationCoordX), coordToCenteredPosition(destinationCoordY), 24)        

    };
  
    sk.draw = () => {
      

    };

    function coordToPosition(coord) {
      return coord * imgWidth;
    }
    
    function coordToCenteredPosition(coord) {
      return coordToPosition(coord) + imgWidth/2
    }
    

  };
  
  let myp5 = new p5(s);


