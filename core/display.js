function display(people) {
  computeConfig(people);
  computeScale();
  computeTimeline();

  var chart = d3
    .select("body")
    .append("svg")
    .attr("width", cfg.w + cfg.mLeft + cfg.mRight)
    .attr("height", cfg.h + cfg.mTop + cfg.mBottom)
    .attr("class", "chart");

  displayTimeline(chart);
  displayPersons(chart);
  displayCounters(chart);
}

function displayLazy(people) {
  //wait until DOM loaded to display data
  document.addEventListener("DOMContentLoaded", function() {
    display(people);
  });
}
