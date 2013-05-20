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
    if loc.indexOf('fossielen') isnt -1
        $('#fossielen').addClass('active')
