/// Edited by doghmoh@gmail.com    20/01/2023
/**
 * @fileoverview
 * - Using the 'QRCode for Javascript library'
 * - Fixed dataset of 'QRCode for Javascript library' for support full-spec.
 * - this library has no dependencies.
 * 
 * @author doghmoh
 * @see <a href="https://porfolio.tk/" target="_blank">https://porfolio.tk/</a>
 * @see <a href="https://github.com/doghmoh/" target="_blank">https://github.com/doghmoh/</a>
 */

function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null,
        str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}

function String_to_hexa(str) {
    arr = [];
    for (let i = 0; i < str.length; i++) {
        var hex = Number(str.charCodeAt(i)).toString(16);
        arr.push(hex);
    }
    return arr.join('');
}

function getlength(tagValue) {
    var a = Array.from(tagValue);
    var j = 0;
    for (let i = 0; i < a.length; i++) {
        if (a[i] === ' ') j = j + 1;
        else j = j + 2;
    }
    if (j.length === 1)
        return "0" + j.toString(16)
    else
        return j.toString(16)

}

function EncodingArabic(tagValue) {
    var encoded = new TextEncoder().encode(tagValue).join('')
    const text = encodeURIComponent(tagValue);
    var b = Array.from(text.split('%')).join('');

    return b;
}

function isArabic(text) {
    var pattern = /[\u0600-\u06FF\u0750-\u077F]/;
    result = pattern.test(text);
    return result;
}

function getTLVForValue(tagNum, tagValue) {
    var tagBuf = "0" + tagNum;
    var tagValueLenBuf = (tagValue.length).toString(16);
    if (isArabic(tagValue)) {
        tagValueBuf = EncodingArabic(tagValue);
        tagValueLenBuf = getlength(tagValue)
    } else
        tagValueBuf = String_to_hexa(tagValue)
    if (tagValueLenBuf.length === 1)
        tagValueLenBuf = "0" + tagValueLenBuf
    else {}

    var bufsArray = tagBuf + tagValueLenBuf + tagValueBuf;
    console.log(bufsArray)
    return bufsArray;
}
/** 
    * @example
    * var SellerName = getTLVForValue("1", "doghmoh");
    * var VATRegistrationNumber = getTLVForValue("2", "312345678912343");
    * var TimeStamp = getTLVForValue("3", new Date().toJSON());
    * var InvoiceTotal = getTLVForValue("4", "100.00");
    * var VATTotal = getTLVForValue("5", "15.00");

    * var bufsArray = SellerName + VATRegistrationNumber + TimeStamp + InvoiceTotal + VATTotal;

    * var qrCode64 = hexToBase64(bufsArray)

      /// use any qrcode generator (example qrcode.js && qrcode.min.js)
    * $(document).ready(function() {
    *     new QRCode("qrcode", qrCode64);
    *})
**/
