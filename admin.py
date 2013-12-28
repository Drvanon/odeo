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

@adminapp.route('/admin', methods=["GET"])
def admin():
    if session.get('admin'):
        return redirect('/admin.html')
    else:
        return redirect('/passpage.html')

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
    blog["id"] = db.blogs.count()
    db.blogs.insert(blog)
    return jsonify()

@logged_in
@adminapp.route('/admin/edit/<int:id>', methods=["POST"])
def edit_page(id):
    db.blogs.update({'id': id}, request.json)
    return jsonify(request.json)


@logged_in
@adminapp.route('/admin/blog/<id>', methods=["DELETE"])
def delete_blog(id):
    db.blogs.remove({'id': id})

@logged_in
@adminapp.route('/admin/about')
def rget_about():
    about = db.About.query.first()

    return jsonify({"content": about.content})

@logged_in
@adminapp.route('/admin/about/edit', methods=["POST"])
def edit_about():
    about = get_about()

    content = request.form.get('content')
    about.content = content
    db.session.commit()
    return jsonify({"message": "Edit succesfull."})