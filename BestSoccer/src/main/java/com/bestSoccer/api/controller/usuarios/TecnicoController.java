package com.bestSoccer.api.controller.usuarios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bestSoccer.api.model.tecnico.TecnicoView;
import com.bestSoccer.api.repository.tecnico.TecnicoRepository;
import com.bestSoccer.api.service.TecnicoService;

@RestController
@RequestMapping("/tecnico")
public class TecnicoController {

    @Autowired
    private TecnicoRepository tecnicoRepository;

    @Autowired
    private TecnicoService tecnicoService;

    @GetMapping
    public ResponseEntity<List<TecnicoView>> getTecnico() {
        List<TecnicoView> tecnicos = tecnicoRepository.findAllTecnicoOrdenadosPorId();
        return ResponseEntity.ok(tecnicos);
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<String> postTecnico(@RequestBody TecnicoView tecnicoView) {
        try {
            if (tecnicoRepository.existsByEmail(tecnicoView.getEmail())) {
                return new ResponseEntity<>("Este e-mail já está cadastrado.", HttpStatus.BAD_REQUEST);
            }
            tecnicoRepository.cadTecnico(tecnicoView.getNome(), tecnicoView.getEmail(),
            tecnicoView.getSenha(), tecnicoView.getContrato());
            return new ResponseEntity<>("Tecnico Cadastrado com Sucesso", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao cadastrar o tecnico: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/total-tecnico")
    public ResponseEntity<Long> getTotalTecnico() {
        long total = tecnicoRepository.count();
        return ResponseEntity.ok(total);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TecnicoView> getTecnicoById(@PathVariable Long id) {
        TecnicoView tecnico = tecnicoService.selectPorId(id);
        return ResponseEntity.ok(tecnico);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTecnicoById(@PathVariable Long id) {
        try {
            tecnicoService.deletarPorId(id);
            return new ResponseEntity<>("Tecnico deletado com sucesso", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao deletar o jogador: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
