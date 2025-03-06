package com.example.plantas_app.controller;

import com.example.plantas_app.model.UsuarioModel;
import com.example.plantas_app.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

  @Autowired
  private UsuarioRepository usuarioRepository;

  @PostMapping("/login")
  public ResponseEntity<String> login(@RequestBody UsuarioModel usuario) {
    System.out.println("Email recibido: " + usuario.getEmail());
    System.out.println("Contraseña recibida: " + usuario.getPassword());

    Optional<UsuarioModel> user = usuarioRepository.findByEmail(usuario.getEmail());

    if (user.isPresent()) {
      System.out.println("Usuario encontrado: " + user.get().getEmail());
      System.out.println("Contraseña almacenada: " + user.get().getPassword());
    } else {
      System.out.println("Usuario no encontrado.");
    }

    if (user.isPresent() && usuario.getPassword().equals(user.get().getPassword())) {
      return ResponseEntity.ok("Usuario logueado correctamente");
    }

    return ResponseEntity.status(401).body("Credenciales incorrectas");
  }
}

