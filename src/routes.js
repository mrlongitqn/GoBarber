import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import authMiddleware from './app/middlewares/auth';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';

const routes = new Router();
const upload = multer(multerConfig);

/**
 * routes that don't need to authentication
 */
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

/**
 * Global middleware of authentication
 */
routes.use(authMiddleware);

/**
 * Routes that you have to be authenticated
 */
routes.put('/users', UserController.update);

routes.post('/appointments', AppointmentController.store);

routes.post('/files', upload.single('file'), FileController.store);
routes.get('/providers', ProviderController.index);

export default routes;
