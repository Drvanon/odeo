from flask import Flask
from flask import Blueprint, render_template, abort, request, session, jsonify
from json import loads 
from database import db
from admin import adminapp 

app = Flask(__name__)
app.register_blueprint(adminapp)

@app.route("/blogs")
def all_blogs():
    return jsonify({'blogs': list(db.blogs.find({}, {'_id': False}))})

@app.route('/blogs/titles')
def json_blogs():
    return jsonify(
        {'titles': list(db.blogs.find({}, {'_id': False, 'id': True, 'title': True}))})


@app.route('/blog/<int:id>')
def blog(id):
    blog = db.blogs.find_one({'id': id}, {'_id': False})
    if blog:
        return jsonify(blog)
    else:
        abort(404)


@app.route('/reacties')
def reacties():
    return render_template('reacties.html', reacties=get_reacties())

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
    content = db.about.find_one({'id': 0}).content
    return render_template('about.html', content=content)


app.secret_key = '''X\r|R\xe7y\x1bl\xd1\xb2\xf8)
    \xbe\xb7\x1a\x90\x03\xf8=\\\x14SF`'''

if __name__ == '__main__':
    app.run(debug=True)
