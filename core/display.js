function display() {

    var chart = d3.select("body")
        .append("svg")
        .attr("width", w + mLeft + mRight)
        .attr("height", h + mTop + mBottom)
        .attr("class", "chart");

    displayTimeline(chart);
    displayPersons(chart);
}

document.addEventListener("DOMContentLoaded", function() {
    display();
});
