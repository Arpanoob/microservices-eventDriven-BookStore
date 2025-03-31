/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/users/src/entities/user.entities.ts":
/*!**************************************************!*\
  !*** ./apps/users/src/entities/user.entities.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
let User = class User extends mongoose_2.Document {
    email;
    password;
    name;
    role;
    OwnBooks;
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['user', 'admin'], default: 'user' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                book: { type: mongoose_2.Types.ObjectId, ref: 'Book', required: true },
                quantity: { type: Number, required: true, default: 1 },
            },
        ],
        default: [], _id: false, id: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "OwnBooks", void 0);
exports.User = User = __decorate([
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
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


/***/ }),

/***/ "./apps/users/src/users.controller.ts":
/*!********************************************!*\
  !*** ./apps/users/src/users.controller.ts ***!
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_service_1 = __webpack_require__(/*! ./users.service */ "./apps/users/src/users.service.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const create_user_dto_1 = __webpack_require__(/*! @app/contracts/users/create-user.dto */ "./libs/contracts/src/users/create-user.dto.ts");
const login_user_dto_1 = __webpack_require__(/*! @app/contracts/users/login-user.dto */ "./libs/contracts/src/users/login-user.dto.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let UsersController = class UsersController {
    usersService;
    configService;
    constructor(usersService, configService) {
        this.usersService = usersService;
        this.configService = configService;
    }
    async create(createUserDto) {
        try {
            return await this.usersService.create(createUserDto);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async login(loginUserDto) {
        try {
            console.log("hitted");
            return await this.usersService.login(loginUserDto);
        }
        catch (error) {
            console.log("login :", error);
            return this.handleException(error);
        }
    }
    async findAll() {
        try {
            return await this.usersService.findAll();
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async findOne({ userId }) {
        try {
            console.log("user : ", userId);
            console.log("Config", this.configService.get('REDIS_HOST'));
            return await this.usersService.findOne(userId);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async update(Payload) {
        try {
            const { userId, updateUserDto } = Payload;
            console.log("Updating user:", updateUserDto);
            return await this.usersService.update(userId, updateUserDto);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async delete({ userId }) {
        try {
            return await this.usersService.delete(userId);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async logout({ userId }) {
        try {
            return await this.usersService.logout(userId);
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
exports.UsersController = UsersController;
__decorate([
    (0, microservices_1.MessagePattern)('user.create'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof create_user_dto_1.CreateUserDto !== "undefined" && create_user_dto_1.CreateUserDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)('user.login'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof login_user_dto_1.LoginUserDto !== "undefined" && login_user_dto_1.LoginUserDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, microservices_1.MessagePattern)('user.findAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)('user.findOne'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.EventPattern)('user.update'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)('user.delete'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
__decorate([
    (0, microservices_1.MessagePattern)('user.logout'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logout", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], UsersController);


/***/ }),

/***/ "./apps/users/src/users.module.ts":
/*!****************************************!*\
  !*** ./apps/users/src/users.module.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cache_manager_1 = __webpack_require__(/*! @nestjs/cache-manager */ "@nestjs/cache-manager");
const users_controller_1 = __webpack_require__(/*! ./users.controller */ "./apps/users/src/users.controller.ts");
const users_service_1 = __webpack_require__(/*! ./users.service */ "./apps/users/src/users.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const user_entities_1 = __webpack_require__(/*! ./entities/user.entities */ "./apps/users/src/entities/user.entities.ts");
const inspector_1 = __webpack_require__(/*! inspector */ "inspector");
const cache_manager_ioredis_yet_1 = __webpack_require__(/*! cache-manager-ioredis-yet */ "cache-manager-ioredis-yet");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
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
                    inspector_1.console.log('🚀 MONGODB_URI:', mongoUri);
                    if (!mongoUri)
                        throw new Error('❌ MONGODB_URI is undefined!' + process.env.MONGODB_URI);
                    return { uri: mongoUri };
                }
            }),
            mongoose_1.MongooseModule.forFeature([{ name: user_entities_1.User.name, schema: user_entities_1.UserSchema }]),
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
    })
], UsersModule);


/***/ }),

/***/ "./apps/users/src/users.service.ts":
/*!*****************************************!*\
  !*** ./apps/users/src/users.service.ts ***!
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
const user_entities_1 = __webpack_require__(/*! ./entities/user.entities */ "./apps/users/src/entities/user.entities.ts");
const cache_manager_1 = __webpack_require__(/*! @nestjs/cache-manager */ "@nestjs/cache-manager");
const cache_manager_2 = __webpack_require__(/*! cache-manager */ "cache-manager");
let UsersService = class UsersService {
    userModel;
    cacheManager;
    constructor(userModel, cacheManager) {
        this.userModel = userModel;
        this.cacheManager = cacheManager;
    }
    async create(createUserDto) {
        const existingUser = await this.userModel.findOne({ email: createUserDto.email });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const user = new this.userModel(createUserDto);
        await user.save();
        await this.cacheManager.del(`user_${user._id}`);
        return { message: 'User created successfully', userId: user._id };
    }
    async login(loginUserDto) {
        console.log("token :en");
        const user = await this.userModel.findOne({ email: loginUserDto.email });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        console.log("token : ", token);
        return { token };
    }
    async findAll() {
        return this.userModel.find({}, { password: 0 }).exec();
    }
    async findOne(userId) {
        const cachedUser = await this.cacheManager.get(`user_${userId}`);
        console.log(cachedUser, "chahahahah");
        if (cachedUser) {
            console.log('Returning cached user');
            return cachedUser;
        }
        const user = await this.userModel.findById(userId, { password: 0 }).lean().exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.cacheManager.set(`user_${userId}`, user, 30000);
        return user;
    }
    async update(userId, updateUserDto) {
        console.log(userId, updateUserDto, "Before update");
        if (updateUserDto.email) {
            throw new Error("Email update is not allowed");
        }
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const new_bboks = updateUserDto.OwnBooks || [];
        user.OwnBooks.push(...new_bboks);
        const updatedUser = await user.save();
        console.log(updatedUser, "After update");
        await this.cacheManager.set(`user_${userId}`, updatedUser, 60000);
        return updatedUser;
    }
    async delete(userId) {
        const deletedUser = await this.userModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.cacheManager.del(`user_${userId}`);
        return { message: 'User deleted successfully' };
    }
    async logout(userId) {
        await this.cacheManager.del(`user_${userId}`);
        return { message: 'User logged out successfully' };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entities_1.User.name)),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof cache_manager_2.Cache !== "undefined" && cache_manager_2.Cache) === "function" ? _b : Object])
], UsersService);


/***/ }),

