/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/books/src/books.controller.ts":
/*!********************************************!*\
  !*** ./apps/books/src/books.controller.ts ***!
  \********************************************/
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
exports.BooksController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const books_service_1 = __webpack_require__(/*! ./books.service */ "./apps/books/src/books.service.ts");
const create_book_dto_1 = __webpack_require__(/*! @app/contracts/books/create-book.dto */ "./libs/contracts/src/books/create-book.dto.ts");
const update_book_dto_1 = __webpack_require__(/*! @app/contracts/books/update-book.dto */ "./libs/contracts/src/books/update-book.dto.ts");
let BooksController = class BooksController {
    booksService;
    constructor(booksService) {
        this.booksService = booksService;
    }
    async create(createBookDto) {
        try {
            return await this.booksService.create(createBookDto);
        }
        catch (error) {
            console.error('Error creating book:', error);
            throw new common_1.InternalServerErrorException('Failed to create book');
        }
    }
    async findAll() {
        try {
            return await this.booksService.findAll();
        }
        catch (error) {
            console.error('Error fetching books:', error);
            throw new common_1.InternalServerErrorException('Failed to fetch books');
        }
    }
    async findOne({ id }) {
        try {
            return await this.booksService.findOne(id);
        }
        catch (error) {
            console.error(`Error fetching book with ID ${id}:`, error);
            throw new common_1.InternalServerErrorException(`Failed to fetch book with ID ${id}`);
        }
    }
    async update(updateBookDto) {
        try {
            return await this.booksService.update(updateBookDto.id, updateBookDto);
        }
        catch (error) {
            console.error(`Error updating book with ID ${updateBookDto.id}:`, error);
            throw new common_1.InternalServerErrorException(`Failed to update book with ID ${updateBookDto.id}`);
        }
    }
    async remove({ id }) {
        try {
            return await this.booksService.remove(id);
        }
        catch (error) {
            console.error(`Error deleting book with ID ${id}:`, error);
            throw new common_1.InternalServerErrorException(`Failed to delete book with ID ${id}`);
        }
    }
};
exports.BooksController = BooksController;
__decorate([
    (0, microservices_1.MessagePattern)('books.createBook'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_book_dto_1.CreateBookDto !== "undefined" && create_book_dto_1.CreateBookDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)('books.findAllBooks'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)('books.findOneBook'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)('books.updateBook'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof update_book_dto_1.UpdateBookDto !== "undefined" && update_book_dto_1.UpdateBookDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)('books.removeBook'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "remove", null);
exports.BooksController = BooksController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof books_service_1.BooksService !== "undefined" && books_service_1.BooksService) === "function" ? _a : Object])
], BooksController);


/***/ }),

/***/ "./apps/books/src/books.module.ts":
/*!****************************************!*\
  !*** ./apps/books/src/books.module.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BooksModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const books_service_1 = __webpack_require__(/*! ./books.service */ "./apps/books/src/books.service.ts");
const books_controller_1 = __webpack_require__(/*! ./books.controller */ "./apps/books/src/books.controller.ts");
const book_entity_1 = __webpack_require__(/*! ./entities/book.entity */ "./apps/books/src/entities/book.entity.ts");
const cache_manager_1 = __webpack_require__(/*! @nestjs/cache-manager */ "@nestjs/cache-manager");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const cache_manager_ioredis_yet_1 = __webpack_require__(/*! cache-manager-ioredis-yet */ "cache-manager-ioredis-yet");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let BooksModule = class BooksModule {
};
exports.BooksModule = BooksModule;
exports.BooksModule = BooksModule = __decorate([
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
            microservices_1.ClientsModule.register([
                {
                    name: 'BOOKSTORE_CLIENT',
                    transport: microservices_1.Transport.TCP,
                    options: { port: 3003 },
                },
            ]),
            microservices_1.ClientsModule.register([
                {
                    name: 'BOOKSTORE_KAFKA_CLIENT',
                    transport: microservices_1.Transport.KAFKA,
                    options: {
                        client: {
                            brokers: ['localhost:9092'],
                        },
                        consumer: {
                            groupId: 'bookstore-group',
                        },
                    },
                },
            ]),
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
            mongoose_1.MongooseModule.forFeature([{ name: book_entity_1.Book.name, schema: book_entity_1.BookSchema }]),],
        controllers: [books_controller_1.BooksController],
        providers: [books_service_1.BooksService],
    })
], BooksModule);


/***/ }),

