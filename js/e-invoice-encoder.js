/**
 * QR Code Generator for E-invoice in Saudi Arabia
 * Edited by doghmoh@gmail.com - 20/01/2023
 * 
 * This code uses the 'QRCode for Javascript library' to generate QR codes for E-invoice data.
 * It fixes the dataset of the library to support the full specification for Saudi Arabia's E-invoice format.
 * The library has no external dependencies.
 * 
 * @see Portfolio: https://porfolio.tk/
 * @see GitHub Repository: https://github.com/doghmoh/
 */

// Function to convert hexadecimal string to Base64
function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null,
        str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}

// Function to convert a string to a hexadecimal representation
function stringToHex(str) {
    const arr = [];
    for (let i = 0; i < str.length; i++) {
        const hex = Number(str.charCodeAt(i)).toString(16);
        arr.push(hex);
    }
    return arr.join('');
}

// Function to get the length of a tag value
function getLength(tagValue) {
    const a = Array.from(tagValue);
    let j = 0;
    for (let i = 0; i < a.length; i++) {
        if (a[i] === ' ') j = j + 1;
        else j = j + 2;
    }
    return (j < 16) ? "0" + j.toString(16) : j.toString(16);
}

// Function to encode Arabic text
function encodeArabic(tagValue) {
    const encoded = new TextEncoder().encode(tagValue).join('');
    const text = encodeURIComponent(tagValue);
    return Array.from(text.split('%')).join('');
}

// Function to check if text contains Arabic characters
function isArabic(text) {
    const pattern = /[\u0600-\u06FF\u0750-\u077F]/;
    return pattern.test(text);
}

// Function to generate TLV (Tag-Length-Value) for a given tag number and value
function getTLVForValue(tagNum, tagValue) {
    const tagBuf = "0" + tagNum;
    let tagValueLenBuf = (tagValue.length).toString(16);
    let tagValueBuf;

    if (isArabic(tagValue)) {
        tagValueBuf = encodeArabic(tagValue);
        tagValueLenBuf = getLength(tagValue);
    } else {
        tagValueBuf = stringToHex(tagValue);
    }

    if (tagValueLenBuf.length === 1) {
        tagValueLenBuf = "0" + tagValueLenBuf;
    }

    const bufsArray = tagBuf + tagValueLenBuf + tagValueBuf;
    console.log(bufsArray);
    return bufsArray;
}

// Example data for generating the QR code
const sellerName = getTLVForValue("1", "doghmoh");
const vatRegistrationNumber = getTLVForValue("2", "312345678912343");
const timeStamp = getTLVForValue("3", new Date().toJSON());
const invoiceTotal = getTLVForValue("4", "100.00");
const vatTotal = getTLVForValue("5", "15.00");

const bufsArray = sellerName + vatRegistrationNumber + timeStamp + invoiceTotal + vatTotal;

const qrCode64 = hexToBase64(bufsArray);

// Generate the QR code using the QRCode library
const qrcodeContainer = document.querySelector('#qrcode-container');
const qrcode = new QRCode(qrcodeContainer, qrCode64);
