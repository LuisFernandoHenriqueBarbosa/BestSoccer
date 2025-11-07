document.addEventListener('DOMContentLoaded', function () {

  function carregaMenu() {
    document.querySelectorAll('.menu-item').forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        const targetSection = link.getAttribute('data-section');

        document.querySelectorAll('.section-content').forEach(section => {
          section.style.opacity = 0;
          setTimeout(() => {
            section.style.display = 'none';
          }, 300);
        });

        const target = document.getElementById(targetSection);
        setTimeout(() => {
          target.style.display = 'block';
          target.style.opacity = 1;
        }, 300);
      });
    });
  }

  function carregaNome() {
    const userSection = document.getElementById("pagina-principal");
    const nomeUsuario = localStorage.getItem("nomeUsuario") || "Administrador";

    const nomeAdmin = `
      <div class="container py-5">
        <h1 class="mb-4 section-title text-center">Bem-vindo, ${nomeUsuario}!</h1>
        <p class="mb-5 text-center">Use o menu ao lado para gerenciar jogadores, jogos, técnicos e estatísticas.</p>
        <div class="row text-center g-4">
          <div class="col-md-4">
            <div class="card shadow-lg">
              <div class="card-body">
                <div class="icon-container mb-3">
                  <i class="fas fa-users fa-3x text-success"></i>
                </div>
                <h5 class="card-title text-success">Total de Jogadores</h5>
                <p class="card-text display-4 total-jogadores">50</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card shadow-lg">
              <div class="card-body">
                <div class="icon-container mb-3">
                  <i class="fas fa-calendar-alt fa-3x text-primary"></i>
                </div>
                <h5 class="card-title text-primary">Total de Jogos Cadastrado</h5>
                <p class="card-text display-4 proximos-jogos">8</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card shadow-lg">
              <div class="card-body">
                <div class="icon-container mb-3">
                  <i class="fas fa-chart-line fa-3x text-warning"></i>
                </div>
                <h5 class="card-title text-warning">Total de Técnicos Cadastrado</h5>
                <p class="card-text display-4 total-tecnicos">12</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    userSection.innerHTML = nomeAdmin;

    carregaDadosDashboard();
  }

  async function carregaDadosDashboard() {
    try {
      const totalJogadoresResponse = await fetch("http://localhost:8080/jogadores/total-jogadores");
      const totalJogadores = await totalJogadoresResponse.json();

      const proximosJogosResponse = await fetch("http://localhost:8080/partidas/total-partida");
      const proximosJogos = await proximosJogosResponse.json();

      const totalTecnicosResponse = await fetch("http://localhost:8080/tecnico/total-tecnico");
      const totalTecnicos = await totalTecnicosResponse.json();

      document.querySelector(".total-jogadores").textContent = totalJogadores;
      document.querySelector(".proximos-jogos").textContent = proximosJogos;
      document.querySelector(".total-tecnicos").textContent = totalTecnicos;
    } catch (error) {
      console.error("Erro ao carregar os dados do dashboard:", error);
    }
  }

  function fetchJogadores() {
    const apiUrlJogadores = 'http://localhost:8080/jogadores';
    fetch(apiUrlJogadores)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.statusText}`);
        }
        return response.json();
      })
      .then(jogadores => {
        const carouselItemsContainer = document.getElementById("cards-jogadores");
        carouselItemsContainer.innerHTML = '';

        let currentRow;
        let cardCount = 0;

        jogadores.forEach((jogador, index) => {
          if (cardCount % 5 === 0) {
            currentRow = document.createElement('div');
            currentRow.className = 'row g-3 justify-content-center';
            carouselItemsContainer.appendChild(currentRow);
          }

          const col = document.createElement('div');
          col.className = 'col-md-2 d-flex align-items-stretch justify-content-center';

          const card = `
            <div class="card mx-2" style="width: 100%; height: 100%; border-radius: 10px;">
              <div class="card-body d-flex flex-column align-items-center justify-content-between">
                <div class="d-flex justify-content-between w-100">
                  <button class="btn btn-success btn-sm" onclick="editarJogador(${jogador.id})">Editar</button>
                  <button class="btn btn-danger btn-sm" onclick="excluirJogador(${jogador.id})">Excluir</button>
                </div>
                <img src="http://localhost:8080/${jogador.foto}" class="card-img-top" style="object-fit: contain; height: 150px;" alt="Foto do Jogador">
                <h5 class="card-title fs-5 text-center" style="color: #11C770; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                  ${jogador.nome}
                </h5>
                <p class="card-text fs-6 mt-2 text-center">
                  <span class="fw-bold">Posição:</span> ${jogador.posicao}
                </p>
                                <button class="btn btn-outline-success mt-3" style="width: 100%" onclick="mostrarModal(${jogador.id})">Ver mais</button>
              </div>
            </div>
          `;

          col.innerHTML = card;
          currentRow.appendChild(col);

          cardCount++;
        });
      })
      .catch(error => {
        console.error("Erro ao carregar os jogadores:", error);
      });
  }

  window.editarJogador = function (id) {
    const apiUrlJogador = `http://localhost:8080/jogadores/${id}`;

    fetch(apiUrlJogador)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro ao buscar o jogador: ${response.statusText}`);
        }
        return response.json();
      })
      .then(jogador => {
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = `
          <div class="modal fade" id="editarJogadorModal" tabindex="-1" aria-labelledby="editarJogadorModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="editarJogadorModalLabel">Editar Jogador: ${jogador.nome}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form id="editarJogadorForm">
                    <div class="mb-3">
                      <label for="nome" class="form-label">Nome</label>
                      <input type="text" class="form-control" id="nome" value="${jogador.nome}">
                    </div>
                    <div class="mb-3">
                      <label for="pernaDominante" class="form-label">Perna Dominante</label>
                      <select class="form-select" id="pernaDominante">
                        <option value="direita" ${jogador.pernadominante === 'direita' ? 'selected' : ''}>Direita</option>
                        <option value="esquerda" ${jogador.pernadominante === 'esquerda' ? 'selected' : ''}>Esquerda</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="posicao" class="form-label">Posição</label>
                      <select class="form-select" id="posicao">
                        <option value="Goleiro" ${jogador.posicao === 'Goleiro' ? 'selected' : ''}>Goleiro</option>
                        <option value="Zagueiro" ${jogador.posicao === 'Zagueiro' ? 'selected' : ''}>Zagueiro</option>
                        <option value="Lateral" ${jogador.posicao === 'Lateral' ? 'selected' : ''}>Lateral</option>
                        <option value="Meio-Campo" ${jogador.posicao === 'Meio-Campo' ? 'selected' : ''}>Meio-Campo</option>
                        <option value="Atacante" ${jogador.posicao === 'Atacante' ? 'selected' : ''}>Atacante</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="altura" class="form-label">Altura (cm)</label>
                      <input type="text" class="form-control" id="altura" value="${jogador.altura}">
                    </div>
                    <div class="mb-3">
                      <label for="peso" class="form-label">Peso (kg)</label>
                      <input type="text" class="form-control" id="peso" value="${jogador.peso}">
                    </div>
                    <div class="mb-3">
                      <label for="contrato" class="form-label">Contrato</label>
                      <input type="date" class="form-control" id="contrato" value="${jogador.contrato}">
                    </div>
                    <div class="mb-3">
                      <label for="nacionalidade" class="form-label">Nacionalidade</label>
                      <input type="text" class="form-control" id="nacionalidade" value="${jogador.nacionalidade}">
                    </div>
                    <div class="mb-3">
                      <label for="dataNascimento" class="form-label">Data de Nascimento</label>
                      <input type="date" class="form-control" id="dataNascimento" value="${jogador.datanascimento}">
                    </div>
                    <div class="mb-3">
                      <label for="foto" class="form-label">URL da Foto</label>
                      <input type="url" class="form-control" id="foto" value="${jogador.foto}">
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                  <button type="button" class="btn btn-success" id="salvarAlteracoes">Salvar</button>
                </div>
              </div>
            </div>
          </div>
        `;

        document.body.appendChild(modalContainer);

        const modal = new bootstrap.Modal(document.getElementById('editarJogadorModal'));
        modal.show();

        document.getElementById('salvarAlteracoes').addEventListener('click', () => {
          const nome = formatarTexto(document.getElementById('nome').value.trim());
          const pernadominante = document.getElementById('pernaDominante').value.toLowerCase();
          const posicao = document.getElementById('posicao').value;
          const altura = parseFloat(document.getElementById('altura').value.trim().replace(',', '.'));
          const peso = parseFloat(document.getElementById('peso').value.trim().replace(',', '.'));
          const contrato = formatarData(document.getElementById('contrato').value);
          const nacionalidade = formatarTexto(document.getElementById('nacionalidade').value.trim());
          const datanascimento = formatarData(document.getElementById('dataNascimento').value);
          let foto = document.getElementById('foto').value.trim();
          if (!foto) foto = "image/jogadorDesconhecido.jpg";

          const jogadorAtualizado = {
            nome,
            pernadominante,
            posicao,
            altura,
            peso,
            contrato,
            nacionalidade,
            datanascimento,
            foto
          };

          const apiUrlUpdate = `http://localhost:8080/jogadores/${id}`;
          fetch(apiUrlUpdate, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jogadorAtualizado)
          })
            .then(response => response.text())
            .then(message => {
              if (message === "Jogador atualizado com sucesso") {
                Swal.fire('Sucesso!', 'Jogador atualizado com sucesso!', 'success');
                modal.hide();
                fetchJogadores();
              } else {
                Swal.fire('Erro!', message, 'error');
              }
            })
            .catch(error => {
              console.error("Erro ao atualizar jogador:", error);
              Swal.fire('Erro!', 'Houve um problema ao salvar as alterações.', 'error');
            });
        });

        document.getElementById('editarJogadorModal').addEventListener('hidden.bs.modal', () => {
          modalContainer.remove();
        });
      })
      .catch(error => {
        console.error("Erro ao carregar jogador:", error);
      });
  };

  window.excluirJogador = function (id) {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Essa ação não pode ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#11C770',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const apiUrlExcluir = `http://localhost:8080/jogadores/${id}`;

        fetch(apiUrlExcluir, {
          method: 'DELETE',
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Erro ao excluir o jogador: ${response.statusText}`);
            }
            Swal.fire(
              'Excluído!',
              'O jogador foi removido com sucesso.',
              'success'
            );
            fetchJogadores();
          })
          .catch(error => {
            console.error("Erro ao excluir o jogador:", error);
            Swal.fire(
              'Erro!',
              'Não foi possível excluir o jogador. Tente novamente.',
              'error'
            );
          });
      }
    });
  }

  function fetchJogos() {
    const apiUrlPartidas = 'http://localhost:8080/partidas';
    fetch(apiUrlPartidas)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.statusText}`);
        }
        return response.json();
      })
      .then(partidas => {
        const carouselItemsContainer = document.getElementById("cards-jogos");
        carouselItemsContainer.innerHTML = '';

        let currentRow;
        let cardCount = 0;

        partidas.forEach((partida, index) => {
          if (cardCount % 4 === 0) {
            currentRow = document.createElement('div');
            currentRow.className = 'row g-3 justify-content-center';
            carouselItemsContainer.appendChild(currentRow);
          }

          const jogoCard = `
          <div class="col-3 d-flex align-items-stretch justify-content-center" style="max-width: 300px;">
            <div class="card mx-2 shadow-lg" style="width: 100%; height: auto;">
              <div class="bg-success text-white d-flex justify-content-between px-3 py-2">
                <span>${new Date(partida.data).toLocaleDateString('pt-BR')}</span>
                <span>${partida.hora}</span>
              </div>
              <div class="card-body d-flex flex-column align-items-center justify-content-between bg-light" style="padding-bottom: 10px;">
                <img src="http://localhost:8080/${partida.foto}" class="card-img-top" style="width: 200px; height: 200px; object-fit: contain;" alt="Foto do jogo ${partida.id}">
                <h5 class="card-title text-center mt-2">${partida.timeadversario}</h5>
              </div>
              <div class="bg-dark text-white text-center py-2 w-100" style="font-size: 0.9rem;">
                ${partida.campeonato}
              </div>
              <div class="d-flex justify-content-around py-2">
                <button class="btn btn-success btn-sm" style="font-size: 0.8rem;" onclick="editarJogo(${partida.id})">
                  <i class="bi bi-pencil"></i> Editar
                </button>
                <button class="btn btn-danger btn-sm" style="font-size: 0.8rem;" onclick="excluirJogos(${partida.id})">
                  <i class="bi bi-trash"></i> Excluir
                </button>
              </div>
            </div>
          </div>
        `;
          currentRow.innerHTML += jogoCard;
          cardCount++;
        });
      })
      .catch(error => {
        console.error("Erro ao carregar os jogos:", error);
      });
  }

  

  window.editarJogo = function (id) {
    const apiUrlJogo = `http://localhost:8080/partidas/${id}`;

    fetch(apiUrlJogo)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro ao buscar o jogo: ${response.statusText}`);
        }
        return response.json();
      })
      .then(jogo => {
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = `
                <div class="modal fade" id="editarJogoModal" tabindex="-1" aria-labelledby="editarJogoModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="editarJogoModalLabel">Editar Jogo: ${jogo.campeonato}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form id="editarJogoForm">
                                    <div class="mb-3">
                                        <label for="timeadversario" class="form-label">Nome do Time Adversário</label>
                                        <input type="text" class="form-control" id="timeadversario" value="${jogo.timeadversario}">
                                    </div>
                                    <div class="mb-3">
                                        <label for="campeonato" class="form-label">Campeonato</label>
                                        <input type="text" class="form-control" id="campeonato" value="${jogo.campeonato}">
                                    </div>
                                    <div class="mb-3">
                                        <label for="data" class="form-label">Data do Jogo</label>
                                        <input type="date" id="data" class="form-control" value="${jogo.data}">
                                    </div>
                                    <div class="mb-3">
                                        <label for="hora" class="form-label">Hora do Jogo</label>
                                        <input type="time" id="hora" class="form-control" value="${jogo.hora}">
                                    </div>
                                    <div class="mb-3">
                                        <label for="foto" class="form-label">Foto (URL)</label>
                                        <input type="url" id="foto" class="form-control" value="${jogo.foto || ''}">
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-success" id="salvarAlteracoesJogo">Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

        document.body.appendChild(modalContainer);

        const modal = new bootstrap.Modal(document.getElementById('editarJogoModal'));
        modal.show();

        document.getElementById('salvarAlteracoesJogo').addEventListener('click', () => {
          const timeadversario = formatarTexto(document.getElementById('timeadversario').value);
          const campeonato = formatarTexto(document.getElementById('campeonato').value);
          const data = formatarData(document.getElementById('data').value);
          const hora = document.getElementById('hora').value;
          const foto = document.getElementById('foto').value.trim() || 'image/jogoDesconhecido.jpg';

          const jogoAtualizado = {
            timeadversario,
            campeonato,
            data,
            hora,
            foto
          };
          const apiUrlUpdate = `http://localhost:8080/partidas/${id}`;
          fetch(apiUrlUpdate, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jogoAtualizado)
          })
            .then(response => response.text())
            .then(message => {
              if (message === "Partida atualizado com sucesso") {
                Swal.fire('Sucesso!', 'Jogo atualizado com sucesso!', 'success');
                modal.hide();
                fetchJogos();
              } else {
                Swal.fire('Erro!', message, 'error');
              }
            })
            .catch(error => {
              console.error("Erro ao atualizar jogo:", error);
              Swal.fire('Erro!', 'Houve um problema ao salvar as alterações.', 'error');
            });
        });
        document.getElementById('editarJogoModal').addEventListener('hidden.bs.modal', () => {
          modalContainer.remove();
        });
      })
      .catch(error => {
        console.error("Erro ao carregar jogo:", error);
      });
  };

  window.excluirJogos = function (id) {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Essa ação não pode ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#11C770',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const apiUrlExcluir = `http://localhost:8080/partidas/${id}`;

        fetch(apiUrlExcluir, {
          method: 'DELETE',
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Erro ao excluir o jogo: ${response.statusText}`);
            }
            Swal.fire(
              'Excluído!',
              'O jogo foi removido com sucesso.',
              'success'
            );
            fetchJogos();
          })
          .catch(error => {
            console.error("Erro ao excluir o jogo:", error);
            Swal.fire(
              'Erro!',
              'Não foi possível excluir o jogo. Tente novamente.',
              'error'
            );
          });
      }
    });
  }

  function fetchTecnicos() {
    const apiUrlTecnicos = `http://localhost:8080/tecnico`;
    fetch(apiUrlTecnicos)
        .then(response => response.json())
        .then(tecnicos => {
            const tecnicosContainer = document.getElementById('lista-tecnico');
            tecnicosContainer.innerHTML = ''; 

            tecnicos.forEach(tecnico => {
                const tecnicoCard = document.createElement('div');
                tecnicoCard.classList.add('card', 'mb-3', 'shadow-sm');
                tecnicoCard.style.maxWidth = '100%';

                tecnicoCard.innerHTML = `
                    <div class="card-header" style="background-color: #11C770; color: white;">
                        <h5 class="card-title">Técnico: ${tecnico.nome}</h5>
                    </div>
                    <div class="card-body">
                        <p><strong>ID:</strong> ${tecnico.id}</p>
                        <p><strong>Email:</strong> ${tecnico.email}</p>
                        <p><strong>Senha:</strong> ${tecnico.senha}</p>
                        <p><strong>Contrato:</strong> ${tecnico.contrato}</p>
                        <div class="d-flex justify-content-end">
                        </div>
                    </div>
                `;
                tecnicosContainer.appendChild(tecnicoCard);
            });
        })
        .catch(error => console.error('Erro ao carregar os técnicos:', error));
}

  function fetchJogadoresEstatistica() {
    const apiUrlJogadores = `http://localhost:8080/jogadores`;
    fetch(apiUrlJogadores)
      .then(response => {
        if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
        return response.json();
      })
      .then(jogadores => {
        const carouselItemsContainer = document.getElementById("cards-jogadores-estatistica");
        carouselItemsContainer.innerHTML = '';

        jogadores.forEach((jogador, index) => {
          if (index % 5 === 0) {
            const row = document.createElement('div');
            row.className = 'row g-3 justify-content-center';
            carouselItemsContainer.appendChild(row);
          }

          const apiUrlEstatisticas = `http://localhost:8080/estatisticas-jogador/${jogador.id}`;
          fetch(apiUrlEstatisticas)
            .then(response => response.ok ? response.json() : null)
            .then(estatisticas => {
              const possuiEstatisticas = estatisticas && Object.keys(estatisticas).length > 0;

              const cardHtml = `
                            <div class="col-md-2 d-flex align-items-stretch justify-content-center">
                                <div class="card mx-2" style="width: 100%; height: 100%; border-radius: 10px;">
                                    <div class="card-body d-flex flex-column align-items-center justify-content-between">
                                        <div class="d-flex justify-content-between w-100">
                                            <button class="btn btn-${possuiEstatisticas ? 'success' : 'success'} btn-sm" onclick="abrirModalEstatisticas(${jogador.id})">
                                                ${possuiEstatisticas ? 'Editar Estatísticas' : 'Inserir Estatísticas'}
                                            </button>
                                        </div>
                                        <img src="http://localhost:8080/${jogador.foto}" class="card-img-top" style="object-fit: contain; height: 150px;" alt="Foto do Jogador">
                                        <h5 class="card-title fs-5 text-center" style="color: #11C770;">${jogador.nome}</h5>
                                        <p class="card-text text-center"><strong>Posição:</strong> ${jogador.posicao}</p>
                <button class="btn btn-outline-success mt-3" style="width: 100%" onclick="mostrarModal(${jogador.id})">Ver mais</button>
                                    </div>
                                </div>
                            </div>`;
              carouselItemsContainer.lastChild.innerHTML += cardHtml;
            })
            .catch(error => console.error(`Erro ao carregar estatísticas para o jogador ${jogador.id}:`, error));
        });
      })
      .catch(error => console.error("Erro ao carregar os jogadores:", error));
  }



  window.abrirModalEstatisticas = function (id) {
    const apiUrlEstatisticas = `http://localhost:8080/estatisticas-jogador/${id}`;

    const criarCamposFormulario = campos => campos.map(campo => `
      <div class="col-md-6 mb-3">
          <label for="${campo.id}" class="form-label">${campo.label}</label>
          <input type="number" class="form-control" id="${campo.id}" value="${campo.value}">
      </div>`).join("");

    fetch(apiUrlEstatisticas)
      .then(response => response.ok ? response.json() : {})
      .then(estatisticas => {
        const modalContainer = document.createElement("div");
        modalContainer.innerHTML = `
              <div class="modal fade" id="estatisticasModal" tabindex="-1" aria-labelledby="estatisticasModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-lg">
                      <div class="modal-content">
                          <div class="modal-header">
                              <h5 class="modal-title">Estatísticas do Jogador</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                              <form id="estatisticasForm">
                                  <div class="row">
                                      ${criarCamposFormulario([
          { label: "Jogos Jogados", id: "jogosdisputados", value: estatisticas.jogosdisputados || 0 },
          { label: "Gols", id: "golsmarcados", value: estatisticas.golsmarcados || 0 },
          { label: "Assistências", id: "assistencias", value: estatisticas.assistencias || 0 },
          { label: "Finalizações", id: "finalizacoes", value: estatisticas.finalizacoes || 0 },
          { label: "Passes", id: "passes", value: estatisticas.passes || 0 },
          { label: "Desarmes", id: "desarmes", value: estatisticas.desarmes || 0 },
          { label: "Faltas Cometidas", id: "faltascometidas", value: estatisticas.faltascometidas || 0 },
          { label: "Cartões Amarelos", id: "cartoesamarelos", value: estatisticas.cartoesamarelos || 0 },
          { label: "Cartões Vermelhos", id: "cartoesvermelhos", value: estatisticas.cartoesvermelhos || 0 }
        ])}
                                  </div>
                              </form>
                          </div>
                          <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                              <button type="button" class="btn btn-success" id="salvarEstatisticas">Salvar</button>
                          </div>
                      </div>
                  </div>
              </div>`;
        document.body.appendChild(modalContainer);

        const modal = new bootstrap.Modal(document.getElementById("estatisticasModal"));
        modal.show();

        document.getElementById("salvarEstatisticas").addEventListener("click", () => {
          const estatisticasAtualizadas = {
            jogadorid: id,
            jogosdisputados: Number(document.getElementById("jogosdisputados").value),
            golsmarcados: Number(document.getElementById("golsmarcados").value),
            assistencias: Number(document.getElementById("assistencias").value),
            finalizacoes: Number(document.getElementById("finalizacoes").value),
            passes: Number(document.getElementById("passes").value),
            desarmes: Number(document.getElementById("desarmes").value),
            faltascometidas: Number(document.getElementById("faltascometidas").value),
            cartoesamarelos: Number(document.getElementById("cartoesamarelos").value),
            cartoesvermelhos: Number(document.getElementById("cartoesvermelhos").value)
          };

          const metodoHttp = estatisticas.id ? "PUT" : "POST";
          const url = `http://localhost:8080/estatisticas-jogador${metodoHttp === "PUT" ? `/${estatisticas.id}` : ""}`;

          fetch(url, {
            method: metodoHttp,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(estatisticasAtualizadas),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Erro ao salvar estatísticas");
              }
              return response.json();
            })
            .then((data) => {
              console.log("Estatísticas atualizadas:", data);
              Swal.fire({
                icon: 'success',
                title: 'Cadastro realizado!',
                text: 'Estatísticas cadastradas com sucesso!',
                confirmButtonText: 'Entendi'
              }).then((result) => {
                if (result.isConfirmed) {
                  modal.hide();
                }
              });
            })
            .catch((error) => {
              console.error("Erro ao salvar estatísticas:", error);
            });
        });

        document.getElementById("estatisticasModal").addEventListener("hidden.bs.modal", () => modalContainer.remove());
      })
      .catch(error => console.error("Erro ao carregar estatísticas:", error));
  };

  window.mostrarModal = function (id) {
    const modalContainer = document.getElementById("modal-container-jogadores") || document.createElement('div');
    modalContainer.id = "modal-container-jogadores";
    document.body.appendChild(modalContainer);
    fetch(`http://localhost:8080/jogadores/${id}`)
      .then(response => response.json())
      .then(jogador => {
        fetch(`http://localhost:8080/estatisticas-jogador/${id}`)
          .then(response => response.json())
          .then(estatisticas => {
            const modalContent = `
                      <div class="modal fade" id="playerModal" tabindex="-1" aria-labelledby="playerModalLabel" aria-hidden="true">
                          <div class="modal-dialog modal-lg">
                              <div class="modal-content">
                                  <div class="modal-header border-0">
                                      <h5 class="modal-title fs-3 text-center text-success" id="playerModalLabel">${jogador.nome}</h5>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div class="modal-body p-4">
                                      <div class="row">
                                          <div class="col-md-4 mb-4 d-flex justify-content-center">
                                              <img src="http://localhost:8080/${jogador.foto}" class="img-fluid rounded-circle border" alt="Foto do Jogador" style="max-width: 150px; max-height: 150px; object-fit: cover;">
                                          </div>
                                          <div class="col-md-8">
                                              <p><strong>Posição:</strong> ${jogador.posicao}</p>
                                              <p><strong>Pé Dominante:</strong> ${jogador.pernadominante}</p>
                                              <p><strong>Contrato:</strong> ${new Date(jogador.contrato).toLocaleDateString('pt-BR')}</p>
                                              <p><strong>Nacionalidade:</strong> ${jogador.nacionalidade}</p>
                                              <p><strong>Data de Nascimento:</strong> ${new Date(jogador.datanascimento).toLocaleDateString('pt-BR')}</p>

                                              <h6 class="mt-4 text-success"><strong>Estatísticas:</strong></h6>
                                              <table class="table table-striped table-bordered">
                                                  <tbody>
                                                      <tr>
                                                          <td><strong>Jogos Jogados</strong></td>
                                                          <td>${estatisticas.jogosdisputados}</td>
                                                      </tr>
                                                      <tr>
                                                          <td><strong>Gols Marcados</strong></td>
                                                          <td>${estatisticas.golsmarcados}</td>
                                                      </tr>
                                                      <tr>
                                                          <td><strong>Assistências</strong></td>
                                                          <td>${estatisticas.assistencias}</td>
                                                      </tr>
                                                      <tr>
                                                          <td><strong>Chutes</strong></td>
                                                          <td>${estatisticas.finalizacoes}</td>
                                                      </tr>
                                                      <tr>
                                                          <td><strong>Passes</strong></td>
                                                          <td>${estatisticas.passes}</td>
                                                      </tr>
                                                      <tr>
                                                          <td><strong>Desarmes</strong></td>
                                                          <td>${estatisticas.desarmes}</td>
                                                      </tr>
                                                      <tr>
                                                          <td><strong>Faltas</strong></td>
                                                          <td>${estatisticas.faltascometidas}</td>
                                                      </tr>
                                                      <tr>
                                                          <td><strong>Cartões Amarelos</strong></td>
                                                          <td>${estatisticas.cartoesamarelos}</td>
                                                      </tr>
                                                      <tr>
                                                          <td><strong>Cartões Vermelhos</strong></td>
                                                          <td>${estatisticas.cartoesvermelhos}</td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  `;
            modalContainer.innerHTML = modalContent;
            const modal = new bootstrap.Modal(document.getElementById('playerModal'));
            modal.show();
          })
          .catch(error => console.error("Erro ao buscar estatísticas do jogador:", error));
      })
      .catch(error => console.error("Erro ao buscar informações do jogador:", error));
  }

  function formatarTexto(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }

  function formatarData(data) {
    const partes = data.split("-");
    if (partes.length === 3) {
      return `${partes[0]}-${partes[1]}-${partes[2]}`;
    }
    return data;
  }

  document.getElementById("logout-btn").addEventListener("click", function (e) {
    e.preventDefault();
    Swal.fire({
      title: 'Tem certeza?',
      text: "Deseja finalizar a seção?!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#11C770',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, sair!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Logout confirmado');
        localStorage.removeItem("nomeUsuario");
        localStorage.removeItem("tipoUsuario");
        window.location.href = 'http://localhost:8080/usuario/login';
      }
    });
  });

  carregaNome();
  carregaMenu();
  fetchJogadores();
  fetchJogos();
  fetchJogadoresEstatistica()
  fetchTecnicos();
});