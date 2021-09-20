import React, { useState } from "react";
import './styles.css';

const Modal = (props) => {
  const { closeModal, responseModal } = props;

  const [description, setDescription] = useState("");

  return (
    <div className="modal">
      <div>
        <div className="close" onClick={() => closeModal(false)}>
          X
        </div>
        <form>
          <h2 className="title-modal">Criar nova tarefa</h2>
          <p>
            Descrição: {" "}
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              autoFocus
            />
          </p>
          <p className="button-submit">
            <input type="submit" value="SALVAR" onClick={() => responseModal('yes', description)} />
          </p>
        </form>
      </div>
    </div>
  );
};

export default Modal;
