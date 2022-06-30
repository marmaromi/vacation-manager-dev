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
var cyber_token_1 = __importDefault(require("../2-utils/cyber-token"));
var cyber_hash_1 = __importDefault(require("../2-utils/cyber-hash"));
var register = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, sql, values, result, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = user.validatePost();
                if (errors) {
                    throw new errors_model_1.ValidationError(errors);
                }
                return [4 /*yield*/, usernameExists(user.username)];
            case 1:
                if (_a.sent()) {
                    throw new errors_model_1.ValidationError("username ".concat(user.username, " already exists"));
                }
                user.password = (0, cyber_hash_1.default)(user.password);
                sql = "INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?,'user')";
                values = [user.firstName, user.lastName, user.username, user.password];
                return [4 /*yield*/, dal_1.default.execute(sql, values)];
            case 2:
                result = _a.sent();
                user.id = result.insertId;
                token = cyber_token_1.default.getNewToken(user);
                return [2 /*return*/, token];
        }
    });
}); };
var login = function (credentials) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, users, user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                credentials.username = credentials.username.toLocaleLowerCase();
                credentials.password = (0, cyber_hash_1.default)(credentials.password);
                sql = "SELECT userId as id, username, privileges, password, firstName, lastName FROM users WHERE username = '".concat(credentials.username, "' AND password = '").concat(credentials.password, "'");
                return [4 /*yield*/, dal_1.default.execute(sql)];
            case 1:
                users = _a.sent();
                user = users[0];
                if (!user) {
                    throw new errors_model_1.ValidationError("Incorrect username or password");
                }
                // user.followedVacations = await vacationsUserFollows(user.id);
                delete user.password;
                token = cyber_token_1.default.getNewToken(user);
                return [2 /*return*/, token];
        }
    });
}); };
var usernameExists = function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, result, exists;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT EXISTS(SELECT username FROM users WHERE username = '".concat(username, "') AS isExists");
                return [4 /*yield*/, dal_1.default.execute(sql)];
            case 1:
                result = _a.sent();
                exists = result[0].isExists;
                return [2 /*return*/, exists];
        }
    });
}); };
var vacationsUserFollows = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, result, vacationsUserFollows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT vacationId FROM user_tagged_vacations WHERE userId = ".concat(userId);
                return [4 /*yield*/, dal_1.default.execute(sql)];
            case 1:
                result = _a.sent();
                vacationsUserFollows = result.map(function (r) { return r.vacationId; });
                return [2 /*return*/, vacationsUserFollows];
        }
    });
}); };
var userFollowsVacation = function (userId, vacationId) { return __awaiter(void 0, void 0, void 0, function () {
    var followedVacations, sql, values;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, vacationsUserFollows(userId)];
            case 1:
                followedVacations = _a.sent();
                if (followedVacations.includes(vacationId)) {
                    throw new errors_model_1.ResourceNotFoundError(userId);
                }
                sql = "INSERT INTO user_tagged_vacations VALUES(?, ?)";
                values = [userId, vacationId];
                return [4 /*yield*/, dal_1.default.execute(sql, values)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var userUnFollowsVacation = function (userId, vacationId) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "DELETE FROM user_tagged_vacations WHERE userId = ".concat(userId, " AND vacationId = ").concat(vacationId);
                return [4 /*yield*/, dal_1.default.execute(sql)];
            case 1:
                result = _a.sent();
                if (result.affectedRows === 0) {
                    throw new errors_model_1.ResourceNotFoundError(userId);
                }
                return [2 /*return*/];
        }
    });
}); };
var getUserCount = function () { return __awaiter(void 0, void 0, void 0, function () {
    var sql, userCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT COUNT(userId) as userCount FROM users";
                return [4 /*yield*/, dal_1.default.execute(sql)];
            case 1:
                userCount = _a.sent();
                return [2 /*return*/, userCount[0].userCount];
        }
    });
}); };
exports.default = {
    register: register,
    login: login,
    vacationsUserFollows: vacationsUserFollows,
    userFollowsVacation: userFollowsVacation,
    userUnFollowsVacation: userUnFollowsVacation,
    getUserCount: getUserCount
};
// const getAllUsers = async (): Promise<UserModel[]> => {
//     const sql = `SELECT userId as id,
//                         firstName,
//                         lastName,
//                         username,
//                         password,
//                         privileges
//                  FROM users`;
//     const users = await dal.execute(sql);
//     return users;
// }
// const getOneUser = async (id: number): Promise<UserModel> => {
//     const sql = `SELECT userId as id,
//                         firstName,
//                         lastName,
//                         username,
//                         password,
//                         privileges
//                  FROM users
//                  WHERE userId = ${id}`;
//     const users = await dal.execute(sql);
//     const user = users[0];
//     if (!user) {
//         throw new ResourceNotFoundError(id);
//     }
//     return user;
// }
// const deleteUser = async (id: number): Promise<void> => {
//     const sql = `DELETE FROM users WHERE userId = ${id}`
//     const result: OkPacket = await dal.execute(sql);
//     if (result.affectedRows === 0) {
//         throw new ResourceNotFoundError(id);
//     }
// }
