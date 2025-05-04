# 🌿 PlantApp – Gestión de tus plantas favoritas

Aplicación web full-stack, desarrollada con Angular, Spring Boot y MySQL.
Este proyecto representa el Trabajo Final de Grado (TFG) para el Grado Superior Desarrollo de Aplicaciones Web. 
A lo largo del desarrollo, se implementaron funcionalidades como gestión de plantas, validación de formularios, autenticación, 
y la utilización de prácticas avanzadas como el uso de relaciones entre tablas, lo que permitió afianzar y aplicar los conocimientos adquiridos 
en el proceso de formación.

---
## ✏️ Diseño previo

Este fue el diseño inicial o boceto conceptual de la aplicación, creado antes de comenzar con el desarrollo:

<p>
  <img src="./screenshots/maqueta%20inicial.png" alt="Boceto de la interfaz" width=400>
</p>

## 🔧 Tecnologías utilizadas

### 📌 Frontend

<img alt="Angular" src="https://img.shields.io/badge/Angular-red?style=for-the-badge&logo=angular&logoColor=white">
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img alt="Bootstrap" src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
<img alt="ng-bootstrap" src="https://img.shields.io/badge/ng--bootstrap-6DB33F?style=for-the-badge&logo=bootstrap&logoColor=white">
<img alt="RxJS" src="https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white">
<img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">

### ⚙️ Backend

<img alt="Spring Boot" src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
<img alt="Spring Data JPA" src="https://img.shields.io/badge/Spring%20Data%20JPA-6DB33F?style=for-the-badge&logo=spring&logoColor=white">
<img alt="Hibernate" src="https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white">
<img alt="Spring Validation" src="https://img.shields.io/badge/Spring%20Validation-6DB33F?style=for-the-badge&logo=spring&logoColor=white">
<img alt="Lombok" src="https://img.shields.io/badge/Lombok-EA4949?style=for-the-badge&logo=java&logoColor=white">

### 💾 Base de datos

<img alt="MySQL" src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<img alt="XAMPP" src="https://img.shields.io/badge/XAMPP-FB7A24?style=for-the-badge&logo=xampp&logoColor=white">
<img alt="phpMyAdmin" src="https://img.shields.io/badge/phpMyAdmin-6C78AF?style=for-the-badge&logo=php&logoColor=white">

### 🛠️ Otros

<img alt="Postman" src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white">
<img alt="IntelliJ IDEA" src="https://img.shields.io/badge/IntelliJ%20IDEA-000000?style=for-the-badge&logo=intellijidea&logoColor=white">
<img alt="VS Code" src="https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
<img alt="Git" src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img alt="GitHub" src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white">

---

## 🚀 Requisitos para ejecutar el proyecto

### 🔧 Backend (Spring Boot)

1. Tener **Java 17** o superior instalado.
2. Tener **Maven** instalado.
3. Instalar **XAMPP** y levantar el servicio **MySQL**.
4. Crear una base de datos llamada `misplantasapp` desde **phpMyAdmin**.
5. Configurar el archivo `application.properties` con tus credenciales:

```properties
spring.application.name=plantas_app
spring.datasource.url=jdbc:mysql://localhost:3306/misplantasapp
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Ejecutar el proyecto desde IntelliJ o por consola:

``` mvn spring-boot:run ```

### 🌐 Frontend (Angular)

1. Tener instalado **Node.js** y **npm**.
2. Instalar **Angular CLI**.

   ``` npm install -g @angular/cli ```

3. Ir a la carpeta del frontend y ejecutar:

``` npm install ```

``` ng serve ```

---

## 🧪 Funcionalidades implementadas

- **CRUD completo** de entidad Planta
- **CRUD completo** de entidad Usuario
- Asociación **ManyToOne** entre entidades
- **Formularios reactivo** con validaciones
- **Modales** reutilizables para eliminar/editar
- **Toasts personalizados** para notificaciones
- **Conversión de fechas** con ngbDatepicker
- **Interfaz responsive y amigable**

## 📦 Estructura general del proyecto

```
plantas_app/
│── frontend/ (Angular)
│   ├── src/app/
│   └── angular.json
├── backend/ (Spring Boot)
│   ├── src/main/java/...
│   └── application.properties
├── recursos/ (MySQL)
└── README.md
```

## 📸 Capturas de pantalla

<p align="center">
  <img src="./screenshots/Captura%20de%20pantalla%202025-05-04%20102427%20(1).png" alt="Pantalla de inicio" width="400">
  <img src="./screenshots/Captura%20de%20pantalla%202025-05-04%20102503%20(1).png" alt="Listado de plantas" width="400">
  <img src="./screenshots/Captura%20de%20pantalla%202025-05-04%20102522.png" alt="Formulario de planta" width="400">
  <img src="./screenshots/Captura%20de%20pantalla%202025-05-04%20102540.png" alt="Formulario de usuario" width="400">
  <img src="./screenshots/Captura%20de%20pantalla%202025-05-04%20102558.png" alt="Confirmación de eliminación" width="400">
  <img src="./screenshots/Captura%20de%20pantalla%202025-05-04%20102756.png" alt="Notificación tipo toast" width="400">
</p>

## 🧪 Cómo probar o contribuir

1. Acceder al proyecto.
2. Seguir los pasos de instalación para backend y frontend.
3. ¡Listo! Ya puedes probarlo o contribuir al proyecto.

---

## 🔮 Futuras mejoras o implementaciones

- Incorporar la autenticación con **roles de usuario**.
- **Búscador de plantas** por nombre, tipo o fecha.
- Permitir a los usuarios marcar plantas como **favoritas**.
- Implementación de **seguridad con JWT**.
- Incorporar contenido adicional, como **artículos o consejos** sobre el cuidado de plantas.
---

## 🙏 Agradecimientos

Este proyecto fue desarrollado con mucho esfuerzo, dedicación y pasión por el aprendizaje.

Quiero agradecer a todas las personas que me acompañaron durante este camino y, especialmente, a quienes compartieron su
conocimiento o me dieron una mano cuando lo necesitaba, y sobre todo a **Solvam**, donde tuve la oportunidad de formarme
como Desarrollador Web. Gracias al equipo docente y a su enfoque práctico, pude adquirir los conocimientos necesarios
para afrontar este tipo de desafíos reales.

Fue un verdadero desafío, lleno de investigación, pruebas, errores, correcciones y, sobre todo, un **gran sacrificio de
tiempo y energía mental**. Cada línea de código representa horas de compromiso, aprendizaje y superación personal.

Gracias por tomarte el tiempo de revisar este proyecto. ¡Espero que te guste y no dudes en dejarme tu opinión!

---


  
