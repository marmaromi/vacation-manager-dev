"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var VacationModel = /** @class */ (function () {
    function VacationModel(vacation) {
        this.id = vacation.id;
        this.description = vacation.description;
        this.destination = vacation.destination;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
        this.followers = vacation.followers;
        this.isFollowing = vacation.isFollowing;
    }
    // private static PatchValidationSchema = Joi.object({
    //     id: Joi.number().integer().min(1),
    //     description: Joi.string().optional().min(2).max(300),
    //     destination: Joi.string().optional().min(2).max(50),
    //     startDate: Joi.string().optional().min(1).max(30),
    //     endDate: Joi.string().required().isoDate(),
    //     price: Joi.number().required().min(200).max(100000),
    //     imageName: Joi.string().required().min(0).max(50),
    //     followers: Joi.number().optional().min(0).max(10000000)
    // })
    VacationModel.prototype.validatePost = function () {
        var _a;
        var result = VacationModel.postValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    VacationModel.prototype.validatePut = function () {
        var _a;
        var result = VacationModel.putValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    VacationModel.postValidationSchema = joi_1.default.object({
        id: joi_1.default.forbidden(),
        description: joi_1.default.string().required().min(10).max(300),
        destination: joi_1.default.string().required().min(2).max(50),
        startDate: joi_1.default.string().required().isoDate(),
        endDate: joi_1.default.string().required().isoDate(),
        price: joi_1.default.number().required().min(200).max(500000),
        imageName: joi_1.default.string().optional().max(50),
        image: joi_1.default.object().optional(),
        followers: joi_1.default.number().optional().min(0).max(10000000),
        isFollowing: joi_1.default.boolean().optional()
    });
    VacationModel.putValidationSchema = joi_1.default.object({
        id: joi_1.default.number().required().integer().min(1),
        description: joi_1.default.string().required().min(2).max(300),
        destination: joi_1.default.string().required().min(2).max(50),
        startDate: joi_1.default.string().required().min(1).max(30),
        endDate: joi_1.default.string().required().isoDate(),
        price: joi_1.default.number().required().min(200).max(500000),
        imageName: joi_1.default.string().optional().max(50),
        image: joi_1.default.object().optional(),
        followers: joi_1.default.number().optional().min(0).max(10000000),
        isFollowing: joi_1.default.boolean().optional()
    });
    return VacationModel;
}());
exports.default = VacationModel;
