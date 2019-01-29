# orbitdb-orbit-crypto

[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/orbitdb/Lobby)
[![npm version](https://badge.fury.io/js/orbit-crypto.svg)](https://www.npmjs.com/package/orbit-crypto)

> Crypto primitives for Orbit

## Install

This project uses [npm](http://npmjs.com/) and [nodejs](https://nodejs.org/).

```sh
$ npm install orbitdb-orbit-crypto
```

## Usage

```js
const Crypto = require('orbit-crypto')
```

### Static Methods

- `useKeyStore(directory = './')`
- `importKeyFromIpfs(ipfs, hash)`
- `exportKeyToIpfs(ipfs, key)`
- `getKey(id = 'default')`
- `generateKey()`
- `exportPublicKey(key)`
- `exportPrivateKey(key)`
- `importPublicKey(key)`
- `importPrivateKey(key)`
- `sign(key, data)`
- `verify(signature, key, data)`

## Contribute

We would be happy to accept PRs! If you want to work on something, it'd be good to talk beforehand to make sure nobody else is working on it. You can reach us [on Gitter](https://gitter.im/orbitdb/Lobby), or in the [issues section](https://github.com/orbitdb/orbitdb-orbit-crypto/issues).

We also have **regular community calls**, which we announce in the issues in [the @orbitdb welcome repository](https://github.com/orbitdb/welcome/issues). Join us!

For specific guidelines for contributing to this repository, check out the [Contributing guide](CONTRIBUTING.md). For more on contributing to OrbitDB in general, take a look at the [@OrbitDB welcome repository](https://github.com/orbitdb/welcome). Please note that all interactions in [@OrbitDB](https://github.com/orbitdb) fall under our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE) © Protocol Labs Inc, Haja Networks Oy.
