import SimpleCrypto from "simple-crypto-js";


export function encrypting(origin: string, done?: CallableFunction): string {
    if (origin) {
        var simpleCrypto = new SimpleCrypto('key');
        if(done) {
            done(simpleCrypto.encrypt(origin))
        }
        return simpleCrypto.encrypt(origin);
    }
    return '';
}

export function decrypting(hashed: string, done?: CallableFunction): string | object {
    if (hashed) {
        let simpleCrypto = new SimpleCrypto('key');
        if(done) {
            done(simpleCrypto.decrypt(hashed))
        }
        return simpleCrypto.decrypt(hashed);
    }
    return '';
} 