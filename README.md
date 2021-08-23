# ELTforYOU - A virtual staffroom for English Departments

## Contents

- [Overview](#overview)
- [Key functionalities](#key-functionalities)
- [Technologiew](#technologies)
- [Launch](#launch)
- [Sources](#sources)

## Overview

The ELTforYOU application was designed with the needs of teachers at a language school or the English faculty of any secondary school in mind. At the heart of the project is 'authenticity', which almost invariably makes language learning more appealing for students. The application helps teachers share authentic materials - primarily news articles - with each other, complete with relevant warm-up questions and images to compare and contrast. To help daily preparations, there is also a 'holidays' feature, providing users with up-to-date information on holidays in English speaking countries - a fascinating topic to start lessons with from time to time.

The website is also optimized for mobile devices, which has the potential of making the aformentioned daily preparations more flexible, as teachers can easily upload interesting articles they read, write questions for them and share them with their colleagues during the daily commute to work.

## Key functionalities

Visitors to the website will get a 'taste of the application' by having access to articles with titles and the list of holidays on any particular day. They can join this 'virtual staffroom' by logging in. After the first login users receive a short welcome email with some instructions. Only logged in users are able to post articles with tasks (and other features) and edit or delete their own posts. Users are not allowed to modify or delete the posts of their colleagues, only the administrator has the right to do so.

In the 'articles with tasks' section logged-in teachers are able to search the database based on the content of the article or the keywords (provided by the creator of the task). In this section only the titles of the articles are displayed at first, which users can narrow down by their search. By clicking on the button under the title, users get a warmer question they can use in class to introduce the topic and under the warmer another button leads to the article content and some useful links.

Users have access to their account and are able to delete it.

## Technologies

The project was created using:

- React.js 17.0.2
- Node.js v12.18.2
- express.js 4.17.1
- MongoDB

## Launch

`git clone https://github.com/evagurubi/summerexam`

### Client side:

- `cd frontend` //navigates to frontend folder
- `npm install` //to install npm packages
- `npm start` //starts client side, runs on localhost:3000

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Backend:

- `cd backend` //navigates to backend folder
- `npm install` //to install npm packeges

-Create a `.env` file. It should contain the following elements:

- `DB_CONNECT = YOUR_MONGODB_CONNECTION`
- `TOKEN_SECRET = YOUR_JWT_SECRET`
- `GOOGLE_CLIENT_ID = YOUR_GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET = YOUR_GOOGLE_CLIENT_SECRET`
- `MAIL_USERNAME = YOUR_MAIL_USERNAME` //to send emails from to new users via nodemailer
- `MAIL_PASSWORD = YOUR_MAIL_PASSWORD`

- `node start.js` //starts server, runs on localhost:5000

### Docker

You can build and run the app with [Docker Compose](https://docs.docker.com/compose/), which is included with [Docker Desktop](https://docs.docker.com/desktop/). You can install it following [these installation instructions](https://docs.docker.com/compose/install/).

After building the images, run `docker-compose up -d`. The built and running container runs on [http://localhost:3000](http://localhost:3000) in your browser.

## Sources

#### Background photos:

- London:
  https://photostockeditor.com/image-rf/london-big-ben-double-decker-bus-and-red-telephone-box-1191335506
  London Big Ben, double-decker bus and red telephone box Image Royalty Free
  Creative Commons

- New York:
  Wikipedia
  by Oto Godfrey
  Creative Commons Attribution-Share Alike

- Sidney:
  https://www.piqsels.com/en/search?q=sydney+harbour+bridge+night
  Piqsels, royalty free sydney harbour bridge night photos free download
