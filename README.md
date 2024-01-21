# Mini Web Projects

https://github.com/AlexK049/Mini-Web-Projects/assets/90426111/245fa5fc-31e8-4dfc-b71c-6040dc0635d0

This repository hosts a collection of web projects I created in some of my undergraduate classes. These projects helped me build a strong foundation in web development using HTML, CSS, JS, and an Express.js backend. The skills I learned creating these projects have made it easy for me to learn web frameworks such as React and Angular. It also helped me understand why these frameworks exist and made me appreciate them more. The extensive use of CSS in these projects also made me feel very comfortable with styling to fit a variety of different designs, and with picking up things like Bootstrap and Tailwind.

1. [Startup Guide](#startup-guide)
2. [Project Guide](#project-guide)
   - [Dashboard](#dashboard)
   - [News Site Landing](#news-site-landing)
   - [Calculator](#calculator)
   - [Payment App](#payment-app)
   - [Twitter Clone](#twitter-clone)
   - [Pet Profile](#pet-profile)

# Startup Guide

Prerequisites: Docker and Git are installed.

1. Clone the repository
2. From the root project directory, navigate to the `./howler` directory, and create a `.env` file using the `.env_sample` file as a template.
3. Generate a secret key (random string of characters) to fill in as the `JWT_SECRET_KEY` environment variable in the newly created `.env` file.
4. Navigate to the root project directory and run the following command in your terminal: `docker compose up -d --build`
5. All the projects will now be viewable on localhost (port 80)

# Project Guide

## Dashboard
For this project, an HTML file was given with some preset classes and id's. Without touching the HTML file, it was styled to present the information in a more digestible way.
## News Site Landing
A static new site with a header, some quick links, and a list of top articles to read. Made with HTML and CSS.
## Calculator
A calculator with simple operators, order of operations (supported internally by a state machine), error handling, and history.
## Payment App
A payment app which uses an HTML form to collect, validate, and submit payment information between two users. Styled to have a multi-page appearance.
## Twitter Clone
Client side rendered social media app with some features reminiscent of X (formerly known as Twitter). Includes authentication which salts and hashes user passwords, maintains user sessions with JWTs and has a REST API which allows for dynamic content.

The logins for all the users are present in the `./howler/src/data/usersUnhashed.json` file. An example login is using `student` as the username, and `1` as the password.

To ensure sure this project functions correctly, make sure to follow the instructions in the [startup guide](#startup-guide)
## Pet Profile
This is a profile page built for a larger social media app. The frontend is built with React and Tailwind, and contains areas where requests to a backend can be made and processed. It is currently set up with some mock data, and allows for the entry of new data with the caveat being that it is not persisted between sessions.
