"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./logger"));
class Database {
    constructor() {
        this.initializeDatabase = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(this.MONGO_URI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    retryWrites: true,
                    w: 'majority'
                });
                this.logger.info('Connected to the database.');
            }
            catch (error) {
                this.logger.error('Could not connect to the database.', error);
            }
        });
        this.MONGO_URI =
            process.env.NODE_ENV === 'test'
                ? process.env.MONGO_URI_PROD
                : process.env.MONGO_URI;
        this.logger = logger_1.default.logger;
    }
}
exports.default = Database;
