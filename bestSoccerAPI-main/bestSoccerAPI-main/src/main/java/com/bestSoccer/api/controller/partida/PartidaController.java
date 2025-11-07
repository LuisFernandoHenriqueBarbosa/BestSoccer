package com.bestSoccer.api.controller.partida;

import com.bestSoccer.api.model.partida.PartidaView;
import com.bestSoccer.api.repository.partida.PartidaRepository;
import com.bestSoccer.api.service.PartidaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/partidas")
public class PartidaController {

    @Autowired
    private PartidaRepository partidaRepository;
    
    @Autowired
    private PartidaService partidaService;

    @GetMapping
    public ResponseEntity<List<PartidaView>> getPartida() {
        List<PartidaView> partidas = partidaRepository.findAllPartida(); 
        return ResponseEntity.ok(partidas);
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<String> postJogo(@RequestBody PartidaView partidaView) {
        try {
            partidaRepository.cadPartida(
                partidaView.getData(),
                partidaView.getHora(),
                partidaView.getTimeadversario(),
                partidaView.getCampeonato(),
                partidaView.getFoto()
            );
            return new ResponseEntity<>("Jogo Cadastrado com Sucesso", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao cadastrar o jogador: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PartidaView> getPartidaById(@PathVariable Long id) {
        PartidaView partida = partidaService.selectPorId(id);
        return ResponseEntity.ok(partida);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePartidaById(@PathVariable Long id) {
        try {
            partidaService.deletarPorId(id);
            return new ResponseEntity<>("Partida deletada com sucesso", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao deletar o partida: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updatePartidaById(@PathVariable Long id, @RequestBody PartidaView partidaAtualizado) {
        try {
            partidaService.atualizarPorId(id, partidaAtualizado);
            return new ResponseEntity<>("Partida atualizado com sucesso", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao atualizar o jogador: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/total-partida")
    public ResponseEntity<Long> getTotalPartida() {
        long total = partidaRepository.count();
        return ResponseEntity.ok(total);
    }

    }

