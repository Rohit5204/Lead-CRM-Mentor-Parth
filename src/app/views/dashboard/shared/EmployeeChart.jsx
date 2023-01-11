import { useTheme } from '@mui/system';
import Chart from 'react-apexcharts'

export default function EmployeeLine() {
    const chartOptions = {
        lead: [{
            data: [580, 400, 430, 1100, 1200, 470, 540, 448, 690, 1380]
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: ['John', 'Arjun', 'Steve', 'Cloe', 'Dan', 'Fox', 'Ryan',
                    'Amanadel', 'Boxer', 'John S'
                ],
            }
        }
    }
    return (
        <div>
            <Chart
                options={chartOptions.options}
                series={chartOptions.lead}
                type='bar'
                height='350'
            />
        </div>
    );
}
