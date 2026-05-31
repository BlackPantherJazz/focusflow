'use strict';
// getElementById
const xpCount = document.getElementById('xp-count');
const timerDisplay = document.getElementById('timer-display');
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
const energyBtns = document.querySelectorAll('.energy-btn');

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
    const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
    window.localStorage.setItem('focusflow-xp',xp);
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

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeRemaining = timerDuration;
    updateTimerDisplay();
    updateProgressBar();
    startBtn.removeAttribute('disabled');
    timerMessage.textContent = 'Pick an energy level and press Start.';
    timerDisplay.classList.remove('warning');
    timerDisplay.classList.remove('danger');
}
startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

// Energy Buttons

energyBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        energyBtns.forEach(function(b) {
            b.classList.remove('active');
        });
        btn.classList.add('active');
        const newTime = parseInt(btn.dataset.time);
        currentEnergy = btn.dataset.energy;
        timerDuration = newTime * 60;
        timeRemaining = timerDuration;
        resetTimer();
    });
});

// Brain Dump
function addDumpItem() {
    const text = dumpInput.value.trim();
    if (text.length === 0) {
        dumpError.textContent = 'Please enter a thought first';
        return;
    }
    dumpError.textContent ='';
    const li = document.createElement('li');
    li.classList.add('dump-item');
    const span = document.createElement('span');
    span.classList.add('dump-item-text');
    span.textContent = text;
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('dump-delete');
    deleteBtn.textContent = 'x';
    deleteBtn.addEventListener('click', function() {
        li.parentNode.removeChild(li);
    });
        li.appendChild(span);
        li.appendChild(deleteBtn);
        dumpList.appendChild(li);
        dumpInput.value = '';
        dumpInput.focus();
}
    dumpBtn.addEventListener('click', addDumpItem);
    dumpInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            addDumpItem();
        }
    });
