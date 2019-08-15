import Crypto from 'crypto-js';


export function encrypting(origin: string) : string {
    return Crypto.AES.encrypt(origin, "key").toString()
}

export function decrypting(hashed: string) : string {
    return Crypto.AES.decrypt(hashed, "key").toString(Crypto.enc.Utf8);
} 