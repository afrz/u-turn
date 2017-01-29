var employees = [];


var allTeams = ["business", "tech", "admin", "com"];

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomTeam() {
  return allTeams[Math.floor(Math.random()*allTeams.length)];
}

function randomName() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


var today = new Date();
var turnoverRatio = 0.4;

for(i = 0; i < 30; i++) {

  var randomStart = randomDate(new Date(2012, 01, 01), today)
  var randomEnd = randomDate(randomStart, today);

  if (Math.random() > turnoverRatio) {
    randomEnd = null;
  }
  employees.push({ name : randomName(), team : randomTeam(), from: randomStart, to : randomEnd });
}
