var unit = 'days';
moment.locale("fr");
var epochString = '2010-01-01';
var epoch = moment(epochString);

var now = moment().format('YYYY-MM-DD');

var persons = employees
    .sort(function(x, y) {
        return x.from < y.from ? -1 : 1;
    })
    //compute start and end relatively from epoch time.
    .map(function(x, index) {

        //set default end at today if not specified
        if (!x.to) {
            x.to = now;
        }

        //start minimum is 0
        x.start = Math.max(
            moment(x.from).diff(epoch, unit),
            0);

        //end maximum is now
        x.end = Math.min(
            moment(x.to).diff(epoch, unit),
            moment().diff(epoch, unit));

        x.duration = x.end - x.start;
        return x;

    }).filter(function(x) {

        //remove past employees
        return x.duration >= 0;

    }).map(function(x, index) {
        //force index for remaining employees
        x.id = index;
        return x;
    });


var totalPersons = persons.length;

//time is relative from epoch (epoch is 0)
var timeBegin = 0;
var timeEnd = _.max(persons, function(x) {
    return x.end;
}).end;
// console.log(timeBegin, timeEnd);
// console.log(persons);

var mRight = 20;
var mLeft = 125;
var mTop = 20;
var mBottom = 20;
var w = screen.availWidth - mLeft - mRight - 50;
var h = screen.availHeight - mTop - mBottom;

var personHeight = 20;
var personChartHeight = totalPersons * personHeight;
var timeChartHeight = personChartHeight + 25 + mTop; //TODO
console.log(personChartHeight);

//count employee at a specific timing (relative)
function countEmployees(timing) {

    return persons.filter(function(x) {
        return x.start < timing && x.end >= timing;
    }).length;
}
