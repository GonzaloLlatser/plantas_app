package com.example.plantas_app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
      .csrf(csrf -> csrf.disable()) // Desactiva CSRF (si es necesario)
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/auth/**").permitAll() // Permite acceso a las rutas públicas
        .anyRequest().authenticated() // Las demás requieren autenticación
      );
    return http.build();
  }
}



