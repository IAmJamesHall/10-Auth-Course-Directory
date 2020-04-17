import React from 'react';
import axios from 'axios';
import base64 from 'base-64';
import { Redirect } from 'react-router-dom';

// const DeleteCourse = async ({match, user, history}) => {
//   const { courseId} = match.params;
//   try {
//     const response = await axios({
//       method: "delete",
//       url: `http://localhost:5000/api/courses/${courseId}`,
//       headers: {
//         'Authorization': `Basic ${base64.encode(`${user.emailAddress}:${user.password}`)}`
//       }
//     })
//     this.props.history.push
//   } catch {
//     //TODO: user-friendly error message
//   }
// }


 const DeleteCourse = async({match, user, ...props}) => {
  const { courseId } = match.params;
  console.log('DeleteCourse user: ', props.user)
  
  const getResponse = await axios.get(`http://localhost:5000/api/courses/${courseId}`);
  debugger;
  if (getResponse.status !== 404) {
    const course = getResponse.data;
    console.log('course to delete: ', course);
    console.log('user.id ', user.userId);
    console.log('course.User.id: ', course.User.id);
    if (user.userId === course.User.id) {
      try {
        const deleteResponse = await axios({
          method: "delete",
          url: `http://localhost:5000/api/courses/${courseId}`,
          headers: {
            'Authorization': `Basic ${base64.encode(`${user.emailAddress}:${user.password}`)}`
          }
        })
        debugger;
        props.history.push('/courses');
      } catch {
        // TODO: display user friendly message
        console.log('unable to delete');
      }
  } else { //course not found
    props.history.push('/courses');
  }
  
    

  }

  return (
    <Redirect to="/courses" />
  )
}

export default DeleteCourse;