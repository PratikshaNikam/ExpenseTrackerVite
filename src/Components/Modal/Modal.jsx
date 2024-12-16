//import styles from './Modal.module.css';

import Modal from "react-modal";

export default function ModalWrapper({ isOpen, setIsOpen, children }) {
  const handleClose = () => {
    setIsOpen(false);
  };

  const customStyles = {
    content: {
      width: '95%',
      maxWidth: '572px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      height: 'fit-content',
      maxHeight: '90vh',
      borderRadius: '15px',
      padding: '2rem',
      background: 'rgba(239,239,239,0.85)',
      border: '0',
      
    }
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={customStyles}
      shouldCloseOnOverlayClick={true}

    
    >
      {children}
      
    </Modal>
  )
      
}