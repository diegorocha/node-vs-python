#!/bin/sh

set -e

apk add --update alpine-sdk mariadb-dev

pip install -r requirements.txt
pip install gunicorn

gunicorn app:app -b 0.0.0.0:5000
