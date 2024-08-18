const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
// const mongoose = require('mongoose');
dotenv.config({path: 'config.env'});
const ApiError = require ('./utils/apiError');
const globalError = require ('./middlewares/errorMiddlware');
const dbConnection = require('./config/database');
const categoryRoute = require('./routes/categoryRoute');
const subCategoryRoute = require('./routes/subCategoryRoute');
const brandRoute = require('./routes/brandRoute');
const productRoute = require('./routes/productRoute');



dbConnection();

const app =  express();
// 

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app. use(morgan('dev'));
    console.log(`node:${process.env.NODE_ENV}`);
}




app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/subCategories',subCategoryRoute);
app.use('/api/v1/brands',brandRoute)
app.use('/api/v1/products',productRoute)


app.all('*', (req,res, next) => {
    // const err = new Error(``);
    // next(err.message);

    next(new ApiError(`Not found: ${req.originalUrl}`, statusCode));
});

app.use(globalError);


const PORT = process.env.PORT || 8000;
const server =  app.listen(PORT,() =>{
 console.log(`Server is running in  Port: ${PORT} `);
});

process.on("unhandledRejection", (err) => {
    console.error( `unhandledRejection Errors : ${err.name} | ${err.message}`);
    server.close(() => {
        console.error(`Shutting down....`);
      process.exit(1);  
    })
    
});