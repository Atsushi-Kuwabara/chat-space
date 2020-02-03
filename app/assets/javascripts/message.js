$(function(){

  function buildHTML(message){
    if (message.content && message.image) {
      var html = 
        `<div class="main-chat__messages__message" data-message-id=${message.id}>
          <div class="main-chat__messages__message__upper-info">
            <div class="main-chat__messages__message__upper-info__username">
              ${message.user_name}
            </div>
            <div class="main-chat__messages__message__upper-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="main-chat__messages__message__lower">
            <p class="main-chat__messages__message__lower__text">
              ${message.content}
            </p>
            <img src="${message.image}" class="main-chat__messages__message__lower__image">
          </div>
        </div>`
    } else if(message.content){
      var html = 
        `<div class="main-chat__messages__message" data-message-id=${message.id}>
          <div class="main-chat__messages__message__upper-info">
            <div class="main-chat__messages__message__upper-info__username">
              ${message.user_name}
            </div>
            <div class="main-chat__messages__message__upper-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="main-chat__messages__message__lower">
            <p class="main-chat__messages__message__lower__text">
              ${message.content}
            </p>
          </div>
        </div>`
    } else if(message.image) {
      var html = 
        `<div class="main-chat__messages__message" data-message-id=${message.id}>
          <div class="main-chat__messages__message__upper-info">
            <div class="main-chat__messages__message__upper-info__username">
              ${message.user_name}
            </div>
            <div class="main-chat__messages__message__upper-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="main-chat__messages__message__lower">
            <img src=${message.image} class="main-chat__messages__message__lower__image">
          </div>
        </div>`
    };
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__messages').append(html);
      $('.main-chat__messages').animate({ scrollTop: $('.main-chat__messages')[0].scrollHeight});
      $('form')[0].reset();
      $('input').prop('disabled', false);
      $('submit').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました')
    })
  });

  var reloadMessages = function(){
    last_message_id = $('.main-chat__messages__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0){
        var insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.main-chat__messages').append(insertHTML);
        $('.main-chat__messages').animate({ scrollTop: $('.main-chat__messages')[0].scrollHeight});
      }
    })
    .fail(function(){
      console.log('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 7000);
  }
});