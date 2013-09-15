from flask import Flask
from blog.blog import blogpage

app = Flask(__name__)

app.register_blueprint(blogpage, url_prefix="/blog")
app.secret_key = 'X\r|R\xe7y\x1bl\xd1\xb2\xf8)\xbe\xb7\x1a\x90\x03\xf8=\\\x14SF`'
app.run(host="localhost", debug=True)
