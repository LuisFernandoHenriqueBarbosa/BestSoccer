package com.bestSoccer.api.repository.partida;

import com.bestSoccer.api.model.partida.PartidaModel;
import com.bestSoccer.api.model.partida.PartidaView;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface PartidaRepository extends JpaRepository<PartidaModel, Long> {

        @Procedure(procedureName = "sp_cadPartida")
        void cadPartida(
                        @Param("data") LocalDate data,
                        @Param("hora") LocalTime hora,
                        @Param("timeadversario") String timeadversario,
                        @Param("campeonato") String campeonato,
                        @Param("foto") String foto);

        @Query("SELECT p FROM PartidaView p")
        List<PartidaView> findAllPartida();

        @Query("SELECT p FROM PartidaView p WHERE p.id = :id")
        PartidaView findPartidaById(@Param("id") Long id);

        @Modifying
        @Transactional
        @Query("DELETE FROM PartidaView j WHERE j.id = :id")
        void deletePartidaById(@Param("id") Long id);

        @Modifying
        @Transactional
        @Query("UPDATE PartidaView p SET p.data = :data, p.hora = :hora, p.timeadversario = :timeadversario, p.campeonato = :campeonato, p.foto = :foto WHERE p.id = :id")
        void updatePartidaById(
                        @Param("id") Long id,
                        @Param("data") LocalDate data,
                        @Param("hora") LocalTime hora,
                        @Param("timeadversario") String timeadversario,
                        @Param("campeonato") String campeonato,
                        @Param("foto") String foto);

}
