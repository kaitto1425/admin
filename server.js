
import router from './routes/api/notification.js'
import express from 'express';
import path  from 'path';
import bodyParser  from 'body-parser';



const __dirname = path.resolve();
var app = express();
console.log(router)


app.disable('x-powered-by');

app.get('/',function(_req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});
app.get('/home',function(_req,res){
    res.sendFile(path.join(__dirname+'/home.html'));
});
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/notification',router)
app.use('/css',express.static(__dirname + '/css'));
app.use('/image',express.static(__dirname + '/image'));
app.use('/js',express.static(__dirname + '/js'));

const PORT = process.env.PORT||5000
app.listen(PORT,()=>console.log('server started'))

