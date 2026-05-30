'use strict';
// getElementById
const xpCount = document.getElementById('xp-count');
const timerDisplay = document.getElementById('progress-bar');
const progressBar = document.getElementById('progress-bar');
const timerMessage = document.getElementById('timer-message');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const dumpInput = document.getElementById('dump-input');
const dumpBtn = document.getElementById('dump-btn');
const dumpList = document.getElementById('dump-list');
const dumpError = document.getElementById('dump-error');
const taskInput = document.getElementById('task-input');
const taskBtn = document.getElementById('task-btn');
const taskList = document.getElementById('task-list');
const taskError = document.getElementById('task-error');
const clearBtn = document.getElementById('clear-btn');
const toast = document.getElementById('toast');

// Query Selector
const cardTemplate = document.querySelector('#card-template')
const energyBtns = document.querySelectorAll('.energy-btn')

// Section B : App State
let timerDuration = 25*60;
let timeRemaining = timerDuration;
let timerInterval = null;
let isRunning = false;
let xp = 0;
let currentEnergy = 'medium';

// Local Storage - BOM window.localStorage

const savedXP = window.localStorage.getItem('focusflow-xp');

if (savedXP !== null) {
    xp = parseInt(savedXP)
}

const savedTasks = window.localStorage.getItem('focusflow-task');
let tasks = savedTasks ? JSON.parse(savedTasks) : [];

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const display = `${minutes};${seconds.toString().padStart(2, '0')}`;
    timerDisplay.textContent = display;

    if (timeRemaining <= 60) {
        timerDisplay.classList.add('danger');
        timerDisplay.classList.remove('warning');
    } else if (timeRemaining <= 300) {
        timerDisplay.classList.add('warning');
        timerDisplay.classList.remove('danger');
    } else {
        timerDisplay.classList.remove('warning');
        timerDisplay.classList.remove('danger');
    }
}

function updateProgressBar() {
    const percentage = (timeRemaining / timerDuration) * 100;
    progressBar.style.width = percentage +'%';

}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(window.toastTimeout);
    window.toastTimeout = window.setTimeout(function() {
        toast.classList.remove('visible');
    }, 3000);
}


// Modifying Text Context in Response to User Action & Modifying Classes
function addXP(amount) {
    xp += amount;
    xpCount.textContent = xp;
    xpCount.classList.add('bump');
    window.setTimeout(function() {
        xpCount.classList.remove('bump');
    }, 400);
    window.localStorage.setItem('focusflow-xp');
    showToast('⚡ +' + amount + ' XP!');
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    startBtn.setAttribute('disabled', 'true');
    resetBtn.removeAttribute('disabled');
    timerMessage.textContent = 'Stay Locked In. You Got This.';
    timerInterval = window.setInterval(function() {
        timeRemaining--;
        updateTimerDisplay();
        updateProgressBar();
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            startBtn.removeAttribute('disabled');
            timerMessage.textContent = 'Mission Complete! Great Work!';
            addXP(25);
        }
    }, 1000);
}
