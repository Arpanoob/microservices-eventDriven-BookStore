/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookstoreApiGatewayModule = void 0;
const common_1 = __webpack_require__(3);
const bookstore_api_gateway_controller_1 = __webpack_require__(4);
const bookstore_api_gateway_service_1 = __webpack_require__(5);
const users_module_1 = __webpack_require__(16);
const books_module_1 = __webpack_require__(31);
const config_1 = __webpack_require__(26);
const auth_module_1 = __webpack_require__(27);
const orders_module_1 = __webpack_require__(38);
const bookstore_module_1 = __webpack_require__(45);
const microservices_1 = __webpack_require__(6);
const jwt_1 = __webpack_require__(14);
let BookstoreApiGatewayModule = class BookstoreApiGatewayModule {
};
exports.BookstoreApiGatewayModule = BookstoreApiGatewayModule;
exports.BookstoreApiGatewayModule = BookstoreApiGatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'SERVICE_REGISTRY',
                    transport: microservices_1.Transport.TCP,
                    options: { host: 'localhost', port: 4000 },
                },
            ]),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    console.log("secrests : ", configService.get('JWT_SECRET'));
                    return {
                        secret: configService.get('JWT_SECRET'),
                        signOptions: { expiresIn: '1h' },
                    };
                },
            }),
            users_module_1.UsersModule,
            books_module_1.BooksModule,
            auth_module_1.AuthModule,
            orders_module_1.OrdersModule,
            bookstore_module_1.BookstoreModule
        ],
        controllers: [bookstore_api_gateway_controller_1.BookstoreApiGatewayController],
        providers: [bookstore_api_gateway_service_1.BookstoreApiGatewayService],
    })
], BookstoreApiGatewayModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
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
exports.BookstoreApiGatewayController = void 0;
const common_1 = __webpack_require__(3);
const bookstore_api_gateway_service_1 = __webpack_require__(5);
const dynamicRoute_roleGuard_1 = __webpack_require__(8);
const dynamic_roles_decorator_1 = __webpack_require__(9);
const dynamic_route_authguard_1 = __webpack_require__(13);
const exclude_decorator_1 = __webpack_require__(11);
const request_interface_1 = __webpack_require__(15);
let BookstoreApiGatewayController = class BookstoreApiGatewayController {
    gatewayService;
    constructor(gatewayService) {
        this.gatewayService = gatewayService;
    }
    async forwardDynamicRequest(serviceName, path, query, body, req) {
        try {
            const basePath = `/gateway/${serviceName}/`;
            const extractedPath = req?.divertUrl?.replace(basePath, '') || req?.originalUrl?.replace(basePath, '');
            const customParams = req.customParams ?? {};
            console.log("inside controller", query, body, customParams);
            const { data } = await this.gatewayService.forwardRequest(serviceName, extractedPath, req.method, { ...query, ...customParams, ...body });
            return {
                status: common_1.HttpStatus.OK,
                message: "Sucesss",
                data
            };
        }
        catch (error) {
            return {
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: "Internal Server Error",
            };
        }
    }
};
exports.BookstoreApiGatewayController = BookstoreApiGatewayController;
__decorate([
    (0, exclude_decorator_1.ExcludeEndPoints)({ method: "POST", url: "/gateway/user-service/user/create" }, { method: "POST", url: "/gateway/user-service/user/login" }),
    (0, dynamic_roles_decorator_1.Roles)({ role: ["admin", "user"], endpoint: "/user/create", method: "GET" }, { role: ["admin", "user"], endpoint: "/user/findOne/:userId", method: "GET" }, { role: ["admin", "user"], endpoint: "/user/update/:userId", method: "PATCH" }, { role: ["admin"], endpoint: "/user/delete/:userId", method: "DELETE" }, { role: ["admin", "user"], endpoint: "/orders/create", method: "POST" }, { role: ["admin", "user"], endpoint: "/user/logout", method: "POST" }, { role: ["admin", "user"], endpoint: "/books/createBook", method: "POST" }, { role: ["admin", "user"], endpoint: "/books/findAllBooks", method: "GET" }, { role: ["admin", "user"], endpoint: "/books/findOneBook/:id", method: "GET" }, { role: ["admin", "user"], endpoint: "/books/updateBook/:id", method: "PATCH" }, { role: ["admin"], endpoint: "/books/removeBook/:id", method: "DELETE" }, { role: ["admin", "user"], endpoint: "/bookStock/create", method: "POST" }, { role: ["admin", "user"], endpoint: "/bookStock/findOne/:id", method: "GET" }, { role: ["admin", "user"], endpoint: "/bookStock/checkStock/:book", method: "GET" }, { role: ["admin", "user"], endpoint: "/bookStock/findStock/:id", method: "GET" }, { role: ["admin", "user"], endpoint: "/bookStock/update/:id", method: "PATCH" }, { role: ["user"], endpoint: "/bookStock/remove/:id", method: "DELETE" }, { role: ["admin"], endpoint: "/bookstock/:id/check-stock/:quantity", method: "GET" }, { role: ["admin"], endpoint: "/bookStock/:book/decreaseStock/:quantity", method: "PATCH" }, { role: ["admin"], endpoint: "/bookStock/:bookId/increaseStock/:quantity", method: "PATCH" }, { role: ["admin", "user"], endpoint: "/orders/create", method: "POST" }, { role: ["admin", "user"], endpoint: "/orders/findAll", method: "GET" }, { role: ["admin", "user"], endpoint: "/orders/findOne/:id", method: "GET" }, { role: ["admin", "user"], endpoint: "/orders/update/:id", method: "PATCH" }, { role: ["user"], endpoint: "/orders/remove/:id", method: "DELETE" }),
    (0, common_1.UseGuards)(dynamic_route_authguard_1.Dynamic_JwtAuthGuard, dynamicRoute_roleGuard_1.DynamicRolesGuard),
    (0, common_1.All)(':serviceName/*'),
    __param(0, (0, common_1.Param)('serviceName')),
    __param(1, (0, common_1.Param)('*')),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object, typeof (_b = typeof request_interface_1.AuthReq !== "undefined" && request_interface_1.AuthReq) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], BookstoreApiGatewayController.prototype, "forwardDynamicRequest", null);
