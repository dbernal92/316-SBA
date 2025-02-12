// Create the dark mode toggle button
const darkModeToggle = document.createElement("button");
darkModeToggle.id = "dark-mode-toggle";
darkModeToggle.textContent = "Toggle Dark Mode";

// Append the button to the body (or another section)
document.body.insertBefore(darkModeToggle, document.body.firstChild);

// Check if dark mode was previously enabled
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
}

// Toggle dark mode when the button is clicked
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Save user preference in localStorage
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
});


// Select DOM elements
// Form elemnent
const taskAddSpace = document.getElementById('add-task-here')
// Input field for tasks
const taskInput = document.getElementById('entered-task');
// Button to add tasks to list
const addButton = document.getElementById('add');
// Container for task items
const taskList = document.querySelector('#taskList');


// Debugging to check button
console.log(addButton);

// Array to store pending tasks
let userPendingTasks = [];

// Add a new task to the list and localStorage
function addNewTask() {
    // Trim whitespace
    let value = taskInput.value.trim();

    // Prevent adding empty tasks
    if (value.length === 0) {
        alert('Please enter a task into the field!');
    } else {
        if (!userPendingTasks) {
            // Ensure array is initialized
            userPendingTasks = [];
        }

        // Create a new task item
        const taskItem = document.createElement('li');
        taskItem.textContent = value;

        // Add to task list in UI
        taskList.appendChild(taskItem);

        // Save task in array and update localStorage
        userPendingTasks.push(value);
        localStorage.setItem('tasks', JSON.stringify(userPendingTasks));

        // Create delete button for task
        let deleteTaskButton = document.createElement('button');
        deleteTaskButton.setAttribute('id', 'delete-task');
        deleteTaskButton.innerText = '-';
        taskItem.appendChild(deleteTaskButton);
        deleteTaskButton.addEventListener('click', deleteTask);
    }

    // Clear input field
    taskAddSpace.reset();
}

// Delete task from the UI and localStorage
function deleteTask(event) {
    // Get the li element
    let taskElement = event.target.parentNode;

    // Get task text
    let taskText = taskElement.firstChild.textContent;

    // Remove the task from the array
    userPendingTasks = userPendingTasks.filter(task => task !== taskText);

    // Update localStorage with the new task list
    localStorage.setItem('tasks', JSON.stringify(userPendingTasks));

    // Remove the task from the UI
    taskElement.remove();
}

// Attach event listener to Add Task button
addButton.addEventListener('click', addNewTask);

// Debugging
console.log(taskList);

// Load tasks from localStorage on page load
function loadTasks() {
    let savedTasks = localStorage.getItem('tasks');
    // // Debugging
    console.log("Retrieved tasks from localStorage:", savedTasks);

    if (savedTasks) {
        // Convert JSON string back to array
        userPendingTasks = JSON.parse(savedTasks);
    } else {
        // Initialize empty array if no tasks exist
        userPendingTasks = [];
    }

    // Clear the displayed task list before loading new ones
    taskList.innerHTML = "";

    // Batch DOM updates
    let fragment = document.createDocumentFragment();

    // Loop through saved tasks and add them to the UI
    userPendingTasks.forEach(taskText => {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Create delete button for each task
        let deleteTaskButton = document.createElement('button');
        deleteTaskButton.classList.add('delete-task');
        deleteTaskButton.innerText = '-';
        taskItem.appendChild(deleteTaskButton);
        deleteTaskButton.addEventListener('click', deleteTask);

        fragment.appendChild(taskItem);
    });

    taskList.appendChild(fragment);

}

// Run on page load
document.addEventListener('DOMContentLoaded', loadTasks);