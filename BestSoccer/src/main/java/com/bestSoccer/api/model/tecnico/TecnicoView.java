package com.bestSoccer.api.model.tecnico;

import java.time.LocalDate;

import com.bestSoccer.api.model.usuario.UsuarioView;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table (name = "v_tecnico")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TecnicoView extends UsuarioView {

    @Id
    private Long id;
    private LocalDate contrato;

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getContrato() {
        return contrato;
    }

    public void setContrato(LocalDate contrato) {
        this.contrato = contrato;
    }
}
