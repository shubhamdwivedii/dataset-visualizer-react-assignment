import React from 'react'
import { Chart, Interval, Tooltip } from 'bizcharts';

const BarChart = (props) => {
    const { data, temperature } = props;

    const position = `name*${temperature ? 'temp_avg' : 'wrlss_avg'}`;

    return (<Chart height={750} autoFit data={data}  interactions={['active-region']} padding="auto" >
        <Interval position={position} />
        <Tooltip shared />
    </Chart>)
}

export default BarChart; 