loc = window.location.pathname
loc = loc.substring(1)

tabs = ['', 'spontaan', 'leven', 'eenvoudig', 'fossielen', 'cambrium']

$ ->
  for tab in tabs
    if not loc
      $('#home').addClass('active')
      break
    if loc is tab then $('#'+loc).addClass('active')
