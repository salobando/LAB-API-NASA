flatpickr("#calendario", {
    dateFormat: "Y-m-d",
    minDate: "today"
});
const calendarElementList = Array.prototype.slice.call(document.querySelectorAll('.calendar'))
const calendarList = calendarElementList.map(calendarEl => {
  return new coreui.Calendar(calendarEl)
})
