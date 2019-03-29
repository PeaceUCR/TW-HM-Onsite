/**
 * Created by hea on 3/21/19.
 */
const express = require('express');
const path =  require('path');
const app = express();
const port = process.env.PORT || 3000;

//api is here
app.get('/api/data', (req, res) => {
    res.send([
        {
            url: 'bjstdmngbgr02.thoughtworks.com',
            status: 'idle',
            ip: '192.168.1.2',
            path:'/var/lib/cruise-agent',
            resources: ['ubuntu', 'firefox3', 'core-duo'],
            category: 'Physical'
        },
        {
            url: 'bjstdmngbgr03.thoughtworks.com',
            status: 'building',
            ip: '192.168.1.3',
            path:'/var/lib/cruise-agent',
            resources: ['ubuntu', 'firefox3', 'mysql', 'core-duo'],
            category: 'Virtual'
        },
        {
            url: 'bjstdmngbgr04.thoughtworks.com',
            status: 'building',
            ip: '192.168.1.4',
            path:'/var/lib/cruise-agent',
            resources: ['ubuntu', 'firefox3', 'mysql', 'core-duo'],
            category: 'Virtual'
        },
        {
            url: 'bjstdmngbgr05.thoughtworks.com',
            status: 'idle',
            ip: '192.168.1.5',
            path:'/var/lib/cruise-agent',
            resources: ['ubuntu'],
            category: 'Physical'
        }

    ]);
});


if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.resolve(__dirname, 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build/index.html'));
    });

}else{
    const middleware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.development.config.js');
    app.use(middleware(webpack(webpackConfig)));
    app.use(express.static(path.resolve(__dirname, 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build/index.html'));
    });
}



app.listen(port, () => console.log('Example app listening on port 3000!'));