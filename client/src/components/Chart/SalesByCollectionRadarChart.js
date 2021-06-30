import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

// const data = [
//   {
//     subject: 'Hats',
//     A: 45
    
//   },
//   {
//     subject: 'Jackets',
//     A: 15
//   },
//   {
//     subject: 'Sneakers',
//     A: 5
//   },
//   {
//     subject: 'Womens',
//     A: 20
//   },
//   {
//     subject: 'Mens',
//     A: 15
//   }
// ];

export default class SalesByCollectionRadarChart extends PureComponent {
  

  render() {
      const data = this.props.data
      
    return (
     
        <RadarChart  width={500} height={400}cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="collection" />
          <PolarRadiusAxis angle={45} domain={[0, 50]} />
          <Radar name="% of Sales" dataKey="A" stroke="#8884d8" fill="blue" fillOpacity={0.6} />

        
          <Legend fill="blue"/>
        </RadarChart>
   
    );
  }
}
