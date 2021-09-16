import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { api } from "../../main/api";
import { Loading, Popper, ShowToast } from "../../shared";
import "./styles.css";

const EditTask = () => {
  const params = useParams(null);
  const history = useHistory(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dataTask, setDataTask] = useState({
    name: "",
    completed: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async function getTask() {
      try {
        const responseTask = await api.listSpecificTasks(params.id);
        if (responseTask) {
          setDataTask({
            name: responseTask.name,
            completed: responseTask.completed,
          });
        } else {
          ShowToast("error", "Algo aconteceu, tente novamente mais tarde!");
        }
      } catch {
        ShowToast("error", "Algo aconteceu, tente novamente mais tarde!");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const saveTask = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const handleAction = async () => {
    setLoading(true);
    try {
      const responseEditTask = await api.editTask(
        params.id,
        dataTask.name,
        dataTask.completed
      );
      if (responseEditTask.ok === true) {
        history.push("/home");
      } else {
        ShowToast("error", "Algo aconteceu, tente novamente mais tarde!");
      }
    } catch {
      ShowToast("error", "Algo aconteceu, tente novamente mais tarde!");
      alert("Deu ruim");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit">
      <div>
        {!loading ? (
          <form>
            <h2 className="title-edit">Edição de Tarefas</h2>
            <p>
              Descrição:{" "}
              <input
                type="text"
                onChange={(e) =>
                  setDataTask({
                    ...dataTask,
                    name: e.target.value,
                  })
                }
                defaultValue={dataTask.name}
              />
            </p>
            <p>
              Concluído:
              <input
                type="radio"
                name="status"
                value="yes"
                id="yes"
                onChange={() =>
                  setDataTask({
                    ...dataTask,
                    completed: true,
                  })
                }
                checked={dataTask.completed}
              />
              <label htmlFor="yes"> Sim </label>
              <input
                type="radio"
                name="status"
                value="no"
                id="no"
                onChange={() =>
                  setDataTask({
                    ...dataTask,
                    completed: false,
                  })
                }
                checked={!dataTask.completed}
              />
              <label htmlFor="no"> Não </label>
            </p>
            <div className="buttons">
              <p className="button-submit">
                <div onClick={(e) => saveTask(e)}>"SALVAR"</div>
              </p>
              <p className="button-submit">
                <input
                  type="submit"
                  value="CANCELAR"
                  onClick={() => history.push(`/home`)}
                />
              </p>
            </div>
          </form>
        ) : (
          <Loading />
        )}
      </div>
      {anchorEl ? (
        <Popper
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          id={params.id}
          handleChange={handleAction}
          title={"Deseja salvar essa alteração?"}
        />
      ) : null}
    </div>
  );
};

export default EditTask;
