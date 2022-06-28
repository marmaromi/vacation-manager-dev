import { useEffect, useState } from 'react';
import { VictoryBar, VictoryChart, VictoryTooltip, Bar, VictoryAxis } from 'victory';
import { store } from '../../../Redux/Store';
import vacationsService from '../../../Services/VacationsService';
import "./Reports.css";

function Reports(): JSX.Element {

    const [followers, setFollowers] = useState<number[]>();

    useEffect(() => {
        const vacations = store.getState().vacationsStore.vacations;

        const followers: any[] = [];
        for (const vacation of vacations) {
            if (vacation.followers) {
                followers.push({ x: vacation.destination, y: vacation.followers });
            }
        }
        setFollowers(followers.sort((a, b) => b.y - a.y));
    }, [])

    return (
        <div className="Reports">
            <h2>Followers Chart</h2>
            <VictoryChart
                padding={{ top: 20, bottom: 30, left: 40, right: 20 }}
                domainPadding={{ x: 20 }}
            >
                <VictoryAxis
                    style={{
                        tickLabels: {
                            fontSize: 9
                        }
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
                {/* <VictoryBar
                    style={{
                        data: { fill: "#c43a31" },
                        labels: { fontSize: 12 },

                    }}
                    data={followers}
                    labels={({ datum }) => `Followers: ${datum.y}`}
                    labelComponent={<VictoryTooltip />}
                    dataComponent={
                        <Bar
                            tabIndex={0}
                            ariaLabel={({ datum }) => `x: ${datum.x}`}
                        />
                    }
                /> */}

            </VictoryChart>
        </div>
    );
}

export default Reports;
