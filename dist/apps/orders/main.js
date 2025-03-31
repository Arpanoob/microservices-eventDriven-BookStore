/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/orders/src/entities/order.entity.ts":
/*!**************************************************!*\
  !*** ./apps/orders/src/entities/order.entity.ts ***!
  \**************************************************/
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
exports.OrderSchema = exports.Order = void 0;
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
let Order = class Order {
    orders;
    userId;
};
exports.Order = Order;
__decorate([
    (0, mongoose_1.Prop)({ type: [{ book: mongoose_2.Types.ObjectId, quantity: Number, _id: false }], ref: 'Book', required: true }),
    __metadata("design:type", Array)
], Order.prototype, "orders", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], Order.prototype, "userId", void 0);
exports.Order = Order = __decorate([
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
], Order);
exports.OrderSchema = mongoose_1.SchemaFactory.createForClass(Order);


/***/ }),

/***/ "./apps/orders/src/orders.controller.ts":
/*!**********************************************!*\
  !*** ./apps/orders/src/orders.controller.ts ***!
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
exports.OrdersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const orders_service_1 = __webpack_require__(/*! ./orders.service */ "./apps/orders/src/orders.service.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const create_order_dto_1 = __webpack_require__(/*! @app/contracts/orders/create-order.dto */ "./libs/contracts/src/orders/create-order.dto.ts");
const update_order_dto_1 = __webpack_require__(/*! @app/contracts/orders/update-order.dto */ "./libs/contracts/src/orders/update-order.dto.ts");
let OrdersController = class OrdersController {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async create(createOrderDto) {
        try {
            console.log(`Creating order: ${JSON.stringify(createOrderDto)}`);
            return await this.ordersService.create(createOrderDto);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async findAll() {
        try {
            return await this.ordersService.findAll();
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async findOne({ id }) {
        try {
            return await this.ordersService.findOne(id);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async update(updateOrderDto) {
        try {
            return await this.ordersService.update(updateOrderDto.id, updateOrderDto);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async remove({ id }) {
        try {
            return await this.ordersService.remove(id);
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
exports.OrdersController = OrdersController;
__decorate([
    (0, microservices_1.MessagePattern)('orders.create'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_order_dto_1.CreateOrderDto !== "undefined" && create_order_dto_1.CreateOrderDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)('orders.findAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)('orders.findOne'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)('orders.update'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof update_order_dto_1.UpdateOrderDto !== "undefined" && update_order_dto_1.UpdateOrderDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)('orders.remove'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "remove", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof orders_service_1.OrdersService !== "undefined" && orders_service_1.OrdersService) === "function" ? _a : Object])
], OrdersController);


/***/ }),

/***/ "./apps/orders/src/orders.module.ts":
/*!******************************************!*\
  !*** ./apps/orders/src/orders.module.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const orders_service_1 = __webpack_require__(/*! ./orders.service */ "./apps/orders/src/orders.service.ts");
const orders_controller_1 = __webpack_require__(/*! ./orders.controller */ "./apps/orders/src/orders.controller.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const order_entity_1 = __webpack_require__(/*! ./entities/order.entity */ "./apps/orders/src/entities/order.entity.ts");
const cache_manager_1 = __webpack_require__(/*! @nestjs/cache-manager */ "@nestjs/cache-manager");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const cache_manager_ioredis_yet_1 = __webpack_require__(/*! cache-manager-ioredis-yet */ "cache-manager-ioredis-yet");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
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
                { name: 'BOOKSTOCK_CLIENT', transport: microservices_1.Transport.TCP, options: { port: 3003 } },
                { name: 'USERS_CLIENT', transport: microservices_1.Transport.TCP, options: { port: 3001 } },
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
                            groupId: 'bookstore-consumer',
                        },
                    },
                },
                {
                    name: 'USERS_KAFKA_CLIENT',
                    transport: microservices_1.Transport.KAFKA,
                    options: {
                        client: {
                            brokers: ['localhost:9092'],
                        },
                        consumer: {
                            groupId: 'users-consumer',
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
            mongoose_1.MongooseModule.forFeature([{ name: order_entity_1.Order.name, schema: order_entity_1.OrderSchema }]),],
        controllers: [orders_controller_1.OrdersController],
        providers: [orders_service_1.OrdersService],
    })
], OrdersModule);


/***/ }),

/***/ "./apps/orders/src/orders.service.ts":
/*!*******************************************!*\
  !*** ./apps/orders/src/orders.service.ts ***!
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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const common_2 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const order_entity_1 = __webpack_require__(/*! ./entities/order.entity */ "./apps/orders/src/entities/order.entity.ts");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
let OrdersService = class OrdersService {
    orderModel;
    bookStockClient;
    userClient;
    BookStoreKafkaClient;
    UserKafkaClient;
    constructor(orderModel, bookStockClient, userClient, BookStoreKafkaClient, UserKafkaClient) {
        this.orderModel = orderModel;
        this.bookStockClient = bookStockClient;
        this.userClient = userClient;
        this.BookStoreKafkaClient = BookStoreKafkaClient;
        this.UserKafkaClient = UserKafkaClient;
    }
    async create(createOrderDto) {
        const { userId, orders } = createOrderDto;
        const stockCheckResults = await Promise.all(orders.map(order => (0, rxjs_1.firstValueFrom)(this.bookStockClient.send('bookStock.checkStock', { book: order.book, quantity: order.quantity }))));
        console.log("opopopoolololpoppo", createOrderDto);
        if (stockCheckResults.some(result => !result.available)) {
            throw new common_1.BadRequestException(`Insufficient stock for one or more books`);
        }
        await Promise.all(orders.map(order => this.bookStockClient.emit('bookStock.decreaseStock', { book: order.book, quantity: order.quantity })));
        const newOrder = new this.orderModel(createOrderDto);
        await newOrder.save();
        this.UserKafkaClient.emit('user.update', {
            userId,
            updateUserDto: { OwnBooks: orders.map(o => ({ book: o.book, quantity: o.quantity })) }
        });
        return newOrder;
    }
    async findAll() {
        return this.orderModel.find().populate('orders.book');
    }
    async findOne(id) {
        const order = await this.orderModel.findById(id);
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async update(id, updateOrderDto) {
        const updatedOrder = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true });
        if (!updatedOrder)
            throw new common_1.NotFoundException('Order not found');
        return updatedOrder;
    }
    async remove(id) {
        const order = await this.orderModel.findByIdAndDelete(id);
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return { message: 'Order deleted successfully' };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_entity_1.Order.name)),
    __param(1, (0, common_2.Inject)('BOOKSTOCK_CLIENT')),
    __param(2, (0, common_2.Inject)('USERS_CLIENT')),
    __param(3, (0, common_2.Inject)('BOOKSTORE_KAFKA_CLIENT')),
    __param(4, (0, common_2.Inject)('USERS_KAFKA_CLIENT')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _b : Object, typeof (_c = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _c : Object, typeof (_d = typeof microservices_1.ClientKafka !== "undefined" && microservices_1.ClientKafka) === "function" ? _d : Object, typeof (_e = typeof microservices_1.ClientKafka !== "undefined" && microservices_1.ClientKafka) === "function" ? _e : Object])
], OrdersService);


