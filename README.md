# E-Invoice (Fatoorah) Saudi Arabia QR Code Encoder

This JavaScript library encodes seller data in the format required by E-Invoice systems in Saudi Arabia into a QR code. It generates a QR code that can be scanned by E-Invoice systems for processing and verification.

## Overview

- This library encodes seller information, such as the seller's name, VAT registration number, timestamp, invoice total, and VAT total, in accordance with E-Invoice standards in Saudi Arabia.
- The generated QR code can be used for efficient transmission and processing of invoice data.
- This library is designed to be standalone and has no external dependencies.

## Author

This library was created by doghmoh@gmail.com(https://porfolio.tk/).

## Usage

To use this library to generate a QR code for E-Invoice purposes, follow these steps:

1. Include the JavaScript file for this library in your project.

2. Encode your seller data using the provided functions, such as `getTLVForValue`.

3. Concatenate the encoded data elements to form a complete TLV string.

4. Use any QR code generator library (e.g., qrcode.js) to create a QR code image from the generated TLV string.

5. Display the QR code on your invoice or documents for E-Invoice processing.

Here's an example of how to use the library:

```javascript
var SellerName = getTLVForValue("1", "Your Company Name");
var VATRegistrationNumber = getTLVForValue("2", "12345678901234");
var TimeStamp = getTLVForValue("3", new Date().toJSON());
var InvoiceTotal = getTLVForValue("4", "100.00");
var VATTotal = getTLVForValue("5", "15.00");

var bufsArray = SellerName + VATRegistrationNumber + TimeStamp + InvoiceTotal + VATTotal;

// Generate a QR code using any QR code generator library
// Example with qrcode.js:
new QRCode("qrcode", hexToBase64(bufsArray));
