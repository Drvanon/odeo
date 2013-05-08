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
@view('cel.html')
def cel():
    return {}

@route('/eenvoudig/ontstaan')
@view('ontstaan.html')
def ontstaan():
    return {}

@route('/eenvoudig/extremofielen')
@view('extremofielen.html')
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

@route('/fossielen/wekedelen')
@view('wekedelen.html')
def wekedelen():
    return {}

@route('/fossielen/aardlagen')
@view('aardlagen.html')
def aardlagen():
    return {}

@route('/fossielen/verstening')
@view('verstening.html')
def verstening():
    return {}
    
@route('/fossielen/leegte')
@view('leegte.html')
def leegte():
    return {}
    
    
@route('/cambrium')
@view('cambrium.html')
def cambrium():
    return {}
 
@route('/conclusie')
@view('conclusie.html')
def conclusie():
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
    email = request.forms.get('email')
    niewe_reactie = database.Reactie(naam, titel, reactie, email)
    session.add(niewe_reactie)
    session.commit()   
    
@route('/static/<filepath:path>')
def server_static(filepath):
    return static_file(filepath, root='./static')    
    
if __name__ == '__main__':
    application = default_app()
    run(port=80, debug=True)
