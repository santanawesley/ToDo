import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dataList } from '../../redux/actions';
import api from "../../main/api";
import {
  Icon_add,
  Icon_checked,
  Icon_delete,
  Icon_edit,
  Icon_order,
  Icon_unchecked,
} from "../../assets/icons";
import { Loading, Modal, Popper, ShowToast } from "../../shared";
import { maskDate } from '../../shared/masks';
import "./styles.css";

const App = (props) => {
  const history = useHistory();
  const { dataList, dataToDo } = props;

  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [titlePopper, setTitlePopper] = useState("");
  const [data, setData] = useState([]);
  const [orderActivity, setOrderActivity] = useState(true);
  const [orderStatus, setOrderStatus] = useState(true);
  const [orderInclusion, setOrderInclusion] = useState(true);
  const [orderChange, setOrderChange] = useState(true);
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
        dataList(responseList);
      } catch (e) {
        setError(true);
        ShowToast("error", "Algo aconteceu, tente novamente mais tarde!");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    setData(dataToDo.value);
  }, [dataToDo]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

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

  const responseModal = async (response, data) => {
      if(response === 'yes') {
        const responseSave = await api.registerTasks(data);
        if(responseSave.ok === true) {
          ShowToast("success", "Inclusão realizada com sucesso!");
        }
      } else {
          return null;
      }
  };

  const handleDelete = (event, taskId) => {
    setTaskId(taskId);
    setTitlePopper("Deseja excluir a atividade?");
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const order = (type) => {
    setOrderActivity(!orderActivity);
    setOrderStatus(!orderStatus);
    setOrderInclusion(!orderInclusion);
    setOrderChange(!orderChange);

    const orderedData = data.sort((a, b) => {
      if (type === "activity") {
        if (a.name > b.name) {
          return orderActivity ? 1 : -1;
        }
        if (a.name < b.name) {
          return orderActivity ? -1 : 1;
        }
        return 0;
      } if(type === "status") {
        if (a.completed > b.completed) {
          return orderStatus ? 1 : -1;
        }
        if (a.completed < b.completed) {
          return orderStatus ? -1 : 1;
        }
        return 0;
      } if(type === "inclusion") {
        if (a.inserted_at > b.inserted_at) {
          return orderStatus ? 1 : -1;
        }
        if (a.inserted_at < b.inserted_at) {
          return orderStatus ? -1 : 1;
        }
        return 0;
    } else {
      if (a.updated_at > b.updated_at) {
        return orderStatus ? 1 : -1;
      }
      if (a.updated_at < b.updated_at) {
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
            {!matches ? <>
              <th>
                <span className="title-status">
                  Incluído
                  <section className="icon-svg tooltip icon">
                    <img
                      alt="Ordenação por data de inclusão"
                      src={Icon_order}
                      onClick={() => order("inclusion")}
                    />
                    <span className="tooltip-text">Ordenação</span>
                  </section>
                </span>
              </th>
              <th>
                <span className="title-status">
                  Alterado
                  <section className="icon-svg tooltip icon">
                    <img
                      alt="Ordenação por data de alteração"
                      src={Icon_order}
                      onClick={() => order("change")}
                    />
                    <span className="tooltip-text">Ordenação</span>
                  </section>
                </span>
              </th>
            </> : null}
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
          {!loading && data.length > 0 && (
              <tbody>
                {data.map((task) => {
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
                      {!matches ? <>
                        <td>{maskDate(task.inserted_at)}</td>
                        <td>{maskDate(task.updated_at)}</td>
                      </> : null}
                      <td className="column-actions icon">
                        <section
                          className="icon-svg tooltip"
                          onClick={() => 
                            history.push(`/edicao/${task.id}`)
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
                })}
              </tbody>
          )}
      </table>
      {!loading && data.length === 0 && (
       !error ? (
              <div colSpan={4} className="list-empty"> Sua listagem de tarefas está vazia </div>
            ) : (
              <div colSpan={4} className="error-get-list"> Houve um erro na busca de informações. <br /> Tente novamente mais tarde ou entre em contato com o suporte</div>
            )
            )}
            {loading && <div colSpan={4}>
              <Loading />
            </div>}

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
          responseModal={responseModal}
        />
      )}
      </div>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ dataList }, dispatch);

const mapStateToProps = store => ({
  dataToDo: store.dataList
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
