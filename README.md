[npm-url]: https://www.npmjs.com/package/pobeda-ui
[npm-image]: https://img.shields.io/npm/v/pobeda-ui?color=blue

[logo-url]: https://xn---63-5cdesg4ei.xn--p1ai/
[logo-image]: https://xn---63-5cdesg4ei.xn--p1ai/src/assets/icons/logo_main.svg

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/truerk/pobeda-ui/blob/master/LICENSE

# Pobeda-ui [![NPM version][npm-image]][npm-url] [![GitHub license][license-image]][license-url]

Components for building an interface


## Documentation

See [here](https://truerk.github.io/pobeda-ui/) (v0.7)

## Installation and usage

### npm
```
npm i pobeda-ui
```

### webpack

```js
resolve: {
        alias: {
            '@ui': path.resolve(__dirname, '/node_modules/pobeda-ui/src/ui/js'),
            '@ui/scss': path.resolve(__dirname, '/node_modules/pobeda-ui/src/ui/scss'),
            '@utils': path.resolve(__dirname, '/node_modules/pobeda-ui/src/ui/utils/utils'),
        }
    },
```

### code

```js
import ui from '@ui'
import utils from '@utils'
import Accordion from '.@ui/Accordion'

const accordion = new Accordion('[am-accordion="simple"]')
```

### With props|events

```js
const accordion = new Accordion('[am-accordion="multiple"]', {
    duration: 800,
    multiple: true,
    init: false
})

accordion.init()

accordion.on('init', (data) => {
    console.log(data);
})

accordion.on('change', (tab, panel) => {
    console.log(tab, panel);
})
```

### scss
Add component styles to your local styles file
```scss
@import 'node_modules/pobeda-ui/src/ui/scss/am-accordion.scss';
@import './yourVariables.scss';
```
