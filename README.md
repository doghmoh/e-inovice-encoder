# Zatca-base64-generator-for-Javascript
Any question inbox me in doghmoh@gmail.com
this code help developer to generate qrcode that match zatca ksa

how it work ?

this is a simple example : 

   1/ import the library below to use the  function getTLVForValue().
   <script src="Jsbase64.qrCode.js"></script> 
   2/ use the code below to generate base64 code (just edit the second argument in function getTLVForValue()) :
   
        var SellerName = getTLVForValue("1", "doghmoh");  
        var VATRegistrationNumber = getTLVForValue("2", "312345678912343");
        var TimeStamp = getTLVForValue("3", new Date().toJSON());
        var InvoiceTotal = getTLVForValue("4", "100.00");
        var VATTotal = getTLVForValue("5", "15.00");

        var bufsArray = SellerName + VATRegistrationNumber + TimeStamp + InvoiceTotal + VATTotal;

        var qrCode64 = hexToBase64(bufsArray)  // you should put this variable in QR generator.

  3/ use any QR generator to  create a QR code.

        
        
       
