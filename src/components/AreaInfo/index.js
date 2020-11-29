import React, { useEffect, useState } from 'react'
import TempGauge from "../TempGauge";
import TempChart from "../TempChart";
import { Layout } from "antd";
import "./styles.css";

const { Content } = Layout;




const AreaInfo = (props) => {
    const { areas, match: { params } } = props;
    const [area, setArea] = useState(null)
    const areaId = params.id;

    useEffect(() => {
        const areaData = areas.find(area => area.name.split(' ').join('_') === areaId);
        if (areaData) {
            setArea(areaData);
        }
    }, [areaId, areas, setArea])

    if (!area) {
        return <span className="no-data">No Data Available For this area</span>
    }

    const chartData = [...area.wrlss_data, ...area.temp_data].sort((a,b) => {
        if (new Date(a.time) < new Date(b.time)) {
            return -1; 
        }

        if (new Date(a.time) > new Date(b.time)) {
            return 1;
        } 
        return 0; 
    })

    return (<Content style={{ margin: '24px 16px 0' }}>
        <div className="area-info">
            <div className="top-section">
                {area.temp_avg ? (<TempGauge value={area.temp_avg} title={"Temperature"} />) : null}
                <span className="area-title">{area.name}</span>
                {area.wrlss_avg ? <TempGauge value={area.wrlss_avg} title={"Wireless"} /> : null}
            </div>
            <div className="bottom-section">
                <TempChart data={chartData} title={area.name} />
            </div>
            {/* {area.readings.map(data => (<span id={data.time}>{data.reading}___{data.time}</span>))} */}
        </div>
    </Content>
    )
}

export default AreaInfo; 