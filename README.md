
# REST API - Busqueda de pacientes 
> La aplicación esta basada en las siguientes tecnologías: **Nodejs, JWT, Bcrypt, OrcacleSQL & Typescript**. 
## Adquirir token de sesión de 3000 segundos
La misma debe de recibir una petición HTTP POST con un **Body JSON** siguiente estructura:

    {
        "user":     "user",
        "password": "pass"            
    }

El servidor responderá al cliente con un token que deberá utilizar para agregarlo a los **Headers** de la consulta. La dupla ***Key-Value*** quedará de la siguiente manera:
    
    token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImxhYm9yYXRvcmlvIiwiaWF0IjoxNjY3NTgyNjQ4LCJleHAiOjE2Njc1ODMwODh9.NbVTIY4uaYBEWZn4g9G2zQxH6gn1K47iZK3z7UiJ52E

## Consulta para obtener los datos el paciente
Una vez agregado a los headers, se realiza una nueva petición POST con un JSON tal como sigue:

    {
        "user":         "user",
        "password":     "pass",    
        "hc":           xxxxxxxx
        "dni":          xxxxxxxx
    }   
> **Nota:** la propiedad hc o dni pueden ir juntas o no, pero no puede faltar alguna de ellas.

El servidor responderá con el formato siguiente:

    {
        "Datos del paciente": [
            {
                "NUMERO_HISTORIA_CLINICA": 4623,
                "APELLIDO1": "SANCHEZ",
                "APELLIDO2": "CIANITTI",
                "NOMBRES": "SILVIA ANDREA MONICA",
                "FECHA_NACIMIENTO": "1964-13-32",
                "NUMERO_DOCUMENTO": 4556998792
            }
        ]
    }

> **Nota** todos los datos aqui mostrados son a modo ejemplificativo.
## **Se recomienda usar el software cliente POSTMAN**