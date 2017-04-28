
function AddTodo() {
  var self = this;
  var $row = $('<div class="row"/>');
  $('#todo_add').append($row);

  var $cell = $('<div class="col-lg-12"/>');
  var $form = $('<form action="javascript:void(0)" method="POST"/>');
  var $inputGroup = $('<div class="input-group"/>');
  var $addField = $('<input type="text" placeholder="Todo text..." class="form-control"/>');
  var $buttonGroup = $('<span class="input-group-btn"/>');
  var $addButton = $('<button type="submit" class="btn btn-primary"/>');
  $addButton.html('Add');

  $buttonGroup.append($addButton);
  $inputGroup.append($addField);
  $inputGroup.append($buttonGroup);
  $form.append($inputGroup);
  $cell.append($form);
  $row.append($cell);

  $form.submit(function(event) {
    event.preventDefault();
    self.add($form, $addField);
  });
}

AddTodo.prototype.add = function($form, $addField) {
  var todos = data.read('todos');
  if (!todos) {
    todos = [];
    data.create('todos', JSON.stringify([]));
  } else {
    todos = JSON.parse(todos);
  }

  todos.push({
    text: $addField.val(),
    checked: false
  });
  data.update('todos', JSON.stringify(todos));

  $form[0].reset();

  events.send('get-todos-list');
};

var addTodo = new AddTodo();
