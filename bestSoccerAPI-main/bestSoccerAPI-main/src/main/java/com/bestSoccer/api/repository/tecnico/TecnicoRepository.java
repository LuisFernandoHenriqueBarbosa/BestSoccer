package com.bestSoccer.api.repository.tecnico;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import com.bestSoccer.api.model.tecnico.TecnicoModel;
import com.bestSoccer.api.model.tecnico.TecnicoView;

import jakarta.transaction.Transactional;

public interface TecnicoRepository extends JpaRepository<TecnicoModel, Long> {

    @Procedure(procedureName = "sp_cadTecnico")
    void cadTecnico(
            @Param("nome") String nome,
            @Param("email") String email,
            @Param("senha") String senha,
            @Param("contrato") LocalDate contrato);

    boolean existsByEmail(String email);

    @Query("SELECT t FROM TecnicoView t ORDER BY t.id ASC")
    List<TecnicoView> findAllTecnicoOrdenadosPorId();

    @Query("SELECT t FROM TecnicoView t WHERE t.id = :id")
    TecnicoView findTecnicoById(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query("DELETE FROM TecnicoView j WHERE j.id = :id")
    void deleteTecnicoById(@Param("id") Long id);

}
