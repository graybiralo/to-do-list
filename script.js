const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div class="buttons">
            <button class="edit-button">Edit</button>
            <button class="complete-button">Complete</button>
            <button class="delete-button">Delete</button>
        </div>
    `;

    taskList.appendChild(taskItem);
    taskInput.value = '';
}


taskList.addEventListener('click', function (event) {
    const taskItem = event.target.closest('.task-item');

    if (event.target.classList.contains('complete-button')) {
        taskItem.classList.toggle('completed');
        const taskTextElement = taskItem.querySelector('.task-text');
        taskTextElement.classList.toggle('completed-text');
    } else if (event.target.classList.contains('delete-button')) {
        taskList.removeChild(taskItem);
    } else if (event.target.classList.contains('edit-button')) {
        const taskTextElement = taskItem.querySelector('.task-text');
        const taskTextInput = document.createElement('input');
        taskTextInput.type = 'text';
        taskTextInput.value = taskTextElement.textContent;
        taskTextInput.classList.add('edit-input');
        taskTextElement.replaceWith(taskTextInput);

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.classList.add('save-button');
        taskItem.querySelector('.buttons').appendChild(saveButton);

        saveButton.addEventListener('click', function () {
            const editedText = taskTextInput.value.trim();
            if (editedText !== '') {
                taskTextElement.textContent = editedText;
                taskTextInput.replaceWith(taskTextElement);
                saveButton.remove();
            }
        });
    }
});


