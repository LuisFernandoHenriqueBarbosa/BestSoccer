package com.bestSoccer.api.controller.jogador;

import com.bestSoccer.api.model.jogador.JogadorView;
import com.bestSoccer.api.repository.jogador.JogadorRepository;
import com.bestSoccer.api.service.JogadorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jogadores")
public class JogadorController {

    @Autowired
    private JogadorRepository jogadorRepository;

    @Autowired
    private JogadorService jogadorService;

    @GetMapping
    public ResponseEntity<List<JogadorView>> getJogadores() {
        List<JogadorView> jogadores = jogadorRepository.findAllJogadoresOrdenadosPorId();
        return ResponseEntity.ok(jogadores);
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<String> postJogador(@RequestBody JogadorView jogadorView) {
        try {
            jogadorRepository.cadJogador(
                jogadorView.getNome(),
                jogadorView.getPernadominante(),
                jogadorView.getPosicao(),
                jogadorView.getAltura(),
                jogadorView.getPeso(),
                jogadorView.getContrato(),
                jogadorView.getNacionalidade(),
                jogadorView.getDatanascimento(),
                jogadorView.getFoto()
            );
            return new ResponseEntity<>("Jogador Cadastrado com Sucesso", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao cadastrar o jogador: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<JogadorView> getJogadorById(@PathVariable Long id) {
        JogadorView jogador = jogadorService.selectPorId(id);
        return ResponseEntity.ok(jogador);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJogadorById(@PathVariable Long id) {
        try {
            jogadorService.deletarPorId(id);
            return new ResponseEntity<>("Jogador deletado com sucesso", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao deletar o jogador: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<String> updateJogadorById(@PathVariable Long id, @RequestBody JogadorView jogadorAtualizado) {
        try {
            jogadorService.atualizarPorId(id, jogadorAtualizado);
            return new ResponseEntity<>("Jogador atualizado com sucesso", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao atualizar o jogador: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/total-jogadores")
    public ResponseEntity<Long> getTotalJogadores() {
        long total = jogadorRepository.count();
        return ResponseEntity.ok(total);
    }
}
