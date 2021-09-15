import React, { useEffect, useState } from "react";
import {
  Icon_add,
  Icon_checked,
  Icon_delete,
  Icon_edit,
  Icon_order,
  Icon_unchecked,
} from "./assets/icons";
import { Loading, Modal, Popper, ShowToast } from "./shared";
import "./index.css";
import api from "./api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [titlePopper, setTitlePopper] = useState("");
  const [data, setData] = useState([]);
  const [orderActivity, setOrderActivity] = useState(true);
  const [orderStatus, setOrderStatus] = useState(true);
  const [taskId, setTaskId] = useState();
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState({
    name: "",
    completed: false,
  });
  const [dataModal, setDataModal] = useState({
    type: "",
    title: "",
    name: "",
    completed: false,
    id: null,
  });

  useEffect(() => {
    (async function getToDoList() {
      setLoading(true);
        try {
        const responseList = await api.listTasks();
        setData(responseList);
      } catch (e) {
        setError(true);
        ShowToast("error", "Algo aconteceu, tente novamente mais tarde!");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleAction = async () => {
    setAnchorEl(null);
    if (titlePopper === "Deseja excluir a atividade?") {
      const responseDelete = await api.deleteTasks(taskId);
      if (responseDelete.ok === true) {
        let index;
        data.forEach((task, idx) => {
          if (task.id === taskId) {
            index = idx;
          }
        });
        data.splice(index, 1);
        setTaskId(0);
        return ShowToast("success", "Tarefa excluída com sucesso!");
      } else {
        ShowToast("error", "Algo aconteceu, tente novamente mais tarde!");
      }
    } else {
      const responseEditTask = await api.editTask(
        taskId,
        editTask.name,
        editTask.completed
      );
      if (responseEditTask.ok === true) {
        data.map((task) => {
          if (task.id === taskId) {
            task.completed = !task.completed;
          }
          return task;
        });
        setTaskId(0);
        return ShowToast("success", "Alteração realizada com sucesso!");
      } else {
        ShowToast("error", "Algo aconteceu, tente novamente mais tarde!");
      }
    }
  };

  const handleChangeStatus = (event, taskId) => {
    setTaskId(taskId);
    data.forEach((task) => {
      if (task.id === taskId) {
        setEditTask({
          name: task.name,
          completed: !task.completed,
        });
      }
    });
    setTitlePopper("Deseja alterar o status?");
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleCreate = () => {
    setDataModal({
      type: "create",
      title: "Criar nova tarefa",
      name: "",
      completed: false,
      id: null,
    });
    setShowModal(true);
  };

  const handleEdit = (id, name, completed) => {
    setDataModal({
      type: "edit",
      title: "Editar tarefa",
      name,
      completed,
      id,
    });
    setShowModal(true);
  };

  const handleDelete = (event, taskId) => {
    setTaskId(taskId);
    setTitlePopper("Deseja excluir a atividade?");
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const order = (type) => {
    setOrderActivity(!orderActivity);
    setOrderStatus(!orderStatus);

    const orderedData = data.sort((a, b) => {
      if (type === "activity") {
        if (a.name > b.name) {
          return orderActivity ? 1 : -1;
        }
        if (a.name < b.name) {
          return orderActivity ? -1 : 1;
        }
        return 0;
      } else {
        if (a.completed > b.completed) {
          return orderStatus ? 1 : -1;
        }
        if (a.completed < b.completed) {
          return orderStatus ? -1 : 1;
        }
        return 0;
      }
    });
    setData(orderedData);
  };

  return (
    <div className="app">
      <h1 className="title">Gerenciador de Tarefas</h1>

      <table>
        <thead>
          <tr key="trHead" className="sub-title">
            <th className="title-activity column-description">
              Atividade
              <section className="icon-svg tooltip icon">
                <img
                  alt="Ordenação por atividade"
                  src={Icon_order}
                  onClick={() => order("activity")}
                />
                <span className="tooltip-text">Ordenação</span>
              </section>
            </th>
            <th>
              <span className="title-status">
                Concluído
                <section className="icon-svg tooltip icon">
                  <img
                    alt="Ordenação por conclusão"
                    src={Icon_order}
                    onClick={() => order("status")}
                  />
                  <span className="tooltip-text">Ordenação</span>
                </section>
              </span>
            </th>
            <th colSpan={2} className="icon column-add">
              <section
                className="icon-svg tooltip"
                onClick={() => handleCreate()}
              >
                <img alt="Adicionar nova tarefa" src={Icon_add} />
                <span className="tooltip-text">Nova tarefa</span>
              </section>
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            data.length > 0 ? (
              data.map((task) => {
                return (
                  <tr key={task.id}>
                    <td className="column-description">{task.name}</td>
                    <td className="column-concluded">
                      <section
                        className="icon-svg icon"
                        onClick={(e) => handleChangeStatus(e, task.id)}
                      >
                        {task.completed ? (
                          <img
                            alt="Alterar status da tarefa"
                            src={Icon_checked}
                          />
                        ) : (
                          <img
                            alt="Alterar status da tarefa"
                            src={Icon_unchecked}
                          />
                        )}
                      </section>
                    </td>
                    <td className="column-actions icon">
                      <section
                        className="icon-svg tooltip"
                        onClick={() =>
                          handleEdit(task.id, task.name, task.completed)
                        }
                      >
                        <img alt="Editar tarefa" src={Icon_edit} />
                        <span className="tooltip-text">Editar</span>
                      </section>
                    </td>
                    <td className="column-actions icon">
                      <section
                        className="icon-svg tooltip"
                        onClick={(e) => handleDelete(e, task.id)}
                      >
                        <img alt="Excluir tarefa" src={Icon_delete} />
                        <span className="tooltip-text">Excluir</span>
                      </section>
                    </td>
                  </tr>
                );
              })
            ) : !error ? (
              <th colSpan={4} className="list-empty"> Sua listagem de tarefas está vazia </th>
            ) : (
              <th colSpan={4} className="error-get-list"> Houve um erro na busca de informações. <br /> Tente novamente mais tarde ou entre em contato com o suporte</th>
            )
          ) : (
            <th colSpan={4}>
              <Loading />
            </th>
          )}
        </tbody>
      </table>

      {anchorEl ? (
        <Popper
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          id={id}
          handleChange={handleAction}
          title={titlePopper}
        />
      ) : null}
      {showModal && (
        <Modal
          dataModal={dataModal}
          closeModal={(value) => setShowModal(value)} 
        />
      )}

      <div>
        <ToastContainer />
      </div>
      </div>
  );
};

export default App;
