package com.bestSoccer.api.model.partida;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "Partida")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PartidaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate data;

    @Column(nullable = false)
    private LocalTime hora;

    @Column(name = "timeadversario", length = 100, nullable = false)
    private String timeadversario;

    @Column(nullable = false)
    private String campeonato;

    @Column(nullable = false)
    private String foto;

}
