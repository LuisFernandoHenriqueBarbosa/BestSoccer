function cadastraTecnico(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let data = document.getElementById("data").value;
    let senha = document.getElementById("senha").value;
    let confirmaSenha = document.getElementById("confirmSenha").value;

    if (!nome || !email || !data || !senha || !confirmaSenha) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vazios',
            text: 'Por favor, preencha todos os campos.',
            confirmButtonColor: '#11C770',
            confirmButtonText: 'Entendi'
        });
        return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        Swal.fire({
            icon: 'warning',
            title: 'Formato de Email Inválido',
            text: 'Por favor, coloque um email válido.',
            confirmButtonColor: '#11C770',
            confirmButtonText: 'Corrigir'
        });
        return;
    }

    if (confirmaSenha !== senha) {
        Swal.fire({
            icon: 'error',
            title: 'Senhas não coincidem',
            text: 'As senhas devem ser iguais.',
            confirmButtonColor: '#11C770',
            confirmButtonText: 'Corrigir'
        });
        return;
    }

    nome = formatarTexto(nome);
    data = formatarData(data);

    const tecnico = {
        nome: nome,
        email: email,
        contrato: data,
        senha: senha,
    };

    enviarDados(tecnico);
}

function enviarDados(tecnico) {
    const url = "http://localhost:8080/tecnico/cadastrar";

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tecnico)
    })
        .then(response => response.text())
        .then(message => {
            if (message === "Tecnico Cadastrado com Sucesso") {
                Swal.fire({
                    icon: 'success',
                    title: 'Cadastro com sucesso',
                    text: 'O técnico foi cadastrado com sucesso!',
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
                text: 'Houve um problema ao tentar cadastrar o tecnico.',
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

