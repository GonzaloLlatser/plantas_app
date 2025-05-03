package com.example.plantas_app.controller;

import com.example.plantas_app.model.UsuarioModel;
import com.example.plantas_app.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

  private final UsuarioService usuarioService;

  public UserController(UsuarioService usuarioService) {
    this.usuarioService = usuarioService;
  }

  @PostMapping("/new")
  public ResponseEntity<Map<String, Object>> newUser(@RequestBody UsuarioModel usuario) {
    if (usuarioService.findByEmail(usuario.getEmail()).isPresent()) {
      return ResponseEntity.status(409).body(Map.of(
        "success", false,
        "message", "El email ya está en uso"
      ));
    }
    Map<String, Object> response = new HashMap<>();
    UsuarioModel newUser = usuarioService.crearUsuario(usuario);

    response.put("success", true);
    response.put("message", "Usuario creado correctamente");
    response.put("id", newUser.getId());
    return ResponseEntity.ok(response);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Map<String, Object>> findUserById(@PathVariable("id") Long id) {
    Map<String, Object> response = new HashMap<>();
    Optional<UsuarioModel> user = usuarioService.find(id);
    if (user.isPresent()) {
      return ResponseEntity.ok(Map.of(
        "success", true,
        "user", user.get()
      ));
    }
    return ResponseEntity.status(404).body(Map.of(
      "success", false,
      "message", "Usuario no encontrado"
    ));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable Long id) {
    if (usuarioService.eliminarUsuario(id)) {
      return ResponseEntity.ok(Map.of(
        "success", true,
        "message", "Usuario eliminado correctamente"
      ));
    }
    return ResponseEntity.status(404).body(Map.of(
      "success", false,
      "message", "Usuario no encontrado"
    ));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Map<String, Object>> updateUser(@PathVariable Long id, @RequestBody UsuarioModel usuario) {
    if (usuarioService.modificarUsuario(usuario, id)) {
      return ResponseEntity.ok(Map.of(
        "success", true,
        "message", "Usuario modificado correctamente"
      ));
    }
    return ResponseEntity.status(404).body(Map.of(
      "success", false,
      "message", "Usuario no encontrado o sin modificar"
    ));
  }
}




