import React from 'react'
import TempGauge from "../TempGauge";
import { useHistory } from "react-router-dom";

import { Layout } from "antd";
import "./styles.css";

const { Content } = Layout;

const AreaAll = (props) => {
    const history = useHistory(); 
    const { areas } = props;

    const showAreaInfo = (name) => {
        const id = name.split(" ").join("_");
        history.push(`/area/${id}`);
    }
    

    return <Content style={{ margin: '24px 16px 0' }}>
        <div className="areas-all">
            {areas.map(area => (<span onClick={() => showAreaInfo(area.name)} key={area.name} className="area-gauge">
                <TempGauge value={area.temp_avg} title={area.name} />
                {/* hellow */}
            </span>))}
        </div>
    </Content>
}

export default AreaAll;