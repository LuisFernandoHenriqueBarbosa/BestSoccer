package com.bestSoccer.api.service;

import com.bestSoccer.api.model.usuario.UsuarioView;
import com.bestSoccer.api.repository.usuario.UsuarioRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioView login(String email, String senha) {
        return usuarioRepository.findByEmailAndSenha(email, senha);
    }

    public boolean verificarAdmin(Long usuarioId) {
        return usuarioRepository.isAdmin(usuarioId);
    }

    public boolean verificarTecnico(Long usuarioId) {
        return usuarioRepository.isTecnico(usuarioId);
    }
}