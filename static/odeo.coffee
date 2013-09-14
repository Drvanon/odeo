loc = window.location.pathname
loc = loc.substring(1)

tabs = ['', 'spontaan', 'leven', 'eenvoudig', 'fossielen', 'cambrium']

toggleModal = ->
  body = $('body')
  modal_container = $('.modal_container')
  body.toggleClass('body-locked')
  modal_container.toggleClass('dp-block')

$ ->
  $('.img_link').click -> toggleModal()

  for tab in tabs
    if not loc
      $('#home').addClass('active')
      break
    if loc is tab then $('#'+loc).addClass('active')
