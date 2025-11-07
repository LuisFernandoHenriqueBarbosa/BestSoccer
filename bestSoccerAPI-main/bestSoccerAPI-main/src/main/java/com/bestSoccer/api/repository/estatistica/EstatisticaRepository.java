package com.bestSoccer.api.repository.estatistica;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.bestSoccer.api.model.estatistica.EstatisticaModel;
import com.bestSoccer.api.model.estatistica.EstatisticaView;

public interface EstatisticaRepository extends JpaRepository<EstatisticaModel, Long> {

        @Procedure(procedureName = "sp_cadEstatisticaJogador")
        void cadEstatisticaJogador(
            @Param("jogadorid") int jogadorid,
            @Param("jogodisputado") int jogosdisputados,
            @Param("golsmarcados") int golsmarcados,
            @Param("assistencias") int assistencias,
            @Param("finalizacoes") int finalizacoes,
            @Param("passes") int passes,
            @Param("desarmes") int desarmes,
            @Param("faltascometidas") int faltascometidas,
            @Param("cartoesamarelos") int cartoesamarelos,
            @Param("cartoesvermelhos") int cartoesvermelhos
        );
        

        @Query("SELECT j FROM EstatisticaView j")
        List<EstatisticaView> findAllEstatistica();

        @Query("SELECT e FROM EstatisticaView e WHERE e.jogadorid = :jogadorid")
        EstatisticaView findEstatisticasByJogadorId(@Param("jogadorid") int jogadorid);

        @Query("SELECT e FROM EstatisticaView e WHERE e.id = :id")
        EstatisticaView findByEstatisticaId(@Param("id") Long id);

        @Modifying
        @Transactional
        @Query("UPDATE EstatisticaView e SET e.jogosdisputados = :jogosdisputados, e.golsmarcados = :golsmarcados, e.assistencias = :assistencias, e.finalizacoes = :finalizacoes, e.passes = :passes, e.desarmes = :desarmes, e.faltascometidas = :faltascometidas, e.cartoesamarelos = :cartoesamarelos, e.cartoesvermelhos = :cartoesvermelhos WHERE e.id = :id")
        void updateEstatisticasById(@Param("id") Long id,
                        @Param("jogosdisputados") int jogosdisputados,
                        @Param("golsmarcados") int golsmarcados,
                        @Param("assistencias") int assistencias,
                        @Param("finalizacoes") int finalizacoes,
                        @Param("passes") int passes,
                        @Param("desarmes") int desarmes,
                        @Param("faltascometidas") int faltascometidas,
                        @Param("cartoesamarelos") int cartoesamarelos,
                        @Param("cartoesvermelhos") int cartoesvermelhos);
}
