import Modal from 'react-bootstrap/Modal';

function FormModal(props) {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header className="modal-header">
        <Modal.Title>{props.title}</Modal.Title>
        <button
          closeButton
          onClick={props.onCloseClick}
          className="modal-close"
        >
          X
        </button>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
}

export default FormModal;
