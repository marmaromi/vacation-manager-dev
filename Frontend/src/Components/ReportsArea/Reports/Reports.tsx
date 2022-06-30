import { useEffect, useState } from 'react';
import { VictoryBar, VictoryChart, VictoryTooltip, Bar, VictoryAxis } from 'victory';
import VacationModel from '../../../Models/Vacation Model';
import { store } from '../../../Redux/Store';
import vacationsService from '../../../Services/VacationsService';
import "./Reports.css";

function Reports(): JSX.Element {

    const [followers, setFollowers] = useState<number[]>();

    useEffect(() => {
        let storeVacations = store.getState().vacationsStore.vacations;
        if (storeVacations.length === 0) {
            vacationsService.getAllVacations().then(vacations => getFollowers(vacations));
        }
        else {
            getFollowers(storeVacations);
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
