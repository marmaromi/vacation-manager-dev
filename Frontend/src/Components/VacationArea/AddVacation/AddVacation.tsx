import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/Vacation Model";
import { store } from "../../../Redux/Store";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import "./AddVacation.css";

function AddVacation(): JSX.Element {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<VacationModel>();

    useEffect(() => {

        if (!store.getState().authStore?.token) {
            navigate("/login");
        }
        
        if (store.getState().authStore?.user?.privileges !== "admin") {
            navigate("/vacations");
        }
    }, [])

    async function send(vacation: VacationModel) {
        try {
            await vacationsService.addVacation(vacation);
            notifyService.success(`Vacation to ${vacation.destination} has been added successfully`);
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="AddVacation">
            <h2>New Vacation</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Destination: </label>
                <input type="text" {...register("destination", {
                    required: { value: true, message: "Missing destination" },
                    // pattern: { value: /^[A-Za-z0-9]+$/, message: "Special Characters are not allowed" },
                    minLength: { value: 2, message: "Minimum 2 letters" },
                    maxLength: { value: 50, message: "Maximum 50 letters" },
                })} />
                <span>{errors.destination?.message}</span>
                <br />

                <label>Description: </label>
                <input type="text"  {...register("description", {
                    required: { value: true, message: "Missing description" },
                    minLength: { value: 10, message: "Minimum 10 letters" },
                    maxLength: { value: 300, message: "Maximum 300 letters" },
                })} />
                <span>{errors.description?.message}</span>
                <br />

                <label>Start Date: </label>
                <input id="start-date" type="date" min={new Date().toISOString().slice(0, -14)} {...register("startDate", {
                    required: { value: true, message: "Missing start date" },
                    min: { value: new Date().toISOString().slice(0, -14), message: "Start date must be today or later" }
                })} />
                <span>{errors.startDate?.message}</span>
                <br />

                <label>End Date: </label>
                <input type="date" min={getValues("startDate") || new Date().toISOString().slice(0, -14)} {...register("endDate", {
                    required: { value: true, message: "Missing end date" },
                    min: { value: getValues("startDate"), message: "End date must be later than start date" }
                })} />
                <span>{errors.endDate?.message}</span>
                <br />

                <label>Price: </label>
                <input type="number" {...register("price", {
                    required: { value: true, message: "Missing price" },
                    min: { value: 200, message: "Minimum price 200₪" },
                    max: { value: 100000, message: "Maximum price 100,000₪" },
                })} />
                <span>{errors.price?.message}</span>
                <br />

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image", {
                    required: { value: true, message: "Missing image" },
                })} />
                <span>{errors.image?.message}</span>
                <br />



                <button>Add Vacation</button>

            </form>

        </div>
    );
}

export default AddVacation;
