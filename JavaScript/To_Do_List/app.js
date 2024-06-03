import { ToDoComponent } from './ToDoComponent.js';

const DEFAULT_TO_DOS = [
  { id: 0, toDo: 'walk dog', isEditing: false },
  { id: 1, toDo: 'get groceries', isEditing: false },
  { id: 2, toDo: 'clean room', isEditing: false },
];

export default class App {
  constructor() {
    this.$appContainer = document.getElementById('app-container');
    this.$addTaskContainer = document.createElement('div');
    this.$tasksContainer = document.createElement('div');
    this.toDos = [];
    this.index = DEFAULT_TO_DOS.length;
  }

  initialize() {
    const $addTaskLabel = document.createElement('label');
    const $addTaskInput = document.createElement('input');
    const $addTaskButton = document.createElement('button');

    $addTaskLabel.textContent = 'add a task';
    $addTaskLabel.htmlFor = 'some id';
    $addTaskButton.textContent = 'add task';
    $addTaskInput.textContent = '';

    DEFAULT_TO_DOS.forEach(task => {
      const newTask = new ToDoComponent(
        task,
        this.toggleIsEditing.bind(this),
        this.updateExistingTask.bind(this)
      );
      this.toDos.push(newTask);
    });
    this.renderToDos();

    $addTaskButton.addEventListener('click', () => {
      if ($addTaskInput.value) {
        const newTask = {
          id: this.index,
          toDo: $addTaskInput.value,
          isEditing: false,
        };
        this.index += 1;
        $addTaskInput.value = '';
        this.addTask(newTask);
      }
    });

    this.$tasksContainer.addEventListener('click', event => {
      event.preventDefault();
      if (event.target.textContent === 'delete') {
        const taskToDelete = event.target.parentNode;
        if (taskToDelete.parentNode) {
          taskToDelete.parentNode.removeChild(taskToDelete);
        }
      }
    });

    this.$addTaskContainer.append($addTaskLabel, $addTaskInput, $addTaskButton);
    this.$appContainer.append(this.$addTaskContainer, this.$tasksContainer);
    return this.$appContainer;
  }

  addTask(task) {
    const newTask = new ToDoComponent(
      task,
      this.toggleIsEditing.bind(this),
      this.updateExistingTask.bind(this)
    );
    this.toDos.push(newTask);
    this.$tasksContainer.append(newTask.render());
  }

  toggleIsEditing(taskId) {
    const taskIndex = this.toDos.findIndex(task => task.id === taskId);
    const taskToUpdate = this.toDos[taskIndex];
    taskToUpdate.isEditing = !taskToUpdate.isEditing;
    const $existingTask = document.getElementById(`to-do-${taskToUpdate.id}`);
    $existingTask.replaceWith(taskToUpdate.render());
  }

  updateExistingTask(taskId, inputValue) {
    const index = this.toDos.findIndex(task => task.id === taskId);
    const taskToUpdate = this.toDos[index];
    taskToUpdate.toDo = inputValue;
    const $existingTask = document.getElementById(`to-do-${taskId}`);
    $existingTask.replaceWith(taskToUpdate.render());
    this.toggleIsEditing(taskId);
  }

  deleteTask() {
    const childToRemove = document.getElementById(`to-do-${this.id}`);
    if (childToRemove.parentNode) {
      childToRemove.parentNode.removeChild(childToRemove);
    }
  }

  renderToDos() {
    const fragment = new DocumentFragment();
    this.toDos.forEach(task => {
      fragment.append(task.render());
    });
    this.$tasksContainer.append(fragment);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const myApp = new App();
  myApp.initialize();
});
