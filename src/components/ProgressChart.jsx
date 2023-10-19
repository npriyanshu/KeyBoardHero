import PropTypes from 'prop-types';
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const ProgressChart = ({ tests }) => {


    const date = [];
    const wpm = [];
    for (let index = 0; index < tests.length; index++) {
        date.push(String(new Date(tests[index].date)).split('G')[0]);
        wpm.push(tests[index].wpm);
        
    }

    const data = {
      labels: date,
      datasets: [
        {
          label: 'WPM Progress',
          data: wpm,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          pointBackgroundColor:'blue',
          fill: false,
        },
      ],
    };



 

  return (
    <Line
    options={{
      responsive: "true",
    }}
    data={data}
  />
  );
};

ProgressChart.propTypes = {
  tests: PropTypes.array.isRequired,
};

export default ProgressChart;
