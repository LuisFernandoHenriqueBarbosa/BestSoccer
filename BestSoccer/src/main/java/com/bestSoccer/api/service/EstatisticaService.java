package com.bestSoccer.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bestSoccer.api.model.estatistica.EstatisticaModel;
import com.bestSoccer.api.model.estatistica.EstatisticaView;
import com.bestSoccer.api.repository.estatistica.EstatisticaRepository;

@Service
public class EstatisticaService {

    @Autowired
    private EstatisticaRepository estatisticaRepository;


    public EstatisticaModel saveEstatisticas(EstatisticaModel estatisticas) {
        return estatisticaRepository.save(estatisticas);
    }

    public void cadastrarEstatisticas(int jogadorId, EstatisticaView estatisticas) {
        estatisticaRepository.cadEstatisticaJogador(
            jogadorId,
            estatisticas.getJogosdisputados(),
            estatisticas.getGolsmarcados(),
            estatisticas.getAssistencias(),
            estatisticas.getFinalizacoes(),
            estatisticas.getPasses(),
            estatisticas.getDesarmes(),
            estatisticas.getFaltascometidas(),
            estatisticas.getCartoesamarelos(),
            estatisticas.getCartoesvermelhos()
        );
    }


    public void updateEstatisticasById(Long id, EstatisticaView estatisticas) {
        EstatisticaModel estatisticaModel = estatisticaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Estatísticas não encontradas para o ID: " + id));

        estatisticaModel.setJogosdisputados(estatisticas.getJogosdisputados());
        estatisticaModel.setGolsmarcados(estatisticas.getGolsmarcados());
        estatisticaModel.setAssistencias(estatisticas.getAssistencias());
        estatisticaModel.setFinalizacoes(estatisticas.getFinalizacoes());
        estatisticaModel.setPasses(estatisticas.getPasses());
        estatisticaModel.setDesarmes(estatisticas.getDesarmes());
        estatisticaModel.setFaltascometidas(estatisticas.getFaltascometidas());
        estatisticaModel.setCartoesamarelos(estatisticas.getCartoesamarelos());
        estatisticaModel.setCartoesvermelhos(estatisticas.getCartoesvermelhos());
    
        estatisticaRepository.save(estatisticaModel);
    }
}
