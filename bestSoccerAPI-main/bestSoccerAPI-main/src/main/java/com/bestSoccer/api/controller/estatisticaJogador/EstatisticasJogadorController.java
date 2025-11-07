package com.bestSoccer.api.controller.estatisticaJogador;

import com.bestSoccer.api.model.estatistica.EstatisticaView;
import com.bestSoccer.api.repository.estatistica.EstatisticaRepository;
import com.bestSoccer.api.service.EstatisticaService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/estatisticas-jogador")
public class EstatisticasJogadorController {

    @Autowired
    private EstatisticaRepository estatisticaRepository;

    @Autowired
    private EstatisticaService estatisticaService;

    @GetMapping("/{id}")
    public ResponseEntity<EstatisticaView> getEstatisticas(@PathVariable int id) {
        EstatisticaView estatisticas = estatisticaRepository.findEstatisticasByJogadorId(id);
        if (estatisticas != null) {
            return ResponseEntity.ok(estatisticas);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping
    public ResponseEntity<String> postEstatistica(@RequestBody EstatisticaView estatisticaView) {
        EstatisticaView estatisticaExistente = estatisticaRepository
                .findEstatisticasByJogadorId(estatisticaView.getJogadorid());
        if (estatisticaExistente == null) {
            try {
                estatisticaRepository.cadEstatisticaJogador(
                        estatisticaView.getJogadorid(),
                        estatisticaView.getJogosdisputados(),
                        estatisticaView.getGolsmarcados(),
                        estatisticaView.getAssistencias(),
                        estatisticaView.getFinalizacoes(),
                        estatisticaView.getPasses(),
                        estatisticaView.getDesarmes(),
                        estatisticaView.getFaltascometidas(),
                        estatisticaView.getCartoesamarelos(),
                        estatisticaView.getCartoesvermelhos());
                return new ResponseEntity<>("Estatísticas cadastradas com sucesso!", HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>("Erro ao cadastrar as estatísticas: " + e.getMessage(),
                        HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>("As estatísticas já existem para este jogador.", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEstatisticas(@PathVariable Long id, @RequestBody EstatisticaView estatisticaView) {
        try {
            estatisticaService.updateEstatisticasById(id, estatisticaView);

            // Retorna uma mensagem em formato JSON
            Map<String, String> response = new HashMap<>();
            response.put("mensagem", "Estatísticas atualizadas com sucesso!");

            return ResponseEntity.ok(response); // O Spring converte automaticamente o Map para JSON
        } catch (Exception e) {
            // Retorna erro também no formato JSON
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("erro", "Erro ao atualizar as estatísticas: " + e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

}
