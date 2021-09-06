import React from 'react';

const Modal = () => {
  return <div id='openModal' className='modal'>
    <div>
      <a href='#open' title='Fechar' className='close'>x</a>
      <form action='getform.php' method='get'>
        <h2>Adicionar nova tarefa</h2>
        <p>Descrição: 
          <input type='text' />
        </p>
        <p>Concluído: 
          <input type='radio' name='status' value='yes'/> Sim
          <input type='radio' name='status' value='no'/> Não
        </p>
        <p className='button-submit'>
          <input type='submit' value='SALVAR' disabled />
        </p>
      </form>
    </div>
  </div>
}

export default Modal;
