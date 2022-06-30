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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dal_1 = __importDefault(require("../2-utils/dal"));
var errors_model_1 = require("../4-models/errors-model");
var uuid_1 = require("uuid");
var fs_1 = __importDefault(require("fs"));
var socket_logic_1 = __importDefault(require("./socket-logic"));
var getAllVacations = function () { return __awaiter(void 0, void 0, void 0, function () {
    var sql, vacations;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, UpdateFollowerCount()];
            case 1:
                _a.sent();
                sql = "SELECT vacationId as id, \n                        description, \n                        destination, \n                        startDate, \n                        endDate, \n                        price,\n                        followers,\n                        imageName\n                 FROM vacations";
                return [4 /*yield*/, dal_1.default.execute(sql)];
            case 2:
                vacations = _a.sent();
                vacations.forEach(function (vacation) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UpdateFollowerCount()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                }); }); });
                return [2 /*return*/, vacations];
        }
    });
}); };
var getOneVacation = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, vacations, vacation;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT vacationId as id, \n                        description, \n                        destination, \n                        startDate, \n                        endDate, \n                        price,\n                        followers,\n                        imageName\n                 FROM vacations\n                 WHERE vacationId = ".concat(id);
                return [4 /*yield*/, dal_1.default.execute(sql)];
            case 1:
                vacations = _a.sent();
                vacation = vacations[0];
                if (!vacation) {
                    throw new errors_model_1.ResourceNotFoundError(id);
                }
                vacation.startDate = new Date(vacation.startDate).toISOString().slice(0, -14);
                vacation.endDate = new Date(vacation.endDate).toISOString().slice(0, -14);
                return [2 /*return*/, vacation];
        }
    });
}); };
var addVacation = function (vacation) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, dotIndex, extension, sql, values, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = vacation.validatePost();
                if (errors) {
                    throw new errors_model_1.ValidationError(errors);
                }
                if (!vacation.image) return [3 /*break*/, 2];
                dotIndex = vacation.image.name.lastIndexOf(".");
                extension = vacation.image.name.substring(dotIndex);
                vacation.imageName = (0, uuid_1.v4)() + extension;
                return [4 /*yield*/, vacation.image.mv("./../1-assets/images/" + vacation.imageName)];
            case 1:
                _a.sent();
                delete vacation.image;
                _a.label = 2;
            case 2:
                sql = "INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?, 0)";
                values = [vacation.description, vacation.destination, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName];
                return [4 /*yield*/, dal_1.default.execute(sql, values)];
            case 3:
                result = _a.sent();
                vacation.id = result.insertId;
                socket_logic_1.default.reportAddVacation(vacation);
                return [2 /*return*/, vacation];
        }
    });
}); };
function updateVacation(vacation) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, vacationToUpdate, imageToDelete_1, dotIndex, extension, _a, sql, values, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    errors = vacation.validatePut();
                    if (errors) {
                        throw new errors_model_1.ValidationError(errors);
                    }
                    return [4 /*yield*/, getOneVacation(vacation.id)];
                case 1:
                    vacationToUpdate = _b.sent();
                    if (!vacation.image) return [3 /*break*/, 4];
                    imageToDelete_1 = "./../1-assets/images/" + vacationToUpdate.imageName;
                    return [4 /*yield*/, fs_1.default.unlink(imageToDelete_1, function (err) {
                            if (err) {
                                console.log("Image to delete not found in path: \"".concat(imageToDelete_1, "\""));
                            }
                            else
                                console.log("File was deleted in path: \"".concat(imageToDelete_1, "\""));
                        })];
                case 2:
                    _b.sent();
                    dotIndex = vacation.image.name.lastIndexOf(".");
                    extension = vacation.image.name.substring(dotIndex);
                    vacation.imageName = (0, uuid_1.v4)() + extension;
                    return [4 /*yield*/, vacation.image.mv("./../1-assets/images/" + vacation.imageName)];
                case 3:
                    _b.sent();
                    delete vacation.image;
                    return [3 /*break*/, 5];
                case 4:
                    if (!vacationToUpdate.image) {
                        vacation.image = vacationToUpdate.image;
                        vacation.imageName = vacationToUpdate.imageName;
                    }
                    _b.label = 5;
                case 5:
                    _a = vacation;
                    return [4 /*yield*/, followerCount(vacation.id)];
                case 6:
                    _a.followers = _b.sent();
                    sql = "UPDATE vacations \n                 SET description = ?, destination = ?, startDate = ?, endDate = ?, price = ?, imageName = ?, followers = ?\n                 WHERE vacationId = ".concat(vacation.id);
                    values = [vacation.description, vacation.destination, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName, vacation.followers];
                    return [4 /*yield*/, dal_1.default.execute(sql, values)];
                case 7:
                    result = _b.sent();
                    if (result.affectedRows === 0) {
                        throw new errors_model_1.ResourceNotFoundError(vacation.id);
                    }
                    socket_logic_1.default.reportUpdateVacation(vacation);
                    return [2 /*return*/, vacation];
            }
        });
    });
}
var deleteVacation = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var vacationToDelete, imageToDelete, sql, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getOneVacation(id)];
            case 1:
                vacationToDelete = _a.sent();
                imageToDelete = "./../1-assets/images/" + vacationToDelete.imageName;
                fs_1.default.unlink(imageToDelete, function (err) {
                    if (err) {
                        console.log("Image to delete not found in path: \"".concat(imageToDelete, "\""));
                    }
                    else
                        console.log("File was deleted in path: \"".concat(imageToDelete, "\""));
                });
                sql = "DELETE FROM vacations WHERE vacationId = ".concat(id);
                return [4 /*yield*/, dal_1.default.execute(sql)];
            case 2:
                result = _a.sent();
                if (result.affectedRows === 0) {
                    throw new errors_model_1.ResourceNotFoundError(id);
                }
                socket_logic_1.default.reportDeleteVacation(id);
                return [2 /*return*/];
        }
    });
}); };
var UpdateFollowerCount = function () { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "UPDATE vacations SET followers = (SELECT COUNT(vacationId) as followers FROM user_tagged_vacations WHERE vacations.vacationId = user_tagged_vacations.vacationId)";
                return [4 /*yield*/, dal_1.default.execute(sql)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var followerCount = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, result, followerCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT COUNT(vacationId) as followers FROM user_tagged_vacations WHERE vacationId = ".concat(id);
                return [4 /*yield*/, dal_1.default.execute(sql)];
            case 1:
                result = _a.sent();
                followerCount = result[0].followers;
                return [2 /*return*/, followerCount];
        }
    });
}); };
var userFollowChange = function (vacationId) { return __awaiter(void 0, void 0, void 0, function () {
    var vacationToUpdate, _a, sql, values, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, getOneVacation(vacationId)];
            case 1:
                vacationToUpdate = _b.sent();
                _a = vacationToUpdate;
                return [4 /*yield*/, followerCount(vacationId)];
            case 2:
                _a.followers = _b.sent();
                sql = "UPDATE vacations \n                 SET description = ?, destination = ?, startDate = ?, endDate = ?, price = ?, imageName = ?, followers = ?\n                 WHERE vacationId = ".concat(vacationToUpdate.id);
                values = [vacationToUpdate.description, vacationToUpdate.destination, vacationToUpdate.startDate, vacationToUpdate.endDate, vacationToUpdate.price, vacationToUpdate.imageName, vacationToUpdate.followers];
                return [4 /*yield*/, dal_1.default.execute(sql, values)];
            case 3:
                result = _b.sent();
                if (result.affectedRows === 0) {
                    throw new errors_model_1.ResourceNotFoundError(vacationId);
                }
                socket_logic_1.default.reportFollowVacation(vacationToUpdate);
                return [2 /*return*/, vacationToUpdate];
        }
    });
}); };
exports.default = {
    getAllVacations: getAllVacations,
    getOneVacation: getOneVacation,
    addVacation: addVacation,
    updateVacation: updateVacation,
    deleteVacation: deleteVacation,
    userFollowChange: userFollowChange
};
