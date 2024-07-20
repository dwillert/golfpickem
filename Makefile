#Makefile

create:
	eb create

deploy:
	eb deploy

teardown:
	eb terminate golfpickem

start:
	npm start
	
html:
	open src/index.html

