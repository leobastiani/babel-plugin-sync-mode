# babel-plugin-sync-mode [![NPM version](https://img.shields.io/npm/v/babel-plugin-sync-mode.svg?style=flat)](https://www.npmjs.com/package/babel-plugin-sync-mode) [![NPM monthly downloads](https://img.shields.io/npm/dm/babel-plugin-sync-mode.svg?style=flat)](https://npmjs.org/package/babel-plugin-sync-mode) [![NPM total downloads](https://img.shields.io/npm/dt/babel-plugin-sync-mode.svg?style=flat)](https://npmjs.org/package/babel-plugin-sync-mode) [![Linux Build Status](https://img.shields.io/travis/leobastiani/babel-plugin-sync-mode.svg?style=flat&label=Travis)](https://travis-ci.com/leobastiani/babel-plugin-sync-mode)

> Automatically await every expression in async function declaring it as sync

## Example

```javascript
async function test() {
  sync: {
    console.log("I should be awaited 1");
    console.log`I should be awaited 2`;
    // a await goes here
    console.log(
      // a await goes here as well
      (() => {
        console.log("I should not be awaited 3");
      })()
    );
    // a await goes here
    console.log(
      // a await goes here as well
      (async () => {
        console.log("I should not be awaited 4");
      })()
    );
    async: {
      console.log("I should not be awaited 5");
      sync_: {
        console.log(
          async () => {
            console.log("I should be awaited 6");
          },
          () => {
            console.log("I should not be awaited 7");
          }
        );
      }
    }
  }
  console.log("I should not be awaited 8");
}

sync: {
  console.log("I should not be awaited 9");
  (() => {
    console.log("I should not be awaited 10");
  })();
  (async () => {
    console.log("I should be awaited 111");
  })();
}

(async () => {
  console.log("I should not be awaited 112");
})();
```

Will turn:

```javascript
async function test() {
  sync: {
    await console.log("I should be awaited 1");
    await console.log`I should be awaited 2`; // a await goes here

    await console.log(
      // a await goes here as well
      await (() => {
        console.log("I should not be awaited 3");
      })()
    ); // a await goes here

    await console.log(
      // a await goes here as well
      await (async () => {
        await console.log("I should not be awaited 4");
      })()
    );

    async: {
      console.log("I should not be awaited 5");

      sync_: {
        await console.log(
          async () => {
            await console.log("I should be awaited 6");
          },
          () => {
            console.log("I should not be awaited 7");
          }
        );
      }
    }
  }

  console.log("I should not be awaited 8");
}

sync: {
  console.log("I should not be awaited 9");

  (() => {
    console.log("I should not be awaited 10");
  })();

  (async () => {
    await console.log("I should be awaited 111");
  })();
}

(async () => {
  console.log("I should not be awaited 112");
})();
```

## Installation

`npm install --save-dev babel-plugin-sync-mode`

or using yarn

`yarn add --dev babel-plugin-sync-mode`

## Usage

### Via .babelrc (Recommended)

###### .babelrc

```json
{
  "plugins": ["sync-mode"]
}
```

### Via CLI

`babel-node --plugins sync-mode script.js`

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["sync-mode"],
});
```
