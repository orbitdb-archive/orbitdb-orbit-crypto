'use strict'

require('webcrypto-shim')

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
    return window.crypto.subtle.generateKey(
      {
          name: "HMAC",
          hash: { name: "SHA-256" }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
          //length: 256, //optional, if you want your key length to differ from the hash function's block length
      },
      true, //whether the key is extractable (i.e. can be used in exportKey)
      ["sign", "verify"] //can be any combination of "sign" and "verify"
    )
  }

  static exportKey(key) {
    return window.crypto.subtle.exportKey("jwk", key)
  }

  static importKey(key) {
    return window.crypto.subtle.importKey(
      "jwk", //can be "jwk" or "raw"
      key,
      {   //this is the algorithm options
          name: "HMAC",
          hash: { name: "SHA-256"} , //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
          //length: 256, //optional, if you want your key length to differ from the hash function's block length
      },
      key.ext, //whether the key is extractable (i.e. can be used in exportKey)
      key.key_ops //can be any combination of "sign" and "verify"
    )
  }

  static sign(key, data) {
    return window.crypto.subtle.sign(
      { name: "HMAC" },
      key, //from generateKey or importKey above
      data //ArrayBuffer of data you want to sign
    )
  }

  static verify(signature, key, data) {
    return window.crypto.subtle.verify(
      { name: "HMAC" },
      key, //from generateKey or importKey above
      signature, //ArrayBuffer of the signature
      data //ArrayBuffer of the data
    )
  }
}

module.exports = OrbitCrypto