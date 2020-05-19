function Canvas(sk, imgSize, setDest) {
    document.documentElement.style.setProperty('--tile-size', imgSize + "px");

    this.sk = sk;
    this.imgTile;
    this.imgWall;
    this.imgSize = imgSize;
    this.imgWeight;
    this.map;
    this.pg;
    this.width;
    this.height;

    this.highlightX = -1;
    this.highlightY = -1;
    this.setDest = setDest;
}

Canvas.prototype.preload = function () {
    if (this.imgSize < 32) {
        this.imgTile = this.sk.loadImage("public/tiles/tilemap_v1_11.png")
    }
    else {
        this.imgTile = this.sk.loadImage("public/tiles/tilemap_v1_09.png")
    }

    this.imgWall = this.sk.loadImage("public/tiles/tilemap_v1_10.png")
    this.imgM5 = this.sk.loadImage("public/tiles/tilemap_v1_05.png")
}

Canvas.prototype.setup = function (map, simulationMode) {
    this.map = map;
    let canvasWidth = map.getWidth() * this.imgSize;
    this.width = canvasWidth
    let canvasHeight = map.getHeight() * this.imgSize;
    this.height = canvasHeight

    var topCoords = document.getElementById("top-coords")
    topCoords.innerHTML = "";
    var rightCoords = document.getElementById("right-coords")
    rightCoords.innerHTML = ""
    var bottomCoords = document.getElementById("bottom-coords")
    bottomCoords.innerHTML = "";
    var leftCoords = document.getElementById("left-coords")
    leftCoords.innerHTML = "";

    for (let x = 0; x < map.getHeight(); x++) {
        var thisCoord = document.createElement("div")
        thisCoord.innerText = x;
        leftCoords.append(thisCoord)
        rightCoords.append(thisCoord.cloneNode(true))
    }

    for (let x = 0; x < map.getWidth(); x++) {
        var thisCoord = document.createElement("div")
        thisCoord.innerText = x;
        topCoords.append(thisCoord)
        bottomCoords.append(thisCoord.cloneNode(true))
    }

    var canvas = this.sk.createCanvas(canvasWidth, canvasHeight);
    this.pg = this.sk.createGraphics(canvasWidth, canvasHeight);

    canvas.parent('wrapper');

    this.sk.background("#eee");

    let currX = 0;
    let currY = 0;
    let self = this;
    map.forEach((row) => {
        currX = 0;
        row.forEach((val) => {
            let imgToDraw;
            switch (Math.abs(val)) {
                case 0: imgToDraw = self.imgTile; break;
                case 5: imgToDraw = self.imgM5; break;
                case 8: imgToDraw = self.imgWall; break;
            }

            self.pg.image(imgToDraw, currX, currY, self.imgSize, self.imgSize)
            currX += self.imgSize;
        })
        currY += self.imgSize;
    })

    if (!simulationMode) {
        canvas.mouseClicked(function () {
            if (self.highlightX < 0 || self.highlightY < 0) return;
            if (self.map.getCoordCost(self.highlightX, self.highlightY) == 8) {
                console.log("wall clicked");
                return;
            }

            self.setDest(self.highlightX, self.highlightY)
        });
    }

    this.sk.image(this.pg, 0, 0, this.width, this.height);
}

Canvas.prototype.draw = function (simulationMode, gameFinished, destX, destY, probes, paths,startX,startY) {
    this.sk.clear();
    this.sk.image(this.pg, 0, 0, this.width, this.height);

    this.mouseOver();

    if(gameFinished) {
        probeIndex = probes.length - 1
    }
    this.drawProbes(probes, paths);
    this.drawCalculated(paths, probes);

    if (!simulationMode && !gameFinished) {
        this.renderHighlight();
    }

    this.renderDestination(destX, destY);

    this.renderStart(startX, startY);
}

Canvas.prototype.renderStart = function (x,y) {
    this.sk.fill("red");
    this.sk.circle(x, y, 24)
}

Canvas.prototype.mouseOver = function () {
    this.highlightX = this.mouseCoordToCenteredPosition(this.sk.mouseX)
    this.highlightY = this.mouseCoordToCenteredPosition(this.sk.mouseY)
}

Canvas.prototype.renderHighlight = function () {
    if (this.highlightX == -1 || this.highlightY == -1) return;

    this.sk.fill(0, 128, 0, 50)
    this.sk.rect(
        this.coordToPosition(this.highlightX),
        this.coordToPosition(this.highlightY), this.imgSize)
}

Canvas.prototype.renderDestination = function (destX, destY) {
    if (destX == -1 || destY == -1) return;
    this.sk.fill("green")
    this.sk.circle(
        this.coordToCenteredPosition(destX),
        this.coordToCenteredPosition(destY), 24)
}

let probeIndex = 0;
Canvas.prototype.drawProbes = function (probes, paths) {
    this.sk.stroke("#eee");
    this.sk.strokeWeight(2);

    for (let index = 0; index < probes.length; index++) {
        if (index == probeIndex) break;
        let probe = probes[index];
        if (paths.length == 0 && probeIndex >= probes.length) {
            this.sk.fill("red")
        }
        else {
            this.sk.fill("26","30","30", 100);
        }

        this.sk.rect(
            this.coordToPosition(probe.x),
            this.coordToPosition(probe.y), this.imgSize)
    }

    this.sk.stroke("#000");
    this.sk.strokeWeight(1)

    probeIndex += 5// Math.round(probes.length / 100);
    if (probeIndex > probes.length) {
        probeIndex = probes.length;
    }
}

Canvas.prototype.drawCalculated = function (paths, probes) {
    if (paths.length == 0 || probeIndex < probes.length) return;
    this.sk.stroke("#fff");
    this.sk.strokeWeight(8);

    for (let index = 0; index < paths.length; index++) {
        let path = paths[index];
        let prevPath = paths[index - 1];
        if (!prevPath) {
            prevPath = { x: path.x, y: path.y }
        }
        this.sk.line(
            this.coordToCenteredPosition(prevPath.x),
            this.coordToCenteredPosition(prevPath.y),
            this.coordToCenteredPosition(path.x),
            this.coordToCenteredPosition(path.y)
        )
    }
    this.sk.stroke("#000");
    this.sk.strokeWeight(1)
}


Canvas.prototype.coordToPosition = function (coord) {
    return (coord * this.imgSize);
}

Canvas.prototype.coordToCenteredPosition = function (coord) {
    return this.coordToPosition(coord) + this.imgSize / 2
}

Canvas.prototype.mouseCoordToCenteredPosition = function (coord) {
    if (coord < 0) return -1;
    let found = -1;
    for (let t = 0; t <= this.imgSize * this.map.getWidth(); t += this.imgSize) {

        if ((coord / t) < 1) {
            break;
        }

        found++;
    }
    return found;
}

export default Canvas