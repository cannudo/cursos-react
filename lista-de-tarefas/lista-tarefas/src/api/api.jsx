// src/api.js

const API_TAREFAS_URL = "http://localhost:5000/tarefas/";

// URL da API Gateway para etiquetas
const API_ETIQUETAS_URL = "http://localhost:5000/etiquetas/";

// Mudar GATEWAY_URL de acordo com o ambiente
const GATEWAY_URL = "https://didactic-fortnight-p7p79g49w5wh7xv6-5000.app.github.dev/";

// Função para buscar etiquetas
export async function fetchEtiquetas() {
  try {
    const response = await fetch(GATEWAY_URL + "etiquetas/");
    if (!response.ok) {
      throw new Error(`Erro ${response.status}`);
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Erro ao buscar etiquetas:", error);
    throw error;
  }
}

// Função para adicionar uma nova etiqueta
export async function adicionarEtiqueta(etiqueta) {
  try {
    const response = await fetch(GATEWAY_URL + "etiquetas/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(etiqueta),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Erro ${response.status}: ${JSON.stringify(errorData)}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao adicionar etiqueta:", error);
    throw error;
  }
}

// Função para deletar uma etiqueta
export async function deletarEtiqueta(etiquetaId) {
  try {
    const response = await fetch(`${GATEWAY_URL}etiquetas/${etiquetaId}/`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Erro ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Erro ao excluir etiqueta:", error);
    throw error;
  }
}

// Função para buscar tarefas
export async function fetchTarefas() {
  try {
    const response = await fetch(GATEWAY_URL + "tarefas/");
    if (!response.ok) {
      throw new Error(`Erro ${response.status}`);
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    throw error;
  }
}

// Função para adicionar uma nova tarefa
export async function adicionarTarefa(tarefa) {
  try {
    const response = await fetch(GATEWAY_URL + "tarefas/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarefa),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Erro ${response.status}: ${JSON.stringify(errorData)}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error);
    throw error;
  }
}

// Função para atualizar uma tarefa
export async function atualizarTarefa(tarefaId, tarefaAtualizada) {
  try {
    const response = await fetch(`${GATEWAY_URL}tarefas/${tarefaId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarefaAtualizada),
    });
    if (!response.ok) {
      throw new Error(`Erro ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    throw error;
  }
}

// Função para deletar uma tarefa
export async function deletarTarefa(tarefaId) {
  try {
    const response = await fetch(`${GATEWAY_URL}tarefas/${tarefaId}/`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Erro ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
    throw error;
  }
}

// Função para deletar todas as tarefas
export async function deletarTodasTarefas() {
  try {
    const response = await fetch(API_TAREFAS_URL, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Erro ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Erro ao excluir todas as tarefas:", error);
    throw error;
  }
}
