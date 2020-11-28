import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';


const AreaInfo = (props) => {
    const { area } = props; 
    console.log(area, "<<<ARE INFO")
    
    return <div>
        {area && <GaugeChart
            nrOfLevels={16}
            percent={area.temp_avg/100}
            formatTextValue={(value) => `${value}° C`}
            textColor={"black"}
            needleColor={"gray"}
            id="1" />}
        {area && <h1>{props.area.name}</h1>}
    </div>
}

export default AreaInfo; 