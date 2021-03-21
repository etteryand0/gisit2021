import React from 'react';
// import styled from 'styled-components'; 
import './modal.css';
import Modal from 'react-modal';
import mod from './modal.svg';

Modal.setAppElement('#root')

const Modal_ = ({showModal, setShowModal}) => {
  const closeModal = () => { setShowModal(false) }
  
  return (
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      contentLabel="sdlkfsdfl"
    >
      <img src={mod} width="100%" />
    </Modal>
  );
}

export default Modal_;
