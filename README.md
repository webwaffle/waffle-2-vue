# waffle-2-web

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```


`waffle-2-web` is the web frontend for Waffle 2. It can be set up for any waffle server.

## Config File

Currently, the only config file setting is `apiRoot`. It says where the API server it should use is.


The config file should be named `waffle.config.js` and it should be in the root directory (with `package.json`). Here is the config  for waffleproject.io:

```
module.exports = {
  apiRoot: 'http://waffleproject.io:3000'
}
```
