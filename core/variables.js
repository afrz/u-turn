moment.locale("fr");

var cfg = {};

function computeConfig(people) {
  cfg.unit = "days";
  cfg.epochString = getParameterByName("start") || "2012-01-01";
  cfg.epoch = moment(cfg.epochString);

  cfg.now = moment().format("YYYY-MM-DD");

  cfg.persons = people
    .sort(function(x, y) {
      return x.from < y.from ? -1 : 1;
    })
    //compute start and end relatively from epoch time.
    .map(function(x, index) {
      //set default end at today if not specified
      if (!x.to) {
        x.to = cfg.now;
        x.here = true;
      }

      //start minimum is 0
      x.start = Math.max(moment(x.from).diff(cfg.epoch, cfg.unit), 0);

      //end maximum is now
      x.end = Math.min(
        moment(x.to).diff(cfg.epoch, cfg.unit),
        moment().diff(cfg.epoch, cfg.unit)
      );

      x.duration = x.end - x.start;
      return x;
    })
    .filter(function(x) {
      //remove past employees
      return x.duration >= 0;
    })
    .map(function(x, index) {
      //force index for remaining employees
      x.id = index;
      return x;
    });

  cfg.totalPersons = cfg.persons.length;

  //time is relative from epoch (epoch is 0)
  cfg.timeBegin = 0;
  cfg.timeEnd = _.max(cfg.persons, function(x) {
    return x.end;
  }).end;

  cfg.mRight = 20;
  cfg.mLeft = 125;
  cfg.mTop = 20;
  cfg.mBottom = 50;

  var personHeight = 20;

  //compute available display size (minus some hardcoded values that depends on screen resolution...)
  cfg.w = window.innerWidth - cfg.mLeft - cfg.mRight - 50;
  cfg.h = cfg.totalPersons * personHeight;

  //size to take to shift chart between them
  cfg.chartShift = 10;

  cfg.personChartHeight = cfg.h;
  cfg.timeChartHeight = cfg.h + cfg.mTop + cfg.chartShift;
  cfg.counterChartHeight = cfg.h + cfg.mTop + cfg.chartShift;
}
