### Dependencies

First you have to install the following dependencies:

- `node` [Node.js](http://nodejs.org) v5.7.0 or later
- `npm` [Node Packaged Modules](https://www.npmjs.org)

After [installing Node.js](http://nodejs.org) you can use the included `npm` package manager to download all dependencies:

```
git submodule init
git submodule update Lychee-front
cd Lychee-front/
npm install
```

### Build

The Gulpfile is located in `Lychee-front/` and can be executed using the `npm run compile` command.

### Watch for changes

While developing, you might want to use the following command to automatically build Lychee everytime you save a file:

```
npm start
```

### Update the source code

```
git pull
git submodule update
```