# StoryBooks

This is a full application build of the StoryBooks app which uses Node.js, Express, MongoDB, Passport with a Google OAuth strategy and more. StoryBooks is a CRUD apps for writing a list of story or blog-post, you can create your own story in 'public' or 'private', if you choose your story in 'private' your private story wouldn't show up in Public stories.

The tech I learned is using google Oauth20 for logging functionality, and form-validation status when you create a story from server-side validation.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

1. Clone the repo

```
git clone
```

2. Install pakcage.json file

```
npm install or npm i
```

3. run npm or yarn manager in root folder

```
npm run dev

#or

yarn dev
```

4. create dev.js in config folder for development environment
```
# in config folder
  touch dev.js

  module.exports = {
    mongoURI = 'your-mlab//<username><pass>/<your-mlab-db>'
    // or using mongod
    //mongoURI = 'mongod://localhost:127.0.0.1/<your-local-db>'
  }

```

## Built With

* HTML5
* SASS
* VanillaJS
* Node.js
* Express
* MongoDB | Using mongoDB Atlas
* Heroku

## License

This project is licensed under the MIT License

## Acknowledgments
 @[bradTraversy](https://github.com/bradtraversy)

