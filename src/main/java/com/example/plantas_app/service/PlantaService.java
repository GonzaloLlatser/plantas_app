package com.example.plantas_app.service;

import com.example.plantas_app.model.PlantaModel;
import com.example.plantas_app.repository.PlantaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlantaService {
  private final PlantaRepository plantaRepository;

  public PlantaService(PlantaRepository plantaRepository) {
    this.plantaRepository = plantaRepository;
  }

  public PlantaModel agregarPlanta(PlantaModel planta) {
    return plantaRepository.save(planta);
  }

  public List<PlantaModel> obtenerPlantasPorUsuario(Long usuarioId) {
    return plantaRepository.findByUsuarioId(usuarioId);
  }

  public Optional<PlantaModel> obtenerPlantaPorId(Long id) {
    return plantaRepository.findById(id);
  }

  public boolean eliminarPlanta(Long id) {
    if (plantaRepository.existsById(id)) {
      plantaRepository.deleteById(id);
      return true;
    }
    return false;
  }

  public boolean actualizarPlanta(Long id, PlantaModel plantaDetalles) {
    return plantaRepository.findById(id).map(planta -> {
      planta.setNombre(plantaDetalles.getNombre());
      planta.setFechaAdquisicion(plantaDetalles.getFechaAdquisicion());
      planta.setUltimoRiego(plantaDetalles.getUltimoRiego());
      planta.setProximoRiego(plantaDetalles.getProximoRiego());
      planta.setFechaPoda(plantaDetalles.getFechaPoda());
      planta.setUbicacion(plantaDetalles.getUbicacion());
      planta.setTipoPlanta(plantaDetalles.getTipoPlanta());
      planta.setNotas(plantaDetalles.getNotas());
      planta.setUsuario(plantaDetalles.getUsuario());

      plantaRepository.save(planta);
      return true;
    }).orElse(false);
  }

  public List<PlantaModel> obtenerTodas() {
    return plantaRepository.findAll();
  }
}
