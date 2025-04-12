package com.example.plantas_app.service;

import com.example.plantas_app.model.PlantaModel;
import com.example.plantas_app.model.UsuarioModel;
import com.example.plantas_app.repository.PlantaRepository;
import com.example.plantas_app.repository.UsuarioRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class PlantaService {

  private final PlantaRepository plantaRepository;
  private final UsuarioRepository usuarioRepository;

  public PlantaService(PlantaRepository plantaRepository, UsuarioRepository usuarioRepository) {
    this.plantaRepository = plantaRepository;
    this.usuarioRepository = usuarioRepository;
  }

  public PlantaModel agregarPlanta(PlantaModel planta) {
    Long usuarioId = planta.getUsuario().getId();


    UsuarioModel usuario = usuarioRepository.findById(usuarioId)
      .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

    planta.setUsuario(usuario); // ahora sí, JPA lo va a persistir bien

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
      planta.setFechaUltimoRiego(plantaDetalles.getFechaUltimoRiego());
      planta.setFechaProximoRiego(plantaDetalles.getFechaProximoRiego());
      planta.setFechaPoda(plantaDetalles.getFechaPoda());
      planta.setUbicacion(plantaDetalles.getUbicacion());
      planta.setTipoPlanta(plantaDetalles.getTipoPlanta());
      planta.setNotas(plantaDetalles.getNotas());
      //planta.setUsuario(plantaDetalles.getUsuario());

      plantaRepository.save(planta);
      return true;
    }).orElse(false);
  }

  public List<PlantaModel> obtenerTodas() {
    return plantaRepository.findAll();
  }
}
