function UI(sk, imgWidth, imgHeight) {
    document.documentElement.style.setProperty('--tile-size', imgWidth + "px");

    this.sk = sk;
    this.imgM0;
    this.imgM1;
    this.imgM2;
    this.imgM3;
    this.imgM4;
    this.imgM5;
    this.imgWall;

    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
}

UI.prototype.preload = function () {
    //this.imgM0 = this.sk.loadImage("public/tiles/tilemap_v1_07.png")
    this.imgM0 = this.sk.loadImage("public/tiles/tilemap_v1_09.png")
    this.imgM1 = this.sk.loadImage("public/tiles/tilemap_v1_01.png")
    this.imgM2 = this.sk.loadImage("public/tiles/tilemap_v1_02.png")
    this.imgM3 = this.sk.loadImage("public/tiles/tilemap_v1_03.png")
    this.imgM4 = this.sk.loadImage("public/tiles/tilemap_v1_04.png")
    this.imgM5 = this.sk.loadImage("public/tiles/tilemap_v1_05.png")
    this.imgWall = this.sk.loadImage("public/tiles/tilemap_v1_10.png")
}

UI.prototype.setup = function (map) {
    let canvasWidth = map.getWidth()* this.imgWidth;
    let canvasHeight = map.getHeight()* this.imgHeight;

    var topCoords = document.getElementById("top-coords")
    var rightCoords = document.getElementById("right-coords")
    var bottomCoords = document.getElementById("bottom-coords")
    var leftCoords = document.getElementById("left-coords")

    for(let x = 0; x <  map.getHeight(); x++) {
      var thisCoord = document.createElement("div")
      thisCoord.innerText = x;
      leftCoords.append(thisCoord)
      rightCoords.append(thisCoord.cloneNode(true))          
    }

    for(let x = 0; x < map.getWidth(); x++) {
      var thisCoord = document.createElement("div")
      thisCoord.innerText = x;
      topCoords.append(thisCoord)
      bottomCoords.append(thisCoord.cloneNode(true))
    }

    var canvas = this.sk.createCanvas(canvasWidth, canvasHeight);
    canvas.parent('wrapper');

    this.sk.background("#eee");

    let currX = 0;
    let currY = 0;
    map.forEach((row) => {
        currX = 0;
        row.forEach((val) => {
            let imgToDraw;
            switch (val) {
                case 0: imgToDraw = this.imgM0; break;
                case -1: imgToDraw = this.imgM1; break;
                case -2: imgToDraw = this.imgM2; break;
                case -3: imgToDraw = this.imgM3; break;
                case -4: imgToDraw = this.imgM4; break;
                case -5: imgToDraw = this.imgM5; break;
                case 8: imgToDraw = this.imgWall; break;
            }

            this.sk.image(imgToDraw, currX, currY, this.imgWidth, this.imgHeight)
            currX += this.imgWidth;
        })
        currY += this.imgHeight;
    })
}
 
UI.prototype.coordToCenteredPosition = function(coord) {
    return (coord * this.imgWidth) + this.imgWidth/2
}

export default UI