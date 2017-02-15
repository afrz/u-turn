function displayPersons(chart) {

    var personChart = chart.append("g")
        .attr("transform", "translate(0," + (cfg.chartShift + cfg.mTop) + ")")
        .attr("width", cfg.w)
        .attr("height", cfg.personChartHeight)
        .attr("class", "mini");

    //mini item rectangles
    personChart.append("g").selectAll("miniItems")
        .data(cfg.persons)
        .enter().append("rect")
        .attr("class", function(d) {
            return "team_" + d.team;
        })
        .attr("x", function(d) {
            return cfg.mLeft + scaler.scaleX(d.start);
        })
        .attr("y", function(d) {
            return scaler.scaleY2(d.id + .5) - 7;
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
        .data(cfg.persons)
        .enter().append("text")
        .text(function(p) {
            return p.name;
        })
        .attr("x", function(p) {
            return cfg.mLeft + scaler.scaleX(p.start) - (p.name.length * 7 + 2);
        })
        .attr("y", function(p) {
            return scaler.scaleY2(p.id + 0.5);
        })
        .attr("dy", ".5ex");
}
