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

  var uuId,uuName,uuEmail,uuPass;
  $("#viewUser").click(function () {
    $.ajax({
      type: 'get',
      url: '/app/profile',
      dataType: 'json',
      contentType: "application/json",
      success: function (data) {
        $("#u_id").text(data.id);
        $("#u_name").text(data.name);
        $("#u_email").text(data.email);
        $("#u_password").text(data.password);
      }
    }); 
  });

  $("#viewUser1").click(function () {
    $.ajax({
      type: 'get',
      url: '/app/profile',
      dataType: 'json',
      contentType: "application/json",
      success: function (data) {
        uuId = data.id;
        uuName = data.name;
        uuEmail = data.email;
        uuPass = data.Pass;
        $("#uu_id").text(data.id);
        $("#uu_name").text(data.name);
        $("#uu_email").text(data.email);
        $("#uu_password").text(data.password);
      }
    }); 
  });

  $("#updateUser").click(function () {
    // alert("=============");
    console.log("==================");
    var id = $("#uu_id").text();
    console.log(id);
    var data = {
      name: $("#uu_name").text(),
      email: $("#uu_email").text(),
      password: $("#uu_password").text()
    }
    console.log(data);
    $.ajax({
      type: 'PUT',
      url: '/app/users/'+id,
      contentType: 'application/json',
      data: JSON.stringify(data),
    }).done(function () {
      alert("Profile Updated!");
    });
  });

  $("#deleteUser").click(function () {
    var id = $("#userId1").val();
    console.log(id);
    var link = '/app/users/' + id;
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
    var link = '/app/users/' + id;
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

  $("#allTrainees").click(function () {
    console.log("==========");
    $.ajax({
      type: 'get',
      url: '/app/users/trainees',
      dataType: 'json',
      contentType: "application/json",
      success: function (data) {
        console.log(data);
        window.location = "/app/users/trainees";
      }
    });
  });

  $("#submitModule").click(function () {
    var id = $("#moduleId").val();
    var link = '/app/modules/' + id;
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

  $("#updateModule").click(function () {
    var id = $("#moduleId1").val();
    var link = '/app/modules/' + id;
    $.ajax({
      type: 'put',
      url: link,
      dataType: 'json',
      contentType: "application/json",
      success: function (data) {
        console.log(data);
        window.location = link;
      }
    });
  });

  $("#deleteModule").click(function () {
    var id = $("#moduleId2").val();
    console.log(id);
    var link = '/app/modules/' + id;
    $.ajax({
      type: 'delete',
      url: link,
      dataType: 'json',
      contentType: "application/json",
      success: function (data) {
        console.log(data);
        window.location = '/trainerDash';
      }
    });
  });

  $("#getAllTaskModule").click(function () {
    var id = $("#moduleId3").val();
    var link = '/app/modules/' + id + '/tasks';
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

  $("#specificTask").click(function () {
    var id = $("#taskId").val();
    var link = '/app/tasks/' + id;
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

  $("#deleteTask").click(function () {
    var id = $("#taskId1").val();
    var link = '/app/tasks/' + id;
    $.ajax({
      type: 'delete',
      url: link,
      dataType: 'json',
      contentType: "application/json",
      success: function (data) {
        console.log(data);
        window.location = link;
      }
    });
  });

  $("#specificLog").click(function () {
    var id = $("#logId").val();
    var link = '/app/logs/' + id;
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

  $("#deleteLog").click(function () {
    var id = $("#logId1").val();
    var link = '/app/logs/' + id;
    $.ajax({
      type: 'delete',
      url: link,
      dataType: 'json',
      contentType: "application/json",
      success: function (data) {
        console.log(data);
        window.location = link;
      }
    });
  });

})