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
        const div = document.createElement('div');
        div.textContent = value;
        taskList.appendChild(div);

        let deleteTaskButton = document.createElement('button');
        deleteTaskButton.setAttribute('id', 'delete-task');
        deleteTaskButton.innerText = 'Remove';
        div.appendChild(deleteTaskButton);
    }
    taskAddSpace.reset();
}



addButton.addEventListener('click', addNewTask);

console.log(taskList);