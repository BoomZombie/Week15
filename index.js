"use strict"
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#taskList');
const emptyList = document.querySelector('#emptyList');
const removeDoneTask = document.querySelector('.removeDoneTask');

//Добавляем задачу в список
form.addEventListener('submit', addTask);

function addTask(event) {
//отменили стандартное поведение(не обновляет страницу, отменяет отправку формы)
    event.preventDefault();

    //достаем текст задачи из поля ввода
    const taskText = taskInput.value;

    //разметка для новой задачи
    const taskHTML = `
                        <li class="list-group-item d-flex justify-content-between task-item">
                            <span class="task-title task-title--done">${taskText}</span>
					        <div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="style/img/done.png" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="style/img/delete.png" alt="Delete" width="18" height="18">
						</button>
                        </div>
                        </li>`;

    //Добавляем на страницу задачу
    taskList.insertAdjacentHTML('beforeend', taskHTML);
    //Очистим поля ввода и перемещаем на него фокус
    taskInput.value = '';
    taskInput.focus();

    //Исчезает надпись "Нет задач" при добалении хотя бы одной задачи
    if(taskList.children.length>1) {
        emptyList.classList.add('none');
    }
}

//Удаляем задачу из списка
taskList.addEventListener('click', deleteTask);

function deleteTask(event) {
    //Проверка, что произошел клик по кнопке "Удалить задачу"
    if(event.target.dataset.action === 'delete') return;
    const parenNode = event.target.closest('.list-group-item');
    parenNode.remove();

    //Если в списке задач нет элементов, появляется надпись "Нет задач"
    if(taskList.children.length === 1) {
        emptyList.classList.remove('none');
    }  
};

//Отметка, что задача завершена
taskList.addEventListener('click', doneTask);

function doneTask(event) {
    //Проверяем, что кликнули по кнопке "Задача выполнена"
    if(event.target.dataset.action !== 'done') return;
    const parentNode = event.target.closest('.list-group-item');
    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');
}

removeDoneTask.addEventListener('click', deleteAll);

function deleteAll(event) {
    taskList.remove();
}
