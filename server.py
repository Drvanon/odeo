#!/usr/bin/env python3

from bottle import jinja2_view as view, route, run
from bottle import static_file, default_app
import logging

logging.basicConfig(level=logging.DEBUG)

@route('/')
@view('home.html')
def home():
    return {}

@route('/eenvoudig/robot')
@view('robot.html')
def robot():
    return {}

@route('/eenvoudig/cel')
@view('base.html')
def cel():
    return {}

@route('/eenvoudig/ontstaan')
@view('ontstaan.html')
def ontstaan():
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
@view('leven.html')
def leven():
    return {}

@route('/fossielen')
@view('fossielen.html')
def fossielen():
    return {}

@route('/cambrium')
@view('cambrium.html')
def cambrium():
    return {}

@route('/static/<filename:path>')
def send_static(filename):
    return static_file(filename, root='./static')

if __name__ == '__main__':
    run(debug=True)
else:
    app = default_app()
