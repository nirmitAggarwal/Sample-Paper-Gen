import React, { useState } from 'react';
import SubjectSection from './SubjectSection.jsx';

const ClassSection = ({ classData }) => {
  const [subjects, setSubjects] = useState(classData.subjects);

  const addSubject = (subjectName) => {
    setSubjects([...subjects, { name: subjectName, images: [] }]);
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl mb-2">{classData.name}</h2>
      <AddSubjectForm addSubject={addSubject} />
      {subjects.map((subject, index) => (
        <SubjectSection key={index} subjectData={subject} className={classData.name} />
      ))}
    </div>
  );
};

const AddSubjectForm = ({ addSubject }) => {
  const [subjectName, setSubjectName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addSubject(subjectName);
    setSubjectName('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={subjectName}
        onChange={(e) => setSubjectName(e.target.value)}
        placeholder="Subject name"
        className="border p-2 mr-2"
        required
      />
      <button type="submit" className="bg-green-500 text-white p-2">Add Subject</button>
    </form>
  );
};

export default ClassSection;
