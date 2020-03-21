import express from 'express';
import runLoaders from './loaders/index';
import log from './utils/winston';

const app = express();

const server = app.listen(
    app.get('port'),
    async (): Promise<void> => {
        app.set('port', process.env.PORT || 3000);
        await runLoaders(app);
        log.info(
            'App is running at http://localhost:%d in %s mode',
            app.get('port'),
            app.get('env')
        );
        log.info('Press CTRL-C to stop!\n');
    }
);

export default server;
