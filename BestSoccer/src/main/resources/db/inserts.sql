-- Inserir jogador sem foto, foto padrão será usada
CALL sp_cadJogador('Carlos Silva', 'direita', 'Atacante', 1.80, 75.5, '2025-12-31', 'Brasileiro', '1998-05-14');
CALL sp_cadJogador('Miguel Santos', 'esquerda', 'Meio-Campista', 1.75, 68.3, '2024-06-30', 'Português', '2000-03-21');
CALL sp_cadJogador('Lucas Fernandes', 'direita', 'Zagueiro', 1.85, 82.0, '2026-11-10', 'Espanhol', '1995-09-02');
CALL sp_cadJogador('Gabriel Rocha', 'esquerda', 'Lateral', 1.70, 65.0, '2024-08-01', 'Argentino', '1999-01-13');
CALL sp_cadJogador('Rafael Costa', 'direita', 'Goleiro', 1.88, 90.5, '2025-04-20', 'Italiano', '1997-12-30');
CALL sp_cadJogador('João Lima', 'direita', 'Meio-Campista', 1.78, 70.1, '2026-07-15', 'Brasileiro', '2001-11-25');
CALL sp_cadJogador('Pedro Almeida', 'esquerda', 'Atacante', 1.82, 76.3, '2025-10-05', 'Francês', '1998-04-17');

-- Inserts para a procedure sp_cadPartida (alteração para data, hora, timeAdversario e nomeCampeonato)
CALL sp_cadPartida('2024-11-15', '18:30', 'Milan', 'Campeonato Brasileiro', '/image/logoMilan.png');
CALL sp_cadPartida('2024-12-01', '20:00', 'Real Madrid', 'Copa do Mundo', '/image/logoReal.png');
CALL sp_cadPartida('2024-12-10', '19:00', 'Paris Saint Germain', 'Libertadores', '/image/logoPSG.png');
CALL sp_cadPartida('2025-01-05', '16:00', 'Milan', 'Copa América', '/image/logoMilan.png');
CALL sp_cadPartida('2025-01-20', '17:30', 'Manchester City', 'Campeonato Paulista', '/image/logoManchester.png');
CALL sp_cadPartida('2025-02-02', '15:00', 'Liverpool', 'Copa do Brasil', '/image/logoLiverpool.png');
CALL sp_cadPartida('2025-02-15', '21:00', 'Real Madrid', 'Liga dos Campeões', '/image/logoReal.png');


-- Inserts para a procedure sp_cadUsuario
CALL sp_cadUsuario('Lucas Oliveira', 'lucas@example.com', 'senha123');
CALL sp_cadUsuario('Ana Torres', 'ana@example.com', 'senha456');
CALL sp_cadUsuario('Bruno Santos', 'bruno@example.com', 'senha789');
CALL sp_cadUsuario('Mariana Souza', 'mariana@example.com', 'senha321');
CALL sp_cadUsuario('Felipe Costa', 'felipe@example.com', 'senha654');
CALL sp_cadUsuario('Julia Ferreira', 'julia@example.com', 'senha987');
CALL sp_cadUsuario('Ricardo Martins', 'ricardo@example.com', 'senha111');

-- Insert para a procedure sp_cadAdmin
CALL sp_cadAdmin('José Pereira', 'admin@example.com', 'adminsenha', 1);

-- Insert para a procedure sp_cadTecnico
CALL sp_cadTecnico('Paulo Silva', 'tecnico@example.com', 'tecnicosenha', '2026-05-01');


-- Inserir estatísticas para o jogador com id 1
CALL sp_cadEstatisticaJogador(1, 15, 10, 5, 25, 30, 10, 2, 1, 0);

-- Inserir estatísticas para o jogador com id 2
CALL sp_cadEstatisticaJogador(2, 20, 15, 7, 30, 35, 12, 3, 2, 1);

-- Inserir estatísticas para o jogador com id 3
CALL sp_cadEstatisticaJogador(3, 18, 12, 4, 20, 28, 9, 1, 0, 0);

-- Inserir estatísticas para o jogador com id 4
CALL sp_cadEstatisticaJogador(4, 22, 18, 10, 35, 40, 15, 4, 3, 0);

-- Inserir estatísticas para o jogador com id 5
CALL sp_cadEstatisticaJogador(5, 12, 5, 3, 15, 20, 6, 2, 1, 1);

-- Inserir estatísticas para o jogador com id 6
CALL sp_cadEstatisticaJogador(6, 25, 20, 8, 45, 50, 18, 3, 2, 0);

-- Inserir estatísticas para o jogador com id 7
CALL sp_cadEstatisticaJogador(7, 30, 25, 12, 40, 55, 20, 4, 4, 0);


