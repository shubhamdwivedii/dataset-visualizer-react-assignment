import React from 'react'
import { Table } from "antd";
import moment from "moment"; 

const columns = [
    {
        title: 'Name',
        dataIndex: 'device_display_name',
        key: 'device_display_name',
    },
    {
        title: 'Temperature',
        dataIndex: 'reading',
        key: 'reading',
        render: (temp) => `${Math.round(temp * 100)/100}° C`
    },
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
        render: (time) => moment(time).format('MMMM Do YYYY, h:mm:ss a')
    }
];

const CustomTable = (props) => {
    return <Table dataSource={props.data} columns={columns} />
}


export default CustomTable; 