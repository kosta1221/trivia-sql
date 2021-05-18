# trivia-sql
trivia sql project - Kosta Kirov & Michael Efraim

## gcloud deployment:
[trivia sql](https://countrivia-app.ey.r.appspot.com)

## Instructions to run client locally cloud sql database:
* clone the repo.
* switch to the gcloud-config branch
* create .env file, define the following variables:
    * DB_PASSWORD_CLOUD = "IHIFvtc9jw30tJLI"
    * DB_HOST = "35.234.71.43"
    * ACCESS_TOKEN_SECRET="any" 
    * REFRESH_TOKEN_SECRET="any"; 
* npm i
* cd client
* npm i
* npm run build
* cd ..
* npm run dev
* open localhost:3001 at your browser

If you wish to run it without a build:
 instead of npm run build - start the client with npm start
 go to the root folder and in another terminal: npm run dev