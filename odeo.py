from flask import Flask

from flask import Blueprint, render_template, abort, request, session, jsonify
import database as db
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)

db.init_db()


def get_blogs():
    return db.Entry.query.all()


@app.route('/')
def index():
    return render_template('blog.html', blogs=get_blogs())


@app.route('/admin', methods=["POST", "GET"])
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


@app.route('/admin/new_blog', methods=["POST"])
def new_blog():
    if session.get('admin'):
        content = ''
        form = request.form
        for key in form:
            if key[:6] == 'alinea':
                content += '<p>' + form.get(key, None) + '</p>'
            elif key[:5] == 'image':
                content += '<img src="'
                content += form.get('image' + key[5], None)
                content += '" style="width: '
                content += form.get('width' + key[5], None)
                content += 'px;float: '
                content += form.get('float' + key[5], None)
                content += ';"></img>'
            elif key[:4] == 'lead':
                content += '<strong class="lead">'
                content += form.get('lead' + key[4], None)
                content += '</strong>'

        new_blog = db.Entry(request.form.get('title', None), content)
        db.session.add(new_blog)
        try:
            db.session.commit()
        except IntegrityError:
            return jsonify({'message': "That title is already taken."})

        return jsonify({'message': "Succesfully created new blog."})
    else:
        abort(401)


@app.route('/admin/blog/<id>')
def get_page(id):
    entry = db.Entry.query.filter_by(id=id).first()
    return jsonify({
        'title': entry.title, 'content': entry.content,
        'id': entry.id
    })


@app.route('/admin/edit/<id>', methods=["POST"])
def edit_page(id):
    entry = db.Entry.query.filter_by(id=id).first()

    entry.title = request.form.get('title')
    entry.content = request.form.get('content')
    session.commit()
    return jsonify({"message": "Edit succesfull."})

app.secret_key = '''X\r|R\xe7y\x1bl\xd1\xb2\xf8)
    \xbe\xb7\x1a\x90\x03\xf8=\\\x14SF`'''

app.run(host="localhost", debug=True)
