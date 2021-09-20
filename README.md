# INFOS ABOUT THE PROJECT

### DATABASE STRUCTURE
What's it like ? 
#### Tables
- Users
- Groups
- Posts
- Replies

##### Users
- id
- firstname
- lastname
- pictureURL

##### UserGroups 
- user_id
- group_id

##### Groups
- id
- name

##### Posts
- id
- groupId
- userId
- dateCreated
- content

##### Replies
- id
- postId
- userId
- dateCreated
- content

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
