heroku login

heroku config -a leasing-application-dev -s | sed s/^/"export "/g > .env
