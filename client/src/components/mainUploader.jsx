import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import ClassSection from './ClassSection';

function MainUploader() {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/');
    }
  }, [navigate]);

  const addClass = (className) => {
    setClasses([...classes, { name: className, subjects: [] }]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Class Management</h1>
      <AddClassForm addClass={addClass} />
      {classes.map((cls, index) => (
        <ClassSection key={index} classData={cls} />
      ))}
    </div>
  );
}

const AddClassForm = ({ addClass }) => {
  const [className, setClassName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addClass(className);
    setClassName('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        placeholder="Class name"
        className="border p-2 mr-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2">Add Class</button>
    </form>
  );
};

export default MainUploader;
