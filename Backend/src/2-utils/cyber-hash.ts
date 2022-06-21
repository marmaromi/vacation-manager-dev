import crypto from "crypto";

const salt = "MakeMuchBetterPasswords!";

function hash(plainText: string) {

    if (!plainText) return null;

    const hashText = crypto.createHmac("sha512", salt).update(plainText).digest("hex");

    return hashText;
}

export default hash;