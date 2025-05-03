package com.example.plantas_app.service;

import com.example.plantas_app.model.PlantaModel;
import com.example.plantas_app.model.UsuarioModel;
import com.example.plantas_app.repository.PlantaRepository;
import com.example.plantas_app.repository.UsuarioRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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

    // Imagen Base64 -> archivo físico
    if (planta.getImagenBase64() != null && !planta.getImagenBase64().isEmpty()) {
      try {
        byte[] imagenBytes = Base64.getDecoder().decode(planta.getImagenBase64());
        String nombreArchivo = UUID.randomUUID().toString() + ".jpg";
        String ruta = "C:/xampp/htdocs/imagenes/plantas/" + nombreArchivo;
        Files.write(Paths.get(ruta), imagenBytes);
        planta.setRutaImagen("/imagenes/plantas/" + nombreArchivo);
      } catch (IOException e) {
        throw new RuntimeException("Error al guardar la imagen");
      }
    }

    planta.setUsuario(usuario);

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

      // Verificar si existe una imagen anterior y eliminarla
      if (planta.getRutaImagen() != null) {
        String rutaAnterior = "C:/xampp/htdocs" + planta.getRutaImagen();
        try {
          Files.deleteIfExists(Paths.get(rutaAnterior));
        } catch (IOException e) {
          log.error("No se pudo eliminar la imagen anterior: " + e.getMessage());
        }
      }

      try {
        if (plantaDetalles.getImagenBase64() != null && !plantaDetalles.getImagenBase64().isEmpty()) {
          // Decodificar la imagen en Base64
          byte[] imagenBytes = Base64.getDecoder().decode(plantaDetalles.getImagenBase64());

          // Generar nombre único para la imagen
          String nombreArchivo = UUID.randomUUID().toString() + ".jpg";

          // Ruta de almacenamiento (XAMPP)
          String ruta = "C:/xampp/htdocs/imagenes/plantas/" + nombreArchivo;

          // Escribir el archivo en el sistema
          Files.write(Paths.get(ruta), imagenBytes);

          // Actualizar la ruta de la imagen en la entidad Planta
          planta.setRutaImagen("/imagenes/plantas/" + nombreArchivo);
        }
      } catch (IOException e) {
        throw new RuntimeException("Error al guardar la imagen", e);
      }

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
