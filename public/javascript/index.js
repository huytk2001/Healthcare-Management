console.log("hello");

function getNextDate(daysToAdd) {
  var nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + daysToAdd);
  return nextDate;
}

function formatDate(date) {
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  return day + "/" + month + "/" + year;
}

// Trong tệp JavaScript (script.js)
document.addEventListener("DOMContentLoaded", function () {
  var selectedDateElement = document.getElementById("selectedDate");
  selectedDateElement.addEventListener("change", function () {
    var selectedDate = selectedDateElement.value;
    // Tiếp tục sử dụng selectedDate trong code của bạn
  });
});
