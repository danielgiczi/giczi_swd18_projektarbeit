function UI(sk, imgSize) {
    document.documentElement.style.setProperty('--tile-size', imgSize + "px");

    this.sk = sk;
    this.imgM0;
    this.imgM1;
    this.imgM2;
    this.imgM3;
    this.imgM4;
    this.imgM5;
    this.imgWall;

    this.imgSize = imgSize;

    this.map;
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
    this.map=map;
    let canvasWidth = map.getWidth()* this.imgSize;
    this.width = canvasWidth
    let canvasHeight = map.getHeight()* this.imgSize;
    this.height = canvasHeight

    var topCoords = document.getElementById("top-coords")
    topCoords.innerHTML = "";
    var rightCoords = document.getElementById("right-coords")
    rightCoords.innerHTML = ""
    var bottomCoords = document.getElementById("bottom-coords")
    bottomCoords.innerHTML = "";
    var leftCoords = document.getElementById("left-coords")
    leftCoords.innerHTML = "";

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
    let pg = this.sk.createGraphics(canvasWidth, canvasHeight);

    canvas.parent('wrapper');

    this.sk.background("#eee");

    let currX = 0;
    let currY = 0;
    map.forEach((row) => {
        currX = 0;
        row.forEach((val) => {
            let imgToDraw;
            switch (Math.abs(val)) {
                case 0: imgToDraw = this.imgM0; break;
                case 1: imgToDraw = this.imgM1; break;
                case 2: imgToDraw = this.imgM2; break;
                case 3: imgToDraw = this.imgM3; break;
                case 4: imgToDraw = this.imgM4; break;
                case 5: imgToDraw = this.imgM5; break;
                case 8: imgToDraw = this.imgWall; break;
            }

            pg.image(imgToDraw, currX, currY, this.imgSize, this.imgSize)
            currX += this.imgSize;
        })
        currY += this.imgSize;
    })

    return { pg, canvas };
}

UI.prototype.coordToPosition = function(coord) {
    return (coord * this.imgSize);
}
 
UI.prototype.coordToCenteredPosition = function(coord) {
    return this.coordToPosition(coord) + this.imgSize/2
}

UI.prototype.mouseCoordToCenteredPosition = function(coord) {
    if(coord < 0) return -1;
    let found = -1;
    for(let t=0;t <= this.imgSize * this.map.getWidth(); t += this.imgSize) {
        
        if((coord / t) < 1) {
            break;
        }

        found++;
    }
    //console.log("x",coord, found);
    return found;
}

export default UI