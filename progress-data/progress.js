function initialize() {
    fetch('progress-data/seasonData.json').then(response=>response.json()).then(response => {
        document.getElementById('season-name').innerHTML = response.thisSeason.seasonName;
        document.getElementById('fn-season').innerHTML = response.thisSeason.season;
        var start = response.thisSeason.startDate;
        var end = response.thisSeason.endDate;
        var next_start = response.nextSeason.startDate;

        document.getElementById('end-date').innerHTML = 'Ends ' + getFormatDate(new Date(end));

        document.getElementById('fn-season-next').innerHTML = response.nextSeason.season;
        document.getElementById('start-date-next').innerHTML = 'Starts ' + getFormatDate(new Date(next_start));

        doCalc(start, end);
        var timer = setInterval(function() {
            doCalc(start, end);
        }, 1000);
    });
}

function doCalc(startDate, endDate) {
    var end = new Date(endDate);
    var start = new Date(startDate);
    var now = new Date();
    var dif = end.getTime() - now.getTime();
    
    var Seconds = Math.floor(dif / 1000);
    var time = formatTime(Seconds);

    document.getElementById("countdown-text").innerHTML = time;
    var fS = (end.getTime() - start.getTime()) / 1000;
    var sS = (now.getTime() - start.getTime()) / 1000;

    var sp1 = (sS / fS) * 100;
    var ro = trueRound(sp1, 2);
    var content = ro + "%";

    document.getElementById("progress-bar").style.width = content;
    document.getElementById("percentage").innerHTML = content;
}

function formatTime(seconds)
{
    var numdays = zeroBefore(Math.floor((seconds % 31536000) / 86400)); 
    var numhours = zeroBefore(Math.floor(((seconds % 31536000) % 86400) / 3600));
    var numminutes = zeroBefore(Math.floor((((seconds % 31536000) % 86400) % 3600) / 60));
    var numseconds = zeroBefore((((seconds % 31536000) % 86400) % 3600) % 60);
    return numdays + ':' + numhours + ':' + numminutes + ':' + numseconds;
}

function trueRound(value, digits){
    return (Math.round((value*Math.pow(10,digits)).toFixed(digits-1))/Math.pow(10,digits)).toFixed(digits);
}

function zeroBefore(num) {
    return (num < 10 ? '0' + num : num);
}

function getFormatDate(date) {
    var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

    return weekDays[date.getDay()] + ', ' + months[date.getMonth() + 1] + ' ' + date.getDate() + ', ' + date.getFullYear();
}