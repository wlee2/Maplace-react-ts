import SimpleCrypto from "simple-crypto-js";


export function encrypting(origin: string): string {
    if (origin) {
        var simpleCrypto = new SimpleCrypto('key');
        return simpleCrypto.encrypt(origin);
    }
    return '';
}

export function decrypting(hashed: string): string | object {
    if (hashed) {
        let simpleCrypto = new SimpleCrypto('key');
        return simpleCrypto.decrypt(hashed);
    }
    return '';
} 