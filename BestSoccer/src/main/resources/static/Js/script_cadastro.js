function cadastrar(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmSenha = document.getElementById("confirmSenha").value;

    if (!nome || !email || !senha || !confirmSenha) {
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

    if (confirmSenha !== senha) {
        Swal.fire({
            icon: 'error',
            title: 'Senhas não coincidem',
            text: 'As senhas devem ser iguais.',
            confirmButtonColor: '#11C770',
            confirmButtonText: 'Corrigir'
        });
        return;
    }

    enviarDados(nome, email, senha);
}

function enviarDados(nome, email, senha) {
    const url = "http://localhost:8080/usuario/cadastrar";
    const dados = {
        nome: nome,
        email: email,
        senha: senha
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.text())
    .then(message => {
        if (message === "Usuário Cadastrado com Sucesso") {
            Swal.fire({
                icon: 'success',
                title: 'Cadastrado com sucesso.',
                text: 'Você foi cadastrado com sucesso!',
                confirmButtonColor: '#11C770',
                confirmButtonText: 'Fazer login'
            }).then(() => {
                window.location.href = "http://localhost:8080/usuario/login";
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Falha no cadastro',
                text: message,
                confirmButtonColor: '#11C770',
                confirmButtonText: 'Corrigir'
            });
        }
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Erro ao enviar os dados. Tente novamente.");
    });
}
