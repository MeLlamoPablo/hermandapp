# hermandapp

`hermandapp` es un proyecto fullstack de prueba realizado por Pablo Rodríguez
Caballero para Commite Inc.

Consiste en una aplicación fullstack, con backend en Django (Rest Framework) y 
frontend en React. Los detalles de la especificación se pueden ver en
`spec.pdf`.

## Ejecutando la aplicación en local

Para ejecutar la aplicación en un entorno local, tendremos que instalar
[Docker](https://www.docker.com/community-edition) y
[Docker Compose](https://docs.docker.com/compose/). Una vez instalados, podremos
lanzar el entorno con:

```bash
$ git clone "$REPO"
$ cd hermandapp
$ docker-compose up
```

Una vez se hayan construdio todas las imágenes y lanzado todos los servicios,
podremos visitar el frontend en `localhost:3000` y el backend en
`localhost:4000`.

Para acceder al panel de administración, podemos usar los siguientes
credenciales:

```
username: admin
password: admin
```