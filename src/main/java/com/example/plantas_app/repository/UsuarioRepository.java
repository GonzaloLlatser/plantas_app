package com.example.plantas_app.repository;

import com.example.plantas_app.model.UsuarioModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<UsuarioModel, Long> {
  Optional<UsuarioModel> findByEmailAndPassword(String email, String password);

  Optional<UsuarioModel> findByEmail(String email);
}
