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
