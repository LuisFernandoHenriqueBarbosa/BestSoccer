-- Tabela Jogador
CREATE TABLE Jogador (
    Id SERIAL PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    PernaDominante VARCHAR(10) NOT NULL CHECK (PernaDominante IN ('esquerda', 'direita')),
    Posicao VARCHAR(50) NOT NULL,
    Altura DECIMAL(5,2) NOT NULL,
    Peso DECIMAL(5,2) NOT NULL,
    Contrato DATE NOT NULL,
    Nacionalidade VARCHAR(50) NOT NULL,
    DataNascimento DATE NOT NULL,
    Foto VARCHAR(255) NOT NULL DEFAULT 'image/jogadorDesconhecido.jpg'
);

-- Tabela Partida
CREATE TABLE Partida (
    Id SERIAL PRIMARY KEY,
    Data DATE NOT NULL,
    Hora TIME NOT NULL,
    TimeAdversario VARCHAR(100) NOT NULL,
    Campeonato VARCHAR(50) NOT NULL,
    Foto VARCHAR(255) NOT NULL
);


-- Tabela Usuario
CREATE TABLE Usuario (
    Id SERIAL PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Senha VARCHAR(100) NOT NULL
);

-- Tabela Administrador
CREATE TABLE Administrador (
    Id SERIAL PRIMARY KEY,
    Status INT NOT NULL CHECK (Status IN (1, 2, 3)),
    UsuarioId INT NOT NULL,
    FOREIGN KEY (UsuarioId) REFERENCES Usuario(Id) ON DELETE CASCADE
);

-- Tabela Tecnico
CREATE TABLE Tecnico (
    Id SERIAL PRIMARY KEY,
    Contrato DATE NOT NULL,
    UsuarioId INT NOT NULL,
    FOREIGN KEY (UsuarioId) REFERENCES Usuario(Id) ON DELETE CASCADE
);

-- Tabela EstatisticasJogador
CREATE TABLE EstatisticasJogador (
    Id SERIAL PRIMARY KEY,
    JogadorId INT NOT NULL,
    JogosDisputados INT DEFAULT 0,
    GolsMarcados INT DEFAULT 0,
    Assistencias INT DEFAULT 0,
    Finalizacoes INT DEFAULT 0,
    Passes INT DEFAULT 0,
    Desarmes INT DEFAULT 0,
    FaltasCometidas INT DEFAULT 0,
    CartoesAmarelos INT DEFAULT 0,
    CartoesVermelhos INT DEFAULT 0,
    FOREIGN KEY (JogadorId) REFERENCES Jogador(Id) ON DELETE CASCADE
);
