import React, { useReducer, useEffect } from 'react'
import AreaData from "../AreaData";
import LiveData from "../LiveData";
import { Layout, Menu } from 'antd';
import { DashboardOutlined, BarChartOutlined } from "@ant-design/icons";
import { reducer, initialState } from "../../services/reducer";
import { Route, Link, Redirect } from "react-router-dom";
import "./styles.css";

const { Header } = Layout;

const Dashboard = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        dispatch({ type: "NEXT_POLL" });
        const interval = setInterval(() => {
            dispatch({ type: "NEXT_POLL" })
        }, 10000);
        return () => {
            clearInterval(interval);
        }
    }, [dispatch])

    const { temperature, wireless, areas, areaList } = state;

    console.log("Dashboard Rerender")

    return (<Layout style={{height:"100vh"}}>
        <Header className="header">
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item onClick={() => console.log("Area DAta")} key="1" icon={<DashboardOutlined />}>
                    <Link to="/area">Area Data</Link>
                </Menu.Item>
                <Menu.Item onClick={() => console.log("Live Data")} key="2" icon={<BarChartOutlined />}>
                    <Link to="/live">Live Data</Link>
                </Menu.Item>
            </Menu>
        </Header>

        <Route path="/" exact render={(props) => <Redirect to="/area" {...props} />}/>
        <Route path="/live" render={(props) => <LiveData {...props} data={{ temperature, wireless, areas }} />} />
        <Route path="/area" component={(props) => <AreaData {...props} data={{ areas, areaList }} />} />
            {/* <Footer style={{ textAlign: 'center' }}></Footer> */}
    </Layout>)
}

export default Dashboard;