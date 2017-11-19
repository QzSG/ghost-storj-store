# Storj Store for Ghost Blogs :ghost::zap::cloud:
[![GitHub release](https://img.shields.io/github/release/QzSG/ghost-storj-store.svg?style=flat-square)](https://github.com/QzSG/ghost-storj-store/releases)
[![Supported Ghost Version](https://img.shields.io/badge/ghost%20supported-^0.10.0-brightgreen.svg?maxAge=2592000&style=flat-square)](https://github.com/TryGhost/Ghost)
[![Node Version](https://img.shields.io/badge/node-^4.5-brightgreen.svg?maxAge=2592000&style=flat-square)](https://nodejs.org/en/)
[![David dependencies checker](https://img.shields.io/david/QzSG/ghost-storj-store.svg?maxAge=2592000&style=flat-square)](https://david-dm.org/QzSG/ghost-storj-store)
[![MIT license](https://img.shields.io/github/license/QzSG/ghost-storj-store.svg?maxAge=2592000&style=flat-square)](https://github.com/QzSG/ghost-storj-store/blob/master/LICENSE)

A STORJ storage adapter for Ghost 0.10+

A simple adapter to add [Storj Storage](https://storj.io) support for a Ghost Blog

Requests to `/content/images/storj` will be proxied to Storj to serve uploaded images

## Example

An example Ghost blog on Bluemix utilising ghost-storj-store

[Ghost Storj Blog](https://storj.qz.sg)

## Important Notes

### !!! Critical

Plugin is currently broken due to changes in Storj bridge and the fact that the repo this plugin depends on is no longer updated.
I will update this plugin and the sample blog to work using the new `node-storj` repo in a few weeks time. Meanwhile.. it's just not working.

Version `0.3.1` fixes images not appearing in AMP articles

If you are using version under `0.2.0`, kindly update to the latest version on or above `0.2.0`.
Version `0.2.0` fixes a critical bug which may cause your ghost app to crash due to incorrect listeners implemented for streams.

## Installation

### Via NPM

1 . Make the storage folder if it doesn't already exist 

```bash
mkdir content/storage && cd content/storage
```

2 . Install ghost-storj-store package using npm

```bash
npm install ghost-storj-store
```

### Via Git

1 . Make the storage folder if it doesn't already exist 

```bash
mkdir content/storage && cd content/storage
```

2 . Git clone this repo 

```bash
git clone https://github.com/QzSG/ghost-storj-store.git
```

3 . Install ghost-storj-store package using npm

```bash
npm install ghost-storj-store
```
## Configuration

In your Ghost `config.js` file, add a new `storage` block to whichever environment you want to change:

```js
storage: {
  active: 'ghost-storj-store',
  'ghost-storj-store': {
    bucket_id: YOUR_BUCKET_ID,
    key: YOUR_REGISTERED_PRIVATE_KEY,
    encryptionKey: YOUR_FILES_ENCRYPTION_KEY,
  }
}
```

### NOTE
```
This beta release assumes that you have already created an account at https://storj.io,
and that you have already generated and registered a private/public keypair with the Storj Bridge. 
It also assumes that you have created a bucket that you are going to use with your ghost blog
```

## Suggestions & Issues

Feel free to open an issue, but please do check if a similar issue already exists.

## Support Development

### Buy me a cuppa 

BTC  : 1QzSG1xY8PWjg5advFHQwcSWzRzaeuB9y

## Copyright & License

Copyright (c) QzSG - Released under the [MIT license](LICENSE).
