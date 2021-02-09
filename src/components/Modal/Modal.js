import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './modal.scss';

const ModalComponent = (props) => {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.keyword}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={props.link} alt="gif" className="modal__img" />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
