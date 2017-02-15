//scaling methods

var scaler = {};

function computeScale() {

    scaler.scaleX = d3.scale.linear()
        .domain([cfg.timeBegin, cfg.timeEnd])
        .range([0, cfg.w]);


    scaler.scaleY2 = d3.scale.linear()
        .domain([0, cfg.totalPersons])
        .range([0, cfg.personChartHeight]);
}

var linearWidth = function (num) {
    return (num * cfg.w) / (cfg.timeEnd - cfg.timeBegin);
}

var timeXOffset = function (t) {
    return cfg.mLeft + linearWidth(t.timing);
};

var countYHeight = function (ct, max) {
    const availHeight = cfg.personChartHeight;
    return availHeight - (ct.counter * availHeight) / max;
}