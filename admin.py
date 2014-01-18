from flask import Blueprint, abort, request, session, jsonify, redirect, render_template
from database import db
import hashlib

adminapp = Blueprint('admin', __name__, template_folder='templates')

def logged_in(func):
    def inner(*args, **kwargs):
        if session.get('admin'):
            return func(*args, **kwargs)
        else:
            abort(401)
    return inner

@adminapp.route('/admin/login', methods=["POST"])            
def login():
    salt = db.users.find_one({'name': "admin"}, {"salt": True})['salt']
    password = db.users.find_one({'name': "admin"}, {"password": True})['password']
    spassword = hashlib.sha512( request.form.get('password').encode('latin-1') + salt ).hexdigest()

    if spassword == password:
        session['admin'] = True
        return redirect('/admin') 
    else:
        abort(401)

@adminapp.route('/admin/authorized')
def authorized():
    if session.get('admin'):
        return jsonify({'authorized': True})
    else:
        return jsonify({'authorized': False})

@logged_in
@adminapp.route('/admin/new', methods=["POST"])
def new_blog():
    blog = request.json.get('blog')
    blog["id"] = db.blogs.count() + 1
    db.blogs.insert(blog)
    return jsonify()

@logged_in
@adminapp.route('/admin/edit/<int:id>', methods=["POST"])
def edit_page(id):
    db.blogs.update({'id': id}, request.json)
    return jsonify(request.json)


@logged_in
@adminapp.route('/admin/blog/<int:id>', methods=["DELETE"])
def delete_blog(id):
    db.blogs.remove({'id': id})
    return jsonify({'id': id})