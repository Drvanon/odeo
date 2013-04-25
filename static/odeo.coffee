loc = window.location.pathname
loc = loc.substring(1)

tabs = ['', 'spontaan', 'leven', 'eenvoudig', 'fossielen', 'cambrium']

$ ->
  for tab in tabs
    if not loc
      $('#home').addClass('active')
      break
    if loc is tab then $('#'+loc).addClass('active')
    if loc.indexOf('eenvoudig') isnt -1
        $('#eenvoudig').addClass('active')
        
    $body = $("body").on("shown", ".modal", ->
        $body.addClass "modal-open"
        ).on("hidden", ".modal", ->
        $body.removeClass "modal-open"
        )