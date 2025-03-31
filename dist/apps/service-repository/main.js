/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/service-repository/src/service-repository.controller.ts":
/*!**********************************************************************!*\
  !*** ./apps/service-repository/src/service-repository.controller.ts ***!
  \**********************************************************************/
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
exports.ServiceRegistryController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const service_repository_service_1 = __webpack_require__(/*! ./service-repository.service */ "./apps/service-repository/src/service-repository.service.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let ServiceRegistryController = class ServiceRegistryController {
    registryService;
    constructor(registryService) {
        this.registryService = registryService;
    }
    heartbeat(name) {
        console.log("heart : ", name);
        this.registryService.updateHeartbeat(name);
        return { message: `💓 Heartbeat received from ${name}` };
    }
    register(service) {
        console.log("registering : ", service);
        this.registryService.registerService(service);
        return { message: `Service ${service.name} registered successfully.` };
    }
    deregister(name) {
        this.registryService.deregisterService(name);
        return { message: `Service ${name} deregistered successfully.` };
    }
    async discover(name) {
        console.log("opopopop", name);
        const service = this.registryService.getService(name);
        console.log("service op : ", service);
        if (!service) {
            return { error: `Service ${name} not found.` };
        }
        return service;
    }
    getAll() {
        return this.registryService.getAllServices();
    }
};
exports.ServiceRegistryController = ServiceRegistryController;
__decorate([
    (0, microservices_1.MessagePattern)('heartbeat'),
    __param(0, (0, microservices_1.Payload)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServiceRegistryController.prototype, "heartbeat", null);
__decorate([
    (0, microservices_1.MessagePattern)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof service_repository_service_1.ServiceInfo !== "undefined" && service_repository_service_1.ServiceInfo) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], ServiceRegistryController.prototype, "register", null);
__decorate([
    (0, common_1.Delete)('deregister/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServiceRegistryController.prototype, "deregister", null);
__decorate([
    (0, microservices_1.MessagePattern)('registry.discover'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceRegistryController.prototype, "discover", null);
__decorate([
    (0, microservices_1.MessagePattern)('services'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ServiceRegistryController.prototype, "getAll", null);
exports.ServiceRegistryController = ServiceRegistryController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof service_repository_service_1.ServiceRegistryService !== "undefined" && service_repository_service_1.ServiceRegistryService) === "function" ? _a : Object])
], ServiceRegistryController);


/***/ }),

/***/ "./apps/service-repository/src/service-repository.module.ts":
/*!******************************************************************!*\
  !*** ./apps/service-repository/src/service-repository.module.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceRepositoryModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const service_repository_controller_1 = __webpack_require__(/*! ./service-repository.controller */ "./apps/service-repository/src/service-repository.controller.ts");
const service_repository_service_1 = __webpack_require__(/*! ./service-repository.service */ "./apps/service-repository/src/service-repository.service.ts");
const schedule_1 = __webpack_require__(/*! @nestjs/schedule */ "@nestjs/schedule");
let ServiceRepositoryModule = class ServiceRepositoryModule {
};
exports.ServiceRepositoryModule = ServiceRepositoryModule;
exports.ServiceRepositoryModule = ServiceRepositoryModule = __decorate([
    (0, common_1.Module)({
        imports: [schedule_1.ScheduleModule.forRoot()],
        controllers: [service_repository_controller_1.ServiceRegistryController],
        providers: [service_repository_service_1.ServiceRegistryService],
    })
], ServiceRepositoryModule);


/***/ }),

/***/ "./apps/service-repository/src/service-repository.service.ts":
/*!*******************************************************************!*\
  !*** ./apps/service-repository/src/service-repository.service.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceRegistryService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let services = {};
let ServiceRegistryService = class ServiceRegistryService {
    services = {};
    registerService(service) {
        services[service.name] = { ...service, lastSeen: Date.now() };
        console.log(`✅ Service registered: ${service.name} at ${service.ip}:${service.port}`);
    }
    deregisterService(name) {
        if (services[name]) {
            delete services[name];
            console.log(`❌ Service deregistered: ${name}`);
        }
    }
    getService(name) {
        return services[name] || null;
    }
    getAllServices() {
        return services;
    }
    updateHeartbeat(name) {
        console.log(services);
        if (services[name]) {
            services[name].lastSeen = Date.now();
            console.log(`💓 Heartbeat received from: ${name}`);
        }
    }
    removeInactiveServices(timeout = 30000) {
        const now = Date.now();
        Object.keys(services).forEach((name) => {
            if (services[name].lastSeen && now - services[name].lastSeen > timeout) {
                console.log(`⏳ Removing inactive service: ${name}`);
                delete services[name];
            }
        });
    }
};
exports.ServiceRegistryService = ServiceRegistryService;
exports.ServiceRegistryService = ServiceRegistryService = __decorate([
    (0, common_1.Injectable)()
], ServiceRegistryService);


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/schedule":
/*!***********************************!*\
  !*** external "@nestjs/schedule" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/schedule");

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
/*!*********************************************!*\
  !*** ./apps/service-repository/src/main.ts ***!
  \*********************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const service_repository_module_1 = __webpack_require__(/*! ./service-repository.module */ "./apps/service-repository/src/service-repository.module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(service_repository_module_1.ServiceRepositoryModule, {
        transport: microservices_1.Transport.TCP,
        options: { host: "localhost", port: 4000 },
    });
    await app.listen();
    console.log('Service Repository Microservice is running on port 4000');
}
bootstrap();

})();

/******/ })()
;