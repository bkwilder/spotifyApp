import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell} from 'recharts';


export class GeneralGenresPieChart extends PureComponent {
    constructor(){
        super();
        this.state = {
            colors: ['#345995','#e40066','#03cea4','#f4b333','#fb4d3d']
        }
        this.renderLabel=this.renderLabel.bind(this)
     //    this.renderColor =this.renderColor.bind(this)
    }
    renderLabel(entry) {
         return entry.name;  
     }
 
   render() {
     return (
         <PieChart width={730} height={500}>
             <Pie data={this.props.generalGenres} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={200} label={this.renderLabel}>
             {this.props.generalGenres.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={this.state.colors[index % this.state.colors.length]}/>
             ))
             }
             </Pie>
 
         </PieChart>
     );
   }
 }
 


// export default class Example extends PureComponent {
//    constructor(){
//        super();
//        this.renderLabel=this.renderLabel.bind(this)
//    }
//    renderLabel(entry) {
//        if(entry.value >5) {
//         return entry.name;
//        }
       
        
//     }
//   render() {
//     return (
//         <PieChart width={730} height={500}>
//             <Pie data={this.props.genreCount} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={200} label={this.renderLabel} fill="#8884d8" />
//         </PieChart>
//     );
//   }
// }