exports.BookstoreApiGatewayController = BookstoreApiGatewayController = __decorate([
    (0, common_1.Controller)('gateway'),
    __metadata("design:paramtypes", [typeof (_a = typeof bookstore_api_gateway_service_1.BookstoreApiGatewayService !== "undefined" && bookstore_api_gateway_service_1.BookstoreApiGatewayService) === "function" ? _a : Object])
], BookstoreApiGatewayController);


/***/ }),
/* 5 */
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
exports.BookstoreApiGatewayService = void 0;
const common_1 = __webpack_require__(3);
const microservices_1 = __webpack_require__(6);
const rxjs_1 = __webpack_require__(7);
let BookstoreApiGatewayService = class BookstoreApiGatewayService {
    serviceRegistry;
    constructor(serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }
    getHello() {
        return 'Hello World!';
    }
    async forwardRequest(serviceName, path, method, data) {
        console.log("Pattern : ", path, data);
        const pattern = this.pathToPattern(path);
        console.log("Pattern : ", pattern, data);
        const client = await this.getClientProxy(serviceName);
        try {
            return { data: await (0, rxjs_1.lastValueFrom)(client.send(pattern, data)) };
        }
        catch (error) {
            throw new Error(`Error forwarding request: ${error.message}`);
        }
    }
    pathToPattern(str) {
        if (str.startsWith('/')) {
            str = str.slice(1);
        }
        return str.replace(/\//g, '.');
    }
    async getClientProxy(serviceName) {
        const service = await (0, rxjs_1.lastValueFrom)(this.serviceRegistry.send("registry.discover", serviceName));
        if (!service) {
            throw new Error(`Service ${serviceName} not found.`);
        }
        console.log(`Creating new ClientProxy for ${serviceName} at ${service.ip}:${service.port}`);
        const client = microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.TCP,
            options: {
                host: service.ip,
                port: service.port,
            },
        });
        return client;
    }
};
exports.BookstoreApiGatewayService = BookstoreApiGatewayService;
exports.BookstoreApiGatewayService = BookstoreApiGatewayService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SERVICE_REGISTRY')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], BookstoreApiGatewayService);


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 8 */
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
exports.DynamicRolesGuard = void 0;
const common_1 = __webpack_require__(3);
const core_1 = __webpack_require__(1);
const dynamic_roles_decorator_1 = __webpack_require__(9);
const path_to_regexp_1 = __webpack_require__(10);
const exclude_decorator_1 = __webpack_require__(11);
const url_1 = __webpack_require__(12);
let DynamicRolesGuard = class DynamicRolesGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        console.log("Enterred in Role Gaurd");
        const request = context.switchToHttp().getRequest();
        const roleDataArray = this.reflector.get(dynamic_roles_decorator_1.ROLES_KEY, context.getHandler());
        const excludedRoutes = this.reflector.get(exclude_decorator_1.EXCLUDE_ENDPOINTS, context.getHandler());
        const { user, method, url, params } = request;
        const isExcluded = excludedRoutes.some(route => {
            const routeMatcher = (0, path_to_regexp_1.match)(route.url, { decode: decodeURIComponent });
            return route.method === method && routeMatcher(url);
        });
        if (isExcluded) {
            return true;
        }
        if (!roleDataArray || roleDataArray.length === 0) {
            return false;
        }
        const tobe = (0, path_to_regexp_1.match)("/users/:id/:io", { decode: decodeURIComponent });
        if (!user || !user.role) {
            throw new common_1.ForbiddenException('Access Denied');
        }
        let requestPath = request.originalUrl;
        requestPath = requestPath.replace("/gateway/" + params.serviceName, "");
        console.log('User Role:', user.role);
        console.log('Request Path:', requestPath);
        console.log('Allowed Roles & Endpoints:', roleDataArray);
        const isAuthorized = roleDataArray.some((roleData) => {
            const routeMatcher = (0, path_to_regexp_1.match)(roleData.endpoint, { decode: decodeURIComponent });
            console.log(roleData.endpoint, requestPath);
            const parsedUrl = (0, url_1.parse)(requestPath, true);
            const requestPathWithoutQuery = parsedUrl.pathname;
            const result = routeMatcher(requestPathWithoutQuery);
            if (!result) {
                return false;
            }
            request.customParams = result?.params;
            request.divertUrl = request.originalUrl;
            if (request.customParams) {
                const basePath = roleData.endpoint
                    .replace(/:\w+/g, '')
                    .replace(/\/+/g, '/')
                    .replace(/\/$/, '');
                request.divertUrl = basePath;
                console.log(basePath, " is base path", result);
            }
            console.log("====+=====++===", request.customParams, result, roleData.endpoint, requestPath);
            return roleData.role.includes(user.role) && method === roleData.method;
        });
        if (!isAuthorized) {
            throw new common_1.ForbiddenException('Insufficient permissions');
        }
        return true;
    }
};
exports.DynamicRolesGuard = DynamicRolesGuard;
exports.DynamicRolesGuard = DynamicRolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], DynamicRolesGuard);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(3);
exports.ROLES_KEY = 'roles';
const Roles = (...roleData) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roleData);
exports.Roles = Roles;


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("path-to-regexp");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExcludeEndPoints = exports.EXCLUDE_ENDPOINTS = void 0;
const common_1 = __webpack_require__(3);
exports.EXCLUDE_ENDPOINTS = 'exclude_endpoints';
const ExcludeEndPoints = (...endpoints) => (0, common_1.SetMetadata)(exports.EXCLUDE_ENDPOINTS, endpoints);
exports.ExcludeEndPoints = ExcludeEndPoints;


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("url");

