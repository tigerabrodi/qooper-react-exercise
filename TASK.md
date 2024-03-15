# Task

Example User Object
{
"createdAt": "2024-03-04T23:52:32.448Z",
"name": "Rachael Maggio",
"avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHG
"token": "j8o?m[H1`h",
"isTokenValid": false,
"id": "1"
}
Example Task Object
{
"createdAt": "2024-03-05T05:44:42.892Z",
"title": "title 1",
"id": "1",
"userId": "1"
}

# Application Pages

Sign In Page Url: http://localhost:3000/signIn
To-Do List Page Url: http://localhost:3000

# User Stories

As a user...

1. I want to sign in anonymously by filling out a username, first name, and last
   name only. (the last name is optional)
   Frontend Developer Technical Challenge 5
2. If I have no session, the application should redirect me to the sign-in page.
3. After signing in successfully, I should see my to-do list in the center and my
   username in the top right corner.
   a. If there are no to-do items yet, I should only see a text input with the
   placeholder “Type a task”.
   b. If there are any to-do items, I should see the text input on top of the list
   and the entered to-do items below.
4. I should be able to add a to-do item by typing something and pressing enter
   a. If I type nothing but spaces or nothing at all, pressing enter shouldn’t add
   any empty items
5. I should be able to edit a to-do item by clicking on the item and pressing enter
   after done typing
6. I should be able to delete a to-do item by clicking an X button on the right side
   of the item
7. I should be able to log out by clicking on the logout button in the top right
   corner.
