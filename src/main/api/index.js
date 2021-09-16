const url = "http://localhost:7000/api/todos";

export const api = {
  listTasks: async () => {
    return await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "aplication/json",
      },
    })
      .then((resp) => {
        return resp.json();
      });
  },

  listSpecificTasks: async (id) => {
    return await fetch(`${url}/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "aplication/json",
      },
    })
      .then((resp) => {
        return resp.json();
      });
  },

  registerTasks: async (name) => {
    const json = JSON.stringify({ name });
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "aplication/json",
      },
      body: json,
    }).then((resp) => {
        return resp;
    });
  },

  deleteTasks: async (id) => {
    return await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "aplication/json",
      },
    }).then((resp) => {
        return resp;
    });
  },

  editTask: async (id, name, completed) => {
    const json = JSON.stringify({ name, completed });
    return await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "aplication/json",
      },
      body: json,
    }).then((resp) => {
        return resp;
    });
  },
};

export default api;
