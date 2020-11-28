import React, { useState, useReducer, useEffect } from 'react'
import Table from "../Table";
import BarChart from "../BarChart";
import AreaInfo from "../AreaInfo";
import { uniqBy, map, union } from "lodash";
import { reducer, initialState } from "../../services/reducer";
import "./styles.css";



const Dashboard = (props) => {
    const [selectedArea, setSelectedArea] = useState(null)
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        dispatch({ type: "NEXT_POLL" });
        const interval = setInterval(() => {
            dispatch({ type: "NEXT_POLL" })
        }, 2000);
        return () => {
            clearInterval(interval);
        }
    },[dispatch])

    const { temperature, areas } = state;
    const areaNames = map(areas, 'name'); 

    return <div className="dashboard">
        <div className="area-info">
            <AreaInfo area={areas.find(area => area.name === selectedArea)} />
            <div className="area-select">
                {areaNames.map(area => (<button onClick={() => setSelectedArea(area)} key={area}>{area}</button>))}
            </div>
        </div>
        <div className="live-data">
            <div className="bar-chart">
                <BarChart data={temperature} />
            </div>
            <div className="data-table">
                <Table data={temperature} />
            </div>
        </div>
    </div>
}

export default Dashboard;