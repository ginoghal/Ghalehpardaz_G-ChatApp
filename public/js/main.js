// var t = new Date();
// document.getElementById("time").innerHTML = t;

var day = new Date();

var date = day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();

var time = day.getHours() + ":" + day.getMinutes() + ":" + day.getSeconds();

document.getElementById("time").innerHTML = time;
