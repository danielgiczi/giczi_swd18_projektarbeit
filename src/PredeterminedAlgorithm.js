function PredeterminedAlgorith(probePositon) {
    this.predProbes = [[[2, 8], [2, 7], [2, 6], [2, 5], [3, 5], [3, 4], [4, 4], [4, 3]]]
    this.predProbeInx = 1;
    this.probePositon = probePositon;
}

PredeterminedAlgorith.prototype.work = function () {
    this.predProbes.forEach((probe) => {
        if (!probe[this.predProbeInx]) {
            return false;
        }

        let currX = probe[this.predProbeInx - 1][0]
        let currY = probe[this.predProbeInx - 1][1]

        let probeX = probe[this.predProbeInx][0]
        let probeY = probe[this.predProbeInx][1]
        this.probePositon(currX, currY, probeX, probeY)
    })

    this.predProbeInx++;
}

module.exports = PredeterminedAlgorith