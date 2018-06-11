import React from 'react';
import {Pie} from 'react-chartjs-2';
import './Home.css';


export default class PieChart extends React.Component {
	
  render() {
		let {fats, carbs, protein} = this.props;
		const data = {
			labels: [
				'Fats',
				'Carbs',
				'Protein'
			],
			datasets: [{
				data: [fats, carbs, protein],
				backgroundColor: [
					'#FFCE56',
					'#36A2EB',
					'#FF6384'
				],
				hoverBackgroundColor: [
					'#FFCE56',
					'#36A2EB',
					'#FF6384'
				]
			}]
		};
    return (
        <Pie data={data} />
    );
  }
}