/***/ }),
/* 13 */
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Dynamic_JwtAuthGuard = void 0;
const common_1 = __webpack_require__(3);
const core_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(14);
const exclude_decorator_1 = __webpack_require__(11);
const path_to_regexp_1 = __webpack_require__(10);
let Dynamic_JwtAuthGuard = class Dynamic_JwtAuthGuard {
    jwtService;
    reflector;
    constructor(jwtService, reflector) {
        this.jwtService = jwtService;
        this.reflector = reflector;
    }
    canActivate(context) {
        try {
            const request = context.switchToHttp().getRequest();
            const excludedRoutes = this.reflector.get(exclude_decorator_1.EXCLUDE_ENDPOINTS, context.getHandler());
            const { method, url } = request;
            const { token } = request.cookies;
            console.log('Cookies:', request.cookies);
            console.log('Request Method:', method);
            console.log('Request URL:', url);
            console.log('Excluded Routes:', excludedRoutes);
            const isExcluded = excludedRoutes.some(route => {
                const routeMatcher = (0, path_to_regexp_1.match)(route.url, { decode: decodeURIComponent });
                console.log('Token1:', route.url, route.method, routeMatcher(url), method, url, url === route.url);
                return route.method === method && routeMatcher(url);
            });
            if (isExcluded) {
                return true;
            }
            if (!token) {
                throw new common_1.UnauthorizedException('No token provided');
            }
            console.log('Token is this:', token);
            const decoded = this.jwtService.verify(token);
            request.user = decoded;
            console.log('Decoded Token:', decoded);
            return true;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.Dynamic_JwtAuthGuard = Dynamic_JwtAuthGuard;
exports.Dynamic_JwtAuthGuard = Dynamic_JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _b : Object])
], Dynamic_JwtAuthGuard);


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(3);
const users_service_1 = __webpack_require__(17);
const users_controller_1 = __webpack_require__(18);
const microservices_1 = __webpack_require__(6);
const config_1 = __webpack_require__(26);
const auth_module_1 = __webpack_require__(27);
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
            microservices_1.ClientsModule.register([
                {
                    name: 'USERS_CLIENT',
                    transport: microservices_1.Transport.TCP,
                    options: { port: 3001 },
                },
            ]), auth_module_1.AuthModule,
        ],
        providers: [users_service_1.UsersService],
        controllers: [users_controller_1.UsersController],
    })
], UsersModule);


