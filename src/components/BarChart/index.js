import React from 'react'
import { Chart, Interval, Tooltip } from 'bizcharts';

const BarChart = (props) => {
    const { data } = props;

    return (<Chart height={400} autoFit data={data}  interactions={['active-region']} padding="auto" >
        <Interval position="device_display_name*reading" />
        <Tooltip shared />
    </Chart>)
}

export default BarChart; 