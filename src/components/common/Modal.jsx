// ModalView.js

import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        border: 'none',
        padding: '20px',
        width: '40%',
        height:'60%',
        backgroundColor: '#f4f4f4', 
      },
  };

 export function ModalView({ setModalOpen, modalOpen, children }) {
  

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Custom Content Modal"
      >
        
        {children}

      </Modal>
    </div>
  );
}


