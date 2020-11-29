import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import { HomeOutlined } from "@ant-design/icons";
import BarChart from "../BarChart";
import Table from "../Table";
import "./style.css";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const LiveData = (props) => {
    const [showTemperature, setShowTemperature] = useState(true);
    const { data: { temperature, wireless, areas } } = props;
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
                style={{ height: '100%', borderRight: 0 }}
            >
                <SubMenu key="sub1" icon={<HomeOutlined />} title="Device Type">
                    <Menu.Item onClick={() => setShowTemperature(true)} key="1">Temperature</Menu.Item>
                    <Menu.Item onClick={() => setShowTemperature(false)} key="2">Wireless</Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
            <Content style={{ margin: '24px 16px 0' }}>
                <div className="live-data">
                    <div className="bar-chart">
                        <BarChart temperature={showTemperature} data={areas} />
                    </div>
                    <div className="data-table">
                        <Table data={showTemperature ? temperature : wireless} />
                    </div>
                </div>
            </Content>
        </Layout>
    </Layout>)
}

export default LiveData; 