# webapp_instalocate
webapp

Steps to run this repository -
1. Download the repository.
2. Download and install latest version of MongoDB from "https://www.mongodb.com/download-center?jmp=nav#community".
3. Run "./mongod" and "./mongo" command through terminal to run MongoDB database.
4. Open terminal and after reaching the downloaded repository through the terminal, run "npm install" to install all the dependencies.
5. Run "nodemon" command on terminal to run the webapp.
6. The UI can be seen on localhost at port 2000.

Steps to store flight details -
1. Open Postman app and type the url like this : "http://localhost:2000/api/storeDetails?flightId=SIA215"
2. The relevant details will be stored in "trip" collection in "test" database.
