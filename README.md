# Aplicación Móvil para Gestión de Gimnasio  

Una aplicación móvil desarrollada en **React Native** para gestionar las operaciones internas de un gimnasio, ofreciendo funcionalidades específicas para administradores, entrenadores y usuarios. La aplicación utiliza **Firebase** para autenticación y **Cloud Firestore** como base de datos principal.

## Características Principales  
### Login
- Autentificacion de usuarios por roles de usuarios

<img src="https://github.com/Hugo-DevM/Project/blob/c32c6b86b8c1acf3107ffab1df95c3e539a15e8d/login.PNG" alt="Login" width="300"/>

### **Administrador**  
- Crear y gestionar cuentas de **entrenadores** y **usuarios**.  
- Visualización cuentas de **entrenadores** y **usuarios**.  
- Crear y administrar **eventos** relacionados con las actividades del gimnasio.

<img src="https://github.com/Hugo-DevM/Project/blob/c32c6b86b8c1acf3107ffab1df95c3e539a15e8d/createUsersAdmin.PNG" alt="Crear usuarios" width="300"/>  
<img src="https://github.com/Hugo-DevM/Project/blob/c32c6b86b8c1acf3107ffab1df95c3e539a15e8d/createEventAdmin.PNG" alt="Crear eventos" width="300"/>

### **Entrenador**  
- Acceso al gimnasio mediante un **código QR** único.  
- Visualización de una lista de usuarios asignados para entrenamiento personalizado.  
- Edición de su perfil personal.

<img src="https://github.com/Hugo-DevM/Project/blob/c32c6b86b8c1acf3107ffab1df95c3e539a15e8d/homeTrainer.PNG" alt="Home entrenador" width="300"/>  
<img src="https://github.com/Hugo-DevM/Project/blob/c32c6b86b8c1acf3107ffab1df95c3e539a15e8d/userListTrainer.PNG" alt="Lista usuarios" width="300"/>  
<img src="https://github.com/Hugo-DevM/Project/blob/c32c6b86b8c1acf3107ffab1df95c3e539a15e8d/editProfileTrainer.PNG" alt="Editar perfil" width="300"/>

### **Usuario**  
- Acceso al gimnasio mediante un **código QR** único.  
- Edición de perfil personal.  
- Contratación de entrenadores directamente desde la aplicación.  
- Visualización de los datos del **entrenador** personal.
- Visualización del mapa para la ubicacion.

<img src="https://github.com/Hugo-DevM/Project/blob/c32c6b86b8c1acf3107ffab1df95c3e539a15e8d/homeUser.PNG" alt="Home usuario" width="300"/>  
<img src="https://github.com/Hugo-DevM/Project/blob/c32c6b86b8c1acf3107ffab1df95c3e539a15e8d/editProfileUser.PNG" alt="Editar perfil usuario" width="300"/>  
<img src="https://github.com/Hugo-DevM/Project/blob/c32c6b86b8c1acf3107ffab1df95c3e539a15e8d/map.PNG" alt="Mapa" width="300"/>

## Tecnologías Utilizadas  

### **Frontend**  
- **React Native**: Desarrollo de la interfaz de usuario móvil.  
- **React Navigation**: Gestión de navegación entre pantallas.  

### **Backend y Base de Datos**  
- **Firebase Authentication**: Manejo de autenticación de usuarios.  
- **Cloud Firestore**: Almacenamiento de datos en tiempo real y sincronización.  

### **Otras Herramientas**  
- **QRCode Scanner**: Implementación de códigos QR para acceso.  
- **Mapas Interactivos**: Implementación de mapas mediante **React Native Maps** (Google Maps).  

## Instalación y Uso  

1. Clona el repositorio:  
- git clone https://github.com/Hugo-DevM/Project
- cd nombre-del-repo
   
2. Instala las dependencias:
- npm install

3. Configura las credenciales de Firebase en el archivo **firebase.js**

4. Inicia la aplicación:
- npm start

6. Usa Expo Go en tu dispositivo móvil para escanear el código QR y probar la aplicación

###Próximas Mejoras
- Implementación de notificaciones push para recordatorios de eventos.
- Mejoras en el diseño UI/UX para mayor accesibilidad.

###Contribuciones
Las contribuciones son bienvenidas. Si deseas colaborar, por favor abre un issue o envía un pull request.


