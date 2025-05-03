package com.example.plantas_app.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "planta_model")
public class PlantaModel {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String nombre;
  private LocalDate fechaAdquisicion;
  private LocalDate fechaUltimoRiego;
  private LocalDate fechaProximoRiego;
  private LocalDate fechaPoda;
  private String ubicacion;
  private String tipoPlanta;
  private String notas;
  private String rutaImagen;
  @Transient
  private String imagenBase64; // solo para transporte, no se guarda en DB


  @ManyToOne
  @JoinColumn(name = "usuario_id", nullable = false)
  @JsonBackReference
  private UsuarioModel usuario;
}
