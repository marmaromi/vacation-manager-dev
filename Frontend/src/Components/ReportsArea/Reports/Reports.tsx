import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VictoryBar, VictoryChart, VictoryTooltip, Bar, VictoryAxis } from 'victory';
import VacationModel from '../../../Models/Vacation Model';
import { store } from '../../../Redux/Store';
import notifyService from '../../../Services/NotifyService';
import vacationsService from '../../../Services/VacationsService';
import "./Reports.css";

function Reports(): JSX.Element {

    const navigate = useNavigate();
    const [followers, setFollowers] = useState<number[]>();

    useEffect(() => {
        if (!store.getState().authStore?.token) navigate("/login");
        if (store.getState().authStore?.user?.privileges !== "admin") navigate("/vacations");

        let vacations = store.getState().vacationsStore.vacations;
        if (vacations.length === 0) {
            vacationsService.getAllVacations()
                .then(vacations => getFollowers(vacations))
                .catch(err => notifyService.error(err));
        }
        else {
            getFollowers(vacations);
        }
    }, []);

    const getFollowers = (vacations: VacationModel[]): void => {
        const followers: any[] = [];
        for (const vacation of vacations) {
            if (vacation.followers) {
                followers.push({ x: vacation.destination, y: vacation.followers });
            }
        }
        setFollowers(followers.sort((a, b) => b.y - a.y));
    }


    return (
        <div className="Reports">
            <h2>Followers Chart</h2>
            <VictoryChart
                padding={{ top: 20, bottom: 30, left: 40, right: 20 }}
                domainPadding={{ x: 20 }}
            >
                <VictoryAxis
                    style={{
                        tickLabels: { fontSize: 9 }
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    orientation="left"
                    style={{ tickLabels: { fontSize: 10 } }}
                />
                <VictoryBar
                    barWidth={30}
                    style={{
                        data: { fill: "#c43a31" }
                    }}
                    data={followers}
                />
            </VictoryChart>
        </div>
    );
}

export default Reports;
