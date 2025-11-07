-- Procedure para cadastrar um Jogador
CREATE PROCEDURE sp_cadJogador(
    nome VARCHAR(100),
    pernaDominante VARCHAR(10),
    posicao VARCHAR(50),
    altura DECIMAL(5,2),
    peso DECIMAL(5,2),
    contrato DATE,
    nacionalidade VARCHAR(50),
    dataNascimento DATE,
    foto VARCHAR(255) DEFAULT 'image/jogadorDesconhecido.jpg' 
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO Jogador (Nome, pernaDominante, posicao, altura, peso, contrato, nacionalidade, dataNascimento, foto)
    VALUES (nome, pernaDominante, posicao, altura, peso, contrato, nacionalidade, dataNascimento, foto);
END;
$$;

-- Procedure para cadastrar uma Partida
CREATE PROCEDURE sp_cadPartida(
    data DATE,
    hora TIME,
    timeadversario VARCHAR(100),
    campeonato VARCHAR(50),
    foto VARCHAR(255)
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO Partida (data, hora, timeadversario, campeonato, foto)
    VALUES (data, hora, timeAdversario, campeonato, foto);
END;
$$;

-- Procedure para cadastrar um Usuario
CREATE PROCEDURE sp_cadUsuario(
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(100)
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO Usuario (nome, email, senha)
    VALUES (nome, email, senha);
END;
$$;

-- Procedure para cadastrar um Administrador
CREATE PROCEDURE sp_cadAdmin(
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(100),
    status INT
)
LANGUAGE plpgsql
AS $$
DECLARE
    pessoa_id INT;
BEGIN
    INSERT INTO Usuario (nome, email, senha)
    VALUES (nome, email, senha)
    RETURNING id INTO pessoa_id;

    INSERT INTO Administrador (usuarioId, status)
    VALUES (pessoa_id, status);
END;
$$;

-- Procedure para cadastrar um Tecnico
CREATE PROCEDURE sp_cadTecnico(
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(100),
    contrato DATE
)
LANGUAGE plpgsql
AS $$
DECLARE
    pessoa_id INT;
BEGIN
    INSERT INTO Usuario (nome, email, senha)
    VALUES (nome, email, senha)
    RETURNING id INTO pessoa_id;

    INSERT INTO Tecnico (usuarioId, contrato)
    VALUES (pessoa_id, contrato);
END;
$$;

-- Procedure para cadastrar uma Estatística de Jogador
CREATE PROCEDURE sp_cadEstatisticaJogador(
    jogador_id INT, 
    jogos_disputados INT DEFAULT 0, 
    gols_marcados INT DEFAULT 0, 
    assistencias INT DEFAULT 0, 
    finalizacoes INT DEFAULT 0, 
    passes INT DEFAULT 0, 
    desarmes INT DEFAULT 0, 
    faltas_cometidas INT DEFAULT 0, 
    cartoes_amarelos INT DEFAULT 0, 
    cartoes_vermelhos INT DEFAULT 0
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO EstatisticasJogador (
        JogadorId, 
        jogosDisputados, 
        golsMarcados, 
        assistencias, 
        finalizacoes, 
        passes, 
        desarmes, 
        faltasCometidas, 
        cartoesAmarelos, 
        cartoesVermelhos
    )
    VALUES (
        jogador_id, 
        jogos_disputados, 
        gols_marcados, 
        assistencias, 
        finalizacoes, 
        passes, 
        desarmes, 
        faltas_cometidas, 
        cartoes_amarelos, 
        cartoes_vermelhos
    );
END;
$$;
