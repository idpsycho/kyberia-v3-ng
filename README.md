# how to start
1. npm install
2. npm install angular-cli -g
3. ng serve
4. open http://localhost:4200




# todo
1. http-server nahradit niecim co podporuje routing
2. tieto veci treba vratit do devDependencies:

    "@types/node": "^6.0.42",
    "angular-cli": "1.0.0-beta.19-3",
    "codelyzer": "1.0.0-beta.1",
    "ts-node": "1.2.1",
    "tslint": "3.13.0",
    "typescript": "~2.0.3"

    takto nejak:
    	heroku config:set NPM_CONFIG_PRODUCTION=false

    ale treba to spravit nejak cez heroku-build scripty, nezasierat bezne dev veci (nech sa nemiesaju dependencies heroku s dependencies projektu, nech sa da lahko vyoperovat heroku prec a pouzit ine prostredie, bez toho ze zostanu zabudnute pozostatky kadetade)

3. fastclick.js dat ako dependency (zabera viac ako cely zvysok projektu)

