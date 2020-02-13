import express from 'express';
import runLoaders from './loaders/index';

const app = express();
app.set('port', process.env.PORT || 3000);
runLoaders(app);

app.listen(app.get('port'), () => {
    console.log(
        '  App is running at http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
    );
    console.log('  Press CTRL-C to stop!\n');
});

export default app;
