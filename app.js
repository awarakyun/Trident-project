const express = require('express');
const app = express();
const productRoutes = require('./api/routes/products');
const ordersRoute = require('./api/routes/orders');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://Nirvana-livaz:'
+ process.env.MONGO_ATLAS_PW + 
'@cluster0-shard-00-00-yypvv.mongodb.net:27017,cluster0-shard-00-01-yypvv.mongodb.net:27017,cluster0-shard-00-02-yypvv.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
{
    useNewUrlParser: true 
}
);

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use((req, res, next) => {
res.header('Access-Control-Allow-Origin','*');
res.header('Access-Control-Allow-Headers',
'Origin, X-Requested-With, Content-Type, Accept, Authorization'
);
if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT', 'POST','PATCH', 'DELETE', 'GET');
    return res.status(200).json({});
}
next();
})

app.use('/products',productRoutes);
app.use('/orders', ordersRoute);

app.use((req, res, next) => {
 const error = new Error('Not Found');
 error.status = 404;
 next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500 );
    res.json({
        message: error.message
    });
});

module.exports = app;