/***/ }),
/* 17 */
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
exports.UsersService = void 0;
const common_1 = __webpack_require__(3);
const microservices_1 = __webpack_require__(6);
const rxjs_1 = __webpack_require__(7);
let UsersService = class UsersService {
    userClient;
    constructor(userClient) {
        this.userClient = userClient;
    }
    create(createUser) {
        return (0, rxjs_1.firstValueFrom)(this.userClient.send('user.create', createUser));
    }
    async login(loginDto) {
        return await (0, rxjs_1.firstValueFrom)(this.userClient.send('user.login', loginDto));
    }
    findAll() {
        return (0, rxjs_1.firstValueFrom)(this.userClient.send('user.findAll', {}));
    }
    findOne(userId) {
        return (0, rxjs_1.firstValueFrom)(this.userClient.send('user.findOne', { userId }));
    }
    update(userId, updateUserDto) {
        console.log(userId, updateUserDto, "okok");
        return (0, rxjs_1.firstValueFrom)(this.userClient.send('user.update', { userId, updateUserDto }));
    }
    delete(userId) {
        return (0, rxjs_1.firstValueFrom)(this.userClient.send('user.delete', { userId }));
    }
    logout() {
        return { message: 'User logged out successfully' };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USERS_CLIENT')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], UsersService);


/***/ }),
/* 18 */
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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(3);
const users_service_1 = __webpack_require__(17);
const create_user_dto_1 = __webpack_require__(19);
const express_1 = __webpack_require__(21);
const auth_guards_1 = __webpack_require__(22);
const login_user_dto_1 = __webpack_require__(23);
const roles_decorator_1 = __webpack_require__(24);
const role_gaurds_1 = __webpack_require__(25);
let UsersController = class UsersController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async create(createUser) {
        try {
            return await this.userService.create(createUser);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async login(loginDto, res) {
        try {
            const { token } = await this.userService.login(loginDto);
            if (!token) {
                return res.status(401).send({ message: 'Invalid credentials' });
            }
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            });
            return res.send({ message: 'Login successful', accessToken: token });
        }
        catch (error) {
            return res.status(500).send(this.handleException(error));
        }
    }
    async findAll() {
        try {
            return await this.userService.findAll();
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async findOne(userId) {
        try {
            return await this.userService.findOne(userId);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async update(userId, updateUserDto) {
        try {
            return await this.userService.update(userId, updateUserDto);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async delete(userId) {
        try {
            return await this.userService.delete(userId);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async logout(res) {
        try {
            res.cookie('Authentication', '', { expires: new Date(0) });
            return res.send({ message: 'Logged out successfully' });
        }
        catch (error) {
            return res.status(500).send(this.handleException(error));
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
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_user_dto_1.CreateUserDto !== "undefined" && create_user_dto_1.CreateUserDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof login_user_dto_1.LoginUserDto !== "undefined" && login_user_dto_1.LoginUserDto) === "function" ? _c : Object, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, roles_decorator_1.Roles)("admin", "user"),
    (0, common_1.UseGuards)(auth_guards_1.JwtAuthGuard, role_gaurds_1.RolesGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)("admin", "user"),
    (0, common_1.UseGuards)(auth_guards_1.JwtAuthGuard, role_gaurds_1.RolesGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)("admin", "user"),
    (0, common_1.UseGuards)(auth_guards_1.JwtAuthGuard, role_gaurds_1.RolesGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof Partial !== "undefined" && Partial) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)("admin"),
    (0, common_1.UseGuards)(auth_guards_1.JwtAuthGuard, role_gaurds_1.RolesGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
__decorate([
    (0, roles_decorator_1.Roles)("admin", "user"),
    (0, common_1.UseGuards)(auth_guards_1.JwtAuthGuard, role_gaurds_1.RolesGuard),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logout", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);


/***/ }),
/* 19 */
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
const class_validator_1 = __webpack_require__(20);
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
/* 20 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 22 */
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(3);
const core_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(14);
let JwtAuthGuard = class JwtAuthGuard {
    jwtService;
    reflector;
    constructor(jwtService, reflector) {
        this.jwtService = jwtService;
        this.reflector = reflector;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        console.log(request.cookies);
        const { token } = request.cookies;
        if (!token) {
            throw new common_1.UnauthorizedException('No token provided');
        }
        console.log(token);
        try {
            const decoded = this.jwtService.verify(token);
            request.user = decoded;
            console.log("fdecoded", decoded);
            return true;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _b : Object])
], JwtAuthGuard);


/***/ }),
/* 23 */
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
const class_validator_1 = __webpack_require__(20);
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
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(3);
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),
/* 25 */
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
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(3);
const core_1 = __webpack_require__(1);
const roles_decorator_1 = __webpack_require__(24);
let RolesGuard = class RolesGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        const requiredRoles = this.reflector.get(roles_decorator_1.ROLES_KEY, context.getHandler());
        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log("opuser", user);
        if (!user || !user.role) {
            throw new common_1.ForbiddenException('Access Denied');
        }
        const hasRole = requiredRoles.includes(user.role);
        if (!hasRole) {
            throw new common_1.ForbiddenException('Insufficient permissions');
        }
        return true;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ }),
/* 26 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(3);
const jwt_1 = __webpack_require__(14);
const passport_1 = __webpack_require__(28);
const config_1 = __webpack_require__(26);
const jwt_strategy_1 = __webpack_require__(29);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: 'apps/users/.env',
            }),
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    console.log("secrests : ", configService.get('JWT_SECRET'));
                    return {
                        secret: configService.get('JWT_SECRET'),
                        signOptions: { expiresIn: '1h' },
                    };
                },
            }),
        ],
        providers: [jwt_strategy_1.JwtStrategy, jwt_1.JwtService],
        exports: [jwt_1.JwtModule, jwt_1.JwtService],
    })
], AuthModule);


/***/ }),
/* 28 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 29 */
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
exports.JwtStrategy = void 0;
const common_1 = __webpack_require__(3);
const passport_1 = __webpack_require__(28);
const passport_jwt_1 = __webpack_require__(30);
const config_1 = __webpack_require__(26);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    configService;
    constructor(configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    return request?.cookies?.Authentication || null;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET') || "op",
        });
        this.configService = configService;
    }
    async validate(payload) {
        if (!payload) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        return { userId: payload.userId, email: payload.email, role: payload.role };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], JwtStrategy);


