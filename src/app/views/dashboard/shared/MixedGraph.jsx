import { useTheme } from '@mui/system';
import ReactEcharts from 'echarts-for-react';
import ApexChart from 'apexcharts'

export default function SampleLine() {
    const series = [
        {
            name: "Temperature in Fahrenheit", //will be displayed on the y-axis
            data: [43, 53, 50, 57]
        }
    ];
    const options = {
        chart: {
            id: "simple-bar"
        },
        xaxis: {
            categories: [1, 2, 3, 4] //will be displayed on the x-asis
        }
    };
    return (
        <div>
            <ApexChart options={options} type="bar" series={series} width="80%" />
        </div>
    );
}
