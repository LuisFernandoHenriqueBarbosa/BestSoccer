package com.bestSoccer.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bestSoccer.api.model.tecnico.TecnicoView;
import com.bestSoccer.api.repository.tecnico.TecnicoRepository;

import jakarta.transaction.Transactional;

@Service
public class TecnicoService {

    @Autowired
    private TecnicoRepository tecnicoRepository;

    public TecnicoView selectPorId(Long id) {
        TecnicoView tecnico = tecnicoRepository.findTecnicoById(id);
        if (tecnico == null) {
            throw new RuntimeException("Tecnico com ID " + id + " não foi encontrado");
        }
        return tecnico;
    }

    @Transactional
    public void deletarPorId(Long id) {
        TecnicoView tecnico = tecnicoRepository.findTecnicoById(id);
        if (tecnico == null) {
            throw new RuntimeException("Tecnico com ID " + id + " não foi encontrado");
        }
        tecnicoRepository.deleteTecnicoById(id);
    }
}
