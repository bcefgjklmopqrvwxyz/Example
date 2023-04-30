import React from 'react';
import Chart from 'react-apexcharts';
import { CCard, CCardBody } from '@coreui/react';
import ApexCharts from 'apexcharts';
import TestCodeComponent from "./TestCodeComponent";
import TestCodeCom2 from "./TestCodeCom2";

const chartOptions = {
    chart: {
        id: 'basic-bar'
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
};

const chartData = [
    {
        name: 'sales',
        data: [30, 40, 25, 50, 49, 21, 70, 51, 49, 30, 70, 91]
    }
];

const TestCode = () => {


    return (
        <div>
            <TestCodeCom2 name="Mg Mg" age="12" address="Yangon" />
            <TestCodeComponent name="Sara" />
            <TestCodeComponent name="Nice" />
            <TestCodeCom2 name="Ma Ma" age="13" address="Singapore" />
            <br></br>
            <CCard>
                <CCardBody>
                    <Chart options={chartOptions} series={chartData} type="bar" height={350} />
                </CCardBody>
            </CCard>
        </div>
    )
}

export default TestCode;
