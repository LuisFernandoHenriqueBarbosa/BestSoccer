function cadastraJogos(event) {
    event.preventDefault();

    let data = document.getElementById("data").value;
    let hora = document.getElementById("hora").value;
    let timeAdversario = document.getElementById("timeadversario").value.trim();
    let campeonato = document.getElementById("campeonato").value.trim();
    let foto = document.getElementById("foto").value.trim();

    if (!timeAdversario || !campeonato || !data || !hora) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vazios',
            text: 'Por favor, preencha todos os campos.',
            confirmButtonColor: '#11C770',
            confirmButtonText: 'Entendi'
        });
        return;
    }

    if (!foto) {
        foto = "image/timeDesconhecido.jpg";
    }

    timeAdversario = formatarTexto(timeAdversario);
    campeonato = formatarTexto(campeonato);
    data = formatarData(data);

    const jogo = {
        timeadversario: timeAdversario,
        campeonato: campeonato,
        data: data,
        hora: hora,
        foto: foto,
    };

    enviarDados(jogo);
}

function enviarDados(jogo) {
    const url = "http://localhost:8080/partidas/cadastrar";

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jogo)
    })
        .then(response => response.text())
        .then(message => {
            if (message === "Jogo Cadastrado com Sucesso") {
                Swal.fire({
                    icon: 'success',
                    title: 'Cadastro com sucesso',
                    text: 'O jogo foi cadastrado com sucesso!',
                    confirmButtonColor: '#11C770',
                    confirmButtonText: 'Entendido'
                }).then(() => {
                    window.location.href = "http://localhost:8080/usuario/admin";
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro no cadastro',
                    text: message,
                    confirmButtonColor: '#11C770',
                    confirmButtonText: 'Corrigir'
                });
            }
        })
        .catch(error => {
            console.error("Erro:", error);
            Swal.fire({
                icon: 'error',
                title: 'Erro no servidor',
                text: 'Houve um problema ao tentar cadastrar o jogo.',
                confirmButtonColor: '#11C770',
                confirmButtonText: 'OK'
            });
        });
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

