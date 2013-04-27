#!/usr/bin/env python3

from bottle import jinja2_view as view, route, get, post, run
from bottle import static_file, default_app, request
import database
from datetime import datetime

session = database.Session()

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
    
@get('/reageren')    
@view('reageren.html')
def zie_reacties():
    reacties = session.query(database.Reactie).filter(database.Reactie.datum < datetime.today()).all()
    everything = {'reacties': []}
    for reactie in reacties:
        everything['reacties'].append(reactie.to_dict())
    return everything
    
@post('/reageren')
def geef_reactie():
    naam = request.forms.get('naam')
    titel = request.forms.get('titel')
    reactie = request.forms.get('reactie')
    image = '/media/anonymous.png'
    niewe_reactie = database.Reactie(naam, titel, reactie, image)
    session.add(niewe_reactie)
    session.commit()   
    
@route('/static/<filename:path>')
def send_static(filename):
    return static_file(filename, root='./static')

@route('/media/<filename:path>')
def send_media(filename):
    return static_file(filename, root='./media')
    
if __name__ == '__main__':
    run(debug=True)
else:
    app = default_app()
