# API Rest - README

## Descripción

Este proyecto es una API Rest que proporciona diversas funcionalidades para gestionar un sistema de votación. Está construida utilizando `Nodejs` con `Express` y Utiliza `MySQL` como base de datos .

## Instalación

Para instalar y ejecutar este proyecto localmente, sigue estos pasos:

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    ```
2.  Navega al directorio del proyecto:
    ```bash
    cd tu-repositorio
    ```
3.  Instala las dependencias:
    ```bash
    npm install
    ```
4.  Configura la conexión a la base de datos en el archivo `conexion.js` ubicado en la carpeta `database`, con las siguientes credenciales:

        Host: `localhost`
        Usuario: `root`
        Contraseña: `1017214052`
        Base de datos: `votaciones`

## Script para crear la base de datos

```bash
        -- Crear la base de datos (si aún no existe)
        CREATE DATABASE votaciones;
        USE votaciones;

        -- Crear tabla de Votantes
        CREATE TABLE votantes (
            id INT AUTO_INCREMENT PRIMARY KEY,   -- ID único, autogenerado
            full_name VARCHAR(255) NOT NULL,          -- Nombre del votante
            email VARCHAR(255) NOT NULL UNIQUE,  -- Correo electrónico único
            has_voted BOOLEAN DEFAULT FALSE     -- Booleano para saber si ha votado número (1 para true y 0 para false)
        );

        -- Crear tabla de Candidatos
        CREATE TABLE candidatos (
            id INT AUTO_INCREMENT PRIMARY KEY,   -- ID único, autogenerado
            full_name VARCHAR(255) NOT NULL,           -- Nombre del candidato
            party VARCHAR(255),                   -- Partido político (opcional)
            votes INT DEFAULT 0                  -- Número de votos recibidos (por defecto 0)
        )AUTO_INCREMENT=100;

        -- Crear tabla de Voto
        CREATE TABLE votos (
            id INT AUTO_INCREMENT PRIMARY KEY,   -- ID único, autogenerado
            voter_id INT,                         -- ID del votante
            candidate_id INT,                     -- ID del candidato
            FOREIGN KEY (voter_id) REFERENCES votantes(id),  -- Relación con la tabla votantes
            FOREIGN KEY (candidate_id) REFERENCES candidatos(id)  -- Relación con la tabla candidatos
        );
```

## Ejecución

Para iniciar el servidor y poner en funcionamiento la API, ejecuta el siguiente comando:

```bash
npx nodemon index.js
```

La API estará disponible en `http://localhost:6500`.

## Endpoints

### Candidatos

- **GET /candidatos**: Obtener todos los candidatos registrados en el sistema.
- **POST /candidatos**: Agregar un nuevo candidato al sistema.
- **GET /candidatos/:id**: Obtener detalles de un candidato específico por su ID.
- **DELETE /candidatos/:id**: Eliminar un candidato del sistema utilizando su ID.

### Votantes

- **GET /votantes**: Obtener todos los votantes registrados en el sistema.
- **POST /votantes**: Agregar un nuevo votante al sistema.
- **GET /votantes/:id**: Obtener detalles de un votante específico por su ID.
- **DELETE /votantes/:id**: Eliminar un votante del sistema utilizando su ID.

### Votos

- **GET /votos**: Obtener todos los votos registrados.
- **POST /votos**: Registrar un nuevo voto en el sistema.
- **GET /votos/estadisticas**: Obtener estadísticas de votación, como el total de votos emitidos y los votos por candidato.

## Swagger

La documentación interactiva de la API está disponible en swagger en la siguiente ruta:

`http://localhost:6500/api-docs/`

Puedes utilizar esta ruta para explorar y probar los endpoints disponibles de manera sencilla.

La API cuanta con filtrado y paginación en las listas de votantes y candidatos, asi que para hacer la prueba en Postman puedes utilizar la siguiente ruta:

#### Filtrar votantes que han votado de los que no:

`http://localhost:6500/votantes?page=1&limit=10&search=0`

Utilizando el 1 para los que sí han votado y 0 para los que no han votado.

#### Filtrar candidatos por nombre:

`http://localhost:6500/candidatos?page=1&limit=10&search=Juan`

#### Filtrar candidatos por partido politico:

`http://localhost:6500/candidatos?page=1&limit=10&search=Nacional`

## Dependencias utilizadas

- **express**: Un framework para Node.js que se utiliza para construir aplicaciones web y APIs de manera sencilla y rápida.

- **cors**: Un middleware para Express que permite habilitar CORS (Cross-Origin Resource Sharing) en la API, facilitando la comunicación entre el servidor y los clientes que se encuentran en diferentes dominios.

- **mysql2**: Un cliente para MySQL que se utiliza para interactuar con la base de datos MySQL desde Node.js, proporcionando una interfaz para ejecutar consultas y gestionar datos.

- **nodemon**: Una herramienta que ayuda a desarrollar aplicaciones basadas en Node.js reiniciando automáticamente el servidor cuando se detectan cambios en los archivos del proyecto.

- **swagger-ui-express**: Una herramienta para generar y mostrar documentación interactiva de la API utilizando Swagger, lo que facilita la visualización y prueba de los endpoints disponibles.

## Contacto

Para cualquier consulta o sugerencia, puedes contactarnos en <maria.alejandravp@hotmail.com>.
