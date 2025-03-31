/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/bookstore/src/app.controller.ts":
/*!**********************************************!*\
  !*** ./apps/bookstore/src/app.controller.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookStockController = void 0;
const create_bookstore_dto_1 = __webpack_require__(/*! @app/contracts/bookStore/create-bookstore.dto */ "./libs/contracts/src/bookStore/create-bookstore.dto.ts");
const update_bookstore_dto_1 = __webpack_require__(/*! @app/contracts/bookStore/update-bookstore.dto */ "./libs/contracts/src/bookStore/update-bookstore.dto.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./apps/bookstore/src/app.service.ts");
let BookStockController = class BookStockController {
    bookStockService;
    constructor(bookStockService) {
        this.bookStockService = bookStockService;
    }
    async create(createBookStockDto) {
        try {
            console.log(`Creating book stock: ${JSON.stringify(createBookStockDto)}`);
            return await this.bookStockService.create(createBookStockDto);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async findAll() {
        try {
            return await this.bookStockService.findAll();
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async findOne({ id }) {
        try {
            return await this.bookStockService.findOne(id);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async findStock({ id }) {
        try {
            return await this.bookStockService.findStock(id);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async update(updateBookStockDto) {
        try {
            return await this.bookStockService.update(updateBookStockDto);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async remove({ id }) {
        try {
            return await this.bookStockService.remove(id);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async checkStock({ book, quantity }) {
        try {
            console.log("inside bookStock : ", book, quantity);
            return await this.bookStockService.checkStock(book, quantity);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async decreaseStock({ book, quantity }) {
        try {
            console.log("hitten", book, quantity);
            return await this.bookStockService.decreaseStock(book, quantity);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async increaseStock({ bookId, quantity }) {
        try {
            return await this.bookStockService.increaseStock(bookId, quantity);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    handleException(error) {
        console.error("Error:", error);
        if (error instanceof common_1.BadRequestException) {
            return { status: 400, message: error.message };
        }
        else if (error instanceof common_1.UnauthorizedException) {
            return { status: 401, message: error.message };
        }
        else if (error instanceof common_1.NotFoundException) {
            return { status: 404, message: error.message };
        }
        else {
            return { status: 500, message: 'Internal Server Error' };
        }
    }
};
exports.BookStockController = BookStockController;
__decorate([
    (0, microservices_1.EventPattern)('bookStock.create'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_bookstore_dto_1.CreateBookStockDto !== "undefined" && create_bookstore_dto_1.CreateBookStockDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], BookStockController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)('bookStock.findAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookStockController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)('bookStock.findOne'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookStockController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)('bookStock.findStock'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookStockController.prototype, "findStock", null);
__decorate([
    (0, microservices_1.MessagePattern)('bookStock.update'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof update_bookstore_dto_1.UpdateBookStockDto !== "undefined" && update_bookstore_dto_1.UpdateBookStockDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], BookStockController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)('bookStock.remove'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookStockController.prototype, "remove", null);
__decorate([
    (0, microservices_1.MessagePattern)('bookStock.checkStock'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookStockController.prototype, "checkStock", null);
__decorate([
    (0, microservices_1.MessagePattern)('bookStock.decreaseStock'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookStockController.prototype, "decreaseStock", null);
__decorate([
    (0, microservices_1.MessagePattern)('bookStock.increaseStock'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookStockController.prototype, "increaseStock", null);
exports.BookStockController = BookStockController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.BookStockService !== "undefined" && app_service_1.BookStockService) === "function" ? _a : Object])
], BookStockController);


/***/ }),

/***/ "./apps/bookstore/src/app.module.ts":
/*!******************************************!*\
  !*** ./apps/bookstore/src/app.module.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookStoreModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const bookstore_entities_1 = __webpack_require__(/*! ./entities/bookstore.entities */ "./apps/bookstore/src/entities/bookstore.entities.ts");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./apps/bookstore/src/app.controller.ts");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./apps/bookstore/src/app.service.ts");
const cache_manager_1 = __webpack_require__(/*! @nestjs/cache-manager */ "@nestjs/cache-manager");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const cache_manager_ioredis_yet_1 = __webpack_require__(/*! cache-manager-ioredis-yet */ "cache-manager-ioredis-yet");
let BookStoreModule = class BookStoreModule {
};
exports.BookStoreModule = BookStoreModule;
exports.BookStoreModule = BookStoreModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: 'apps/users/.env',
            }),
            cache_manager_1.CacheModule.register({
                store: cache_manager_ioredis_yet_1.redisStore,
                host: 'localhost',
                port: 6379,
                ttl: 600,
            }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '1h' },
                }),
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    const mongoUri = configService.get('MONGODB_URI');
                    console.log('🚀 MONGODB_URI:', mongoUri);
                    if (!mongoUri)
                        throw new Error('❌ MONGODB_URI is undefined!' + process.env.MONGODB_URI);
                    return { uri: mongoUri };
                }
            }),
            mongoose_1.MongooseModule.forFeature([{ name: bookstore_entities_1.BookStock.name, schema: bookstore_entities_1.BookStockSchema },
            ])],
        controllers: [app_controller_1.BookStockController],
        providers: [app_service_1.BookStockService],
    })
], BookStoreModule);


/***/ }),

/***/ "./apps/bookstore/src/app.service.ts":
/*!*******************************************!*\
  !*** ./apps/bookstore/src/app.service.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookStockService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const bookstore_entities_1 = __webpack_require__(/*! ./entities/bookstore.entities */ "./apps/bookstore/src/entities/bookstore.entities.ts");
let BookStockService = class BookStockService {
    bookStockModel;
    constructor(bookStockModel) {
        this.bookStockModel = bookStockModel;
    }
    async create(createBookStockDto) {
        const newBookStock = new this.bookStockModel(createBookStockDto);
        return await newBookStock.save();
    }
    async findAll() {
        return await this.bookStockModel.find();
    }
    async findOne(id) {
        const bookStock = await this.bookStockModel.findById(id);
        if (!bookStock)
            throw new common_1.NotFoundException(`BookStock with ID ${id} not found`);
        return bookStock;
    }
    async findStock(id) {
        const bookStock = await this.bookStockModel.findOne({ book: id });
        if (!bookStock)
            throw new common_1.NotFoundException(`Book with ID ${id} not found in bookstock`);
        return bookStock;
    }
    async update(updateBookStockDto) {
        const updatedBookStock = await this.bookStockModel.findByIdAndUpdate(updateBookStockDto.id, { stock: updateBookStockDto.stock }, { new: true });
        if (!updatedBookStock)
            throw new common_1.NotFoundException(`BookStock with ID ${updateBookStockDto.id} not found`);
        return updatedBookStock;
    }
    async remove(id) {
        const deletedBookStock = await this.bookStockModel.findByIdAndDelete(id);
        if (!deletedBookStock)
            throw new common_1.NotFoundException(`BookStock with ID ${id} not found`);
        return { message: `BookStock with ID ${id} deleted`, deletedBookStock };
    }
    async checkStock(bookId, quantity) {
        const bookStock = await this.bookStockModel.findOne({ book: bookId });
        if (!bookStock) {
            return { available: false, message: `Book with ID ${bookId} not found in stock` };
        }
        if (bookStock.stock < quantity) {
            return { available: false, message: `Insufficient stock for book ${bookId}` };
        }
        return { available: true, message: `Stock available for book ${bookId}` };
    }
    async decreaseStock(bookId, quantity) {
        const bookStock = await this.bookStockModel.findOne({ book: bookId });
        if (!bookStock) {
            return { success: false, message: `Book with ID ${bookId} not found in stock` };
        }
        if (bookStock.stock < quantity) {
            return { success: false, message: `Insufficient stock for book ${bookId}` };
        }
        bookStock.stock -= quantity;
        await bookStock.save();
        return { success: true, message: `Stock reduced for book ${bookId}` };
    }
    async increaseStock(bookId, quantity) {
        console.log("insideeee,", bookId, quantity);
        const bookStock = await this.bookStockModel.findOne({ book: bookId });
        if (!bookStock)
            throw new common_1.NotFoundException(`Book with ID ${bookId} not found`);
        bookStock.stock += +quantity;
        const a = await bookStock.save();
        return { message: `Stock increased by ${quantity} for book ID ${bookId}` };
    }
};
exports.BookStockService = BookStockService;
exports.BookStockService = BookStockService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bookstore_entities_1.BookStock.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], BookStockService);


/***/ }),

