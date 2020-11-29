import React from "react";
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Legend,
} from "bizcharts";

const TempChart = (props) => {
    
    const cols = {
        time: {
            range: [0, 1]
        }
    };
    return (
        <Chart height={400} data={props.data} scale={cols} autoFit>
            <Legend />
            <Axis name="month" />
            <Axis
                name="temperature"
                label={{
                    formatter: val => `${val}°C`
                }}
            />
            <Tooltip
                useHtml
                g2-tooltip={{
                    boxShadow: 'none',
                    color: '#fff',
                    backgroundColor: '#222'
                }}
                crosshairs={{
                    type: "y"
                }}
                style={{
                    color: 'red'
                }}
            />
            <Geom
                type="line"
                position="time*reading"
                size={2}
                color={"type"}
                shape={"smooth"}
            />
            <Geom
                type="point"
                position="time*reading"
                size={4}
                shape={"circle"}
                color={"type"}
                style={{
                    stroke: "#fff",
                    lineWidth: 1
                }}
            />
        </Chart>
    );
}

export default TempChart; 