/***/ }),
/* 30 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BooksModule = void 0;
const common_1 = __webpack_require__(3);
const books_service_1 = __webpack_require__(32);
const books_controller_1 = __webpack_require__(33);
const microservices_1 = __webpack_require__(6);
const config_1 = __webpack_require__(26);
const auth_module_1 = __webpack_require__(27);
let BooksModule = class BooksModule {
};
exports.BooksModule = BooksModule;
exports.BooksModule = BooksModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: 'apps/users/.env',
            }),
            microservices_1.ClientsModule.register([
                {
                    name: "BOOKS_CLIENT",
                    transport: microservices_1.Transport.TCP,
                    options: {
                        port: 3004
                    }
                }
            ])
        ],
        controllers: [books_controller_1.BooksController],
        providers: [books_service_1.BooksService],
    })
], BooksModule);


/***/ }),
/* 32 */
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
exports.BooksService = void 0;
const common_1 = __webpack_require__(3);
const microservices_1 = __webpack_require__(6);
const rxjs_1 = __webpack_require__(7);
let BooksService = class BooksService {
    booksClient;
    constructor(booksClient) {
        this.booksClient = booksClient;
    }
    create(createBookDto) {
        return (0, rxjs_1.firstValueFrom)(this.booksClient.send("books.createBook", createBookDto));
    }
    findAll() {
        return (0, rxjs_1.firstValueFrom)(this.booksClient.send("books.findAllBooks", {}));
    }
    findOne(id) {
        return (0, rxjs_1.firstValueFrom)(this.booksClient.send("books.findOneBook", id));
    }
    update(id, updateBookDto) {
        return (0, rxjs_1.firstValueFrom)(this.booksClient.send("books.updateBook", { ...updateBookDto }));
    }
    remove(id) {
        return (0, rxjs_1.firstValueFrom)(this.booksClient.send("books.removeBook", id));
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("BOOKS_CLIENT")),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], BooksService);


