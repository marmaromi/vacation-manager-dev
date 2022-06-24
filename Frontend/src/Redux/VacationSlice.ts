import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import VacationModel from "../Models/Vacation Model";

export class VacationsSliceState {
    public vacations: VacationModel[] = [];
}

const initialState: VacationsSliceState = {
    vacations: []
};

export const vacationsSlice = createSlice({
    name: "vacations",
    initialState,
    reducers: {
        getAllVacationsAction: (state, action: PayloadAction<VacationModel[]>) => {
            state.vacations = action.payload;
        },
        addVacationsAction: (state, action: PayloadAction<VacationModel>) => {
            state.vacations.push(action.payload);
        },
        editVacationAction: (state, action: PayloadAction<VacationModel>) => {
            const indexToUpdate = state.vacations.findIndex(vac => vac.id === action.payload.id);
            if (indexToUpdate >= 0) {
                state.vacations[indexToUpdate] = action.payload;
            }
        },
        deleteVacationAction: (state, action: PayloadAction<number>) => {
            const indexToDelete = state.vacations.findIndex(vac => vac.id === action.payload);
            if (indexToDelete >= 0) {
                state.vacations.splice(indexToDelete, 1);
            }
        },
    }
})

export const { getAllVacationsAction, addVacationsAction, editVacationAction, deleteVacationAction } = vacationsSlice.actions;

export default vacationsSlice.reducer;