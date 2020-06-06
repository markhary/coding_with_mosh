import React, { Component } from 'react';

class Counter extends Component {
  state = {
    count: 0,
    tags: ['tag1', 'tag2', 'tag3'],
  };

  // old way of doing binding this
  // constructor() {
  //   super();
  //   this.handleIncrement = this.handleIncrement.bind(this);
  // }

  // This is a much cleaner method
  handleIncrement = (product) => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <span className={this.getBadgeClasses()}> {this.formatCount()}</span>
        <button onClick={() => this.handleIncrement({ id: 1 })} className="btn btn-secondary btn-sm">
          Increment
        </button>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = 'badge m-2 badge-';
    return (classes += this.state.count === 0 ? 'warning' : 'primary');
  }

  formatCount() {
    const { count } = this.state;
    return count === 0 ? 'Zero' : count;
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
