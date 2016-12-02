var timeLine = [];
var timeCounter = moment(epochString);

while (timeCounter.isBefore(now)) {

    var primer = timeCounter.get('month') === 0;
    var timing = timeCounter.diff(epoch, unit);
    timeLine.push({
        timing: timing,
        label: primer ? timeCounter.format("YYYY") : '',
        kind: primer ? 'primary' : 'secondary',
        counter: countEmployees(timing)
    });
    timeCounter.add(1, 'M');
}

timeLine.push({
    timing: timeEnd,
    label: now,
    kind: 'now',
    counter: countEmployees(timeEnd)
});

function displayTimeline(chart) {

    // console.log(timeLine);

    var timeChart = chart.append("g")
        //.attr("transform", "translate(" + (m[3]) + "," + (m[0]) + ")")
        .attr("width", w)
        .attr("height", timeChartHeight)
        .attr("class", "timeChart");

    var labelYOffset = function(t) {
        return t.kind === 'secondary' ? '2ex' : '-1ex';
    };

    var labelXOffset = function(t) {
        return t.kind === 'now' ? '-10ex' : '-2ex';
    };

    timeChart.append("g").selectAll(".idLines")
        .data(timeLine)
        .enter().append("line")
        .attr("class", function(x) {
            return "absciss_" + x.kind;
        })
        .attr("x1", timeXOffset)
        .attr("y1", function(x) {
            return x.kind === 'secondary' ? mTop + 10 : mTop;
        })
        .attr("x2", timeXOffset)
        .attr("y2", timeChartHeight);

    timeChart.append("g").selectAll(".miniLabels")
        .data(timeLine)
        .enter().append("text")
        .text(function(d) {
            return d.label;
        })
        .attr("x", timeXOffset)
        .attr("y", mTop)
        .attr("dx", labelXOffset)
        .attr("dy", labelYOffset);
}
