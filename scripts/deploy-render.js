#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function print(color, text) {
  console.log(`${colors[color]}${text}${colors.reset}`);
}

print('cyan', '🚀 Preparando despliegue para Render.io...');
console.log('');

// Verificar archivos necesarios
const requiredFiles = [
  'package.json',
  'render.yaml',
  'Procfile',
  'src/index.js',
  'src/health-check.js'
];

print('blue', '🔍 Verificando archivos para despliegue...');

for (const file of requiredFiles) {
  if (fs.existsSync(file)) {
    print('green', `✅ ${file} encontrado`);
  } else {
    print('red', `❌ ${file} no encontrado`);
    process.exit(1);
  }
}

console.log('');

// Verificar package.json
print('blue', '📦 Verificando package.json...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

if (!packageJson.scripts.start) {
  print('red', '❌ Script "start" no encontrado en package.json');
  process.exit(1);
}

print('green', '✅ Script "start" encontrado');
print('green', `✅ Versión de Node.js: ${packageJson.engines?.node || 'No especificada'}`);

console.log('');

// Verificar variables de entorno
print('blue', '🔧 Verificando variables de entorno...');
const envExample = fs.readFileSync('env.example', 'utf8');
const requiredVars = ['DISCORD_TOKEN', 'CLIENT_ID', 'GEMINI_API_KEY'];

for (const varName of requiredVars) {
  if (envExample.includes(varName)) {
    print('green', `✅ ${varName} documentado en env.example`);
  } else {
    print('yellow', `⚠️ ${varName} no encontrado en env.example`);
  }
}

console.log('');

// Mostrar instrucciones
print('cyan', '📋 Instrucciones para Render.io:');
print('white', '');
print('white', '1. Ve a https://render.com y crea una cuenta');
print('white', '2. Conecta tu repositorio de GitHub');
print('white', '3. Crea un nuevo Web Service');
print('white', '4. Selecciona tu repositorio');
print('white', '5. Configura las variables de entorno:');
print('yellow', '   - DISCORD_TOKEN: Tu token del bot de Discord');
print('yellow', '   - CLIENT_ID: ID de tu aplicación de Discord');
print('yellow', '   - GUILD_ID: ID de tu servidor (opcional)');
print('yellow', '   - GEMINI_API_KEY: Tu clave de API de Gemini');
print('white', '6. Deploy!');
console.log('');

print('green', '✅ Todo listo para despliegue en Render.io!');
print('cyan', '🎮 ¡Tu bot de Tumbados Gaming estará en línea pronto!'); 