import SimpleCrypto from "simple-crypto-js";


export function encrypting(origin: string): string {
    if (origin) {
        var simpleCrypto = new SimpleCrypto('key');
        return simpleCrypto.encrypt(origin);
    }
    return '';
}

export function decrypting(hashed: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
        if (hashed) {
            let simpleCrypto = new SimpleCrypto('key');
            const data = await simpleCrypto.decrypt(hashed);
            resolve(data);
        }
        reject('')
    })
    
} 