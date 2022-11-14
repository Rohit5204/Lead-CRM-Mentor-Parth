import { useTheme } from '@mui/system';
import ReactEcharts from 'echarts-for-react';

const LineGraph = ({ height, color = [] }) => {
  const theme = useTheme();

  const option = {
    grid: { top: '10%', bottom: '10%', left: '5%', right: '5%' },
    legend: {
      itemGap: 20,
      icon: 'circle',
      textStyle: { color: theme.palette.text.secondary, fontSize: 13, fontFamily: 'roboto' },
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 14,
        fontFamily: 'roboto',
        color: theme.palette.text.secondary,
      },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { color: theme.palette.text.secondary, opacity: 0.15 },
      },
      axisLabel: { color: theme.palette.text.secondary, fontSize: 13, fontFamily: 'roboto' },
    },
    series: [
      {
        data: [25, 42, 11, 45, 38, 92, 98, 25, 42, 11, 45, 38, 92, 98],
        type: 'line',
        stack: 'Employee',
        name: 'Employee',
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 },
      },
      {
        data: [30, 40, 20, 50, 40, 80, 90, 30, 40, 20, 50, 40, 80, 90],
        type: 'bar',
        stack: 'This month',
        name: 'This month',
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 },
      },
      {
        data: [20, 50, 15, 50, 30, 70, 95, 20, 50, 15, 50, 30, 70, 95],
        type: 'bar',
        stack: 'Last month',
        name: 'Last month',
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 },
      },
    ],
  };

  return <ReactEcharts style={{ height: height }} option={{ ...option, color: [...color] }} />;
};

export default LineGraph;
