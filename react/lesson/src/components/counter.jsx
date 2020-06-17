import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";

class Counter extends Component {
  componentDidUpdate(prevProps, prevState) {
    // Make Ajav request
    // console.log("prevProps", prevProps);
    // console.log("prevState", prevState);
    if (prevProps.counter.value !== this.props.counter.value) {
      // Ajax call and get new data from server
    }
  }

  componentWillUnmount() {
    // console.log("Counter - Unmount");
  }

  render() {
    // console.log("Counter - Rendered");
    return (
      <div className="row">
        <div className="col-1">
          <span className={this.getBadgeClasses()}>{this.formatValue()}</span>
        </div>
        <div className="col-1">
          <button
            onClick={() => this.props.onIncrement(this.props.counter)}
            className="btn btn-secondary btn-sm"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className="col-1">
          <button
            onClick={() => this.props.onDecrement(this.props.counter)}
            disabled={this.disableDecrement()}
            className="btn btn-secondary btn-sm"
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </div>
        <div className="col-1">
          <button
            onClick={() => this.props.onDelete(this.props.counter.id)}
            className="btn btn-danger btn-sm"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    );
  }

  disableDecrement() {
    const { value } = this.props.counter;
    return value === 0;
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    return (classes += this.props.counter.value === 0 ? "warning" : "primary");
  }

  formatValue() {
    const { value } = this.props.counter;
    return value;
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
