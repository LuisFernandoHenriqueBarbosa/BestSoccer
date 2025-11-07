package com.bestSoccer.api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String splash() {
        return "splash";
    }

    @GetMapping("/index")
    public String index() {
        return "index";
    }

    @GetMapping("/usuario/login")
    public String login() {
        return "telaLogin";
    }

    @GetMapping("/usuario/cadastrar")
    public String cadastrar() {
        return "telaCadastro";
    }

    @GetMapping("/usuario/admin")
    public String admin() {
        return "telaAdmin";
    }

    @GetMapping("/usuario/tecnico")
    public String tecnico() {
        return "telaTecnico";
    }

    @GetMapping("/jogadores/cadastrar")
    public String cadastrarJogadorPage() {
        return "telaCadastroJogador";
    }

    @GetMapping("/partidas/cadastrar")
    public String cadastrarPartidaPage() {
        return "telaCadastroPartida";
    }

    @GetMapping("/tecnico/cadastrar")
    public String cadastrarTecnicoPage() {
        return "telaCadastroTecnico";
    }
}
