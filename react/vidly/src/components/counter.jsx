import React, { Component } from 'react';

class Counter extends Component {
  render() {
    return (
      <div>
        <span className={this.getBadgeClasses()}> {this.formatValue()}</span>
        <button onClick={() => this.props.onIncrement(this.props.counter)} className="btn btn-secondary btn-sm">
          Increment
        </button>
        <button onClick={() => this.props.onDelete(this.props.counter.id)} className="btn btn-danger btn-sm m-2">
          Delete
        </button>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = 'badge m-2 badge-';
    return (classes += this.props.counter.value === 0 ? 'warning' : 'primary');
  }

  formatValue() {
    const { value } = this.props.counter;
    return value === 0 ? 'Zero' : value;
  }
}

export default Counter;

// Thorough example
// class Counter extends Component {
//   state = {
//     count: 0,
//     tags: ['tag1', 'tag2', 'tag3'],
//   };

// renderTags() {
//   if (this.state.tags.length === 0) return <p>No tags!</p>;
//   return this.state.tags.map((tag) => <li key={tag}>{tag}</li>);
// }

// render() {
//   return (
//     <div>
//       {this.state.tags.length === 0 && 'Please create a new tag'}
//       {this.renderTags()}
//     </div>
//   );
// }

//   // styles = {
//   //   fontSize: 14,
//   //   fontWeight: 'bold',
//   // };
//   // <span style={this.styles} className="badge badge-primary m-2"></span>

//   render() {
//     return (
//       <div>
//         <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
//         <button className="btn btn-secondary btn-sm">Increment</button>
//         <ul>
//           {this.state.tags.map((tag) => (
//             <li key={tag}>{tag}</li>
//           ))}
//         </ul>
//       </div>
//     );
//   }

//   getBadgeClasses() {
//     let classes = 'badge m-2 badge-';
//     classes += this.state.count === 0 ? 'warning' : 'primary';
//     return classes;
//   }

//   formatCount() {
//     const { count } = this.state;
//     return count === 0 ? 'Zero' : count;
//   }
// }
