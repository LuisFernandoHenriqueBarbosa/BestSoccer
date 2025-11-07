package com.bestSoccer.api.repository.jogador;

import com.bestSoccer.api.model.jogador.JogadorModel;
import com.bestSoccer.api.model.jogador.JogadorView;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface JogadorRepository extends JpaRepository<JogadorModel, Long> {

    @Procedure(procedureName = "sp_cadjogador")
    void cadJogador(
            @Param("nome") String nome,
            @Param("pernadominante") String pernadominante,
            @Param("posicao") String posicao,
            @Param("altura") BigDecimal altura,
            @Param("peso") BigDecimal peso,
            @Param("contrato") LocalDate contrato,
            @Param("nacionalidade") String nacionalidade,
            @Param("datanascimento") LocalDate datanascimento,
            @Param("foto") String foto);

            @Query("SELECT j FROM JogadorView j ORDER BY j.id ASC")
            List<JogadorView> findAllJogadoresOrdenadosPorId();

    @Query("SELECT j FROM JogadorView j WHERE j.id = :id")
    JogadorView findJogadorById(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query("DELETE FROM JogadorView j WHERE j.id = :id")
    void deleteJogadorById(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query("UPDATE JogadorView j SET j.nome = :nome, j.pernadominante = :pernadominante, j.posicao = :posicao, j.altura = :altura, j.peso = :peso, j.contrato = :contrato, j.nacionalidade = :nacionalidade, j.datanascimento = :datanascimento, j.foto = :foto WHERE j.id = :id")
    void updateJogadorById(@Param("id") Long id, @Param("nome") String nome,
            @Param("pernadominante") String pernadominante, @Param("posicao") String posicao,
            @Param("altura") BigDecimal altura, @Param("peso") BigDecimal peso, @Param("contrato") LocalDate contrato,
            @Param("nacionalidade") String nacionalidade, @Param("datanascimento") LocalDate datanascimento,
            @Param("foto") String foto);
}