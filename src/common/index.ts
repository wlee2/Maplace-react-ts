import SimpleCrypto from "simple-crypto-js";

export function encrypting(origin: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
        if (origin) {
            var simpleCrypto = new SimpleCrypto('key');
            const data = await simpleCrypto.encrypt(origin);
            resolve(data);
        }
        reject()
    })
}

export function decrypting(hashed: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
        if (hashed) {
            let simpleCrypto = new SimpleCrypto('key');
            const data = await simpleCrypto.decrypt(hashed);
            resolve(data);
        }
        reject()
    })
} 