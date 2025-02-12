const taskAddSpace = document.getElementById('add-task-here')
const taskInput = document.getElementById('entered-task');
const addButton = document.getElementById('add');
const taskList = document.getElementById('taskList');

console.log(addButton);

let userPendingTasks = [];

function addNewTask() {
    let value = taskInput.value;

    if (value.length === 0) {
        alert('Please enter a task into the field!');
    } else {
        const taskItem = document.createElement('li');
        taskItem.textContent = value;
        taskList.appendChild(taskItem);

        let deleteTaskButton = document.createElement('button');
        deleteTaskButton.setAttribute('id', 'delete-task');
        deleteTaskButton.innerText = 'Remove';
        taskItem.appendChild(deleteTaskButton);
        deleteTaskButton.addEventListener('click', deleteTask);
    }
    taskAddSpace.reset();
}

function deleteTask(event) {
    event.target.parentElement.remove();
}

addButton.addEventListener('click', addNewTask);

console.log(taskList);