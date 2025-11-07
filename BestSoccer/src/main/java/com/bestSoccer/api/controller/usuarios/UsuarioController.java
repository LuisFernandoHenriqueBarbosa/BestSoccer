package com.bestSoccer.api.controller.usuarios;

import com.bestSoccer.api.model.usuario.UsuarioView;
import com.bestSoccer.api.repository.usuario.UsuarioRepository;
import com.bestSoccer.api.service.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/cadastrar")
    public ResponseEntity<String> postUsuario(@RequestBody UsuarioView usuarioView) {
        try {
            if (usuarioRepository.existsByEmail(usuarioView.getEmail())) {
                return new ResponseEntity<>("Este e-mail já está cadastrado.", HttpStatus.BAD_REQUEST);
            }
            usuarioRepository.cadUsuario(usuarioView.getNome(), usuarioView.getEmail(),
            usuarioView.getSenha());
            return new ResponseEntity<>("Usuário Cadastrado com Sucesso", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao cadastrar o usuário: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsuarioView usuarioView) {
        try {
            UsuarioView usuario = usuarioService.login(usuarioView.getEmail(), usuarioView.getSenha());

            if (usuario == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
            }

            Long usuarioId = usuario.getId();

            if (usuarioService.verificarAdmin(usuarioId)) {
                return ResponseEntity.ok(new LoginResponse("Login realizado com sucesso", usuario.getNome(), "admin"));
            }
            if (usuarioService.verificarTecnico(usuarioId)) {
                return ResponseEntity
                        .ok(new LoginResponse("Login realizado com sucesso", usuario.getNome(), "tecnico"));
            }
            return ResponseEntity.ok(new LoginResponse("Login realizado com sucesso", usuario.getNome(), "comum"));

        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao realizar login: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public static class LoginResponse {
        private String mensagem;
        private String nomeUsuario;
        private String tipoUsuario;

        public LoginResponse(String mensagem, String nomeUsuario, String tipoUsuario) {
            this.mensagem = mensagem;
            this.nomeUsuario = nomeUsuario;
            this.tipoUsuario = tipoUsuario;
        }

        public String getMensagem() {
            return mensagem;
        }

        public String getNomeUsuario() {
            return nomeUsuario;
        }

        public String getTipoUsuario() {
            return tipoUsuario;
        }
    }
}
