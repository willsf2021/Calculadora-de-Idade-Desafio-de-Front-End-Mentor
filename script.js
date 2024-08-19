// Input elements for day, month, and year
let dayInput = document.querySelector("#dia-input");
let monthInput = document.querySelector("#mes-input");
let yearInput = document.querySelector("#ano-input");

// Arrays for easy access to inputs and labels
let inputs = [dayInput, monthInput, yearInput];
let dayLabel = document.querySelector("#dia-label");
let monthLabel = document.querySelector("#mes-label");
let yearLabel = document.querySelector("#ano-label");
let labels = [dayLabel, monthLabel, yearLabel];

// Error message elements for empty fields
let emptyDay = document.querySelector(".vazio-dia");
let emptyMonth = document.querySelector(".vazio-mes");
let emptyYear = document.querySelector(".vazio-ano");
let emptys = [emptyDay, emptyMonth, emptyYear];

// Error message elements for invalid data
let invalidMonth = document.querySelector(".invalido-mes");
let invalidDay = document.querySelector(".invalido-dia");
let invalidDate = document.querySelector(".invalida-data");
let invalidYear = document.querySelector(".invalido-ano");

// Constants for the current date
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDay = new Date().getDate();

// Main function to validate inputs and calculate age
function calcular() {
  if (validate()) {
    calculateAge();
  }
}

// Function to validate the year input
function validateYear() {
  if (yearInput.value > currentYear) {
    invalidYear.style.display = "block";
    yearInput.style.border = "1px solid red";
    yearLabel.style.color = "red";
  }
}

// Function to check if the provided date is valid
function isValidDate(day, month, year) {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() == year &&
    date.getMonth() == month - 1 &&
    date.getDate() == day
  );
}

// Function to validate all inputs and show appropriate error messages
function validate() {
  let isValid = true;
  clearErrors();

  // Check if day input is valid
  if (dayInput.value > 31) {
    invalidDay.style.display = "block";
    dayInput.style.border = "1px solid red";
    dayLabel.style.color = "red";
    isValid = false;
  }

  // Check if month input is valid
  if (monthInput.value > 12) {
    invalidMonth.style.display = "block";
    monthInput.style.border = "1px solid red";
    monthLabel.style.color = "red";
    isValid = false;
  }

  // Check if any input is empty
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value <= 0) {
      inputs[i].style.border = "1px solid red";
      labels[i].style.color = "red";
      emptys[i].style.display = "block";
      isValid = false;
    }
  }

  // Check if the full date is valid
  if (
    isValid &&
    !isValidDate(dayInput.value, monthInput.value, yearInput.value)
  ) {
    invalidDate.style.display = "block";
    dayInput.style.border = "1px solid red";
    dayLabel.style.color = "red";
    monthInput.style.border = "1px solid red";
    monthLabel.style.color = "red";
    yearInput.style.border = "1px solid red";
    yearLabel.style.color = "red";
    isValid = false;
  }

  // Validate the year separately
  validateYear();

  return isValid;
}

// Function to clear all error messages and styles
function clearErrors() {
  let errorMessages = [
    invalidDay,
    invalidMonth,
    invalidDate,
    invalidYear,
    emptyDay,
    emptyMonth,
    emptyYear,
  ];
  for (let error of errorMessages) {
    error.style.display = "none";
  }

  for (let input of inputs) {
    input.style.border = "";
  }

  for (let label of labels) {
    label.style.color = "";
  }
}

// Elements for displaying the age results
let daySpan = document.querySelector(".dias");
let monthSpan = document.querySelector(".mess");
let yearSpan = document.querySelector(".anoss");

// Function to calculate age based on the input date
function calculateAge() {
  const today = new Date();
  const birthDate = new Date(
    yearInput.value,
    monthInput.value - 1,
    dayInput.value
  );

  if (isValidDate(dayInput.value, monthInput.value, yearInput.value)) {
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    // Adjust age if the current month or day is before the birth month or day
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    // Calculate month difference
    let month = monthDifference < 0 ? 12 + monthDifference : monthDifference;
    if (dayDifference < 0) {
      month--;
      if (month < 0) month = 11;
    }

    // Calculate day difference
    let day =
      dayDifference < 0
        ? new Date(today.getFullYear(), today.getMonth(), 0).getDate() +
          dayDifference
        : dayDifference;

    // Display the calculated age
    daySpan.textContent = day >= 0 ? day : "--";
    monthSpan.textContent = month >= 0 ? month : "--";
    yearSpan.textContent = age >= 0 ? age : "--";
  } else {
    // Clear age display if the date is invalid
    daySpan.textContent = "--";
    monthSpan.textContent = "--";
    yearSpan.textContent = "--";
  }
}
