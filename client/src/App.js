import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

// function App() {
//   axios.get('http://localhost:5000/api/courses')
//     .then(courses => courses.data.map(course => <li>course.title</li>))
//     .then(courseTitles => {
//       return (
//         <div className="App">
//           <ul>
//             <li>{courseTitles}</li>
//           </ul>
//         </div>
//       )
//     })
//     .catch(err => console.log('ERROR: ', err))
// }

class App extends Component {
  state = {
    courses: []
  };

  async componentDidMount() {
    const courses = await axios.get('http://localhost:5000/api/courses');
    const courseTitles = courses.data.map(course => <li>{course.title}</li>);
    this.setState({ courses: courseTitles });
  }
  render() {
    return (
      <div className="App">
      <ul>{this.state.courses}</ul>
    </div>
    )
  }
}

export default App;
