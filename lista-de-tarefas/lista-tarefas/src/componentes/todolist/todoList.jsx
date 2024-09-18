import { useState, useEffect } from "react";
import {
  fetchTarefas,
  adicionarTarefa,
  atualizarTarefa,
  deletarTarefa,
  deletarTodasTarefas,
} from "../../api/api";
import "./todoList.css";
import Icone from "../../assets/Icone.jpg";
import EtiquetaList from "../etiquetas/add-etiqueta"; // Importe o componente EtiquetaList

function TodoList() {
  const [lista, setLista] = useState([]);
  const [novoItem, setNovoItem] = useState("");
  const [descricao, setDescricao] = useState("");
  const [mostrarEtiquetas, setMostrarEtiquetas] = useState(false); // Estado para controle da navegação
  const [websocket, setWebsocket] = useState(null); // Estado para armazenar o WebSocket
  const [wsReady, setWsReady] = useState(false);

  useEffect(() => {
    // Instancie o WebSocket dentro de useEffect
    const ws = new WebSocket("wss://didactic-fortnight-p7p79g49w5wh7xv6-8765.app.github.dev/");
    setWebsocket(ws);

    ws.onmessage = ({ data }) => {
      alert("SEGURA DEZ MIL A MÃE RECEBEU ESSA NOTIFICAÇÃO");
    };

    ws.onopen = () => {
      console.log("WebSocket conectado");
      setWsReady(true); // WebSocket está pronto para uso
    };

    ws.onclose = () => {
      console.log("WebSocket fechado");
      setWsReady(false); // WebSocket não está mais pronto
    };

    ws.onerror = (error) => {
      console.error("Erro no WebSocket:", error);
    };

  }, []);

  useEffect(() => {
    const carregarTarefas = async () => {
      try {
        const tarefas = await fetchTarefas();
        setLista(tarefas);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    carregarTarefas();
  }, []);

  useEffect(() => {
    localStorage.setItem("lista", JSON.stringify(lista));
  }, [lista]);

  async function adcionaItem(form) {
    form.preventDefault();
    if (!novoItem || !descricao) return;

    try {
      const novaTarefa = {
        nome: novoItem,
        descricao: descricao,
        etiqueta_id: null,
      };
      const tarefaAdicionada = await adicionarTarefa(novaTarefa).then(
        (response) => {
          console.log(response);
          notificarWebSocket();
        }
      );
      setLista((prevLista) => [...prevLista, tarefaAdicionada]);
      setNovoItem("");
      setDescricao("");
      document.getElementById("input-entrada").focus();
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  }

  function notificarWebSocket() {
    console.log("Notificar");
    const event = {
      type: "update"
    };
    websocket.send(JSON.stringify(event));
  }

  async function clicou(index) {
    const listaAux = [...lista];
    listaAux[index].isCompleted = !listaAux[index].isCompleted;
    setLista(listaAux);

    try {
      await atualizarTarefa(listaAux[index].id, listaAux[index]);
      console.log("Tarefa atualizada:", listaAux[index]);
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  }

  async function deleta(index) {
    const tarefaId = lista[index].id;
    const listaAux = [...lista];
    listaAux.splice(index, 1);
    setLista(listaAux);

    try {
      await deletarTarefa(tarefaId);
      console.log("Tarefa excluída com sucesso");
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  }

  async function deletaTudo() {
    setLista([]);

    try {
      await deletarTodasTarefas();
      console.log("Todas as tarefas excluídas com sucesso");
    } catch (error) {
      console.error("Erro ao excluir todas as tarefas:", error);
    }
  }

  return (
    <div>
      <button
        className="botaozin"
        onClick={() => setMostrarEtiquetas((prev) => !prev)}
      >
        {mostrarEtiquetas ? "Voltar para Tarefas" : "Ver Etiquetas"}
      </button>
      {mostrarEtiquetas ? (
        <EtiquetaList />
      ) : (
        <>
          <h1>Lista de tarefas</h1>
          <form onSubmit={adcionaItem}>
            <input
              id="input-entrada"
              value={novoItem}
              onChange={(e) => setNovoItem(e.target.value)}
              type="text"
              placeholder="Digite uma tarefa"
              required
            />
            <input
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              type="text"
              placeholder="Digite uma descrição"
              required
            />
            <button className="add" type="submit">
              Add
            </button>
          </form>
          <div className="listaTarefas">
            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {lista.length < 1 ? (
                <img className="icone-central" src={Icone} alt="Icone" />
              ) : (
                lista.map((item, index) => (
                  <div
                    key={item.id}
                    className={item.isCompleted ? "item-completo" : "item"}
                  >
                    <span onClick={() => clicou(index)}>{item.nome}</span>
                    <button onClick={() => deleta(index)} className="del">
                      Deletar
                    </button>
                  </div>
                ))
              )}
              {lista.length > 0 && (
                <button onClick={deletaTudo} className="deleteAll">
                  Deletar Todas
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoList;
