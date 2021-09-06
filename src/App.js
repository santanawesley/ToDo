import React, { useEffect, useState } from 'react';
import {
  Icon_add,
  Icon_checked,
  Icon_delete,
  Icon_edit,
  Icon_order,
  Icon_unchecked,
} from './assets/icons';
import { Loading, Modal, Popper, ShowToast } from './shared';
import './index.css';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [titlePopper, setTitlePopper] = useState('');
  const [data, setData] = useState([]);
  const [orderActivity, setOrderActivity] = useState(true);
  const [orderStatus, setOrderStatus] = useState(true);

  useEffect(() => {
    (async function getToDoList() {
      setLoading(true);
      const mock = [
        {
          name: 'Levar filho na escola',
          completed: true,
          id: 1,
        },{
          name: 'Alimentar os cachorros',
          completed: true,
          id: 2,
        },
        {
          name: 'Levar filho na escola',
          completed: false,
          id: 3,
        },{
          name: 'Alimentar os cachorros',
          completed: false,
          id: 4,
        },
        {
          name: 'Levar filho na escola',
          completed: true,
          id: 5,
        },{
          name: 'Alimentar os cachorros',
          completed: false,
          id: 6,
        }
      ];

      try {
        setData(mock);
      } catch (e) {
        ShowToast('error', 'Algo aconteceu, tente novamente mais tarde!');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleAction = () => {
    setAnchorEl(null);
    if(titlePopper === 'Deseja excluir a atividade?')
    return console.log('OK, deletar tarefa');
    else console.log('OK Alterar Status')
  };

  const handleChangeStatus = (event) => {
    setTitlePopper('Deseja alterar o status?');
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleDelete = (event) => {
    setTitlePopper('Deseja excluir a atividade?');
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const order = (type) => {
    setOrderActivity(!orderActivity);
    setOrderStatus(!orderStatus);

    const orderedData = data.sort((a, b) => {
        if(type === 'activity') {
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
    <div className='app'>
      <h1 className='title'>
        Gerenciador de Tarefas
      </h1>

      <table>
        <thead>
          <tr key='trHead' className='sub-title'>
            <th className='title-activity column-description'>
              Atividade
              <section className='icon-svg tooltip icon'>
                <img alt='Ordenação por atividade' src={Icon_order} onClick={() => order('activity')}/>
                <span className='tooltip-text'>Ordenação</span>
              </section>
            </th>
            <th>
              <span className='title-status'>
                Concluído
                <section className='icon-svg tooltip icon'>
                  <img alt='Ordenação por conclusão' src={Icon_order} onClick={() => order('status')} />
                  <span className='tooltip-text'>Ordenação</span>
                </section>
              </span> 
            </th>
            <th colSpan='2' className='icon column-add'>
              <a href='#openModal'>
                <section className='icon-svg tooltip'>
                  <img alt='Adicionar nova tarefa' src={Icon_add} />
                  <span className='tooltip-text'>Nova tarefa</span>
                </section>
              </a>
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
          data.map((task) => {
            return <tr key={task.id}>
              <td className='column-description'>{task.name}</td>
              <td className='column-concluded'>
                <section className='icon-svg icon' onClick={(e) => handleChangeStatus(e)}>
                  {task.completed ?
                    <img alt='Editar tarefa' src={Icon_checked} /> : 
                    <img alt='Editar tarefa' src={Icon_unchecked} />
                  }
                </section>
              </td>
              <td className='column-actions icon'>
                <a href='#openModal'>
                  <section className='icon-svg tooltip'>
                    <img alt='Editar tarefa' src={Icon_edit} />
                    <span className='tooltip-text'>Editar</span>
                  </section>
                </a>
              </td>
              <td className='column-actions icon'>
              <section className='icon-svg tooltip' onClick={(e) => handleDelete(e)}>
                  <img alt='Excluir tarefa' src={Icon_delete}/>
                    <span className='tooltip-text'>Excluir</span>
                </section>
              </td>
            </tr>
          })
          ) : (
            <th colSpan={4}>
          <Loading />
          </th>
          )
        }
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
      <Modal />
    </div>
  );
};

export default App;