/***/ "./libs/contracts/src/users/create-user.dto.ts":
/*!*****************************************************!*\
  !*** ./libs/contracts/src/users/create-user.dto.ts ***!
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
exports.CreateUserDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateUserDto {
    name;
    email;
    password;
    OwnBooks;
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateUserDto.prototype, "OwnBooks", void 0);


/***/ }),

/***/ "./libs/contracts/src/users/login-user.dto.ts":
/*!****************************************************!*\
  !*** ./libs/contracts/src/users/login-user.dto.ts ***!
  \****************************************************/
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
exports.LoginUserDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class LoginUserDto {
    email;
    password;
}
exports.LoginUserDto = LoginUserDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);


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

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "cache-manager":
/*!********************************!*\
  !*** external "cache-manager" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cache-manager");

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

/***/ "inspector":
/*!****************************!*\
  !*** external "inspector" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("inspector");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

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
  !*** ./apps/users/src/main.ts ***!
  \********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const users_module_1 = __webpack_require__(/*! ./users.module */ "./apps/users/src/users.module.ts");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const SERVICE_NAME = 'user-service';
const SERVICE_IP = 'localhost';
const SERVICE_PORT = 3001;
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
        const app = await core_1.NestFactory.createMicroservice(users_module_1.UsersModule, {
            transport: microservices_1.Transport.TCP,
            options: { port: SERVICE_PORT },
        });
        const kafkaMicroservice = await core_1.NestFactory.createMicroservice(users_module_1.UsersModule, {
            transport: microservices_1.Transport.KAFKA,
            options: {
                client: {
                    brokers: ['localhost:9092'],
                },
                consumer: {
                    groupId: 'user-consumer',
                },
            },
        });
        await registerService();
        await Promise.all([app.listen(), kafkaMicroservice.listen()]);
        console.log(`🚀 Users Microservice (TCP) is running on port ${SERVICE_PORT}`);
        console.log(`📡 Users Microservice (Kafka) is connected to localhost:9092`);
        setInterval(sendHeartbeat, 15000);
        process.on('SIGINT', async () => {
            await deregisterService();
            await kafkaMicroservice.close();
            process.exit();
        });
        process.on('SIGTERM', async () => {
            await deregisterService();
            await kafkaMicroservice.close();
            process.exit();
        });
    }
    catch (error) {
        console.error(`❌ Failed to start Users Microservice: ${error.message}`);
    }
}
bootstrap();

})();

/******/ })()
;