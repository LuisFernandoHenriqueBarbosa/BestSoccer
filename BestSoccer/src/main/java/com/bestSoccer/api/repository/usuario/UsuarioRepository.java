package com.bestSoccer.api.repository.usuario;

import com.bestSoccer.api.model.usuario.UsuarioModel;
import com.bestSoccer.api.model.usuario.UsuarioView;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;


public interface UsuarioRepository extends JpaRepository<UsuarioModel, Long> {

    @Procedure(procedureName = "sp_cadUsuario")
    void cadUsuario(
            @Param("nome") String nome,
            @Param("email") String email,
            @Param("senha") String senha
    );

    boolean existsByEmail(String email);

    @Query("SELECT u FROM UsuarioView u WHERE u.email = :email AND u.senha = :senha")
    UsuarioView findByEmailAndSenha(@Param("email") String email, @Param("senha") String senha);

    @Query(value = "SELECT CASE WHEN COUNT(1) > 0 THEN true ELSE false END FROM v_admin WHERE usuarioId = :usuarioId", nativeQuery = true)
    boolean isAdmin(@Param("usuarioId") Long usuarioId);

    @Query(value = "SELECT CASE WHEN COUNT(1) > 0 THEN true ELSE false END FROM v_tecnico WHERE usuarioId = :usuarioId", nativeQuery = true)
    boolean isTecnico(@Param("usuarioId") Long usuarioId);
}
