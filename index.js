'use strict'

var WebCrypto = require("node-webcrypto-ossl").default
const isNodeJs = !(typeof window !== "undefined" && window !== null)
var crypto = isNodeJs ? new WebCrypto() : window.crypto

// require('webcrypto-shim')

class OrbitCrypto {
  static importKeyFromIpfs(ipfs, hash) {
    return ipfs.object.get(hash, { enc: 'base58' })
      .then((obj) => JSON.parse(obj.toJSON().Data))
      .then((key) => OrbitCrypto.importKey(key))
  }

  static exportKeyToIpfs(ipfs, key) {
    return OrbitCrypto.exportKey(key)
      .then((k) => JSON.stringify(k, null, 2))
      .then((s) => new Buffer(s))
      .then((buffer) => ipfs.object.put(buffer))
      .then((res) => res.toJSON().Hash)
  }

  static generateKey() {
    return crypto.subtle.generateKey(
      {
          name: "ECDSA",
          namedCurve: "P-256",
          // hash: { name: "SHA-256" }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
          //length: 256, //optional, if you want your key length to differ from the hash function's block length
      },
      true, //whether the key is extractable (i.e. can be used in exportKey)
      ["sign", "verify"] //can be any combination of "sign" and "verify"
    )
  }

  static exportKey(key) {
    return crypto.subtle.exportKey("jwk", key.publicKey)
  }

  static importKey(key) {
    return crypto.subtle.importKey(
      "jwk", //can be "jwk" or "raw"
      key,
      {   //this is the algorithm options
          name: "ECDSA",
          namedCurve: "P-256"
          // hash: { name: "SHA-256"} , //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
          //length: 256, //optional, if you want your key length to differ from the hash function's block length
      },
      false, //whether the key is extractable (i.e. can be used in exportKey)
      key.key_ops //can be any combination of "sign" and "verify"
    )
  }

  static sign(key, data) {
    return crypto.subtle.sign(
      {
        name: "ECDSA",
        hash: { name: "SHA-256" }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
      },
      key.privateKey, //from generateKey or importKey above
      data //ArrayBuffer of data you want to sign
    )
  }

  static verify(signature, key, data) {
    return crypto.subtle.verify(
      {
        name: "ECDSA",
        hash: { name: "SHA-256" }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
      },
      key, //from generateKey or importKey above
      signature, //ArrayBuffer of the signature
      data //ArrayBuffer of the data
    )
  }
}

module.exports = OrbitCrypto
