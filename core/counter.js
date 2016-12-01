function displayCounters(chart) {

    var counterChart = chart.append("g")
        //.attr("transform", "translate(" + m[3] + "," + (mainHeight + m[0]) + ")")
        .attr("transform", "translate(0," + (chartShift + mTop) + ")")
        .attr("width", w)
        .attr("height", counterChartHeight)
        .attr("class", "mini");

    //TODO
    var xOffset = function(t) {
        return mLeft + linearWidth(t.timing);
    };

    var yOffset = function(t) {
        return 800 + linearWidth(t.timing);
    };

    var countNumber = function(t) {
        return t.total;
    };

    //TODO check to pass chart shift differently

    var computePoint = function(t) {
        return {
            X: xOffset(t),
            Y: 500 + countEmployees(t.timing)
        }
    }

    var counterLines = timeLine.map(function(t, index, tab) {
        // var time = t.timing;
        var counterTime = {
            timing: t.timing,
            total: countEmployees(t.timing)
        }
        counterTime.pointA = computePoint(t);
        counterTime.pointB = computePoint(tab[index++]);
        return counterTime;
    });

    console.log(counterLines);

    counterChart.append("g").selectAll(".miniLabels")
        .data(counterLines)
        .enter().append("text")
        .text(countNumber)
        .attr("x", xOffset)
        .attr("y", mTop + 560)
        .attr("dx", -5)
        .attr("dy", 0);

    counterChart.append("g").selectAll(".idLines")
        .data(counterLines)
        .enter().append("line")
        .attr("class", "lineCounter")
        .attr("x1", function(c) {
            return c.pointA.X;
        })
        .attr("y1", function(c) {
            return c.pointA.Y;
        })
        .attr("x2", function(c) {
            return c.pointA.X + 30;
        })
        .attr("y2", function(c) {
            return c.pointA.Y;
        });

    // var getName = function(d) {
    //     return d.name;
    // }
    //
    // var getTeamClass = function(d) {
    //     return "team_" + d.team;
    // }

    // //mini item rectangles
    // counterChart.append("g").selectAll("miniItems")
    //     .data(persons)
    //     .enter().append("rect")
    //     .attr("class", getTeamClass)
    //     .attr("x", function(d) {
    //         return mLeft + scaleX(d.start);
    //     })
    //     .attr("y", function(d) {
    //         return scaleY2(d.id + .5) - 7;
    //     })
    //     .attr("width", function(d) {
    //         return linearWidth(d.duration) + 1;
    //     })
    //     .attr("height", 15)
    //     .on("mouseover", onMouseOver)
    //     .on("mouseout", onMouseOut);
    //
    // //mini labels
    // counterChart.append("g").selectAll(".miniLabels")
    //     .data(persons)
    //     .enter().append("text")
    //     .text(getName)
    //     .attr("x", function(d) {
    //         return mLeft + scaleX(d.start) - (d.name.length * 7 + 2);
    //     })
    //     .attr("y", function(d) {
    //         return scaleY2(d.id + 0.5);
    //     })
    //     .attr("dy", ".5ex");
}
