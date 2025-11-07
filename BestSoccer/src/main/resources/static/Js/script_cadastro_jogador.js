function cadastraJogador(event) {
  event.preventDefault();

  let nome = document.getElementById("nome").value.trim();
  const pernadominante = document.getElementById("pernaDominante").value.toLowerCase();
  const posicao = document.getElementById("posicao").value;
  let altura = document.getElementById("altura").value.trim();
  let peso = document.getElementById("peso").value.trim();
  let contrato = document.getElementById("contrato").value;
  let nacionalidade = document.getElementById("nacionalidade").value.trim();
  let datanascimento = document.getElementById("dataNascimento").value;
  let foto = document.getElementById("foto").value.trim();


  if (!nome || !altura || !peso || !nacionalidade || !contrato || !datanascimento) {
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
    foto = "image/jogadorDesconhecido.jpg";
  }

  nome = formatarTexto(nome);
  nacionalidade = formatarTexto(nacionalidade);

  altura = parseFloat(altura.replace(',', '.'));
  peso = parseFloat(peso.replace(',', '.'));

  contrato = formatarData(contrato);
  datanascimento = formatarData(datanascimento);

  const jogador = {
    nome: nome,
    pernadominante: pernadominante,
    posicao: posicao,
    altura: altura,
    peso: peso,
    contrato: contrato,
    nacionalidade: nacionalidade,
    datanascimento: datanascimento,
    foto: foto
  };

  enviarDados(jogador);
}

function enviarDados(jogador) {
  const url = "http://localhost:8080/jogadores/cadastrar";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(jogador)
  })
    .then(response => response.text())
    .then(message => {
      if (message === "Jogador Cadastrado com Sucesso") {
        Swal.fire({
          icon: 'success',
          title: 'Cadastro com sucesso',
          text: 'O jogador foi cadastrado com sucesso!',
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
        text: 'Houve um problema ao tentar cadastrar o jogador.',
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
