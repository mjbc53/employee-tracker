# employee-tracker

## Description
This is a employee tracking CLI Program. Use it to add departments, roles, and
employees. track who works in what department. which role belongs to which 
department. which employee manages which, which employee has which role.


## Code Description
This CLI Program uses javascript, mysql, mysql2 npm, inquirer npm, console.table
npm, figlet npm and dotenv npm. The code is set up using two classes. one for
the prompts and one for the sql query calls. The Prompts class extends the
Querys class to make query calls with sql using the mysql2 promise query calls.


## Table of contents 
* [Installation](#installation)
* [Usage](#usage)
* [Questions](#questions)

## Installation
Installation for this project<br/>
Make sure you have Node.js and mysql install on your device that you will be running
this on <br/>
First clone the <strong>repo</strong> to your computer.<br/>
Then in the root of the project file enter:<br/>
<pre>npm install</pre>
then you will have to set up the database with 
<pre> mysql -u 'your username' -p</pre>
Enter your password when the mysql CLI asks for it. after that enter
<pre>source db/db.sql;</pre>
<pre>source db/schema.sql;</pre>
Then if you want a pre seeded tables in the data base enter
<pre>source db/seeds.sql</pre>
Last but not least you will either need to enter your mysql username and
password in the connections.js file in the db folder, or you will need to set up
a 
<pre>.env</pre>
File. if you choose to set up a <strong>.env</strong> file it will need to look like this
<pre>DB_NAME='company' 
//pre defined database. name can be changed in the schema.sql file
DB_USER='Your Username Here'
DB_PW='Your Password Here'</pre>
This <strong>.env</strong> file will need to be in the root of your project
file.


## Usage 
Here is a link on how to start using this project
* [Video tutorial link]()

To use this project follow the installation guide.
Then in your CLI run 
<pre>npm start</pre>
From there you will be welcomed and have a display of current employees if there
are any. After that a main menu prompt screen will be prompted to you.
<br/>
The choices in the prompt will be:
* View all departments
  * This will display all the departments in a table format
* View all roles
  * This will display all the roles in a table format
* View all employees
  * This will display all the employees in a table format
* Add department
  * This will prompt you questions to create a new department
* Add role
  * This will prompt you questions to create a new role
* Add employee
  * This will prompt you questions to create a new employee
* Update an employee role
  * This will prompt you with which employee you want to change roles on
* All done
  * This will end stop the CLI program and tell you to enter the command 
  (CTRL + C)

<br/>

Make sure to create Departments of the company, roles of the company and then 
employees of the company in that order. 

## Questions
If you have any further questions please contact me by email or with my GitHub Username listed below

* Email : mjbc53@gmail.com

* GitHub [mjbc53](https://github.com/mjbc53) 
