
import Node from "./DijkstraNode"

function DijkstraGraph(map) {
    this.map = map;

    this.nodes = {};

    for (let x = 0; x < this.map.getWidth(); x++) {
        for (let y = 0; y < this.map.getHeight(); y++) {
            let node = new Node(x,y);
            node.weight = this.map.getCoordCost(x, y)
            if(node.weight == 8) node.weight = Infinity
            this.nodes[node.key()] = node;
        }
    }

    for (var prop in this.nodes) {
        if (Object.prototype.hasOwnProperty.call(this.nodes, prop)) {
            let node = this.nodes[prop];
            if(node.selected == false) {
                this.calcAdjacentNodes(node);
            }
        }
    }
}

DijkstraGraph.prototype.calcAdjacentNodes = function (parent) {
    var nodes = [];

    let above = this.get(parent.x, parent.y -1);
    if(!!above) {
        nodes.push(above);
    }

    let below = this.get(parent.x, parent.y + 1);
    if(!!below){
        nodes.push(below);
    }

    let left = this.get(parent.x - 1, parent.y);
    if(!!left) {
        nodes.push(left);
    }

    let right = this.get(parent.x + 1, parent.y);
    if(!!right) {
        nodes.push(right);
    }

    parent.adjacents = nodes;
}

DijkstraGraph.prototype.get = function(x,y) {
    if(typeof(y) != "undefined") {
        if(!this.map.isWithinBounds(x,y)){
            return null;
        }
        return this.nodes[x + "|" + y];
    }
    else {
        return this.nodes[x.key()];
    }
}

DijkstraGraph.prototype.getSortedUnexploredList = function() {
    let list = [];

    for (var prop in this.nodes) {
        if (Object.prototype.hasOwnProperty.call(this.nodes, prop)) {
            let node = this.nodes[prop];
            if(node.selected == false) {
                list.push(node);
            }
        }
    }

    list = list.sort((node1, node2) => parseFloat(node1.distance) - parseFloat(node2.distance));

    return list;
}

DijkstraGraph.prototype.reset = function() {
    for (var prop in this.nodes) {
        if (Object.prototype.hasOwnProperty.call(this.nodes, prop)) {
            let node = this.nodes[prop];
            node.distance = Infinity;
            node.selected = false;
        }
    }
}

export default DijkstraGraph