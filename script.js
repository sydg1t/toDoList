$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1140',
    dataType: 'json',
    success: function (response, textStatus) {
      response.tasks.forEach(function (task) {
        console.log(task.content);
        $('tbody').append('<tr><td>' + task.content + '</td></tr>')
      })
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  })
  
  $('button').on('click', function () {
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
        console.log(response);
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
  })
  })
});