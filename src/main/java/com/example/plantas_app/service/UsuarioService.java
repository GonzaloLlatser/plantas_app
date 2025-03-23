package com.example.plantas_app.service;

import com.example.plantas_app.model.UsuarioModel;
import com.example.plantas_app.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

  private final UsuarioRepository usuarioRepository;

  // Constructor con inyección de dependencias
  public UsuarioService(UsuarioRepository usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  // Buscar usuario por email
  public Optional<UsuarioModel> findByEmail(String email) {
    return usuarioRepository.findByEmail(email);
  }

  // Crear usuario
  public UsuarioModel crearUsuario(UsuarioModel usuario) {
    return usuarioRepository.save(usuario);
  }

  // Buscar usuario por ID
  public Optional<UsuarioModel> find(Long id) {
    return usuarioRepository.findById(id);
  }

  // Eliminar usuario
  public boolean eliminarUsuario(Long id) {
    if (!usuarioRepository.existsById(id)) {
      return false;
    }
    usuarioRepository.deleteById(id);
    return true;
  }

  // Modificar usuario
  public boolean modificarUsuario(UsuarioModel usuario, Long id) {
    if (!usuarioRepository.existsById(id)) {
      return false;
    }
    usuario.setId(id);
    usuarioRepository.save(usuario);
    return true;
  }
}