/***/ }),
/* 33 */
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
var BooksController_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BooksController = void 0;
const common_1 = __webpack_require__(3);
const books_service_1 = __webpack_require__(32);
const create_book_dto_1 = __webpack_require__(34);
const update_book_dto_1 = __webpack_require__(37);
const roles_decorator_1 = __webpack_require__(24);
const auth_guards_1 = __webpack_require__(22);
const role_gaurds_1 = __webpack_require__(25);
let BooksController = BooksController_1 = class BooksController {
    booksService;
    logger = new common_1.Logger(BooksController_1.name);
    constructor(booksService) {
        this.booksService = booksService;
    }
    async create(createBookDto) {
        try {
            this.logger.log(`Creating book: ${JSON.stringify(createBookDto)}`);
            return await this.booksService.create(createBookDto);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async findAll() {
        try {
            return await this.booksService.findAll();
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async findOne(id) {
        try {
            return await this.booksService.findOne(id);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async update(id, updateBookDto) {
        try {
            return await this.booksService.update(id, updateBookDto);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async remove(id) {
        try {
            this.logger.log(`Deleting book with ID: ${id}`);
            return await this.booksService.remove(id);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    handleException(error) {
        this.logger.error("Error:", error);
        if (error instanceof common_1.BadRequestException) {
            return { status: 400, message: error.message };
        }
        else if (error instanceof common_1.NotFoundException) {
            return { status: 404, message: error.message };
        }
        else {
            return { status: 500, message: 'Internal Server Error' };
        }
    }
};
exports.BooksController = BooksController;
__decorate([
    (0, roles_decorator_1.Roles)("admin", "user"),
    (0, common_1.UseGuards)(auth_guards_1.JwtAuthGuard, role_gaurds_1.RolesGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_book_dto_1.CreateBookDto !== "undefined" && create_book_dto_1.CreateBookDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)("admin", "user"),
    (0, common_1.UseGuards)(auth_guards_1.JwtAuthGuard, role_gaurds_1.RolesGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)("admin", "user"),
    (0, common_1.UseGuards)(auth_guards_1.JwtAuthGuard, role_gaurds_1.RolesGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)("admin", "user"),
    (0, common_1.UseGuards)(auth_guards_1.JwtAuthGuard, role_gaurds_1.RolesGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_book_dto_1.UpdateBookDto !== "undefined" && update_book_dto_1.UpdateBookDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)("admin"),
    (0, common_1.UseGuards)(auth_guards_1.JwtAuthGuard, role_gaurds_1.RolesGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "remove", null);
exports.BooksController = BooksController = BooksController_1 = __decorate([
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [typeof (_a = typeof books_service_1.BooksService !== "undefined" && books_service_1.BooksService) === "function" ? _a : Object])
], BooksController);


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateBookDto = void 0;
const mapped_types_1 = __webpack_require__(35);
const book_dto_1 = __webpack_require__(36);
class CreateBookDto extends (0, mapped_types_1.OmitType)(book_dto_1.BookDto, ["id"]) {
}
exports.CreateBookDto = CreateBookDto;


/***/ }),
/* 35 */
/***/ ((module) => {

module.exports = require("@nestjs/mapped-types");

/***/ }),
/* 36 */
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
const class_validator_1 = __webpack_require__(20);
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
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateBookDto = void 0;
const mapped_types_1 = __webpack_require__(35);
const create_book_dto_1 = __webpack_require__(34);
class UpdateBookDto extends (0, mapped_types_1.PartialType)(create_book_dto_1.CreateBookDto) {
    id;
}
exports.UpdateBookDto = UpdateBookDto;


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersModule = void 0;
const common_1 = __webpack_require__(3);
const orders_service_1 = __webpack_require__(39);
const orders_controller_1 = __webpack_require__(40);
const microservices_1 = __webpack_require__(6);
const auth_module_1 = __webpack_require__(27);
const config_1 = __webpack_require__(26);
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: 'apps/orders/.env',
            }),
            microservices_1.ClientsModule.register([
                { name: 'ORDERS_CLIENT', transport: microservices_1.Transport.TCP, options: { port: 3002 } }
            ]),
        ],
        controllers: [orders_controller_1.OrdersController],
        providers: [orders_service_1.OrdersService],
    })
], OrdersModule);


/***/ }),
/* 39 */
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
exports.OrdersService = void 0;
const common_1 = __webpack_require__(3);
const microservices_1 = __webpack_require__(6);
const rxjs_1 = __webpack_require__(7);
let OrdersService = class OrdersService {
    ordersClient;
    constructor(ordersClient) {
        this.ordersClient = ordersClient;
    }
    async create(createOrderDto) {
        console.log("opopopopoppo", createOrderDto);
        return (0, rxjs_1.firstValueFrom)(this.ordersClient.send('orders.create', createOrderDto));
    }
    async findAll() {
        return (0, rxjs_1.firstValueFrom)(this.ordersClient.send('orders.findAll', {}));
    }
    async findOne(id) {
        return (0, rxjs_1.firstValueFrom)(this.ordersClient.send('orders.findOne', id));
    }
    async update(id, updateOrderDto) {
        return (0, rxjs_1.firstValueFrom)(this.ordersClient.send('orders.update', { id, ...updateOrderDto }));
    }
    async remove(id) {
        return (0, rxjs_1.firstValueFrom)(this.ordersClient.send('orders.remove', id));
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ORDERS_CLIENT')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], OrdersService);


/***/ }),
/* 40 */
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
const common_1 = __webpack_require__(3);
const orders_service_1 = __webpack_require__(39);
const create_order_dto_1 = __webpack_require__(41);
const update_order_dto_1 = __webpack_require__(44);
const auth_guards_1 = __webpack_require__(22);
const roles_decorator_1 = __webpack_require__(24);
const role_gaurds_1 = __webpack_require__(25);
let OrdersController = class OrdersController {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async create(createOrderDto) {
        try {
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
    async findOne(id) {
        try {
            return await this.ordersService.findOne(id);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async update(id, updateOrderDto) {
        try {
            return await this.ordersService.update(id, updateOrderDto);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async remove(id) {
        try {
            return await this.ordersService.remove(id);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    handleException(error) {
        if (error instanceof common_1.BadRequestException) {
            return { status: 400, message: error.message };
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
    (0, roles_decorator_1.Roles)("admin", "user"),
    (0, common_1.UseGuards)(auth_guards_1.JwtAuthGuard, role_gaurds_1.RolesGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_order_dto_1.CreateOrderDto !== "undefined" && create_order_dto_1.CreateOrderDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)("admin", "user"),
    (0, common_1.UseGuards)(auth_guards_1.JwtAuthGuard, role_gaurds_1.RolesGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)("admin", "user"),
    (0, common_1.UseGuards)(auth_guards_1.JwtAuthGuard, role_gaurds_1.RolesGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)("admin", "user"),
    (0, common_1.UseGuards)(auth_guards_1.JwtAuthGuard, role_gaurds_1.RolesGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_order_dto_1.UpdateOrderDto !== "undefined" && update_order_dto_1.UpdateOrderDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)("admin"),
    (0, common_1.UseGuards)(auth_guards_1.JwtAuthGuard, role_gaurds_1.RolesGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "remove", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [typeof (_a = typeof orders_service_1.OrdersService !== "undefined" && orders_service_1.OrdersService) === "function" ? _a : Object])
], OrdersController);


/***/ }),
/* 41 */
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
const class_validator_1 = __webpack_require__(20);
const class_transformer_1 = __webpack_require__(42);
const order_item_dto_1 = __webpack_require__(43);
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
/* 42 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 43 */
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
const class_validator_1 = __webpack_require__(20);
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
/* 44 */
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
const class_validator_1 = __webpack_require__(20);
const class_transformer_1 = __webpack_require__(42);
const order_item_dto_1 = __webpack_require__(43);
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
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookstoreModule = void 0;
const common_1 = __webpack_require__(3);
const bookstore_service_1 = __webpack_require__(46);
const bookstore_controller_1 = __webpack_require__(47);
const microservices_1 = __webpack_require__(6);
const auth_module_1 = __webpack_require__(27);
let BookstoreModule = class BookstoreModule {
};
exports.BookstoreModule = BookstoreModule;
exports.BookstoreModule = BookstoreModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule,
            microservices_1.ClientsModule.register([
                { name: 'BOOKSTORE_CLIENT', transport: microservices_1.Transport.TCP, options: { host: 'localhost', port: 3003 } },
            ]),
        ],
        controllers: [bookstore_controller_1.BookStockController],
        providers: [bookstore_service_1.BookStockService],
    })
], BookstoreModule);


/***/ }),
/* 46 */
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
const common_1 = __webpack_require__(3);
const microservices_1 = __webpack_require__(6);
const rxjs_1 = __webpack_require__(7);
let BookStockService = class BookStockService {
    bookStockClient;
    constructor(bookStockClient) {
        this.bookStockClient = bookStockClient;
    }
    async create(createBookStockDto) {
        return (0, rxjs_1.firstValueFrom)(this.bookStockClient.send('bookStock.create', createBookStockDto));
    }
    async findAll() {
        return (0, rxjs_1.firstValueFrom)(this.bookStockClient.send('bookStock.findAll', {}));
    }
    async findOne(id) {
        return (0, rxjs_1.firstValueFrom)(this.bookStockClient.send('bookStock.findOne', { id }));
    }
    findStock(id) {
        console.log("opopopopopopoopopopopopopoop", id);
        return (0, rxjs_1.firstValueFrom)(this.bookStockClient.send('bookStock.findStock', { id }));
    }
    async update(id, updateBookStockDto) {
        return (0, rxjs_1.firstValueFrom)(this.bookStockClient.send('bookStock.update', { updateBookStockDto }));
    }
    async remove(id) {
        return (0, rxjs_1.firstValueFrom)(this.bookStockClient.send('bookStock.remove', { id }));
    }
    async checkStock(book, quantity) {
        return (0, rxjs_1.firstValueFrom)(this.bookStockClient.send('bookStock.checkStock', { book, quantity }));
    }
    async decreaseStock(bookId, quantity) {
        return (0, rxjs_1.firstValueFrom)(this.bookStockClient.send('bookStock.decreaseStock', { book: bookId, quantity }));
    }
    async increaseStock(bookId, quantity) {
        console.log("inside : ");
        return await (0, rxjs_1.firstValueFrom)(this.bookStockClient.send('bookStock.increaseStock', { bookId, quantity }));
    }
};
exports.BookStockService = BookStockService;
exports.BookStockService = BookStockService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('BOOKSTORE_CLIENT')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], BookStockService);


