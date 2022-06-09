import Joi from "joi";
import { joiPassword } from "joi-password"

class UserModel {

    public id: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;

    public constructor(user: UserModel) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
    }

    private static postValidationSchema = Joi.object({
        id: Joi.forbidden(),
        firstName: Joi.string().required().min(2).max(30),
        lastName: Joi.string().required().min(2).max(50),
        username: Joi.string().required().min(1).max(30),
        password: joiPassword.string().required().min(8).max(50).minOfLowercase(1).minOfUppercase(1).minOfSpecialCharacters(1).minOfNumeric(1).noWhiteSpaces().messages({
            'password.min': '{#label} should contain at least {#min} characters',
            'password.max': '{#label} should contain at least {#min} characters',
            'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
            'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
            'password.minOfSpecialCharacters': '{#label} should contain at least {#min} special character',
            'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
            'password.noWhiteSpaces': '{#label} should not contain white spaces',
        })
    });

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

    public validatePost(): string {
        const result = UserModel.postValidationSchema.validate(this);
        return result.error?.message;
    }

    // public validatePut(): string {
    //     const result = UserModel.putValidationSchema.validate(this);
    //     return result.error?.message;
    // }

    // public validatePatch(): string {
    //     const result = UserModel.PatchValidationSchema.validate(this);
    //     return result.error?.message;
    // }

}

export default UserModel;