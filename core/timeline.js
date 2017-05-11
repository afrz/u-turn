var timeLine = [];
var counterLine = [];

function computeTimeline() {

    var timeCounter = moment(cfg.epochString);

    var prevCounter = 0;
    var currentCounter = 0;

    while (timeCounter.isBefore(cfg.now)) {

        var firstDayOfMonth = timeCounter.date() === 1;
        var primer = timeCounter.get('month') === 0;
        var timing = timeCounter.diff(cfg.epoch, cfg.unit);
        if (firstDayOfMonth) {
          timeLine.push({
              timing: timing,
              label: primer ? timeCounter.format("YYYY") : '',
              kind: primer ? 'primary' : 'secondary',
              counter: countEmployees(timing, false)
          })
        }

        currentCounter =  countEmployees(timing, false);
        if (currentCounter != prevCounter)
        {
            prevCounter = currentCounter;
            counterLine.push({
                timing: timing,
                counter: currentCounter
            });
        }
        timeCounter.add(1, 'days');
    }

    timeLine.push({
        timing: cfg.timeEnd,
        label: '',
        kind: 'now',
        counter: countEmployees(cfg.timeEnd, true)
    });

    counterLine.push({
        timing: cfg.timeEnd,
        counter: countEmployees(cfg.timeEnd, true)
    });
}

function displayTimeline(chart) {

    var timeChart = chart.append("g")
        //.attr("transform", "translate(" + (m[3]) + "," + (m[0]) + ")")
        .attr("width", cfg.w)
        .attr("height", cfg.timeChartHeight)
        .attr("class", "timeChart");

    var labelYOffset = function (t) {
        return t.kind === 'secondary' ? '2ex' : '-1ex';
    };

    var labelXOffset = function (t) {
        return t.kind === 'now' ? '-10ex' : '-2ex';
    };

    timeChart.append("g").selectAll(".idLines")
        .data(timeLine)
        .enter().append("line")
        .attr("class", function (x) {
            return "absciss_" + x.kind;
        })
        .attr("x1", timeXOffset)
        .attr("y1", function (x) {
            return x.kind === 'secondary' ? cfg.mTop + 10 : cfg.mTop;
        })
        .attr("x2", timeXOffset)
        .attr("y2", cfg.timeChartHeight);

    timeChart.append("g").selectAll(".miniLabels")
        .data(timeLine)
        .enter().append("text")
        .text(function (d) {
            return d.label;
        })
        .attr("x", timeXOffset)
        .attr("y", cfg.mTop)
        .attr("dx", labelXOffset)
        .attr("dy", labelYOffset);
}
