package com.example.plantas_app.repository;

import com.example.plantas_app.model.PlantaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlantaRepository extends JpaRepository<PlantaModel, Long> {
  List<PlantaModel> findByUsuarioId(Long usuarioId);
}