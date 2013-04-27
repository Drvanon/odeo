helpReactie = -> 
    over = 5000 - $('#inputReactie').val().length
    if over > 100
        $('#help-reactie').text over + ' karakters over.'
        if not $('#controlgroupReactie').hasClass 'info'
            $('#controlgroupReactie').addClass('info')
    if 100 > over > 2
        $('#help-reactie').text 'Pas op! Je hebt nog maar ' + over + ' karakters over.'
        if $('#controlgroupReactie').hasClass 'info'
            $('#controlgroupReactie').removeClass 'info'
        if not $('#controlgroupReactie').hasClass 'warning'
            $('#controlgroupReactie').addClass('warning')
    if over < 2
        $('#help-reactie').text 'Je hebt te veel karakters gebruikt, versprijdt je reactie over twee posts of kort deze in.'
        if $('#controlgroupReactie').hasClass 'warning'
            $('#controlgroupReactie').removeClass 'warning'
        if not $('#controlgroupReactie').hasClass 'error'
            $('#controlgroupReactie').addClass('error')
            
$ ->
    $('#reageer').submit (e) ->
        e.preventDefault()
        pass = true
        if not $('#inputNaam').val() 
            $('#help-naam').text 'Geef een naam.'
            $('#controlgroupNaam').addClass('error')
            pass = false
        if 5000 - $('#inputReactie').val().length < 2
            pass = false
        if pass
            $.post(
                '/reageren'
                $("#reageer").serialize()
                -> location.reload()
            )
            
    $('#inputReactie').keypress helpReactie
