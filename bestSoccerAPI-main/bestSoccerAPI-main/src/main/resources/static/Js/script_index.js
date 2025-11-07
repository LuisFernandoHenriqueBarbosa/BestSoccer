document.addEventListener('DOMContentLoaded', function () {
    const userSection = document.getElementById("user-section");
    const nomeUsuario = localStorage.getItem("nomeUsuario");
    const tipoUsuario = localStorage.getItem("tipoUsuario");

    if (nomeUsuario) {
        let menuItems = `
            <li>
                <a class="dropdown-item text-danger" href="#" id="logout-btn">
                    <i class="bi bi-box-arrow-right me-2"></i> Sair
                </a>
            </li>
        `;

        if (tipoUsuario === "admin") {
            menuItems = `
                <li>
                    <a class="dropdown-item" href="http://localhost:8080/usuario/admin">
                        <i class="bi bi-gear-fill me-2"></i> Gerenciar Time
                    </a>
                </li>
                ${menuItems}
            `;
        } else if (tipoUsuario === "tecnico") {
            menuItems = `
                <li>
                    <a class="dropdown-item" href="http://localhost:8080/usuario/tecnico">
                        <i class="bi bi-gear-fill me-2"></i> Gerenciar Time
                    </a>
                </li>
                ${menuItems}
            `;
        }

        const usuarioLogado = `
            <div class="dropdown">
                <button class="btn dropdown-toggle d-flex align-items-center" 
                        type="button" 
                        id="userDropdown" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                        data-bs-auto-close="outside">
                    <div class="d-flex align-items-center">
                        <div class="user-avatar">
                            <i class="bi bi-person-fill"></i>
                        </div>
                        <span class="user-name">Olá, ${nomeUsuario}</span>
                    </div>
                </button>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    ${menuItems}
                </ul>
            </div>
        `;

        userSection.innerHTML = usuarioLogado;

        document.getElementById("logout-btn").addEventListener("click", function (e) {
            e.preventDefault();
            console.log('Logout clicado');
            localStorage.removeItem("nomeUsuario");
            localStorage.removeItem("tipoUsuario");
            window.location.href = 'http://localhost:8080/';
        });
    } else {
        const usuarioNaoLogado = `
            <a id="login-btn" href="http://localhost:8080/usuario/login" role="button" class="btn-login">Login</a>
        `;
        userSection.innerHTML = usuarioNaoLogado;
    }


    const apiUrlJogadores = 'http://localhost:8080/jogadores';
    const apiUrlJogos = 'http://localhost:8080/partidas';

    function fetchJogadores() {
        fetch(apiUrlJogadores)
            .then(response => response.json())
            .then(jogadores => {
                const carouselItemsContainer = document.getElementById("carouselItems");
                if (!carouselItemsContainer) return;

                carouselItemsContainer.innerHTML = '';
                let itemCount = 0;
                let cardCount = 0;

                jogadores.forEach(jogador => {
                    if (cardCount === 4) {
                        cardCount = 0;
                        itemCount++;
                    }

                    const jogadorCard = `
                        <div class="col-3 d-flex align-items-stretch">
                            <div class="card mx-2" style="width: 100%; height: 100%;">
                                <img src="${jogador.foto}" class="card-img-top" style="object-fit: contain;height:100%" alt="Foto do Jogador">
                                <div class="card-body d-flex flex-column align-items-center justify-content-between">
                                    <h5 class="card-title fs-5 text-center" style="color: #11C770; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                        ${jogador.nome}
                                    </h5>
                                    <p class="card-text fs-6 mt-2 text-center">
                                        <span class="fw-bold">Posição:</span> ${jogador.posicao}
                                    </p>
                                    <button class="btn btn-outline-success mt-3" style="width: 100%" onclick="mostrarModal(${jogador.id})">Ver mais</button>
                                </div>
                            </div>
                        </div>
                    `;
                    if (!carouselItemsContainer.children[itemCount]) {
                        carouselItemsContainer.innerHTML += `
                            <div class="carousel-item ${itemCount === 0 ? 'active' : ''}">
                                <div class="d-flex justify-content-center flex-wrap"></div>
                            </div>
                        `;
                    }

                    const item = carouselItemsContainer.children[itemCount];
                    item.querySelector('.d-flex').innerHTML += jogadorCard;
                    cardCount++;
                });
            })
            .catch(error => console.error("Erro ao carregar os jogadores:", error));
    }

    function fetchJogos() {
        fetch(apiUrlJogos)
          .then(response => response.json())
          .then(partidas => {
            const carouselItemsContainer = document.getElementById("carouselJogosItems");
            if (!carouselItemsContainer) return;
      
            carouselItemsContainer.innerHTML = '';
            let itemCount = 0;
            let cardCount = 0;
      
            partidas.forEach(partida => {
              if (cardCount === 4) {
                cardCount = 0;
                itemCount++;
              }
      
              const jogoCard = `
                <div class="col-3 d-flex align-items-stretch">
                  <div class="card mx-2" style="width: 100%; height: auto;">
                    <div class="bg-success text-white d-flex justify-content-between px-3 py-2">
                      <!-- Data e Hora -->
                      <span>${new Date(partida.data).toLocaleDateString('pt-BR')}</span>
                      <span>${partida.hora}</span>
                    </div>
                    <div class="card-body d-flex flex-column align-items-center justify-content-between bg-light" style="padding-bottom: 10px;">
                      <!-- Imagem do Jogo -->
                      <img src="${partida.foto}" class="card-img-top" style="width: 200px; height: 200px; object-fit: contain;" alt="Foto do jogo ${partida.id}">
                      <h5 class="card-title text-center">${partida.timeadversario}</h5>
                    </div>
                    <!-- Campeonato -->
                    <div class="bg-dark text-white text-center py-2 w-100" style="font-size: 0.9rem;">
                      ${partida.campeonato}
                    </div>
                  </div>
                </div>
              `;
      
              if (!carouselItemsContainer.children[itemCount]) {
                carouselItemsContainer.innerHTML += `
                  <div class="carousel-item ${itemCount === 0 ? 'active' : ''}">
                    <div class="d-flex justify-content-center flex-wrap"></div>
                  </div>
                `;
              }
      
              const item = carouselItemsContainer.children[itemCount];
              item.querySelector('.d-flex').innerHTML += jogoCard;
              cardCount++;
            });
          })
          .catch(error => console.error("Erro ao carregar os jogos:", error));
      }      

    window.mostrarModal = function(id) {
        const modalContainer = document.getElementById("modal-container");

        if (!modalContainer) {
            console.error("Erro: Não foi encontrado o container do modal.");
            return;
        }

        if(nomeUsuario){
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
                                                        <img src="${jogador.foto}" class="img-fluid rounded-circle border" alt="Foto do Jogador" style="max-width: 150px; max-height: 150px; object-fit: cover;">
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
                        });
                })
                .catch(error => console.error("Erro ao buscar informações do jogador:", error));
        }else{
            Swal.fire({
                icon: 'warning',
                title: 'Faça o login',
                text: 'Faça o login para ter acesso a mais informações',
                confirmButtonColor: '#11C770',
                confirmButtonText: 'Entendido'
            });
        }
    };

    fetchJogadores();
    fetchJogos();
});
