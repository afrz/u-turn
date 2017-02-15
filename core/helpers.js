

//extract paramater from URL
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

//count employee at a specific timing (relative)
function countEmployees(timing, inclusive = false) {
    
    return cfg.persons.filter(function(x) {
        const withEnd = inclusive ? x.end >= timing : x.end > timing;
        return x.start <= timing && withEnd;
    }).length;
}