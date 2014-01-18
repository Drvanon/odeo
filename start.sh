#! /bin/bash

sudo nginx -c $PWD/nginx.conf
sudo systemctl start mongodb
sudo supervisord -c $PWD/supervisord.conf
