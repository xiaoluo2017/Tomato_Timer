var focusTime = 25;
var breakTime = 5;
var isStarted = false;
var isFocus = true;
var time = undefined;
var timekeeper;

$(document).ready(function() {
  $("#fucusPlus").on("click", function(){
    if (!isStarted && focusTime < 60) {
      focusTime++;
      time = undefined
      $("#focusDisplay").text(focusTime);
    }
  });
  $("#fucusMinus").on("click", function(){
    if (!isStarted && focusTime > 1) {
      focusTime--;
      time = undefined
      $("#focusDisplay").text(focusTime);
    }
  });
  $("#breakPlus").on("click", function(){
    if (!isStarted && breakTime < 60) {
      breakTime++;
      time = undefined
      $("#breakDisplay").text(breakTime);
    }
  });
  $("#breakMinus").on("click", function(){
    if (!isStarted && breakTime > 1) {
      breakTime--;
      time = undefined
      $("#breakDisplay").text(breakTime);
    }
  });
  $("#control").on("click", function() {
    if (!isStarted) {
      if (time === undefined) time = focusTime * 60000;
      timer();
      $("#control").text("pause");
      isStarted = true;
    } else {
      clearTimeout(timekeeper);
      $("#control").text("start");
      isStarted = false;
    }
  });
});

function timer() {
  time = time - 1000;
  var baseTime = new Date();
  baseTime.setTime(0);
  var baseMin = baseTime.getMinutes(), baseSec = baseTime.getSeconds();
  var remainTime = new Date();
  remainTime.setTime(time);
  var remainMin = remainTime.getMinutes(), remainSec = remainTime.getSeconds();
  var minDiff = remainMin - baseMin, secDiff = remainSec - baseSec;
  var minDisplay = minDiff < 10 ? "0" + minDiff : minDiff, secDisplay = secDiff < 10 ? "0" + secDiff : secDiff;
  $("#display").text(minDisplay + ":" + secDisplay);
  var percentage = isFocus ? time / 600 / focusTime  : time / breakTime / 600;
  $("#session").css("background", "linear-gradient(to bottom, #333333, #333333 " + percentage + "%, #99CC00 " + percentage + "%)");
  if (minDiff == 0 && secDiff == 0) {
    statusSwitch();
  } else {
    timekeeper = setTimeout("timer()", 1000); 
  }
}

function statusSwitch() {
  if (isFocus) {
    time = breakTime * 60000;
    timer();
    $("#mark").text("Break");
    isFocus = false;
  } else {
    time = focusTime * 60000;
    timer();
    $("#mark").text("Focus");
    isFocus = true;
  }
}
