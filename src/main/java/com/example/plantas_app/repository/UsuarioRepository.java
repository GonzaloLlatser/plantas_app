package com.example.plantas_app.repository;

import com.example.plantas_app.model.UsuarioModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioModel, Long> {
  Optional<UsuarioModel> findByEmail(String email);
}
