Koywe Challenge
===============

Aplicación backend desarrollada en NestJS para realizar conversiones entre monedas fiat y criptomonedas, siguiendo principios de Clean Architecture y DDD.

🏗️ Estructura del Proyecto
---------------------------
```
├── app/                                # Capa de entrada de la aplicación
│   ├── app.module.ts                   # Módulo raíz que une todos los módulos externos
│   ├── controllers/                    # Controladores HTTP (interfaz REST)
│   │   ├── auth.controller.ts          # Endpoints de autenticación
│   │   └── quote.controller.ts         # Endpoints de cotizaciones
│   └── modules/                        # Módulos externos que encapsulan cada controlador + su facade
│       ├── auth.controller.module.ts   # Módulo del controller de Auth
│       └── quote.contoller.module.ts   # Módulo del controller de Quote

├── context/                            # Lógica de negocio dividida por contexto (DDD + Clean Arch)
│   ├── auth/
│   │   ├── application/
│   │   │   ├── dto/                    # DTOs usados en los casos de uso
│   │   │   ├── facade/                 # Facade que orquesta los casos de uso
│   │   │   └── use-cases/             # Casos de uso como UserRegister, UserLogin
│   │   ├── domain/
│   │   │   ├── class/                  # Entidades de dominio (ej: User)
│   │   │   └── contracts/             # Interfaces de repositorio (puertos)
│   │   └── infrastructure/
│   │       ├── auth.module.ts         # Módulo del contexto Auth
│   │       ├── providers/             # Proveedor de estrategia JWT
│   │       └── repository/            # Implementaciones (adaptadores) con Prisma

│   └── quote/
│       ├── application/
│       │   ├── dto/                   # DTO para crear cotizaciones
│       │   ├── facade/                # Facade de cotizaciones
│       │   └── use-cases/            # Casos de uso: crear, persistir, obtener cotización
│       ├── domain/
│       │   ├── class/                # Entidad de dominio: Quote
│       │   └── contracts/           # Interfaces de provider externo y repositorio
│       └── infrastructure/
│           ├── providers/           # Integración con CryptoMKT API
│           ├── quote.module.ts     # Módulo del contexto Quote
│           └── repository/         # Implementación de repositorio con Prisma

├── shared/
│   └── infrastructure/
│       ├── guards/                   # Guardias como JwtAuthGuard
│       ├── modules/                 # Módulo compartido para exportar estrategia de auth
│       └── prisma/                  # PrismaService y PrismaModule centralizado

├── main.ts                          # Punto de entrada de la app (Bootstrap de NestJS)

```
🚀 Endpoints
------------

Autenticación:
- POST /auth/register → Registro de usuario
- POST /auth/login → Login, retorna un JWT

Cotizaciones (requieren JWT):
- POST /quote → Crea una cotización
- GET /quote/:id → Obtiene una cotización por ID (si no está expirada)

🔐 Seguridad
------------

La app usa JWT para proteger los endpoints. Los tokens se generan al iniciar sesión y se deben incluir en el header:

Authorization: Bearer <token>

⚙️ Variables de entorno
------------------------

Crear un archivo `.env` basado en el siguiente:

[env de ejemplo](.env.example)
------------

🐳 Levantar con Docker
---------------------------------
para levantar la base de datos PostgreSQL primero:

```
docker-compose up -d
```
Esto levanta la base de datos PostgreSQL en localhost:5432.

🛠️ Instalación local
---------------------
para instalar localmente, ir corriendo los siguientes comandos luego de clonado el proyecto y luego de entrar a la carpeta principal:
```
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```

✅ Testing
-----------

Se han implementado pruebas unitarias para los casos de uso:

- UserRegister
- UserLogin
- QuoteCreator
- QuoteGetter
- QuotePersister

Ejecutar pruebas:

npm run test

📮 collection en postman
----------------
para hacer mas facil la prueba del proyecto se adjunta colección de postman:

[colección de postman](koywe.postman_collection.json)
------------

solo se debe importar en postman, al usar el endpoint de registro o login, hay unos tests en postman que generan una variable global en postman con el jwt que se usan en los endpoints de quotes en authorization, además de esto a usar el endpoint que genera un quote, se guarda el id del quote generado en variable de postman para poder consultar por ese mismo id en el get.

🌐 Documentación
----------------
para la documentación puedes entrar en con la aplicación levantada: 

```
http://localhost:3000/api
```

el puerto 3000 viene por defecto, si cambias el puerto de tu aplicación cambiar el puerto.

🧠 Arquitectura
----------------

Este proyecto implementa:

- Clean Architecture + DDD
- Contextos separados por dominio: auth, quote
- Facades para exponer solo la lógica necesaria
- Guards y estrategias para autenticación con JWT
- Tests unitarios para lógica de negocio
- Prisma como ORM y PostgreSQL para base de datos
- Configuración desacoplada con @nestjs/config

🤖 IA utilizada
----------------

Se utilizó ChatGPT para entender la implementación y configuración de prisma, ya que nunca lo habia utilizado,  para consultas generales a la hora de desarrollar y para la generación del readme.