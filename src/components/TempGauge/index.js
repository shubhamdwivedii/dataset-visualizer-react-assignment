import React from 'react'
import GaugeChart from "react-gauge-chart";

const TempGauge = (props) => {
    const { value, title } = props; 

    return <div>
        {value && <GaugeChart
             nrOfLevels={16}
             percent={value/100}
             formatTextValue={(val) => `${val}° C`}
             textColor={"black"}
             needleColor={"gray"}
             id="1"
        />}
        {title && <h2>{title}</h2>}
    </div>
}


export default TempGauge; 