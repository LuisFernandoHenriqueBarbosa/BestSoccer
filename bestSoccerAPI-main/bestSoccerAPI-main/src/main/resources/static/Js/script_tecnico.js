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
    const userSection = document.getElementById("pagina-principal-tecnico");
    const nomeUsuario = localStorage.getItem("nomeUsuario") || "Tecnico";
  
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
  
      // Atualizar os valores na página
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

window.mostrarModal = function(id) {
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

          let row;
          jogadores.forEach((jogador, index) => {
              const apiUrlEstatisticas = `http://localhost:8080/estatisticas-jogador/${jogador.id}`;
              fetch(apiUrlEstatisticas)
                  .then(response => response.ok ? response.json() : null)
                  .then(estatisticas => {
                      const possuiEstatisticas = estatisticas && Object.keys(estatisticas).length > 0;
                      
                      // Verifica se o jogador possui estatísticas antes de adicioná-lo ao container
                      if (possuiEstatisticas) {
                          if (index % 3 === 0 && !row) {
                              row = document.createElement('div');
                              row.className = 'row g-3 justify-content-center';
                              carouselItemsContainer.appendChild(row);
                          } else if (index % 6 === 0 && row.childElementCount === 3) {
                              row = document.createElement('div');
                              row.className = 'row g-3 justify-content-center';
                              carouselItemsContainer.appendChild(row);
                          }

                          const cardHtml = `
                              <div class="col-md-2 d-flex align-items-stretch justify-content-center">
                                  <div class="card mx-2" style="width: 100%; height: 100%; border-radius: 10px;">
                                      <div class="card-body d-flex flex-column align-items-center justify-content-between">
                                          <div class="d-flex justify-content-between w-100">
                                              <button class="btn btn-warning btn-sm" onclick="abrirModalEstatisticas(${jogador.id})">
                                                  Editar Estatísticas
                                              </button>
                                          </div>
                                          <img src="http://localhost:8080/${jogador.foto}" class="card-img-top" style="object-fit: contain; height: 150px;" alt="Foto do Jogador">
                                          <h5 class="card-title fs-5 text-center" style="color: #11C770;">${jogador.nome}</h5>
                                          <p class="card-text text-center"><strong>Posição:</strong> ${jogador.posicao}</p>
                                          <button class="btn btn-outline-success mt-3" style="width: 100%" onclick="mostrarModal(${jogador.id})">Ver mais</button>
                                      </div>
                                  </div>
                              </div>`;
                          row.innerHTML += cardHtml;
                      }
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
          
              const url = `http://localhost:8080/estatisticas-jogador/${id}`;
          
              fetch(url, {
                method: 'PUT',
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
                        title: 'Atualização realizada!',
                        text: 'Estatísticas atualizadas com sucesso!',
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
}

// Chama a função para listar os jogadores ao carregar a página
window.onload = function () {
  listarJogadores();
};


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


  fetchJogadores();
  fetchJogos();
  fetchJogadoresEstatistica();
  carregaMenu();
  carregaNome();

});