# sunet-www-frontend

The frontend uses the static JSON files (from sunet-www-content) or a connects to a WP REST API. This project contains the frontend only.
* sunet-www-frontend

## Getting Started

To setup the frontend first you will need to install the compiling components below.

### Prerequisites

##### ReactJS
ReactJS is a JavaScript library for building user interface and was developed in 2011 on Facebook. It is today one of the three most used libraries and is used in this project as a base for the whole page.
* https://reactjs.org/

##### Next.js
Takes care of the server side routing for ReactJS so that we router records and pages to the right place.
* https://nextjs.org/

##### Yarn
Yarn is a package manager who handles the compilation and error management of the ReactJS project.
* https://yarnpkg.com

##### Bootstrap
Bootstrap is a front-end framework for CSS design systems. For this project we use only a few components such as their grid system and reset.
* https://getbootstrap.com

##### SASS
Our own CSS compiled using SASS (Syntactically Awesome Style Sheets) to make the use and implementation faster and easier.
* https://sass-lang.com

##### PM2
PM2 Runtime is a Production Process Manager for Node.js applications with a built-in Load Balancer. It allows you to keep applications alive forever, to reload them without downtime and facilitate common Devops tasks.
* https://pm2.io

### Installing

After you have installed all prerequisites is in place you will need to compile the ReactJS with Yarn. You can set the base URL in the configuration.

## Running the app

You can run the application with PM2 with the following command:

```
pm2 start server.js
```

## Deployment

No compilation is required, just copy the file to the destination as described above and install the required plugins.

## Built With

* ReactJS
* Next.js
* Yarn
* Bootstrap
* SASS

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Matias Vangsnes** - *Initial work*

See also the list of contributors who participated in this project.

## License

This project is licensed under the X License - see the [LICENSE.md](LICENSE.md) file for details.


