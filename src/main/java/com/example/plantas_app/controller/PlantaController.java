package com.example.plantas_app.controller;

import com.example.plantas_app.model.PlantaModel;
import com.example.plantas_app.service.PlantaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/plantas")
public class PlantaController {

  private final PlantaService plantaService;

  public PlantaController(PlantaService plantaService) {
    this.plantaService = plantaService;
  }
  @GetMapping()
  public ResponseEntity<List<PlantaModel>> getAllPlantas() {
    Map<String, Object> response = new HashMap<>();
    List<PlantaModel> plantas= plantaService.obtenerTodas();
    response.put("plantas", plantas);
    return ResponseEntity.ok().body(plantas);
  }

  @PostMapping("/new")
  public ResponseEntity<Map<String, Object>> agregarPlanta(@RequestBody PlantaModel planta) {

    Map<String, Object> response = new HashMap<>();
    PlantaModel newPlanta = plantaService.agregarPlanta(planta);

    response.put("success", true);
    response.put("message", "Planta creada correctamente");
    return ResponseEntity.ok(response);
  }

  @GetMapping("/usuario/{usuarioId}")
  public ResponseEntity<List<PlantaModel>> obtenerPlantasPorUsuario(@PathVariable Long usuarioId) {
    return ResponseEntity.ok(plantaService.obtenerPlantasPorUsuario(usuarioId));
  }

  @GetMapping("/{id}")
  public ResponseEntity<Map<String, Object>> obtenerPlantaPorId(@PathVariable Long id) {
    Map<String, Object> response = new HashMap<>();
    Optional<PlantaModel> planta = plantaService.obtenerPlantaPorId(id);
    if (planta.isPresent()) {
      return ResponseEntity.ok(Map.of(
        "success", true,
        "planta", planta.get()
      ));
    }
    return ResponseEntity.status(404).body(Map.of(
      "success", false,
      "message", "Planta no encontrada"
    ));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Map<String, Object>> eliminarPlanta(@PathVariable Long id) {
    if (plantaService.eliminarPlanta(id)) {
      return ResponseEntity.ok(Map.of(
        "success", true,
        "message", "Planta eliminada correctamente"
      ));
    }
    return ResponseEntity.status(404).body(Map.of(
      "success", false,
      "message", "Planta no encontrada"
    ));
  }

  @PutMapping("modificar/{id}")
  public ResponseEntity<Map<String, Object>> actualizarPlanta(@PathVariable Long id, @RequestBody PlantaModel plantaDetalles) {
    if (plantaService.actualizarPlanta(id, plantaDetalles)) {
      return ResponseEntity.ok(Map.of(
        "success", true,
        "message", "Planta actualizada correctamente"
      ));
    }
    return ResponseEntity.status(404).body(Map.of(
      "success", false,
      "message", "Planta no encontrada"
    ));
  }
}

