import  Router  from 'express';
import fetch from 'node-fetch';


const router = Router();
router.post('/sendToAll',(_req,res)=>{
    console.log(_req.body)
    var notification = {
    'title':_req.body.title,
    'body':_req.body.message,
};

var fcm_tokens = [
    _req.body.token
];

var notification_body={
    'notification':notification,
    'registration_ids':fcm_tokens
}
    fetch('https://fcm.googleapis.com/fcm/send',{
        'method':'POST',
        'headers':{
            'Authorization':'key='+'AAAAqQJXV20:APA91bGpvG7QFjBWAUtghCpvAMJTFdvBNu4kBGYWTjVPQK3XXwjEGd2j9cFmRHzXGYgo0x9rrnEFqU0Hd3lBGThwVF69KeWVvAMKXD-yf6pS9WEMPDb8b08MeDw8DshOCfVvimYK1ygo',
            'Content-Type':'application/json'
        },
        'body':JSON.stringify(notification_body)
    }).then(()=>{
        res.status(200).send('notification send succesfully')
    }).catch((err)=>{
        res.status(404).send('Something went wrong')
        console.log('warning error:'+err)
    })
});

export default router