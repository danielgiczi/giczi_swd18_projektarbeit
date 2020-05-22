import Node from "./DijkstraNode"
import DijkstraGraph from "./DijkstraGraph"

function DijkstraAlgorithm(startX, startY, goalX, goalY, map) {
    this.P = new Node(startX, startY);
    this.G = new Node(goalX, goalY);
    this.map = map;
    this.graph = new DijkstraGraph(this.map);
}

DijkstraAlgorithm.prototype.run = function () {
    this.probes = [];
    this.paths = [];

    this.graph.reset();
    this.graph.get(this.P).distance = 0;

    while (true) {
        this.UnexploredList = this.graph.getSortedUnexploredList();

        if (this.UnexploredList.length == 0) {
            break;
        }

        var B = this.UnexploredList.shift();
        B.selected = true;
 
        if (B.equals(this.G)) {
            var node = B;
            var nextNode = node.parent;
            while(!!node.parent) {
                this.paths.push({x: node.x, y:node.y})
                node = nextNode;
                nextNode = node.parent;
            }
            if(!!B.parent)
                this.paths.push({x: node.x, y:node.y})

            break;
        }

        var adjacentNodes = B.adjacents

        for (var adjacentNodeIndex = 0; adjacentNodeIndex < adjacentNodes.length; adjacentNodeIndex++) {
            var C = adjacentNodes[adjacentNodeIndex];
            if(C.selected) continue;

            if(C.weight != Infinity)
                this.probes.push({x: C.x, y:C.y})

            let distance = B.distance + C.weight + 1;

            if (distance < C.distance) {
                C.distance = distance;
                C.parent = B;
            }
        }
    }

    return {
        found: this.paths.length > 0,
        paths: this.paths,
        probes: this.probes
    }
}

export default DijkstraAlgorithm;