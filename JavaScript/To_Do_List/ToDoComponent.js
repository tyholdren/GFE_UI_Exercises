export class ToDoComponent {
  constructor(data, toggleHandler) {
    this.id = data.id;
    this.toDo = data.toDo;
    this.isEditing = data.isEditing;
    this.toggleHandler = toggleHandler;
  }

  render() {
    const $toDoContainer = document.createElement('div');
    const $nonEditingContainer = document.createElement('div');
    const $editingContainer = document.createElement('div');
    const $toDo = document.createElement('span');
    const $inputLabel = document.createElement('label');
    const $inputEl = document.createElement('input');
    const $editButton = document.createElement('button');
    const $deleteButton = document.createElement('button');
    const $cancelButton = document.createElement('button');
    const $saveButton = document.createElement('button');

    $toDoContainer.id = `to-do-${this.id}`;
    $toDo.textContent = this.toDo;
    $inputEl.placeholder = this.toDo;
    $inputLabel.htmlFor = `to-do-${this.id}`;
    $editButton.textContent = 'edit';
    $deleteButton.textContent = 'delete';
    $cancelButton.textContent = 'cancel';
    $saveButton.textContent = 'save';

    $editButton.addEventListener('click', () => {
      this.toggleHandler(this.id);
    });

    $deleteButton.addEventListener('click', () => {
      this.deleteTask();
    });

    $cancelButton.addEventListener('click', () => {
      this.toggleHandler(this.id);
    });

    $nonEditingContainer.append($toDo, $editButton, $deleteButton);
    $editingContainer.append($inputEl, $cancelButton, $saveButton);
    $nonEditingContainer.style.display = this.isEditing ? 'none' : 'block';
    $editingContainer.style.display = !this.isEditing ? 'none' : 'block';
    $toDoContainer.append($nonEditingContainer, $editingContainer);

    return $toDoContainer;
  }

  deleteTask() {
    const childToRemove = document.getElementById(`to-do-${this.id}`);
    if (childToRemove.parentNode) {
      childToRemove.parentNode.removeChild(childToRemove);
    }
  }
}
