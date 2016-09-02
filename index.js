'use strict'

var EC = require('elliptic').ec;
var ec = new EC('secp256k1');

let keystore

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage
  keystore = new LocalStorage('./')
} else {
  keystore = localStorage
}

class OrbitCrypto {
  static useKeyStore(directory = './') {
    if (typeof localStorage === "undefined" || localStorage === null) {
      keystore = new LocalStorage(directory)
    }
  }

  static importKeyFromIpfs(ipfs, hash) {
    return ipfs.object.get(hash, { enc: 'base58' })
      .then((obj) => JSON.parse(obj.toJSON().Data))
      .then((key) => OrbitCrypto.importPublicKey(key))
  }

  static exportKeyToIpfs(ipfs, key) {
    return OrbitCrypto.exportPublicKey(key)
      .then((k) => JSON.stringify(k, null, 2))
      .then((s) => new Buffer(s))
      .then((buffer) => ipfs.object.put(buffer))
      .then((res) => res.toJSON().Hash)
  }

  static getKey(id = 'default') {
    let savedKeys = JSON.parse(keystore.getItem(id))
    let key, publicKey, privateKey

    if(savedKeys) {
      return OrbitCrypto.importPrivateKey(savedKeys.privateKey)
        .then((privKey) => privateKey = privKey)
        .then(() => OrbitCrypto.importPublicKey(savedKeys.publicKey))
        .then((pubKey) => publicKey = pubKey)
        .then(() => {
          return { publicKey: publicKey, privateKey: privateKey }
        })
    }

    return OrbitCrypto.generateKey()
      .then((keyPair) => key = keyPair)
      .then(() => OrbitCrypto.exportPrivateKey(key))
      .then((privKey) => privateKey = privKey)
      .then(() => OrbitCrypto.exportPublicKey(key))
      .then((pubKey) => publicKey = pubKey)
      .then(() =>{
        keystore.setItem(id, JSON.stringify({ publicKey: publicKey, privateKey: privateKey }))
        return { publicKey: key, privateKey: key }
      })
  }

  static generateKey() {
    return Promise.resolve(ec.genKeyPair())
  }

  static exportPublicKey(key) {
    return Promise.resolve(key.getPublic('hex'))
  }

  static exportPrivateKey(key) {
    return Promise.resolve(key.getPrivate('hex'))
  }

  static importPublicKey(key) {
    return Promise.resolve(ec.keyFromPublic(key, 'hex'))
  }

  static importPrivateKey(key) {
    return Promise.resolve(ec.keyFromPrivate(key, 'hex'))
  }

  static sign(key, data) {
    const sig = ec.sign(data, key)
    return Promise.resolve(sig.toDER('hex'))
  }

  static verify(signature, key, data) {
    Promise.resolve(ec.verify(data, signature, key))
  }
}

module.exports = OrbitCrypto
