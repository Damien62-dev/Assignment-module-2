
// Navigation function
function showSection(sectionID) {

    // Hide all sections
    const sections = document.querySelectorAll('section');

    for (let i = 0; i < sections.length; i++) {
        sections[i].classList.remove('active');
    }

    // Show the selected section
    document.getElementById(sectionID).classList.add('active');

    // Update navigation buttons
    const buttons = document.querySelectorAll('.nav-btn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }

    // Make the clicked button active
    for (let i = 0; i < buttons.length; i++) {
        const onclickAttr = buttons[i].getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes("'" + sectionID + "'")) {
            buttons[i].classList.add('active');
        }
    }
}

// Variables for scores
let score1 = 0;
let score2 = 0;

// Function to add a point to a player
function addPoint(player) {
    // Ajouter 1 point au joueur
    if (player === 1) {
        score1 = score1 + 1;
    } else {
        score2 = score2 + 1;
    }

    // Update the score display
    document.getElementById('score1').textContent = score1;
    document.getElementById('score2').textContent = score2;

    // Check if there's a winner
    checkWinner();
}

// Function to reset the scores
function resetScore() {
    // Remettre les scores à 0
    score1 = 0;
    score2 = 0;

    // refresh the score display
    document.getElementById('score1').textContent = '0';
    document.getElementById('score2').textContent = '0';

    // delete the winner message
    document.getElementById('winner').textContent = '';
}

// Function to check for a winner
function checkWinner() {
    // Calculer la différence
    let difference1 = score1 - score2;
    let difference2 = score2 - score1;

    // Check the winner conditions
    if (score1 >= 11 && difference1 >= 2) {
        document.getElementById('winner').textContent = 'Player 1 Wins!';
    } else if (score2 >= 11 && difference2 >= 2) {
        document.getElementById('winner').textContent = 'Player 2 Wins!';
    } else {
        // No winner yet
        document.getElementById('winner').textContent = '';
    }
}

// Get references to the form and result div elements

const form = document.getElementById('myForm');
const resultDiv = document.getElementById('result');

// Add a submit event listener to the form
form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Clear previous results
    resultDiv.innerHTML = '';

    // Retrieve form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Perform form validation
    if (!name || !email || !message) {
        resultDiv.innerHTML = '<p class="error">Let serve! You missed a field – please fill them all in..</p>';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        resultDiv.innerHTML = '<p class="error">Faulty serve! Please enter a valid email address.</p>';
    } else if (name.length < 2) {
        resultDiv.innerHTML = '<p class="error">Net shot! Your name needs at least 2 characters.</p>';
    } else if (message.length < 6) {
        resultDiv.innerHTML = '<p class="error">Edge ball! Your message is too short – at least 6 characters needed !</p>';
    } else if (message.length > 500) {
        resultDiv.innerHTML = '<p class="error">Out of bounds! Your message is too long – maximum 500 characters !</p>';
    } else {
        resultDiv.innerHTML = '<p class="success">Smash ! Message sent with success !</p>';
    }


});


// Countdown Timer for a specific date // Found on youtube

const countdown = () => {
    const countDate = new Date('December 10, 2025 00:00:00').getTime();
    const now = new Date().getTime();

    const gap = countDate - now;

    // Set Up the Time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Calculate the Time Gap
    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day) / hour);
    const textMinute = Math.floor((gap % hour) / minute);
    const textSecond = Math.floor((gap % minute) / second);

    // Update the HTML
    document.querySelector('.day').innerText = textDay;
    document.querySelector('.hour').innerText = textHour;
    document.querySelector('.minute').innerText = textMinute;
    document.querySelector('.second').innerText = textSecond;
};

countdown();

setInterval(countdown, 1000);