/***/ "./apps/books/src/books.service.ts":
/*!*****************************************!*\
  !*** ./apps/books/src/books.service.ts ***!
  \*****************************************/
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
exports.BooksService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const book_entity_1 = __webpack_require__(/*! ./entities/book.entity */ "./apps/books/src/entities/book.entity.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let BooksService = class BooksService {
    bookModel;
    bookstoreClient;
    kafkaClient;
    constructor(bookModel, bookstoreClient, kafkaClient) {
        this.bookModel = bookModel;
        this.bookstoreClient = bookstoreClient;
        this.kafkaClient = kafkaClient;
    }
    async onModuleInit() {
        await this.kafkaClient.connect();
    }
    async create(createBookDto) {
        console.log("loooooooo", createBookDto);
        const book = new this.bookModel(createBookDto);
        this.kafkaClient.emit('bookStock.create', { book: book._id, stock: 0 });
        return await book.save();
    }
    async findAll() {
        return this.bookModel.find().exec();
    }
    async findOne(id) {
        const book = await this.bookModel.findById(id);
        if (!book)
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        return book;
    }
    async update(id, updateBookDto) {
        const book = await this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true });
        if (!book)
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        return book;
    }
    async remove(id) {
        const book = await this.bookModel.findByIdAndDelete(id);
        if (!book)
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        return { message: `Book with ID ${id} deleted successfully` };
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(book_entity_1.Book.name)),
    __param(1, (0, common_1.Inject)('BOOKSTORE_CLIENT')),
    __param(2, (0, common_1.Inject)('BOOKSTORE_KAFKA_CLIENT')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _b : Object, typeof (_c = typeof microservices_1.ClientKafka !== "undefined" && microservices_1.ClientKafka) === "function" ? _c : Object])
], BooksService);


/***/ }),

/***/ "./apps/books/src/entities/book.entity.ts":
/*!************************************************!*\
  !*** ./apps/books/src/entities/book.entity.ts ***!
  \************************************************/
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookSchema = exports.Book = void 0;
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
let Book = class Book extends mongoose_2.Document {
    title;
    author;
    price;
    description;
};
exports.Book = Book;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Book.prototype, "author", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Book.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Book.prototype, "description", void 0);
exports.Book = Book = __decorate([
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
], Book);
exports.BookSchema = mongoose_1.SchemaFactory.createForClass(Book);


/***/ }),

/***/ "./libs/contracts/src/books/book.dto.ts":
/*!**********************************************!*\
  !*** ./libs/contracts/src/books/book.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class BookDto {
    id;
    title;
    author;
    price;
    description;
}
exports.BookDto = BookDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BookDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BookDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BookDto.prototype, "author", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BookDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BookDto.prototype, "description", void 0);


/***/ }),

/***/ "./libs/contracts/src/books/create-book.dto.ts":
/*!*****************************************************!*\
  !*** ./libs/contracts/src/books/create-book.dto.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateBookDto = void 0;
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const book_dto_1 = __webpack_require__(/*! ./book.dto */ "./libs/contracts/src/books/book.dto.ts");
class CreateBookDto extends (0, mapped_types_1.OmitType)(book_dto_1.BookDto, ["id"]) {
}
exports.CreateBookDto = CreateBookDto;


/***/ }),

/***/ "./libs/contracts/src/books/update-book.dto.ts":
/*!*****************************************************!*\
  !*** ./libs/contracts/src/books/update-book.dto.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateBookDto = void 0;
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_book_dto_1 = __webpack_require__(/*! ./create-book.dto */ "./libs/contracts/src/books/create-book.dto.ts");
class UpdateBookDto extends (0, mapped_types_1.PartialType)(create_book_dto_1.CreateBookDto) {
    id;
}
exports.UpdateBookDto = UpdateBookDto;


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

/***/ "@nestjs/mapped-types":
/*!***************************************!*\
  !*** external "@nestjs/mapped-types" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@nestjs/mapped-types");

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

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

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
/*!********************************!*\
  !*** ./apps/books/src/main.ts ***!
  \********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const books_module_1 = __webpack_require__(/*! ./books.module */ "./apps/books/src/books.module.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const SERVICE_NAME = 'book-service';
const SERVICE_IP = 'localhost';
const SERVICE_PORT = 3004;
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
        const app = await core_1.NestFactory.createMicroservice(books_module_1.BooksModule, {
            transport: microservices_1.Transport.TCP,
            options: { port: SERVICE_PORT },
        });
        await registerService();
        await app.listen();
        console.log(`📚 Books Microservice is running on port ${SERVICE_PORT}`);
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
        console.error(`❌ Failed to start Books Microservice: ${error.message}`);
    }
}
bootstrap();

})();

/******/ })()
;