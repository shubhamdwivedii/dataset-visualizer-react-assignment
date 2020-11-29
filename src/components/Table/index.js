import React from 'react'
import { Table } from "antd";
import moment from "moment"; 

const columns = [
    {
        title: 'Name',
        dataIndex: 'device_display_name',
        key: 'device_display_name',
    },
    // {
    //     title: 'Type',
    //     dataIndex: 'device_type',
    //     key: 'device_type',
    // },
    {
        title: 'Temprature',
        dataIndex: 'reading',
        key: 'reading',
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