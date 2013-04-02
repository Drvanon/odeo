loc = window.location.pathname
loc = loc.substring(1)

tabs = ['', 'spontaan', 'leven', 'eenvoudig', 'fossielen', 'cambrium']

$ ->
  for tab in tabs
    if not loc
      $('#home').addClass('active')
      break
    if loc is tab then $('#'+loc).addClass('active')
  for img in $('img')
    $('body').append('
      <div class="modal hide fade">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
            &times;
          </button>
        </div>
        <div class="modal-body">'
        + img +
        '</div>
        <div class="modal-footer">
          <a href="#" class="btn">Close</a>
        </div>
      </div>')
