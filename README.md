# EPL-match-reservation
A web application for Match reservation system using Node.js

## How to run
1. To install all the dependancies, you need to run the following command in the terminal  
    ```shell
    npm install
    ```
2. Make a new file called `.env` and copy the contents of `.env.example` file in it, and change the config variables.
3. To run the server, run  
    ```shell
    node app.js
    ```  
    or
    ```
    nodemon app
    ```
### Run Generator
0. You should have `python3` installed with some packages like `faker` and `json` 
1. `cd` into `generator` folder, then run `python nosql_generator.py`
2. `mongoimport --db db_name  --collection coll_name --file file_name.json --jsonArray`

## Appendix
1- Useful cammands:

    sudo systemctl start mongod
    sudo systemctl status mongod
    