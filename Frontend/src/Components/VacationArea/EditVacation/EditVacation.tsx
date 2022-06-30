import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/Vacation Model";
import { store } from "../../../Redux/Store";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import "./EditVacation.css";

function EditVacation(): JSX.Element {

    const params = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<VacationModel>();
    const [vacationId, setVacationId] = useState<number>();
    const [today, setToday] = useState<string>("");


    useEffect(() => {
        if (!store.getState().authStore?.token) navigate("/login");
        if (store.getState().authStore?.user?.privileges !== "admin") navigate("/vacations");

        const vacationId: number = +params.vacationId;
        setVacationId(vacationId);
        vacationsService.getOneVacation(vacationId)
            .then(vacationToEdit => {
                setValue("destination", vacationToEdit.destination);
                setValue("description", vacationToEdit.description);
                setValue("startDate", new Date(vacationToEdit.startDate).toISOString().slice(0, -14));
                setValue("endDate", new Date(vacationToEdit.endDate).toISOString().slice(0, -14));
                setValue("price", vacationToEdit.price);
                setValue("image", vacationToEdit.image);
            })
            .catch(err => alert(err.message));

        setToday(new Date().toISOString().slice(0, -14));

        // not really necessary for this component, a stupid solution to make admin layout show on page reload...
        let vacations = store.getState().vacationsStore.vacations;
        if (vacations.length === 0) {
            vacationsService.getAllVacations()
        }
    }, [])

    async function send(vacation: VacationModel) {
        try {
            vacation.id = vacationId;
            await vacationsService.editVacation(vacation);
            notifyService.success(`Vacation to ${vacation.destination} has been edited successfully`);
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err.message);
        }
    }

    watch(["startDate", "endDate"]);

    return (
        <div className="EditVacation Box">
            <h2>Edit Vacation</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Destination: </label>
                <input type="text" {...register("destination", {
                    required: { value: true, message: "Missing destination" },
                    minLength: { value: 2, message: "Minimum 2 letters" },
                    maxLength: { value: 50, message: "Maximum 50 letters" },
                })} />
                <span className="error">{errors.destination?.message}</span>
                <br />

                <label>Description: </label>
                <textarea rows={4} cols={20}  {...register("description", {
                    required: { value: true, message: "Missing description" },
                    minLength: { value: 10, message: "Minimum 10 letters" },
                    maxLength: { value: 300, message: "Maximum 300 letters" },
                })} ></textarea>
                <span className="error">{errors.description?.message}</span>
                <br />

                <label>Start Date: </label>
                <input type="date" min={getValues("endDate") && today || today} {...register("startDate", {
                    required: { value: true, message: "Missing start date" },
                    min: { value: getValues("endDate") && today || today, message: "Start date must be today or later" },
                    max: { value: getValues("endDate"), message: "Start date must be before end date" }
                })} />
                <span className="error">{errors.startDate?.message}</span>
                <br />

                <label>End Date: </label>
                <input type="date" min={today && getValues("startDate") || today} {...register("endDate", {
                    required: { value: true, message: "Missing end date" },
                    min: { value: today && getValues("startDate") || today, message: "End date must be later than start date" }
                })} />
                <span className="error">{errors.endDate?.message}</span>
                <br />

                <label>Price: </label>
                <input type="number" {...register("price", {
                    required: { value: true, message: "Missing price" },
                    min: { value: 200, message: "Minimum price 200₪" },
                    max: { value: 100000, message: "Maximum price 100,000₪" },
                })} />
                <span className="error">{errors.price?.message}</span>
                <br />

                <div className="mb3">
                    <label htmlFor="file" className="form-label">Image: </label>
                    <input type="file" className="form-control" accept="image/*" {...register("image")} />
                    <span className="error">{errors.image?.message}</span>
                    <br />
                </div>

                <button>Edit Vacation</button>
            </form>
        </div>
    );
}

export default EditVacation;
