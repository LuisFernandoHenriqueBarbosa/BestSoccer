-- View para visualizar as informações da tabela Jogador
CREATE VIEW v_jogador 
AS
    SELECT j.*
    FROM Jogador j;
-- View para visualizar as informações da tabela Partida
CREATE VIEW v_partida
AS
    SELECT p.*
    FROM Partida p;
-- View para visualizar as informações da tabela Usuario
CREATE VIEW v_usuario AS
SELECT id, nome, email, senha
FROM Usuario;
-- View para visualizar as informações da tabela Admin
CREATE VIEW v_admin
AS
    SELECT a.*, u.nome AS usuario_nome, u.email AS usuario_email
    FROM Administador a
    JOIN Usuario u ON a.usuarioId = u.id;
-- View para visualizar as informações da tabela Tecnico
CREATE VIEW v_tecnico
AS
    SELECT t.*, u.nome AS usuario_nome, u.email AS usuario_email
    FROM Tecnico t
    JOIN Usuario u ON t.usuarioId = u.id;
-- View para visualizar as partidas e os jogadores com suas estatísticas

CREATE VIEW v_estatisticas_jogador 
AS
    SELECT e.*, j.Nome, j.Posicao
    FROM EstatisticasJogador e
    JOIN Jogador j ON e.JogadorId = j.Id;


