import React from "react";
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Legend,
} from "bizcharts";

const TempChart = (props) => {
    const data = [
        {
            month: "Jan",
            city: "Tokyo",
            temperature: 7
        },
        {
            month: "Jan",
            city: "London",
            temperature: 3.9
        },
        {
            month: "Feb",
            city: "Tokyo",
            temperature: 6.9
        },
        {
            month: "Feb",
            city: "London",
            temperature: 4.2
        },
        {
            month: "Mar",
            city: "Tokyo",
            temperature: 9.5
        },
        {
            month: "Mar",
            city: "London",
            temperature: 5.7
        },
        {
            month: "Apr",
            city: "Tokyo",
            temperature: 14.5
        },
        {
            month: "Apr",
            city: "London",
            temperature: 8.5
        },
        {
            month: "May",
            city: "Tokyo",
            temperature: 18.4
        },
        {
            month: "May",
            city: "London",
            temperature: 11.9
        },
        {
            month: "Jun",
            city: "Tokyo",
            temperature: 21.5
        },
        {
            month: "Jun",
            city: "London",
            temperature: 15.2
        },
        {
            month: "Jul",
            city: "Tokyo",
            temperature: 25.2
        },
        {
            month: "Jul",
            city: "London",
            temperature: 17
        },
        {
            month: "Aug",
            city: "Tokyo",
            temperature: 26.5
        },
        {
            month: "Aug",
            city: "London",
            temperature: 16.6
        },
        {
            month: "Sep",
            city: "Tokyo",
            temperature: 23.3
        },
        {
            month: "Sep",
            city: "London",
            temperature: 14.2
        },
        {
            month: "Oct",
            city: "Tokyo",
            temperature: 18.3
        },
        {
            month: "Oct",
            city: "London",
            temperature: 10.3
        },
        {
            month: "Nov",
            city: "Tokyo",
            temperature: 13.9
        },
        {
            month: "Nov",
            city: "London",
            temperature: 6.6
        },
        {
            month: "Dec",
            city: "Tokyo",
            temperature: 9.6
        },
        {
            month: "Dec",
            city: "London",
            temperature: 4.8
        }
    ];
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