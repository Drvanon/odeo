from flask import Blueprint, render_template, abort, request, session, jsonify
from . import database as db
from sqlalchemy.exc import IntegrityError

db.init_db()

blogpage = Blueprint('blogpage', __name__, template_folder='templates')


def get_blogs():
    return db.Entry.query.all()


@blogpage.route('/')
def index():
    return render_template('blog.html', blogs=get_blogs())


@blogpage.route('/admin', methods=["POST", "GET"])
def admin():
    if request.method == "POST":
        if request.form['code'] == 'admin':
            session['admin'] = True
            return render_template('admin.html', blogs=get_blogs())
        else:
            abort(401)
    else:
        if session.get('admin'):
            return render_template('admin.html', blogs=get_blogs())
        else:
            return render_template('passpage.html')


@blogpage.route('/admin/new_blog', methods=["POST"])
def new_blog():
    if session.get('admin'):
        new_blog = db.Entry(request.form['title'], request.form['content'])
        db.session.add(new_blog)
        try:
            db.session.commit()
        except IntegrityError:
            return jsonify({'message': "That title is already taken."})

        return jsonify({'message': "Succesfully created new blog."})
    else:
        abort(401)
