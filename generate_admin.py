from hashlib import sha512
from database import db 
import random

def generate_salt():
    ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    chars=[]
    for i in range(16):
        chars.append(random.choice(ALPHABET))

    return "".join(chars)

def gen_admin(password="admin"):
	salt = generate_salt().encode('latin-1')
	password = password.encode('latin-1')

	db.users.insert({
		"name": "admin",
		"salt": salt,
		"password": sha512(password + salt).hexdigest()
	})