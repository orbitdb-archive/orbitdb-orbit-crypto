# orbitdb-orbit-crypto

[![](https://img.shields.io/badge/freenode-%23orbitdb-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23orbitdb)

> Crypto primitives for Orbit

## Install

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

Please do!

## License

[MIT](LICENSE) © 2016-2018 Protocol Labs Inc, Haja Networks Oy.