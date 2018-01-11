function randomEmpoyees() {
  var rdm = [];

  var allTeams = ["business", "tech", "admin", "com", "integ", "presta"];

  function randomDate(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  function randomTeam() {
    return allTeams[Math.floor(Math.random() * allTeams.length)];
  }

  function randomName() {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  var today = new Date();
  var turnoverRatio = 0.6;

  for (i = 0; i < 50; i++) {
    var randomStart = randomDate(new Date(2012, 01, 01), today);
    var randomEnd = randomDate(randomStart, today);

    if (Math.random() > turnoverRatio) {
      randomEnd = null;
    }
    rdm.push({
      name: randomName(),
      team: randomTeam(),
      from: randomStart,
      to: randomEnd
    });
  }
  return rdm;
}

var mainURL = getParameterByName("url");
//retreive data from url
if (mainURL && window.fetch) {
  var url = atob(mainURL) + "/people.json";
  fetch(url)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function(json) {
      display(json);
    })
    .catch(function(ex) {
      console.log("Parsing failed", ex);
      display(randomEmpoyees());
    });
} else {
  //default : display random
  displayLazy(randomEmpoyees());
}
