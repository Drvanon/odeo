#!/usr/bin/env python3

from bottle import jinja2_view as view, jinja2_template as template, route, run
from bottle import static_file

@route('/')
@view('home.html')
def home():
    return {}

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
@view('spontaan.html')
def spontaan():
    return {}

@route('/leven')
@view('base.html')
def leven():
    return {}

@route('/fossielen')
@view('base.html')
def fossielen():
    return {}

@route('/cambrium')
@view('base.html')
def cambrium():
    return {}

@route('/static/<filename:path>')
def send_static(filename):
    return static_file(filename, root='./static')

run(debug=True)
