"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = __importDefault(require("./config/database"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const logger_1 = __importDefault(require("./config/logger"));
const accounts_routes_1 = __importDefault(require("./routes/accounts.routes"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
(0, db_1.default)();
class App {
    constructor() {
        this.db = new database_1.default();
        this.logStream = logger_1.default.logStream;
        this.logger = logger_1.default.logger;
        this.errorHandler = new error_middleware_1.default();
        this.app = (0, express_1.default)();
        this.host = process.env.APP_HOST;
        this.port = process.env.APP_PORT;
        this.api_version = process.env.API_VERSION;
        this.initializeMiddleWares();
        this.initializeRoutes();
        this.initializeDatabase();
        this.initializeErrorHandlers();
        this.startApp();
    }
    initializeMiddleWares() {
        this.app.use((0, cors_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use((0, morgan_1.default)('combined', { stream: this.logStream }));
    }
    initializeDatabase() {
        this.db.initializeDatabase();
    }
    initializeRoutes() {
        this.app.use(`/api/${this.api_version}`, (0, routes_1.default)());
        this.app.use(`/api/${this.api_version}`, accounts_routes_1.default);
        // this.app.use(`/api/${this.api_version}/a`, accountRoutes);
    }
    initializeErrorHandlers() {
        this.app.use(this.errorHandler.appErrorHandler);
        this.app.use(this.errorHandler.genericErrorHandler);
        this.app.use(this.errorHandler.notFound);
    }
    startApp() {
        this.app.listen(this.port, () => {
            this.logger.info(`Server started at ${this.host}:${this.port}/api/${this.api_version}/`);
        });
    }
    getApp() {
        return this.app;
    }
}
// Removed redundant app.use(express.json());
// app.use(accountRoutes);
const app = new App();
exports.default = app;
