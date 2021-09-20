# Next up
- Create database
- Create APi 
- Finish the frontend

### Database
What's in it ? 
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

//to link multiple users to multiple groups
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