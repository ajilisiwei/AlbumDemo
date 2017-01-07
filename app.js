// /**
//  * Created by WEI on 2017/1/5.
//  */

let express = require('express')
    , engine = require('ejs-locals')
    , app = express()
    , router=require('./controller/router');

app.engine('ejs', engine);

app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/upload'));
app.set(express.static(__dirname+'/views'));
app.set('view engine', 'ejs');

app.get('/',router.showIndex);
app.get('/:albumname',router.showAlbum);
app.get('/up',router.showUpPage);
app.post('/up',router.upLoadImg);
app.use(function (req,res) {
    res.render('err');
});
//for test 
app.listen(3000);