import App from './server/index';

App.listen(process.env.PORT || 8081, () => {
    console.log('run')
});