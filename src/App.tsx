import React, { useState } from 'react';
import Modal from './Modal';
import './App.css';

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="App">
      <button onClick={() => setModalOpen(true)}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2>Modal Content</h2>
        <p>This is the content of the modal.</p>
      </Modal>
    </div>
  );
};

export default App;
