import React, { useState } from "react";

const SubmittedAssignments = ({data,member, closeAssignt}) => {
  const [assignments, setAssignments] = useState([
    { id: 1, studentName: "John Doe", title: "Math Homework", date: "2025-03-30" },
    { id: 2, studentName: "Jane Smith", title: "Physics Lab Report", date: "2025-03-29" },
    { id: 3, studentName: "Alice Johnson", title: "History Essay", date: "2025-03-28" },
  ]);

function onClose() {
  closeAssignt();

}


  return (
    <div className="container mt-4">
    <h3 onClick={()=>{onClose()}}>Close</h3>
      <h2 className="text-2xl font-bold mb-4">Submitted Assignments</h2>
      <table className="table table-striped">
        <thead className="bg-primary text-white">
          <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Assignment Title</th>
            <th>Submission Date</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <tr key={assignment.id}>
              <td>{index + 1}</td>
              <td>{assignment.studentName}</td>
              <td>{assignment.title}</td>
              <td>{assignment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmittedAssignments;