/***/ }),
/* 47 */
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
var BookStockController_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookStockController = void 0;
const common_1 = __webpack_require__(3);
const create_bookstore_dto_1 = __webpack_require__(48);
const update_bookstore_dto_1 = __webpack_require__(49);
const bookstore_service_1 = __webpack_require__(46);
const roles_decorator_1 = __webpack_require__(24);
const auth_guards_1 = __webpack_require__(22);
const role_gaurds_1 = __webpack_require__(25);
let BookStockController = BookStockController_1 = class BookStockController {
    bookStockService;
    logger = new common_1.Logger(BookStockController_1.name);
    constructor(bookStockService) {
        this.bookStockService = bookStockService;
    }
    async create(createBookStockDto) {
        try {
            this.logger.log(`Creating book stock: ${JSON.stringify(createBookStockDto)}`);
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
    async findOne(id) {
        try {
            return await this.bookStockService.findOne(id);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async findStock(id) {
        try {
            return await this.bookStockService.findStock(id);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async update(id, updateBookStockDto) {
        try {
            return await this.bookStockService.update(id, updateBookStockDto);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async remove(id) {
        try {
            this.logger.log(`Deleting book stock with ID: ${id}`);
            return await this.bookStockService.remove(id);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async checkStock(book, quantity) {
        try {
            return await this.bookStockService.checkStock(book, quantity);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async decreaseStock(bookId, quantity) {
        try {
            return await this.bookStockService.decreaseStock(bookId, quantity);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    async increaseStock(bookId, quantity) {
        try {
            return await this.bookStockService.increaseStock(bookId, quantity);
        }
        catch (error) {
            return this.handleException(error);
        }
    }
    handleException(error) {
        this.logger.error("Error:", error);
        if (error instanceof common_1.BadRequestException) {
            return { status: 400, message: error.message };
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
    (0, roles_decorator_1.Roles)("admin", "user"),
    (0, common_1.UseGuards)(auth_guards_1.JwtAuthGuard, role_gaurds_1.RolesGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_bookstore_dto_1.CreateBookStockDto !== "undefined" && create_bookstore_dto_1.CreateBookStockDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], BookStockController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)("admin", "user"),
    (0, common_1.UseGuards)(auth_guards_1.JwtAuthGuard, role_gaurds_1.RolesGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookStockController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)("admin", "user"),
    (0, common_1.UseGuards)(auth_guards_1.JwtAuthGuard, role_gaurds_1.RolesGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookStockController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)("admin", "user"),
    (0, common_1.UseGuards)(auth_guards_1.JwtAuthGuard, role_gaurds_1.RolesGuard),
    (0, common_1.Get)('stock/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookStockController.prototype, "findStock", null);
__decorate([
    (0, roles_decorator_1.Roles)("admin", "user"),
    (0, common_1.UseGuards)(auth_guards_1.JwtAuthGuard, role_gaurds_1.RolesGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_bookstore_dto_1.UpdateBookStockDto !== "undefined" && update_bookstore_dto_1.UpdateBookStockDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], BookStockController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)("user"),
    (0, common_1.UseGuards)(auth_guards_1.JwtAuthGuard, role_gaurds_1.RolesGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookStockController.prototype, "remove", null);
__decorate([
    (0, roles_decorator_1.Roles)("admin"),
    (0, common_1.UseGuards)(auth_guards_1.JwtAuthGuard, role_gaurds_1.RolesGuard),
    (0, common_1.Get)(':id/check-stock/:quantity'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('quantity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], BookStockController.prototype, "checkStock", null);
__decorate([
    (0, roles_decorator_1.Roles)("admin"),
    (0, common_1.UseGuards)(auth_guards_1.JwtAuthGuard, role_gaurds_1.RolesGuard),
    (0, common_1.Patch)(':id/decrease/:quantity'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('quantity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], BookStockController.prototype, "decreaseStock", null);
__decorate([
    (0, roles_decorator_1.Roles)("admin"),
    (0, common_1.UseGuards)(auth_guards_1.JwtAuthGuard, role_gaurds_1.RolesGuard),
    (0, common_1.Patch)(':id/increase/:quantity'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('quantity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], BookStockController.prototype, "increaseStock", null);
exports.BookStockController = BookStockController = BookStockController_1 = __decorate([
    (0, common_1.Controller)('bookstock'),
    __metadata("design:paramtypes", [typeof (_a = typeof bookstore_service_1.BookStockService !== "undefined" && bookstore_service_1.BookStockService) === "function" ? _a : Object])
], BookStockController);


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateBookStockDto = void 0;
class CreateBookStockDto {
    book;
    stock;
}
exports.CreateBookStockDto = CreateBookStockDto;


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateBookStockDto = void 0;
class UpdateBookStockDto {
    id;
    stock;
}
exports.UpdateBookStockDto = UpdateBookStockDto;


/***/ }),
/* 50 */
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),
/* 51 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResponseFormatInterceptor = void 0;
const common_1 = __webpack_require__(3);
const operators_1 = __webpack_require__(52);
let ResponseFormatInterceptor = class ResponseFormatInterceptor {
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        console.log("Inside response interceptor", request.path);
        return next.handle().pipe((0, operators_1.map)(({ data, status, message }) => {
            console.log("==>", data);
            const { token = null } = data || {};
            if (request.path === "/gateway/user-service/user/login") {
                response.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                });
            }
            return {
                status,
                message,
                data,
            };
        }));
    }
};
exports.ResponseFormatInterceptor = ResponseFormatInterceptor;
exports.ResponseFormatInterceptor = ResponseFormatInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResponseFormatInterceptor);


/***/ }),
/* 52 */
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ })
/******/ 	]);
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

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const bookstore_api_gateway_module_1 = __webpack_require__(2);
const cookieParser = __webpack_require__(50);
const response_interseptor_1 = __webpack_require__(51);
async function bootstrap() {
    const app = await core_1.NestFactory.create(bookstore_api_gateway_module_1.BookstoreApiGatewayModule);
    app.use(cookieParser());
    app.useGlobalInterceptors(new response_interseptor_1.ResponseFormatInterceptor());
    await app.listen(process.env.port ?? 3000);
}
bootstrap();

})();

/******/ })()
;