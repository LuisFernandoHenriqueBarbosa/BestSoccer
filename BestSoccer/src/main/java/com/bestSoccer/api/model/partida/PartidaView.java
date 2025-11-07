package com.bestSoccer.api.model.partida;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "v_partida")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PartidaView {

    @Id
    private Long id;

    private LocalDate data;
    private LocalTime hora;
    private String timeadversario;
    private String campeonato;
    private String foto;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public LocalTime getHora() {
        return hora;
    }

    public void setHora(LocalTime hora) {
        this.hora = hora;
    }

    public String getTimeadversario() {
        return timeadversario;
    }

    public void setTimeadversario(String timeadversario) {
        this.timeadversario = timeadversario;
    }

    public String getCampeonato() {
        return campeonato;
    }

    public void setCampeonato(String campeonato) {
        this.campeonato = campeonato;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }
}
