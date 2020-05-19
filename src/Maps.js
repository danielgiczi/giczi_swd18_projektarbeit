//Map Werte:
// 0,-1,-2,-3,-4,-5 für Gewichte
// 8 für unendlich (Wand)
// S für Start
// D für Destination

var maps = [];

maps.push({
    title: "No Walls",
    data: `
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 S 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 D 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    `   
})

maps.push({
    title: "Vertical Wall",
    data: `
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 S 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 D 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    `   
});

maps.push({
    title: "C-shaped Wall",
    data: `
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 8 8 8 8 8 8 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 D 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 S 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 8 8 8 8 8 8 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
`});

maps.push({
    title: "Stairs",
    data: `
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 8 0 8 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 8 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 8 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    8 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 S 0 0 0 0 0 8 0 0 0 0 0 0 0 D 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 8 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 8 0 0 0 8 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 8 0 8 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 8 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
`});

maps.push({
    title: "Complex",
    data: `
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 S 0 0 0 0 0 0 0 0 8 0 0 8 8 8 8 8 8 8 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 8 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 8 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 8 0 0 0 0 0 8 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 8 0 0 0 0 0 8 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 8 8 8 8 8 8 8 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 8 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 8 0 0 0 0 0 0 0 0
    8 8 0 8 8 8 8 8 8 8 8 0 0 8 8 8 0 8 8 8 8 8
    0 0 0 0 0 0 0 0 0 0 8 0 0 8 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 8 0 8 8 8 8 8 8 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 8 0 0 0 0 0 0 8 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 8 0 8 8 8 8 0 8 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 8 0 8 0 D 8 0 8 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 8 0 8 0 8 8 0 8 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 8 0 8 0 0 0 0 8 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 8 0 8 8 8 8 8 8 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 8 0 0 0 0 0 0 0 0
`});

maps.push({
    title: "Impossible",
    data: `
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 S 0 0 0 0 0 0 0 8 0 0 D 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 0 0
`});

export default maps;
