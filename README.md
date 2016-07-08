# habit.at

Habit@ is a household management application for assigning and tracking chores and tasks for anyone wishing to live harmoniously with others.

Upon entering the site, users are greeted with a login page, allowing them to sign-in with an existing account or create a new account using the link below.

From the new account page, after completing the necessary user account fields, users can either create a new household, giving it a name, email, and password, or a join an existing household, by entering just the email and password.

Once logged-in, if the user is a household administrator, they are taken to the administration page, where they're given an overview of all the administrators and members in their household, the ability to view and add tasks for each member, as well as the options to make other members administrators and remove members entirely.

When viewing the tasks for a given user, administrators can modify tasks by toggling completion, editing details, and removing tasks entirely.

If not logged-in as an administrator, the user is greeted with an overview of all of their given tasks as well as the ability to toggle their completion, and view all the tasks for the household.

Additionally, using Twilio, users have the option of receiving a text message once daily with a reminder of all their given tasks.

The application was built by Stephanie Ogburn, Philip Reitz, and Ryan Mackey using Node, Express, Postgresql, HTML, CSS, and JavaScript.
