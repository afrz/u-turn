//scaling methods

var scaleX = d3.scale.linear()
    .domain([timeBegin, timeEnd])
    .range([0, w]);

// var x1 = d3.scale.linear()
//     .range([0, w]);
//
// var y1 = d3.scale.linear()
//     .domain([0, itemsLength])
//     .range([0, mainHeight]);

var scaleY2 = d3.scale.linear()
    .domain([0, itemsLength])
    .range([0, miniHeight]);

var linearWidth = function(num) {
    return (num * w) / (timeEnd - timeBegin);
}
