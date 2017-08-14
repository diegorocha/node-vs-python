#!/bin/sh

set -e

pip install -r requirements.txt
pip install gunicorn

gunicorn app:app -b 0.0.0.0:5000
