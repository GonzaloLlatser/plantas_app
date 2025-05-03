package com.example.plantas_app.controller;

import com.example.plantas_app.model.UsuarioModel;
import com.example.plantas_app.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  private UsuarioService usuarioService;

  @PostMapping("/login")
  public ResponseEntity<Map<String, Object>> login(@RequestBody UsuarioModel usuario) {
    System.out.println("Intento de login con email: " + usuario.getEmail());

    Optional<UsuarioModel> user = usuarioService.findByEmail(usuario.getEmail());
    Map<String, Object> response = new HashMap<>();

    if (user.isPresent()) {
      if (user.get().getPassword().equals(usuario.getPassword())) {
        response.put("success", true);
        response.put("message", "Login exitoso");
        response.put("id", user.get().getId());
        return ResponseEntity.ok(response);
      } else {
        response.put("success", false);
        response.put("message", "Contraseña incorrecta");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
      }
    } else {
      response.put("success", false);
      response.put("message", "Usuario no encontrado");
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
  }
}