/***/ "./apps/bookstore/src/entities/bookstore.entities.ts":
/*!***********************************************************!*\
  !*** ./apps/bookstore/src/entities/bookstore.entities.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookStockSchema = exports.BookStock = void 0;
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
let BookStock = class BookStock {
    book;
    stock;
};
exports.BookStock = BookStock;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Book', required: true }),
    __metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], BookStock.prototype, "book", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], BookStock.prototype, "stock", void 0);
exports.BookStock = BookStock = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
        toObject: { virtuals: true },
    })
], BookStock);
exports.BookStockSchema = mongoose_1.SchemaFactory.createForClass(BookStock);


/***/ }),

/***/ "./libs/contracts/src/bookStore/create-bookstore.dto.ts":
/*!**************************************************************!*\
  !*** ./libs/contracts/src/bookStore/create-bookstore.dto.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateBookStockDto = void 0;
class CreateBookStockDto {
    book;
    stock;
}
exports.CreateBookStockDto = CreateBookStockDto;


/***/ }),

/***/ "./libs/contracts/src/bookStore/update-bookstore.dto.ts":
/*!**************************************************************!*\
  !*** ./libs/contracts/src/bookStore/update-bookstore.dto.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateBookStockDto = void 0;
class UpdateBookStockDto {
    id;
    stock;
}
exports.UpdateBookStockDto = UpdateBookStockDto;


/***/ }),