/***/ }),

/***/ "./libs/contracts/src/orders/create-order.dto.ts":
/*!*******************************************************!*\
  !*** ./libs/contracts/src/orders/create-order.dto.ts ***!
  \*******************************************************/
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
exports.CreateOrderDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const order_item_dto_1 = __webpack_require__(/*! ./order-item.dto */ "./libs/contracts/src/orders/order-item.dto.ts");
class CreateOrderDto {
    userId;
    orders;
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => order_item_dto_1.OrderItemDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "orders", void 0);


/***/ }),

/***/ "./libs/contracts/src/orders/order-item.dto.ts":
/*!*****************************************************!*\
  !*** ./libs/contracts/src/orders/order-item.dto.ts ***!
  \*****************************************************/
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
exports.OrderItemDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class OrderItemDto {
    book;
    quantity;
}
exports.OrderItemDto = OrderItemDto;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrderItemDto.prototype, "book", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "quantity", void 0);


/***/ }),

/***/ "./libs/contracts/src/orders/update-order.dto.ts":
/*!*******************************************************!*\
  !*** ./libs/contracts/src/orders/update-order.dto.ts ***!
  \*******************************************************/
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
exports.UpdateOrderDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const order_item_dto_1 = __webpack_require__(/*! ./order-item.dto */ "./libs/contracts/src/orders/order-item.dto.ts");
class UpdateOrderDto {
    id;
    userId;
    orders;
}
exports.UpdateOrderDto = UpdateOrderDto;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => order_item_dto_1.OrderItemDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateOrderDto.prototype, "orders", void 0);


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

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

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
/*!*********************************!*\
  !*** ./apps/orders/src/main.ts ***!
  \*********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const orders_module_1 = __webpack_require__(/*! ./orders.module */ "./apps/orders/src/orders.module.ts");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const SERVICE_NAME = 'order-service';
const SERVICE_IP = 'localhost';
const SERVICE_PORT = 3002;
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
        const app = await core_1.NestFactory.createMicroservice(orders_module_1.OrdersModule, {
            transport: microservices_1.Transport.TCP,
            options: { port: SERVICE_PORT },
        });
        await registerService();
        await app.listen();
        console.log(`🚀 Orders Microservice is running on port ${SERVICE_PORT}`);
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
        console.error(`❌ Failed to start Orders Microservice: ${error.message}`);
    }
}
bootstrap();

})();

/******/ })()
;