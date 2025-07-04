# 🤖 Bot de Discord - Tumbados Gaming

Un bot de Discord completo desarrollado con Node.js y discord.js para el servidor de Tumbados Gaming.

## 🚀 Características

- **Comandos Slash**: Comandos modernos de Discord con autocompletado
- **Sistema de Eventos**: Manejo automático de eventos del servidor
- **Embeds Personalizados**: Respuestas visuales atractivas
- **Gestión de Permisos**: Control de acceso basado en roles
- **Bienvenidas Automáticas**: Mensajes de bienvenida para nuevos miembros
- **Módulos ES6**: Código moderno usando `import/export` en lugar de `require`

## 📋 Comandos Disponibles

- `/ping` - Ver la latencia del bot
- `/help` - Mostrar todos los comandos disponibles
- `/serverinfo` - Información del servidor
- `/userinfo [usuario]` - Información de un usuario
- `/clear [cantidad]` - Eliminar mensajes del canal (requiere permisos)
- `/saludo` - Te saluda de manera personalizada
- `/jona` - Un mensaje especial ❤️

## 🎯 Funcionalidades Especiales

- **Respuesta a menciones**: El bot responde automáticamente cuando es mencionado
- **Saludos aleatorios**: Diferentes mensajes de saludo cada vez
- **Embeds informativos**: Respuestas visuales con información del usuario

## 🛠️ Instalación

### Prerrequisitos

- Node.js 18.0.0 o superior (para soporte completo de módulos ES6)
- npm o yarn
- Una aplicación de Discord con bot

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd bot-tumbados-gaming
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp env.example .env
   ```
   
   Edita el archivo `.env` con tus credenciales:
   ```env
   DISCORD_TOKEN=tu_token_del_bot
   GUILD_ID=id_de_tu_servidor
   CLIENT_ID=id_de_tu_aplicacion
   ```

4. **Registrar comandos slash**
   ```bash
   node src/deploy-commands.js
   ```

5. **Iniciar el bot**
   ```bash
   npm start
   ```

## 🔧 Configuración del Bot de Discord

### 1. Crear una Aplicación

1. Ve a [Discord Developer Portal](https://discord.com/developers/applications)
2. Haz clic en "New Application"
3. Dale un nombre a tu aplicación
4. Ve a la sección "Bot"
5. Haz clic en "Add Bot"
6. Copia el token del bot (lo necesitarás para el `.env`)

### 2. Configurar Permisos

En la sección "Bot" de tu aplicación:

1. Activa los siguientes "Privileged Gateway Intents":
   - Presence Intent
   - Server Members Intent
   - Message Content Intent

2. En "Bot Permissions", selecciona:
   - Send Messages
   - Use Slash Commands
   - Manage Messages
   - Embed Links
   - Read Message History

### 3. Invitar el Bot

1. Ve a la sección "OAuth2" > "URL Generator"
2. Selecciona "bot" en Scopes
3. Selecciona los permisos necesarios
4. Copia la URL generada y úsala para invitar el bot a tu servidor

## 📁 Estructura del Proyecto

```
bot-tumbados-gaming/
├── src/
│   ├── commands/          # Comandos del bot
│   │   ├── ping.js
│   │   ├── help.js
│   │   ├── serverinfo.js
│   │   ├── userinfo.js
│   │   ├── clear.js
│   │   ├── saludo.js
│   │   └── jona.js
│   ├── events/            # Eventos del bot
│   │   ├── ready.js
│   │   ├── guildMemberAdd.js
│   │   └── messageCreate.js
│   ├── index.js           # Archivo principal
│   ├── health-check.js    # Health check para Render
│   └── deploy-commands.js # Script para registrar comandos
├── scripts/
│   ├── tumbados.js        # Script personalizado de inicio
│   └── deploy-render.js   # Script de verificación para Render
├── package.json
├── render.yaml            # Configuración de Render.io
├── Procfile               # Comando de inicio para Render
├── .dockerignore          # Archivos a ignorar en build
├── env.example
└── README.md
```

## 🎮 Desarrollo

### Agregar Nuevos Comandos

1. Crea un nuevo archivo en `src/commands/`
2. Usa la estructura básica:
   ```javascript
   import { SlashCommandBuilder } from 'discord.js';

   export default {
     data: new SlashCommandBuilder()
       .setName('nombre')
       .setDescription('Descripción del comando'),
     
     async execute(interaction) {
       // Tu código aquí
     },
   };
   ```

3. Ejecuta `node src/deploy-commands.js` para registrar el comando

### Agregar Nuevos Eventos

1. Crea un nuevo archivo en `src/events/`
2. Usa la estructura básica:
   ```javascript
   import { Events } from 'discord.js';

   export default {
     name: Events.EventName,
     once: false, // true para eventos que solo ocurren una vez
     execute(...args) {
       // Tu código aquí
     },
   };
   ```

## 🚀 Scripts Disponibles

- `npm start` - Iniciar el bot en producción
- `npm run dev` - Iniciar el bot en modo desarrollo con nodemon
- **`npm run tumbados`** - Script personalizado con verificaciones y banner 🎮
- `npm run deploy` - Registrar comandos slash
- `npm run render-check` - Verificar preparación para Render.io
- `node src/deploy-commands.js` - Registrar comandos slash (alternativo)

### 🎮 Script Tumbados

El script `npm run tumbados` incluye:

- **Banner personalizado** con el logo de Tumbados Gaming
- **Verificaciones automáticas** de archivos y dependencias
- **Información del sistema** (Node.js, plataforma, etc.)
- **Manejo de errores** mejorado
- **Colores en consola** para mejor experiencia visual
- **Cierre limpio** del bot con Ctrl+C

**Uso:**
```bash
npm run tumbados
```

## 🚀 Despliegue en Render.io

### Preparación

1. **Verificar preparación:**
   ```bash
   npm run render-check
   ```

2. **Asegúrate de tener estos archivos:**
   - `render.yaml` - Configuración de Render
   - `Procfile` - Comando de inicio
   - `src/health-check.js` - Health check para Render

### Pasos para Desplegar

1. **Crear cuenta en Render.io**
   - Ve a [render.com](https://render.com)
   - Crea una cuenta gratuita

2. **Conectar repositorio**
   - Conecta tu repositorio de GitHub
   - Selecciona el repositorio del bot

3. **Crear Web Service**
   - Tipo: Web Service
   - Plan: Free
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Configurar variables de entorno**
   - `DISCORD_TOKEN`: Tu token del bot de Discord
   - `CLIENT_ID`: ID de tu aplicación de Discord
   - `GUILD_ID`: ID de tu servidor (opcional)

5. **Deploy**
   - Haz clic en "Create Web Service"
   - Espera a que termine el build

### Características del Despliegue

- ✅ **Health Check automático** - Render verifica que el bot esté funcionando
- ✅ **Auto-deploy** - Se actualiza automáticamente con cada push
- ✅ **Logs en tiempo real** - Puedes ver los logs del bot
- ✅ **Escalabilidad** - Fácil de escalar si necesitas más recursos

## 🔒 Seguridad

- **Nunca compartas tu token del bot**
- **Mantén el archivo `.env` en tu `.gitignore**
- **Usa permisos mínimos necesarios para el bot**
- **Las variables de entorno en Render están encriptadas**

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la documentación de [discord.js](https://discord.js.org/)
2. Verifica que todas las variables de entorno estén configuradas
3. Asegúrate de que el bot tenga los permisos necesarios

---

¡Disfruta usando tu bot de Discord! 🎉
