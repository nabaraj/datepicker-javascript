var todayDate = new Date();
var currentCalendar = {
  month: todayDate.getMonth(),
  year: todayDate.getFullYear()
};
var highlightDate = new Date();
var month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
createDate(todayDate);

function createDate(dateObj) {
  var getYear = dateObj.getFullYear();
  var getMonth = dateObj.getMonth();
  var getDate = dateObj.getDate();
  var firstDay = new Date(getYear, getMonth, 1).getDay();
  var lastDate = new Date(getYear, getMonth + 1, 0);

  document.querySelector("#calendarBody").innerHTML = "";
  var dayCounter = 0;
  var currentDateClass = "";
  for (let i = 1; i <= lastDate.getDate(); i++) {
    currentDateClass =
      i + "" + getMonth + "" + getYear ===
      highlightDate.getDate() +
        "" +
        highlightDate.getMonth() +
        "" +
        highlightDate.getFullYear()
        ? " currentDate"
        : "";

    while (dayCounter !== firstDay) {
      let span = document.createElement("span");
      span.className = "dateBox";
      document.querySelector("#calendarBody").appendChild(span);
      dayCounter++;
    }
    let calendarBox = document.createElement("span");
    calendarBox.setAttribute("class", "dateBox monthDate" + currentDateClass);
    calendarBox.textContent = i;
    calendarBox.setAttribute(
      "data-value",
      (i < 10 ? "0" + i : i) + "/" + getMonth + "/" + getYear
    );
    calendarBox.addEventListener("click", selectMonth);

    document.querySelector("#calendarBody").appendChild(calendarBox);
  }
  document.querySelector("#yearToDisplay").innerHTML =
    getYear + " " + month[getMonth];
}

document.querySelector(".leftNav").addEventListener("click", prevMonth);
document.querySelector(".rightNav").addEventListener("click", nextMonth);
document.getElementById("showCalendar").addEventListener("click", showDate);
function showDate(e) {
  var showDate = document.getElementById("showDate");
  var getDate = showDate.value.split("/")[0];
  var getMonth = showDate.value.split("/")[1] - 1;
  var getYear = showDate.value.split("/")[2];
  highlightDate = new Date(getYear, getMonth, getDate);
  currentCalendar = {
    month: getMonth,
    year: getYear
  };
  createDate(new Date(getYear, getMonth, getDate));
}

function selectMonth(e) {
  var dateArr = e.target.getAttribute("data-value").split("/");
  highlightDate = new Date(dateArr[2], dateArr[1], dateArr[0]);
  document.querySelector("#showDate").value = e.target.getAttribute(
    "data-value"
  );
  createDate(highlightDate);
}

function nextMonth() {
  var getMonth = currentCalendar.month;
  var getYear = currentCalendar.year;
  if (getMonth === 11) {
    getMonth = 0;
    getYear++;
  } else {
    getMonth++;
  }
  currentCalendar.month = getMonth;
  currentCalendar.year = getYear;
  createDate(new Date(getYear, getMonth, 1), true);
}

function prevMonth() {
  var getMonth = currentCalendar.month;
  var getYear = currentCalendar.year;
  if (getMonth === 0) {
    getMonth = 11;
    getYear--;
  } else {
    getMonth--;
  }
  currentCalendar.month = getMonth;
  currentCalendar.year = getYear;
  createDate(new Date(getYear, getMonth, 1), true);
}
