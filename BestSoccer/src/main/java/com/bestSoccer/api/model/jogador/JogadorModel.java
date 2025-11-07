package com.bestSoccer.api.model.jogador;

import com.bestSoccer.api.model.estatistica.EstatisticaModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "Jogador")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JogadorModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(name = "pernadominante", nullable = false, length = 10)
    private String pernaDominante;

    @Column(nullable = false, length = 50)
    private String posicao;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal altura;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal peso;

    @Column(nullable = false)
    private LocalDate contrato;

    @Column(nullable = false, length = 50)
    private String nacionalidade;

    @Column(name = "datanascimento", nullable = false)
    private LocalDate dataNascimento;

    @Column
    private String foto;

    @OneToOne(mappedBy = "jogador", cascade = CascadeType.ALL)
    private EstatisticaModel estatisticas;
}
