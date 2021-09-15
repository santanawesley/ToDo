import React, { useEffect, useState } from "react";
import { api } from "../../api";
import { ShowToast } from "../index";

const Modal = (props) => {
  const { closeModal, dataModal } = props;

  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setDescription(dataModal.name);
    setCompleted(dataModal.completed);
  }, []);

  const saveTask = async () => {
    if (dataModal.type === "create") {
      const responseSave = await api.registerTasks(description);
      if(responseSave.ok === true) {
        ShowToast("success", "Inclusão realizada com sucesso!");
      }
    } else {
      const responseEditTask = await api.editTask(dataModal.id, description, completed);
      if (responseEditTask.ok === true) {
        ShowToast("success", "Alteração realizada com sucesso!");
      }
    }
  };

  return (
    <div className="modal">
      <div>
        <div className="close" onClick={() => closeModal(false)}>
          X
        </div>
        <form>
          <h2 className="title-modal">{dataModal.title}</h2>
          <p>
            Descrição: {" "}
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={dataModal.name}
            />
          </p>
          {dataModal.type === "edit" ? (
            <>
              <p>
                Concluído:
                <input
                  type="radio"
                  name="status"
                  value="yes"
                  id="yes"
                  onClick={() => setCompleted(true)}
                  checked={completed}
                />
                  <label for="yes"> Sim </label>
                <input
                  type="radio"
                  name="status"
                  value="no"
                  id="no"
                  onClick={() => setCompleted(false)}
                  checked={!completed}
                />
                <label for="no"> Não </label >
              </p>
            </>
          ) : null}
          <p className="button-submit">
            <input type="submit" value="SALVAR" onClick={() => saveTask()} />
          </p>
        </form>
      </div>
    </div>
  );
};

export default Modal;
