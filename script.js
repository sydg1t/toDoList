$(document).ready(function () {
  var getList = function () {
    $.ajax({
      type: 'GET',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1140',
      dataType: 'json',
      success: function (response, textStatus) {
        $('tbody').html('');
        
        response.tasks.forEach(function (task) {
        
          $('tbody').append('<tr><td><input type = "checkbox" class="mark-complete" data-id = "' + task.id + '"' + (task.completed ? 'checked' : '') + '></td><td>' + task.content + '</td><td><button class = "delete-btn" data-id = "' + task.id + '">delete</button></td></tr>')
        })
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    })
  }
  getList();


  var createTask = function () {
    var inputVal = $('input').val();
    $.ajax({
      type: 'POST',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1140',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: inputVal
        }
      }),
      success: function (response, textStatus) {
        getList();
        inputVal = $('input').val('');
        
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    })
  }




  $('#create-task').on('submit', function (event) {
    event.preventDefault();
    createTask();
  });
  var deleteTask = function (id) {
    $.ajax({
      type: 'DELETE',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=1140',
      success: function (response, textStatus) {
        getList();
        
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }
  $(document).on('click', '.delete-btn', function () {
    var taskID = $(this).data('id');
    deleteTask(taskID);
  });
  var markTaskComplete = function (id) {
    $.ajax({
      type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/'+ id + '/mark_complete?api_key=1140',
      dataType: 'json',
      success: function (response, textStatus) {
        getList();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    })
  }
  $(document).on('change', '.mark-complete', function () {
    if  (this.checked) {
      markTaskComplete($(this).data('id')); 
    }
  });
});