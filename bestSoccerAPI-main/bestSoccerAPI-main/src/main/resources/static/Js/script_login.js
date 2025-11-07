function logar(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;

    if (!email || !senha) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vazios',
            text: 'Por favor, preencha todos os campos.',
            confirmButtonColor: '#11C770',
            confirmButtonText: 'Entendi'
        });
        return;
    }

    enviarLogin(email, senha);
}

function enviarLogin(email, senha) {
    const url = "http://localhost:8080/usuario/login";
    const dados = { email: email, senha: senha };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(message => {
                throw new Error(message.mensagem);
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.mensagem === "Login realizado com sucesso") {
            localStorage.setItem('nomeUsuario', data.nomeUsuario);
            localStorage.setItem('tipoUsuario', data.tipoUsuario);

            Swal.fire({
                icon: 'success',
                title: 'Login realizado',
                text: 'Bem-vindo de volta!',
                confirmButtonColor: '#11C770',
                confirmButtonText: 'Continuar'
            }).then((result) => {
                if (result.isConfirmed) {
                    if (data.tipoUsuario === "admin") {
                        window.location.href = "http://localhost:8080/usuario/admin";
                    } else if (data.tipoUsuario === "tecnico") {
                        window.location.href = "http://localhost:8080/usuario/tecnico";
                    } else {
                        window.location.href = "http://localhost:8080/index";
                    }
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro no login',
                text: data.mensagem,
                confirmButtonColor: '#11C770',
                confirmButtonText: 'Tentar novamente'
            });
        }
    })
    .catch(error => {
        console.error("Erro:", error);
        Swal.fire({
            icon: 'error',
            title: 'Credenciais inválidas, tente novamente',
            confirmButtonColor: '#11C770',
            confirmButtonText: 'Tentar Novamente'
        });
    });
}
