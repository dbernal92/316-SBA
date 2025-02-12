// ========== DARK MODE FUNCTIONALITY ========== //

// Create and insert the dark mode toggle button
const darkModeToggle = document.createElement("button");
darkModeToggle.id = "dark-mode-toggle";
darkModeToggle.textContent = "Toggle Dark Mode";
document.body.insertBefore(darkModeToggle, document.body.firstChild);

// Check and apply dark mode from localStorage
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
}

// Toggle dark mode and save preference
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
});

// ========== SELECT DOM ELEMENTS ========== //

const taskAddSpace = document.getElementById('add-task-here'); // Form element
const taskInput = document.getElementById('entered-task'); // Input field
const addButton = document.getElementById('add'); // Add Task button
const taskList = document.querySelector('#taskList'); // Task list container

console.log(addButton); // Debugging check

// ========== GLOBAL VARIABLES ========== //

let userPendingTasks = []; // Array to store tasks

// ========== EVENT LISTENERS ========== //

addButton.addEventListener('click', addNewTask);
document.addEventListener('DOMContentLoaded', loadTasks); // Load tasks on page load

// ========== TASK MANAGEMENT FUNCTIONS ========== //

// Add a new task to the list and localStorage
function addNewTask() {
    let value = taskInput.value.trim(); // Trim whitespace

    if (value.length === 0) {
        alert('Please enter a task into the field!');
    } else {
        if (!userPendingTasks) userPendingTasks = []; // Ensure array is initialized

        const taskItem = document.createElement('li');
        taskItem.textContent = value;

        taskItem.addEventListener('click', enableEditTask); // Enable editing on click
        taskList.appendChild(taskItem);

        userPendingTasks.push(value); // Save task in array
        localStorage.setItem('tasks', JSON.stringify(userPendingTasks)); // Update storage

        // Create delete button
        let deleteTaskButton = document.createElement('button');
        deleteTaskButton.classList.add('delete-task');
        deleteTaskButton.innerText = '-';
        taskItem.appendChild(deleteTaskButton);
        deleteTaskButton.addEventListener('click', deleteTask);
    }

    taskAddSpace.reset(); // Clear input field
}

// Delete task from UI and localStorage
function deleteTask(event) {
    let taskElement = event.target.parentNode; // Get the task <li>
    let taskText = taskElement.firstChild.textContent; // Get task text

    userPendingTasks = userPendingTasks.filter(task => task !== taskText); // Remove from array
    localStorage.setItem('tasks', JSON.stringify(userPendingTasks)); // Update storage

    taskElement.remove(); // Remove from UI
}

// Enable editing of task when clicked
function enableEditTask(event) {
    let taskItem = event.target;
    if (taskItem.tagName === 'BUTTON') return; // Prevent clicking the delete button

    let deleteTaskButton = taskItem.querySelector('.delete-task'); // Store delete button

    let inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = taskItem.firstChild.textContent.trim();
    inputField.classList.add('edit-input');

    taskItem.innerHTML = ''; // Clear existing text
    taskItem.appendChild(inputField);
    inputField.focus();

    // Save changes on blur or Enter key
    inputField.addEventListener('blur', () => saveEditedTask(taskItem, inputField, deleteTaskButton));
    inputField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            saveEditedTask(taskItem, inputField, deleteTaskButton);
        }
    });
}

// Save edited task and update localStorage
function saveEditedTask(taskItem, inputField, deleteTaskButton) {
    let newValue = inputField.value.trim();

    if (newValue.length === 0) {
        alert("Task cannot be empty!");
        return;
    }

    taskItem.innerHTML = newValue;
    taskItem.appendChild(deleteTaskButton); // Reattach delete button
    taskItem.addEventListener('click', enableEditTask); // Restore edit functionality

    let index = userPendingTasks.indexOf(inputField.value);
    if (index !== -1) {
        userPendingTasks[index] = newValue;
        localStorage.setItem('tasks', JSON.stringify(userPendingTasks)); // Update storage
    }
}

// ========== LOAD TASKS FROM STORAGE ON PAGE LOAD ========== //

function loadTasks() {
    let savedTasks = localStorage.getItem('tasks');
    console.log("Retrieved tasks from localStorage:", savedTasks); // Debugging

    userPendingTasks = savedTasks ? JSON.parse(savedTasks) : []; // Convert or initialize array

    taskList.innerHTML = ""; // Clear existing tasks

    let fragment = document.createDocumentFragment(); // Optimize rendering

    userPendingTasks.forEach(taskText => {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;
        taskItem.addEventListener('click', enableEditTask); // Enable editing

        let deleteTaskButton = document.createElement('button');
        deleteTaskButton.classList.add('delete-task');
        deleteTaskButton.innerText = '-';
        taskItem.appendChild(deleteTaskButton);
        deleteTaskButton.addEventListener('click', deleteTask);

        fragment.appendChild(taskItem);
    });

    taskList.appendChild(fragment);
}
