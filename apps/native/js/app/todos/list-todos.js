
function ListTodos() {
  var todos = data.read('todos');
  if (!todos) {
    todos = [];
    data.update('todos', JSON.stringify(todos));
  }

  var self = this;

  events.subscribe('get-todos-list', function () {
    self.getList();
  });
}

ListTodos.prototype.getList = function () {
  var self = this;
  var todos = data.read('todos');
  todos = JSON.parse(todos);

  var todosEl = document.getElementById('todo_items');
  todosEl.innerHTML = '';

  var todosBodyEl = markup.create({
    tag: 'tbody',
    parent: todosEl
  });

  if (!todos.length) {
    return false
  }

  todos.forEach(function (todo, index) {
    var todoEl = markup.create({
      tag: 'tr',
      parent: todosBodyEl,
      className: todo.checked ? 'success' : ''
    });

    var todoCellCheckboxEl = markup.create({
      tag: 'td',
      parent: todoEl,
      attrs: [
        { width: '30' }
      ]
    });

    var todoCellTextEl = markup.create({
      tag: 'td',
      parent: todoEl,
      content: todo.text,
      className: todo.checked ? 'checked' : ''
    });

    var todoCellActionsEl = markup.create({
      tag: 'td',
      parent: todoEl,
      attrs: [
        { width: '65' }
      ]
    });

    var todoCheckboxEl = markup.create({
      tag: 'span',
      className: 'glyphicon glyphicon-' + (todo.checked ? 'check' : 'unchecked'),
      parent: todoCellCheckboxEl
    });

    var todoActionEditEl = markup.create({
      tag: 'button',
      attrs: [
        { type: 'button' }
      ],
      className: 'btn btn-info btn-xs pencilBtn',
      content: '<span class="glyphicon glyphicon-pencil"></span>',
      parent: todoCellActionsEl
    });

    var todoActionDeleteEl = markup.create({
      tag: 'button',
      attrs: [
        { type: 'button' }
      ],
      className: 'btn btn-danger btn-xs',
      content: '<span class="glyphicon glyphicon-remove"></span>',
      parent: todoCellActionsEl
    });
    //////


    events.on(todoCellCheckboxEl, 'click', function (event) {
      event.preventDefault();
      self.doCheck(todoEl, todoCheckboxEl, todoCellTextEl, todos, todo, index);
    });

    events.on(todoCellTextEl, 'click', function (event) {
      event.preventDefault();
      self.doCheck(todoEl, todoCheckboxEl, todoCellTextEl, todos, todo, index);
    });

    events.on(todoActionDeleteEl, 'click', function (event) {
      self.delete(index, todos);
    });

    events.on(todoActionEditEl, 'click', function (event) {
      self.edit(todoEl, todos, todo, index);
    });
  });
};

ListTodos.prototype.doCheck = function (
  todoEl,
  todoCheckboxEl,
  todoCellTextEl,
  todos,
  todo,
  index
) {
  var isChecked = todoCheckboxEl.className === 'glyphicon glyphicon-check'

  if (isChecked) {
    todoEl.className = '';
    todoCheckboxEl.className = 'glyphicon glyphicon-unchecked';
    todoCellTextEl.className = '';
    todo.checked = false;
  } else {
    todoEl.className = 'success';
    todoCheckboxEl.className = 'glyphicon glyphicon-check';
    todoCellTextEl.className = 'checked';
    todo.checked = true;
  }

  todos[index] = todo;
  data.update('todos', JSON.stringify(todos));
  events.send('get-todos-list');
};

ListTodos.prototype.edit = function (
  todoEl,
  todos,
  todo,
  index
) {
  var form = document.getElementById('formToDo');

  var formContainer = document.getElementById('formContainer');
  form.style.display = 'none';

  var formChange = markup.create({
    tag: 'form',
    attrs: [
      { action: 'javascript:void(0)' },
      { method: 'POST' },
      { id: 'formChange' }
    ],
    parent: formContainer
  });

  var inputGroup = markup.create({
    className: 'input-group',
    attrs: [
      { id: 'formChange' },
      { visibility: 'visible' }
    ],
    parent: formChange
  });

  var changeField = markup.create({
    tag: 'input',
    attrs: [
      { type: 'text' },
      { value: todo.text },
      { id: 'changeInput' }
    ],
    className: 'form-control changeFieldClass',
    parent: inputGroup
  });

  var buttonGroup = markup.create({
    tag: 'span',
    className: 'input-group-btn',
    parent: inputGroup
  });

  var changeButton = markup.create({
    tag: 'button',
    attrs: [
      { type: 'submit' },
      { id: 'changeBtn' }
    ],
    content: 'Change',
    className: 'btn btn-primary changeBtnClass',
    parent: buttonGroup
  });


var pencilBtns = document.getElementsByClassName('pencilBtn');

for(var i =0; i<pencilBtns.length;i++){
  pencilBtns[i].style.display='none';
}

  events.on(formChange, 'submit', function (event) {
    event.preventDefault();
    todo.text = changeField.value;
    todos[index] = todo;

    formContainer.removeChild(formChange);

    form.style.display = 'block';

    data.update('todos', JSON.stringify(todos));
    events.send('get-todos-list');
  });

};

ListTodos.prototype.delete = function (index, todos) {
  todos.splice(index, 1);
  data.update('todos', JSON.stringify(todos));
  events.send('get-todos-list');
};

var listTodos = new ListTodos();
