import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data01 = [
    {
      "name": "Group A",
      "value": 400
    },
    {
      "name": "Group B",
      "value": 300
    },
    {
      "name": "Group C",
      "value": 300
    },
    {
      "name": "Group D",
      "value": 200
    },
    {
      "name": "Group E",
      "value": 278
    },
    {
      "name": "Group F",
      "value": 189
    }
  ];

export default class Example extends PureComponent {
   constructor(){
       super();
       this.renderLabel=this.renderLabel.bind(this)
   }
   renderLabel(entry) {
       if(entry.value >5) {
        return entry.name;
       }
       
        
    }
  render() {
    return (
        <PieChart width={730} height={500}>
            <Pie data={this.props.genreCount} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={200} label={this.renderLabel} fill="#8884d8" />
        </PieChart>
    );
  }
}
