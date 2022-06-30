"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var joi_password_1 = require("joi-password");
var UserModel = /** @class */ (function () {
    // public followedVacations: number[];
    function UserModel(user) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        // this.followedVacations = user.followedVacations;
    }
    // private static putValidationSchema = Joi.object({
    //     id: Joi.number().integer().min(1),
    //     firstName: Joi.string().required().min(2).max(30),
    //     lastName: Joi.string().required().min(2).max(50),
    //     username: Joi.string().required().min(1).max(30),
    //     password: Joi.string().required().min(8).max(50),
    // })
    // private static PatchValidationSchema = Joi.object({
    //     id: Joi.number().integer().min(1),
    //     firstName: Joi.string().optional().min(2).max(30),
    //     lastName: Joi.string().optional().min(2).max(50),
    //     username: Joi.string().optional().min(1).max(30),
    //     password: Joi.string().optional().min(8).max(50),
    // })
    UserModel.prototype.validatePost = function () {
        var _a;
        var result = UserModel.postValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    UserModel.postValidationSchema = joi_1.default.object({
        id: joi_1.default.forbidden(),
        firstName: joi_1.default.string().alphanum().required().min(2).max(30),
        lastName: joi_1.default.string().alphanum().required().min(2).max(50),
        username: joi_1.default.string().alphanum().required().min(1).max(30),
        password: joi_password_1.joiPassword.string().required().min(8).max(50).minOfLowercase(1).minOfUppercase(1).minOfSpecialCharacters(1).minOfNumeric(1).noWhiteSpaces().messages({
            'password.min': '{#label} should contain at least {#min} characters',
            'password.max': '{#label} should contain at least {#min} characters',
            'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
            'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
            'password.minOfSpecialCharacters': '{#label} should contain at least {#min} special character',
            'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
            'password.noWhiteSpaces': '{#label} should not contain white spaces',
        })
    });
    return UserModel;
}());
exports.default = UserModel;
