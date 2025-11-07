package com.bestSoccer.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bestSoccer.api.model.jogador.JogadorView;
import com.bestSoccer.api.repository.jogador.JogadorRepository;

import jakarta.transaction.Transactional;

@Service
public class JogadorService {

    @Autowired
    private JogadorRepository jogadorRepository;

    public JogadorView selectPorId(Long id) {
        JogadorView jogador = jogadorRepository.findJogadorById(id);
        if (jogador == null) {
            throw new RuntimeException("Jogador com ID " + id + " não foi encontrado");
        }
        return jogador;
    }

    @Transactional
    public void deletarPorId(Long id) {
        JogadorView jogador = jogadorRepository.findJogadorById(id);
        if (jogador == null) {
            throw new RuntimeException("Jogador com ID " + id + " não foi encontrado");
        }
        jogadorRepository.deleteJogadorById(id);
    }

    @Transactional
    public void atualizarPorId(Long id, JogadorView jogadorAtualizado) {
        JogadorView jogador = jogadorRepository.findJogadorById(id);
        if (jogador == null) {
            throw new RuntimeException("Jogador com ID " + id + " não foi encontrado");
        }
        jogadorRepository.updateJogadorById(
            id,
            jogadorAtualizado.getNome(),
            jogadorAtualizado.getPernadominante(),
            jogadorAtualizado.getPosicao(),
            jogadorAtualizado.getAltura(),
            jogadorAtualizado.getPeso(),
            jogadorAtualizado.getContrato(),
            jogadorAtualizado.getNacionalidade(),
            jogadorAtualizado.getDatanascimento(),
            jogadorAtualizado.getFoto()
        );
    }

    

}
