import React from 'react';
import {Pie} from 'react-chartjs-2';
import './Home.css';

const data = {
	labels: [
		'Fats',
		'Carbs',
		'Protein'
	],
	datasets: [{
		data: [20, 35, 45],
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

export default class PieChart extends React.Component {
	

  render() {
		const data = {
			labels: [
				'Fats',
				'Carbs',
				'Protein'
			],
			datasets: [{
				data: [20, 35, 45],
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