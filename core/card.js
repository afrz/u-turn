function computeLocalOffset(index) {
  var popupCardHeight = 300;
  //transform index into 0-1 ratio
  var ratio = index / Math.max(1, cfg.totalPersons);
  return ratio * popupCardHeight;
}

var onMouseOver = function(e, i) {
  var card = document.getElementsByClassName("card")[0];
  if (card) {
    card.style.display = "block";
    card.style.top = d3.event.offsetY - computeLocalOffset(i) + "px";
    card.style.left = -250 + d3.event.offsetX + "px";

    card.getElementsByClassName("name")[0].innerHTML = e.name;
    card.getElementsByClassName("from")[0].innerHTML = moment(e.from).format(
      "LL"
    );
    card.getElementsByClassName("to")[0].innerHTML = moment(e.to).format("LL");
    card.getElementsByClassName("duration")[0].innerHTML = moment
      .duration(e.duration, cfg.unit)
      .humanize();
    card.getElementsByClassName("score")[0].innerHTML = countEmployeesEaten(e);

    card.getElementsByClassName("photo")[0].alt = e.name;
    if (mainURL) {
      card.getElementsByClassName("photo")[0].src =
        atob(mainURL) + "/images/" + e.name + ".png";
    }
  }
};

var onMouseOut = function() {
  var card = document.getElementsByClassName("card")[0];
  if (card) {
    card.style.display = "none";
  }
};
