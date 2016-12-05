function displayCounters(chart) {

    //TODO check to pass chart shift differently

    var counterChart = chart.append("g")
        //.attr("transform", "translate(" + m[3] + "," + (mainHeight + m[0]) + ")")
        .attr("transform", "translate(0," + (chartShift + mTop) + ")")
        .attr("width", w)
        .attr("height", counterChartHeight)
        .attr("class", "mini");

    //max person for a time slice
    var maxPerson = _.max(timeLine, function(x) {
        return x.counter;
    }).counter;

    //get a Point coordinates for a counter time slice
    var computePoint = function(ct) {
        return {
            X: timeXOffset(ct),
            Y: countYHeight(ct, maxPerson)
        }
    }

    //translate each time slice into a counter time object (used to draw lines)
    var counterLines = timeLine.map(function(time, index, tab) {

        var counterTime = Object.assign({}, time);
        //compute starting point
        counterTime.pointA = computePoint(time);
        //compute ending point
        if (index + 1 < tab.length) {
            var nextCounter = tab[index + 1];
            counterTime.pointB = computePoint(nextCounter);
        } else {
            counterTime.pointB = counterTime.pointA;
        }

        //compute trend (up, down or equal)
        if (index > 0) {
            //use previous counter value
            var prevCounter = tab[index - 1];
            counterTime.trend = prevCounter.counter - time.counter;
        }

        return counterTime;
    });

    counterChart.append("g").selectAll(".miniLabels")
        .data(counterLines)
        .enter().append("text")
        .attr("class", "labelCounter")
        .text(function(ct) {
            return ct.trend !== 0 ? ct.counter : '';
        })
        .attr("x", function(ct) {
            return ct.pointA.X;
        })
        .attr("y", function(ct) {
            return ct.pointA.Y;
        })
        .attr("dx", -15)
        .attr("dy", function(ct) {
            return ct.trend < 0 ? -5 : 10;
        });

    counterChart.append("g").selectAll(".idLines")
        .data(counterLines)
        .enter().append("line")
        .attr("class", "lineCounter")
        .attr("x1", function(ct) {
            return ct.pointA.X;
        })
        .attr("y1", function(ct) {
            return ct.pointA.Y;
        })
        .attr("x2", function(ct) {
            return ct.pointB.X;
        })
        .attr("y2", function(ct) {
            return ct.pointB.Y;
        });
}
