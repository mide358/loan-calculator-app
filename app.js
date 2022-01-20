'strict mode';

//getting the elements
const amount = document.querySelector('#amount');
const interest = document.querySelector('#interest');
const years = document.querySelector('#years');
const monthlyPayment = document.querySelector('#monthly-payment');
const totalPayment = document.querySelector('#total-payment');
const totalInterest = document.querySelector('#total-interest');
const card = document.querySelector('.card');
const heading = document.querySelector('.heading');

//listen for the submit button
const form = document.querySelector('#loan-form');
form.addEventListener('submit', function (e) {
  //Hide results
  document.querySelector('#results').style.display = 'none';

  //show spinner
  document.querySelector('#loading').style.display = 'block';

  setTimeout(calculateLoan, 2000);

  e.preventDefault();
});

//calculate loan
function calculateLoan() {
  console.log('calculating...');

  // A = P {r(1+r)n} / {(1+r)n –1}  loan formula
  const principal = parseFloat(amount.value);
  const calculateInterest = parseFloat(interest.value) / 100 / 12;
  const loanPeriod = parseFloat(years.value) * 12; // this will give period in months

  //compute monthly loan payment
  const a = Math.pow(1 + calculateInterest, loanPeriod);
  const monthlyLoan = (principal * calculateInterest * a) / (a - 1);

  if (isFinite(monthlyLoan)) {
    monthlyPayment.value = monthlyLoan.toFixed(2);
    totalPayment.value = (monthlyLoan * loanPeriod).toFixed(2);
    totalInterest.value = (monthlyLoan * loanPeriod - principal).toFixed(2);

    //show results
    document.querySelector('#results').style.display = 'block';

    //hide spinner
    document.querySelector('#loading').style.display = 'none';
  } else {
    showError('Please check your input');
  }
}
// this displays error when inputs are empty or incorrect
function showError(error) {
  //hide results
  document.querySelector('#results').style.display = 'none';

  //hide spinner
  document.querySelector('#loading').style.display = 'none';

  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));

  // insert error before heading
  card.insertBefore(errorDiv, heading);
  //clear error after 3 seconds
  setTimeout(clearError, 3000);
}

//function for timeout

function clearError() {
  document.querySelector('.alert').remove();
}

// copyright date function

let year = document.querySelector('#copy-date');
year.innerHTML = `Iyimide <i class="far fa-copyright"><span> ${theDate()}</span>`;
function theDate() {
  return new Date().getFullYear();
}
