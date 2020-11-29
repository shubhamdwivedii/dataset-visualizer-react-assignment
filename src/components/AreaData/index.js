import React, { useState, useEffect } from 'react';
import TempGauge from "../TempGauge";
import AreaInfo from "../AreaInfo"; 
import AreaAll from "../AreaAll";
import { HomeOutlined } from "@ant-design/icons";
import { union, isEqual } from "lodash";
import { useHistory, Route } from "react-router-dom";
import { Layout, Menu } from 'antd';
const { SubMenu } = Menu; 
const {Content, Sider } = Layout; 


const AreaData = (props) => {
    const { data: { areas, areaList } } = props; 
    const history = useHistory(); 

    const selectArea = (areaName) => {
        const id = areaName.split(" ").join("_");
        history.push(`/area/${id}`);
    }
    
    return (<Layout>
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
                console.log(broken)
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', width: '200px', borderRight: 0 }}
            >
                <SubMenu key="sub1" icon={<HomeOutlined />} title="Select Area">
                    {areaList.map(nme => (<Menu.Item onClick={() => selectArea(nme)} key={nme.split(' ').join('_')}>{nme}</Menu.Item>))}
                </SubMenu>
            </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
            <Route path="/area/:id" render={(props) => (<AreaInfo {...props} areas={areas} />)} />
            <Route path="/area" exact render={(props) => (<AreaAll {...props} areas={areas} />)} />
        </Layout>
    </Layout>)
}

export default AreaData; 