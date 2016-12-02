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

    var yOffset = function(t) {
        return 800 + linearWidth(t.timing);
    };

    var computePoint = function(ct) {

        // console.log(ct)
        return {
            X: timeXOffset(ct),
            Y: countYHeight(ct, maxPerson)
        }
    }

    var counterLines = timeLine.map(function(time, index, tab) {

        var counterTime = Object.assign({}, time);
        counterTime.pointA = computePoint(time);

        if (index + 1 === tab.length) {
            counterTime.pointB = counterTime.pointA
        } else {
            counterTime.pointB = computePoint(tab[index + 1]);
        }
        return counterTime;
    });

    var dy = 0;
    var dyf = function(t) {
        dy = dy + 10
        return dy;
    }

    var countNumber = function(t) {
        // return countYHeight(t, maxPerson);
        // /return `(${t.pointA.X},${t.pointA.Y})->(${t.pointB.X},${t.pointB.Y})`;
        return t.total;
    };

    counterChart.append("g").selectAll(".miniLabels")
        .data(counterLines)
        .enter().append("text")
        .text(countNumber)
        .attr("x", timeXOffset)
        .attr("y", mTop + 100)
        .attr("dx", -5)
        .attr("dy", dyf); ///dy + 10);

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
