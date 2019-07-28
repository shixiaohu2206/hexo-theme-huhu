;(function($) {
  let DEFAULT_BUTTON = ''

  let DISLOG_TEMP = `<div id="dialog">
                      <div class="bg"></div>
                      <div class="wrap">
                        <div class="title">{TITLE}</div>
                        <div class="content">{CONTENT}</div>
                        <div class="button">{BUTTON}</div>
                      </div>
                    </div>`

  $.extend({
    dialog: function(options) {
      var defaultOptions = {
        okText: null,
        onOk: function() {
          $.hideDialog()
        },
        closeText: 'Close',
        onClose: function() {
          $.hideDialog()
        }
      }

      options = $.extend({}, defaultOptions, options)

      // 底部按钮
      var buttonTemp = '<span class="{CLASS}">{TEXT}</span>'
      var buttonHtml = ''
      if (options.okText) {
        buttonHtml += buttonTemp.replace(/{TEXT}/g, options.okText).replace(/{CLASS}/g, 'okClick')
        $('#dialog > .okClick').unbind()
        $(document).on('click', '#dialog > .okClick', function() {
          $.isFunction(options.onOk) && options.onOk()
          $.hideDialog()
        })
      }

      if (options.closeText) {
        buttonHtml += buttonTemp
          .replace(/{TEXT}/g, options.closeText)
          .replace(/{CLASS}/g, 'closeClick')
        $('.closeClick').unbind()
        $(document).on('click', '.closeClick', function() {
          console.log(2222)
          $.isFunction(options.onClose) && options.onClose()
          $.hideDialog()
        })
      }

      let html = DISLOG_TEMP.replace(/{TITLE}/g, options.title || 'Title')
        .replace(/{CONTENT}/g, options.content || 'content')
        .replace(/{BUTTON}/g, buttonHtml)

      $('body').append(html)
    },
    hideDialog: function() {
      $('#dialog').remove()
    }
  })
})(jQuery)
