import { loggerMiddleware as logger } from "./Logger/logger.js"
import bodyParser from 'body-parser';
import { authMiddleware as auth } from "./Auth/auth.js"
import expressip  from "express-ip"

export function setupMiddlewares(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(logger);
    app.use(expressip().getIpInfoMiddleware);
}
