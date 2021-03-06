# INFOS ABOUT THE PROJECT
To run the project, launch the frontend using "npm run serve" and the backend using "nodemon server" (if nodemon is installed)
_____________________________________________________

### DATABASE STRUCTURE
What's it like ? Here are their descriptions

##### Users  
                +--------------+----------------------+------+-----+---------+----------------+  
                | Field        | Type                 | Null | Key | Default | Extra          |  
                +--------------+----------------------+------+-----+---------+----------------+  
                | id           | smallint(5) unsigned | NO   | PRI | NULL    | auto_increment |  
                | firstname    | varchar(40)          | NO   |     | NULL    |                |  
                | lastname     | varchar(40)          | NO   |     | NULL    |                |  
                | pictureUrl   | varchar(500)         | YES  |     | NULL    |                |  
                | rights_id    | smallint(5) unsigned | NO   | MUL | NULL    |                |  
                | email        | varchar(50)          | NO   | UNI | NULL    |                |  
                | password     | varchar(64)          | NO   |     | NULL    |                |  
                | date_created | datetime             | YES  |     | NULL    |                |  
                | date_deleted | datetime             | YES  |     | NULL    |                |  
                +--------------+----------------------+------+-----+---------+----------------+  

##### Groups  
                +-------+----------------------+------+-----+---------+----------------+  
                | Field | Type                 | Null | Key | Default | Extra          |  
                +-------+----------------------+------+-----+---------+----------------+  
                | id    | smallint(5) unsigned | NO   | PRI | NULL    | auto_increment |  
                | name  | varchar(100)         | NO   |     | NULL    |                |  
                +-------+----------------------+------+-----+---------+----------------+  

##### UserGroups   
                +----------+----------------------+------+-----+---------+-------+  
                | Field    | Type                 | Null | Key | Default | Extra |  
                +----------+----------------------+------+-----+---------+-------+  
                | user_id  | smallint(5) unsigned | NO   | MUL | NULL    |       |  
                | group_id | smallint(5) unsigned | NO   | MUL | NULL    |       |  
                +----------+----------------------+------+-----+---------+-------+  

##### Rights  
                +-----------+----------------------+------+-----+---------+----------------+  
                | Field     | Type                 | Null | Key | Default | Extra          |  
                +-----------+----------------------+------+-----+---------+----------------+  
                | id        | smallint(5) unsigned | NO   | PRI | NULL    | auto_increment |  
                | user_type | varchar(30)          | YES  |     | NULL    |                |  
                +-----------+----------------------+------+-----+---------+----------------+  

##### Posts  
                +--------------+----------------------+------+-----+---------+----------------+  
                | Field        | Type                 | Null | Key | Default | Extra          |  
                +--------------+----------------------+------+-----+---------+----------------+  
                | id           | smallint(5) unsigned | NO   | PRI | NULL    | auto_increment |  
                | user_id      | smallint(5) unsigned | NO   | MUL | NULL    |                |  
                | group_id     | smallint(5) unsigned | NO   | MUL | NULL    |                |  
                | date_created | datetime             | NO   |     | NULL    |                |  
                | content      | text                 | NO   |     | NULL    |                |  
                | date_updated | datetime             | YES  |     | NULL    |                |   
                | date_deleted | datetime             | YES  |     | NULL    |                |  
                +--------------+----------------------+------+-----+---------+----------------+  

##### Replies  
                +--------------+----------------------+------+-----+---------+----------------+  
                | Field        | Type                 | Null | Key | Default | Extra          |  
                +--------------+----------------------+------+-----+---------+----------------+  
                | id           | smallint(5) unsigned | NO   | PRI | NULL    | auto_increment |    
                | user_id      | smallint(5) unsigned | NO   | MUL | NULL    |                |  
                | post_id      | smallint(5) unsigned | NO   | MUL | NULL    |                |  
                | date_created | datetime             | NO   |     | NULL    |                |  
                | content      | text                 | NO   |     | NULL    |                |  
                | date_updated | datetime             | YES  |     | NULL    |                |  
                | date_deleted | datetime             | YES  |     | NULL    |                |  
                +--------------+----------------------+------+-----+---------+----------------+  
