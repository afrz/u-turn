function displayPersons(chart) {

    var personChart = chart.append("g")
        //.attr("transform", "translate(" + m[3] + "," + (mainHeight + m[0]) + ")")
        .attr("transform", "translate(0," + (chartShift + mTop) + ")")
        .attr("width", w)
        .attr("height", personChartHeight)
        .attr("class", "mini");

    var getName = function(d) {
        return d.name;
    }

    var getTeamClass = function(d) {
        return "team_" + d.team;
    }

    //mini item rectangles
    personChart.append("g").selectAll("miniItems")
        .data(persons)
        .enter().append("rect")
        .attr("class", getTeamClass)
        .attr("x", function(d) {
            return mLeft + scaleX(d.start);
        })
        .attr("y", function(d) {
            return scaleY2(d.id + .5) - 7;
        })
        .attr("width", function(p) {
            return linearWidth(p.duration) + 1;
        })
        .attr("height", 15)
        .attr("opacity", function(p) {
            return p.here ? 1 : 0.4;
        })
        .on("mouseover", onMouseOver)
        .on("mouseout", onMouseOut);

    //mini labels
    personChart.append("g").selectAll(".miniLabels")
        .data(persons)
        .enter().append("text")
        .text(getName)
        .attr("x", function(d) {
            return mLeft + scaleX(d.start) - (d.name.length * 7 + 2);
        })
        .attr("y", function(d) {
            return scaleY2(d.id + 0.5);
        })
        .attr("dy", ".5ex");
}
