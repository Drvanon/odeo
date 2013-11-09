from flask import Flask

from json import loads 

from flask import Blueprint, render_template, abort, request, session, jsonify
import database as db
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)

db.init_db()

def get_news():
    return []

def get_blogs():
    return db.Entry.query.order_by(db.Entry.date.desc())


def get_reacties():
    return db.Reaction.query.all()


def get_about():
    return db.About.query.first()


@app.route('/')
def index():
    return render_template('blogs.html', news=get_news(), blogs=get_blogs())


@app.route('/blog/<int:id>')
def blog(id):
    blog = db.Entry.query.filter_by(id=id).first()
    if not blog:
        abort(404)
    else:
        return render_template('blog.html', news=get_news(), blog=blog)


@app.route('/reacties')
def reacties():
    return render_template(
        'reacties.html', news=get_news(), reacties=get_reacties())


@app.route('/reacties/new_reaction', methods=["POST"])
def new_reaction():
    new_reac = db.Reaction(
        request.form.get('title'),
        request.form.get('content'),
        request.form.get('author')
    )
    db.session.add(new_reac)
    db.session.commit()
    return jsonify({"message": "Succesfully created reaction."})


@app.route('/about')
def about():
    print(get_about())
    content = get_about().content
    return render_template('about.html', content=content, news=get_news())


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
        data = loads(form.get('json'))
        for element in data['content']:
            if element['type'] == 'alinea':
                content += '<p>' + element['text'] + '</p>\n'
            elif element['type'] == 'image':
                content += '<a data-lightbox="image-1" href="'
                content +=  element['link']
                content += '">\n'
                content += '<img src="'
                content += element['link']
                content += '" style="width: '
                content += element['width']
                content += 'px; float: '
                content += element['float']
                content += ';"></img>\n</a>\n'
            elif element['type'] == 'lead':
                content += '<div class="strongcontainer"><strong class="lead">'
                content += element['text']
                content += '</strong></div>\n'
            elif element['type'] == 'video':
                content += element['element']
            elif element['type'] == 'source':
                content += '<p class="source">'
                content += element['text']
                content += '</p>\n'

        new_blog = db.Entry(data['title'], content)
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
    db.session.commit()
    return jsonify({"message": "Edit succesfull."})


@app.route('/admin/blog/delete/<id>', methods=["DELETE"])
def delete_blog(id):
    entry = db.Entry.query.filter_by(id=id).first()

    db.session.delete(entry)
    db.session.commit()
    return jsonify({"message": "Remove succesfull."})


@app.route('/admin/about')
def rget_about():
    about = db.About.query.first()

    return jsonify({"content": about.content})


@app.route('/admin/about/edit', methods=["POST"])
def edit_about():
    about = get_about()

    content = request.form.get('content')
    about.content = content
    db.session.commit()
    return jsonify({"message": "Edit succesfull."})


app.secret_key = '''X\r|R\xe7y\x1bl\xd1\xb2\xf8)
    \xbe\xb7\x1a\x90\x03\xf8=\\\x14SF`'''

if __name__ == '__main__':
    app.run(debug=True)
