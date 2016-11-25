function display() {


    var chart = d3.select("body")
        .append("svg")
        .attr("width", w + mLeft + mRight)
        .attr("height", h + mTop + mBottom)
        .attr("class", "chart");



    var getName = function(d) {
        return d.name;
    }
    var getTeamClass = function(d) {
        return "team_" + d.team;
    }


    var main = chart.append("g")
        //.attr("transform", "translate(" + (m[3]) + "," + (m[0]) + ")")
        //.attr("transform", "translate(" + m[3] + "," + (m[0]) + ")")
        .attr("width", w)
        .attr("height", mainHeight)
        .attr("class", "main");

    // main.append("g").selectAll(".idLines")
    // 	.data(items)
    // 	.enter().append("line")
    // 	.attr("x1", mLeft)
    // 	.attr("y1", function(d) {return y1(d.id);})
    // 	.attr("x2", w)
    // 	.attr("y2", function(d) {return y1(d.id);})
    // 	.attr("stroke", "green");


    //compute TIMELINE information

    var timeLine = [];
    var timeCounter = moment(epochString);

    // timeLine.push({
    // 	timer: 0,
    // 	label: timeCounter.format("LL")
    // });
    while (timeCounter.isBefore(now)) {

        var primer = timeCounter.get('month') === 0;
        timeLine.push({
            timer: timeCounter.diff(epoch, unit),
            label: primer ? timeCounter.format("YY/MM") : '',
            kind: primer ? 'primary' : 'secondary'
        });
        timeCounter.add(1, 'M');
    }

    console.log(timeLine);
    console.log(now);

    main.append("g").selectAll(".idLines")
        .data(timeLine)
        .enter().append("line")
        .attr("class", function(x) {
            return "absciss_" + x.kind;
        })
        .attr("x1", function(d) {
            return mLeft + linearWidth(d.timer);
        })
        // .attr("y1", mTop)
        .attr("y1", function(x) {
            return x.kind === 'primary' ? mTop : mTop + 10;
        })
        .attr("x2", function(d) {
            return mLeft + linearWidth(d.timer);
        })
        .attr("y2", mainHeight + 350); //TODO)

    //mini labels
    main.append("g").selectAll(".miniLabels")
        .data(timeLine)
        .enter().append("text")
        .text(function(d) {
            return d.label;
        })
        .attr("x", function(d) {
            return mLeft + linearWidth(d.timer) - 15;
        })
        .attr("y", mTop)
        .attr("dy", function(x) {
            return x.kind === 'primary' ? '-1ex' : '2ex';
        });
    //.attr("dy", "-1ex");
    /*
    		chart.append("defs").append("clipPath")
    			.attr("id", "clip")
    			.append("rect")
    			.attr("width", w)
    			.attr("height", mainHeight);

    		var main = chart.append("g")
    					.attr("transform", "translate(" + m[3] + "," + (miniHeight + m[0]) + ")")
    					.attr("width", w)
    					.attr("height", mainHeight)
    					.attr("class", "main");

    		//main lanes and texts
    		main.append("g").selectAll(".idLines")
    			.data(items)
    			.enter().append("line")
    			.attr("x1", m[1])
    			.attr("y1", function(d) {return y1(d.id);})
    			.attr("x2", w)
    			.attr("y2", function(d) {return y1(d.id);})
    			.attr("stroke", "lightgray")

    		main.append("g").selectAll(".idText")
    			.data(items)
    			.enter().append("text")
    			.text(getName)
    			.attr("x", -m[1])
    			.attr("y", function(d, i) {return y1(i + .5);})
    			.attr("dy", ".5ex")
    			.attr("text-anchor", "end")
    			.attr("class", "laneText");
    */

    var mini = chart.append("g")
        //.attr("transform", "translate(" + m[3] + "," + (mainHeight + m[0]) + ")")
        .attr("transform", "translate(0," + (mainHeight + mTop) + ")")
        .attr("width", w)
        .attr("height", miniHeight)
        .attr("class", "mini");

    //mini lanes and texts
    // mini.append("g").selectAll(".idLines")
    // 	.data(items)
    // 	.enter().append("line")
    // 	.attr("x1", function(d) { return scaleX(d.start)})
    // 	.attr("y1", function(d) {return scaleY2(d.id);})
    // 	.attr("x2", w)
    // 	.attr("y2", function(d) {return scaleY2(d.id);})
    // 	.attr("stroke", "#ccc");

    // mini.append("g").selectAll(".idText")
    // 	.data(items)
    // 	.enter().append("text")
    // 	.text(getName)
    // 	.attr("x", -m[1])
    // 	.attr("y", function(d, i) {return scaleY2(i + .5);})
    // 	.attr("dy", ".5ex")
    // 	.attr("text-anchor", "end")
    // 	.attr("class", "laneText");

    //mini item rects
    mini.append("g").selectAll("miniItems")
        .data(items)
        .enter().append("rect")
        .attr("class", getTeamClass)
        .attr("x", function(d) {
            return mLeft + scaleX(d.start);
        })
        .attr("y", function(d) {
            return scaleY2(d.id + .5) - 7;
        })
        .attr("width", function(d) {
            return linearWidth(d.duration);
        })
        .attr("height", 15)
        .on("mouseover", onMouseOver)
        .on("mouseout", onMouseOut);

    //mini labels
    mini.append("g").selectAll(".miniLabels")
        .data(items)
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

document.addEventListener("DOMContentLoaded", function() {
    display();
});
