import React, { useState } from "react";
import { api } from "../../main/api";
import { ShowToast } from "../index";
import './styles.css';

const Modal = (props) => {
  const { closeModal } = props;

  const [description, setDescription] = useState("");

  const saveTask = async () => {
    const responseSave = await api.registerTasks(description);
    if(responseSave.ok === true) {
      ShowToast("success", "Inclusão realizada com sucesso!");
    }
  };

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
            />
          </p>
          <p className="button-submit">
            <input type="submit" value="SALVAR" onClick={() => saveTask()} />
          </p>
        </form>
      </div>
    </div>
  );
};

export default Modal;
