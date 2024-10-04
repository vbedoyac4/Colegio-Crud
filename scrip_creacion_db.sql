CREATE DATABASE ColegioDB;
GO

USE ColegioDB;
GO

-- Tabla Alumno
CREATE TABLE Alumno (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Nombres NVARCHAR(100),
    Apellidos NVARCHAR(100),
    Genero NVARCHAR(10),
    FechaNacimiento DATE
);

-- Tabla Profesor
CREATE TABLE Profesor (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Nombres NVARCHAR(100),
    Apellidos NVARCHAR(100),
    Genero NVARCHAR(10)
);

-- Tabla Grado
CREATE TABLE Grado (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100),
    ProfesorId INT FOREIGN KEY REFERENCES Profesor(Id)
);

-- Tabla AlumnoGrado
CREATE TABLE AlumnoGrado (
    Id INT PRIMARY KEY IDENTITY(1,1),
    AlumnoId INT FOREIGN KEY REFERENCES Alumno(Id),
    GradoId INT FOREIGN KEY REFERENCES Grado(Id),
    Seccion NVARCHAR(10)
);


