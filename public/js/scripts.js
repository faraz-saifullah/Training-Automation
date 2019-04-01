$(document).ready(function () {
  $("#allUsers").click(function () {
    $.ajax({
      type: 'get',
      url: '/app/users/',
      dataType: 'json',
      contentType: "application/json",
      success: function (data) {
        $("merror").append(JSON.stringify(data));
        console.log(data);
        // window.location = "/app/users";
      }
    });
  });

  $("#viewUser").click(function () {
    $.ajax({
      type: 'get',
      url: '/app/profile',
      dataType: 'json',
      contentType: "application/json",
      success: function (data) {
        console.log(data);
        window.location = "/app/profile";
      }
    });
  });

  $("#deleteUser").click(function () {
    var id = $("#userId1").val();
    console.log(id);
    var link = '/app/users/'+id;
    $.ajax({
      type: 'delete',
      url: link,
      dataType: 'json',
      contentType: "application/json",
      success: function (data) {
        console.log(data);
        window.location = '/home';
      }
    });
  });

  $("#allTasks").click(function () {
    $.ajax({
      type: 'get',
      url: '/app/tasks',
      dataType: 'json',
      contentType: "application/json",
      success: function (data) {
        console.log(data);
        window.location = "/app/tasks";
      }
    });
  });

  $("#allLogs").click(function () {
    $.ajax({
      type: 'get',
      url: '/app/logs',
      dataType: 'json',
      contentType: "application/json",
      success: function (data) {
        console.log(data);
        window.location = "/app/logs";
      }
    });
  });

  $("#allStatus").click(function () {
    $.ajax({
      type: 'get',
      url: '/app/status',
      dataType: 'json',
      contentType: "application/json",
      success: function (data) {
        console.log(data);
        window.location = "/app/status";
      }
    });
  });

  $("#submitUser").click(function () {
    var id = $("#userId").val();
    var link = '/app/specificUser/'+id;
    $.ajax({
      type: 'get',
      url: link,
      dataType: 'json',
      contentType: "application/json",
      success: function (data) {
        console.log(data);
        window.location = link;
      }
    });
  });

  $("#allModules").click(function () {
    $.ajax({
      type: 'get',
      url: '/app/modules',
      dataType: 'json',
      contentType: "application/json",
      success: function (data) {
        console.log(data);
        window.location = "/app/modules";
      }
    });
  });
})