/***/ "@nestjs/cache-manager":
/*!****************************************!*\
  !*** external "@nestjs/cache-manager" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/cache-manager");

/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/mongoose":
/*!***********************************!*\
  !*** external "@nestjs/mongoose" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),

/***/ "cache-manager-ioredis-yet":
/*!********************************************!*\
  !*** external "cache-manager-ioredis-yet" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("cache-manager-ioredis-yet");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!************************************!*\
  !*** ./apps/bookstore/src/main.ts ***!
  \************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/bookstore/src/app.module.ts");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const SERVICE_NAME = 'bookstore-service';
const SERVICE_IP = 'localhost';
const SERVICE_PORT = 3003;
const SERVICE_REGISTRY_TCP_PORT = 4000;
const registryClient = microservices_1.ClientProxyFactory.create({
    transport: microservices_1.Transport.TCP,
    options: { host: 'localhost', port: SERVICE_REGISTRY_TCP_PORT },
});
async function registerService() {
    try {
        console.log("🔗 Registering with Service Registry...");
        const response = await (0, rxjs_1.firstValueFrom)(registryClient.send('register', {
            name: SERVICE_NAME,
            ip: SERVICE_IP,
            port: SERVICE_PORT,
        }));
        console.log(`✅ Registered: ${response.message}`);
    }
    catch (error) {
        console.error(`❌ Failed to register: ${error.message}`);
    }
}
async function sendHeartbeat() {
    try {
        console.log("💓 Sending heartbeat...");
        const response = await (0, rxjs_1.firstValueFrom)(registryClient.send('heartbeat', { name: SERVICE_NAME }));
        console.log(response.message);
    }
    catch (error) {
        console.error(`❌ Heartbeat failed: ${error.message}`);
    }
}
async function deregisterService() {
    try {
        console.log("❌ Deregistering from Service Registry...");
        await (0, rxjs_1.firstValueFrom)(registryClient.send('deregister', { name: SERVICE_NAME }));
        console.log(`✅ ${SERVICE_NAME} deregistered.`);
    }
    catch (error) {
        console.error(`⚠️ Deregistration failed: ${error.message}`);
    }
}
async function bootstrap() {
    try {
        const tcpMicroservice = await core_1.NestFactory.createMicroservice(app_module_1.BookStoreModule, {
            transport: microservices_1.Transport.TCP,
            options: { port: SERVICE_PORT },
        });
        const kafkaMicroservice = await core_1.NestFactory.createMicroservice(app_module_1.BookStoreModule, {
            transport: microservices_1.Transport.KAFKA,
            options: {
                client: {
                    brokers: ['localhost:9092'],
                },
                consumer: {
                    groupId: 'book-store-consumer',
                },
            },
        });
        await registerService();
        await tcpMicroservice.listen();
        await kafkaMicroservice.listen();
        console.log('📡 BookStore Microservice is running on:');
        console.log(`🚀 TCP transport on port ${SERVICE_PORT}`);
        console.log('🔥 Kafka consumer listening to events');
        setInterval(sendHeartbeat, 15000);
        process.on('SIGINT', async () => {
            await deregisterService();
            process.exit();
        });
        process.on('SIGTERM', async () => {
            await deregisterService();
            process.exit();
        });
    }
    catch (error) {
        console.error(`❌ Failed to start BookStore Microservice: ${error.message}`);
    }
}
bootstrap();

})();

/******/ })()
;