# Todo-List
This is a todo list with authentication implemented

I used insomnia for post, get and delete requests.
Download and run the file in your localhost:5000 by using:
nodemon index
in your terminal

# For user Registration process(Post)
http://localhost:5000/users/register
User Model is: (as json)
{
	"email": "sajal@gmail.com",
	"password": "password",
	"passwordCheck": "password",
	"dsiplayName": "Sajal"
}

# For user Login(Post)
http://localhost:5000/users/login

User model is: (as json)
{
	"email": "sajal@gmail.com",
	"password": "password"
}

*Copy the token of the user and in the Header section in Insomnia, of all the links and paste it as a new header named x-auth-token*

# For testing if the user is there(Post)
copy the token of the registered user in the Header section as a new Header with the name x-auth-token
http://localhost:5000/users/tokenIsValid

# For deleting the user account(delete)
Do the same thing with the token as above ^
http://localhost:5000/users/delete

After logging in you can add, delete, and view all todos

# For Adding a new task(post)
http://localhost:5000/todos/
Do the same thing with token here as well and add a todo by using the model
the user model is: (as json)
{
  ""title: "*whatever todo*"
}
http://localhost:5000/todos/

# For viewing all todos(get)
http://localhost:5000/todos/all
Do the same thing with token here as well

# For deleting any todo(delete)
Do the same thing with token here as well
http://localhost:5000/todos/*paste id of the todo here*
