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
        
    $('.modal').on(
        'hide' 
        ->
            $(this).css("overflow", "hidden")
            $('body').css("overflow", "scroll")
    )
    $('.modal').on(
        'show' 
        ->
            $('body').css("overflow", "hidden")
            $(this).css("overflow", "scroll")
    )