package com.bestSoccer.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bestSoccer.api.model.partida.PartidaView;
import com.bestSoccer.api.repository.partida.PartidaRepository;

import jakarta.transaction.Transactional;

@Service
public class PartidaService {

    @Autowired
    private PartidaRepository partidaRepository;

    public PartidaView selectPorId(Long id) {
        PartidaView partida = partidaRepository.findPartidaById(id);
        if (partida == null) {
            throw new RuntimeException("Partida com ID " + id + " não foi encontrado");
        }
        return partida;
    }

    @Transactional
    public void deletarPorId(Long id) {
        PartidaView partida = partidaRepository.findPartidaById(id);
        if (partida == null) {
            throw new RuntimeException("Partida com ID " + id + " não foi encontrado");
        }
        partidaRepository.deletePartidaById(id);
    }

    @Transactional
    public void atualizarPorId(Long id, PartidaView partidaAtualizado) {
        PartidaView partida = partidaRepository.findPartidaById(id);
        if (partida == null) {
            throw new RuntimeException("Partida com ID " + id + " não foi encontrado");
        }
        partidaRepository.updatePartidaById(
            id,
            partidaAtualizado.getData(),
            partidaAtualizado.getHora(),
            partidaAtualizado.getTimeadversario(),
            partidaAtualizado.getCampeonato(),
            partidaAtualizado.getFoto()
        );
    }

}
