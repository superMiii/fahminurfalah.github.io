var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BNU6Ppv1AFiHzt-Pw_X16CoOf3er__MaFpP8zKN2trbZX4CGQSaR8faXxHTWV6USukYSoP7ys9Hgn5quHRMqf7Y",
   "privateKey": "WM5cIk-ODj6KPQAcQCbBQRimOGsYyD_C2WAehFwLDIk"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cs0mrZ2cWNg:APA91bHLmZkFUtVgI__BVGNUDFT9S9gLkCmyIfLR8lBwIUkBrFRujiqHbC84ZZVGAnnHqIl7v4LbUf8f4ZYfQYfp57qRUcMjOWjMEAHLf8nDcVOW_8vOYNlOT-syBxdnZZpfJQ_ubOfZ",
   "keys": {
       "p256dh": "BGutSLQqMPinfQ/5cg5CAYoeZVT/ssG+es61ubErPcHbldk4LtdYobcUokZufo4/qdSogeitwwFCstELPH0C70A=",
       "auth": "edar90X83b9IXbaspb1DDw=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '978715431924',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);