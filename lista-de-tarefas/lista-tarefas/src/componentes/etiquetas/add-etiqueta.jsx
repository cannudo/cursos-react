// src/componentes/EtiquetaList.jsx

import { useState, useEffect } from "react";
import {
  fetchEtiquetas,
  adicionarEtiqueta,
  deletarEtiqueta,
} from "../../api/api";
import "./add-etiqueta.css";

function EtiquetaList() {
  const [etiquetas, setEtiquetas] = useState([]);
  const [novaEtiqueta, setNovaEtiqueta] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    const carregarEtiquetas = async () => {
      try {
        const etiquetas = await fetchEtiquetas();
        setEtiquetas(etiquetas);
      } catch (error) {
        console.error("Erro ao buscar etiquetas:", error);
      }
    };

    carregarEtiquetas();
  }, []);

  async function adicionarNovaEtiqueta(form) {
    form.preventDefault();
    if (!novaEtiqueta || !descricao) return; // Verifique se o campo está preenchido
    try {
      const newEtiqueta = {
        titulo: novaEtiqueta,
        descricao: descricao,
      };

      const etiquetaAdicionada = await adicionarEtiqueta(newEtiqueta);
      setEtiquetas((prevEtiquetas) => [...prevEtiquetas, etiquetaAdicionada]);
      setNovaEtiqueta("");
      setDescricao("");
      document.getElementById("input-entrada").focus();
    } catch (error) {
      console.error("Erro ao adicionar etiqueta:", error);
    }
  }

  function removerEtiqueta(id) {
    deletarEtiqueta(id)
      .then(() => {
        setEtiquetas((prevEtiquetas) =>
          prevEtiquetas.filter((etiqueta) => etiqueta.id !== id)
        );
      })
      .catch((error) => console.error("Erro ao excluir etiqueta:", error));
  }

  return (
    <div>
      <h1>Lista de Etiquetas</h1>
      <form onSubmit={adicionarNovaEtiqueta}>
        <input
          value={novaEtiqueta}
          onChange={(e) => setNovaEtiqueta(e.target.value)}
          type="text"
          placeholder="Digite o nome da etiqueta"
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
          Adicionar
        </button>
      </form>
      <div className="listaEtiquetas">
        {etiquetas.length === 0 ? (
          <p>Nenhuma etiqueta encontrada.</p>
        ) : (
          etiquetas.map((etiqueta) => (
            <div
              key={etiqueta.id}
              className="etiqueta"
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span> Nome da etiqueta: {etiqueta.titulo}</span>
              <span> Descrição: {etiqueta.descricao}</span>
              <button
                onClick={() => removerEtiqueta(etiqueta.id)}
                className="del"
              >
                Deletar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EtiquetaList;
