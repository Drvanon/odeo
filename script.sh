#! /bin/bash
source venv/bin/activate
exec sudo ngingx
exec python odeo.py
