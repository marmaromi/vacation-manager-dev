import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class VacationModel {

    public id: number;
    public description: string;
    public destination: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageName: string;
    public image: UploadedFile;
    public followers: number;


    public constructor(vacation: VacationModel) {
        this.id = vacation.id;
        this.description = vacation.description;
        this.destination = vacation.destination;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
        this.followers = vacation.id;

    }

    private static postValidationSchema = Joi.object({
        id: Joi.forbidden(),
        description: Joi.string().required().min(10).max(300),
        destination: Joi.string().required().min(2).max(50),
        startDate: Joi.string().required().isoDate(),
        endDate: Joi.string().required().isoDate(),
        price: Joi.number().required().min(200).max(100000),
        imageName: Joi.string().optional().max(50),
        image: Joi.object().optional(),
        followers: Joi.number().optional().min(0).max(10000000)
    });

    private static putValidationSchema = Joi.object({
        id: Joi.number().required().integer().min(1),
        description: Joi.string().required().min(2).max(300),
        destination: Joi.string().required().min(2).max(50),
        startDate: Joi.string().required().min(1).max(30),
        endDate: Joi.string().required().isoDate(),
        price: Joi.number().required().min(200).max(100000),
        imageName: Joi.string().optional().max(50),
        image: Joi.object().optional(),
        followers: Joi.number().optional().min(0).max(10000000)
    })

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

    public validatePost(): string {
        const result = VacationModel.postValidationSchema.validate(this);        
        return result.error?.message;
    }

    public validatePut(): string {
        const result = VacationModel.putValidationSchema.validate(this);
        return result.error?.message;
    }

    // public validatePatch(): string {
    //     const result = VacationModel.PatchValidationSchema.validate(this);
    //     return result.error?.message;
    // }

}

export default VacationModel;