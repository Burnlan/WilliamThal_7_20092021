# INFOS ABOUT THE PROJECT
Here are key informations about the project.

_____________________________________________________

### DATABASE STRUCTURE
What's it like ? Here are their descriptions

##### Users
+------------+----------------------+------+-----+---------+----------------+
| Field      | Type                 | Null | Key | Default | Extra          |
+------------+----------------------+------+-----+---------+----------------+
| id         | smallint(5) unsigned | NO   | PRI | NULL    | auto_increment |
| firstname  | varchar(40)          | NO   |     | NULL    |                |
| lastname   | varchar(40)          | NO   |     | NULL    |                |
| pictureUrl | varchar(500)         | YES  |     | NULL    |                |
+------------+----------------------+------+-----+---------+----------------+

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

##### Posts
+--------------+----------------------+------+-----+---------+----------------+
| Field        | Type                 | Null | Key | Default | Extra          |
+--------------+----------------------+------+-----+---------+----------------+
| id           | smallint(5) unsigned | NO   | PRI | NULL    | auto_increment |
| user_id      | smallint(5) unsigned | NO   | MUL | NULL    |                |
| group_id     | smallint(5) unsigned | NO   | MUL | NULL    |                |
| date_created | datetime             | NO   |     | NULL    |                |
| content      | text                 | NO   |     | NULL    |                |
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
+--------------+----------------------+------+-----+---------+----------------+

______________________________________________________

### API ROUTES
##### User routes
- Signup
- Login
- Delete account
- Change name
- Change picture
- Change group

##### Post routes
- Create post
- Delete post
- Edit post
- Display posts

##### Reply routes
- Create reply
- Delete reply
- Edit reply
- Display replies
