from bottle import jinja2_view as view, jinja2_template as template, route, run
from bottle import static_file

@route('/')
def home():
    return template('home.html')

@route('/eenvoudig')
@view('base.html')
def eenvoudig():
    return {}

@route('/eenvoudig/cel')
@view('base.html')
def cel():
    return {}

@route('/eenvoudig/onstaan')
@view('base.html')
def onstaan():
    return {}

@route('/eenvoudig/extremofielen')
@view('base.html')
def extremofielen():
    return {}


@route('/spontaan')
@view('base.html')
def home():
    return {}

@route('/leven')
@view('base.html')
def home():
    return {}

@route('/fossielen')
@view('base.html')
def home():
    return {}

@route('/cambrium')
@view('base.html')
def home():
    return {}
@route('/static/<filename:path>')
def send_static(filename):
    return static_file(filename, root='./static')

run(debug=True)
