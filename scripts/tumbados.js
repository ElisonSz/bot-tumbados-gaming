#!/usr/bin/env node

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

// Función para imprimir con colores
function print(color, text) {
  console.log(`${colors[color]}${text}${colors.reset}`);
}

// Función para imprimir el banner
function printBanner() {
  console.clear();
  print('cyan', `
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║    ████████╗██╗   ██╗███╗   ███╗██████╗  █████╗ ██████╗     ║
║    ╚══██╔══╝██║   ██║████╗ ████║██╔══██╗██╔══██╗██╔══██╗    ║
║       ██║   ██║   ██║██╔████╔██║██████╔╝███████║██║  ██║    ║
║       ██║   ██║   ██║██║╚██╔╝██║██╔══██╗██╔══██║██║  ██║    ║
║       ██║   ╚██████╔╝██║ ╚═╝ ██║██████╔╝██║  ██║██████╔╝    ║
║       ╚═╝    ╚═════╝ ╚═╝     ╚═╝╚═════╝ ╚═╝  ╚═╝╚═════╝     ║
║                                                              ║
║                    🎮 TUMBADOS GAMING 🎮                    ║
║                                                              ║
║                    🤖 Bot de Discord 🤖                     ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
  `);
  
  print('yellow', '🚀 Iniciando Tumbados Gaming Bot...');
  print('white', '📅 ' + new Date().toLocaleString('es-ES'));
  console.log('');
}

// Función para verificar archivos necesarios
function checkFiles() {
  const requiredFiles = [
    '.env',
    'src/index.js',
    'src/commands/',
    'src/events/'
  ];
  
  print('blue', '🔍 Verificando archivos necesarios...');
  
  for (const file of requiredFiles) {
    if (fs.existsSync(file)) {
      print('green', `✅ ${file} encontrado`);
    } else {
      print('red', `❌ ${file} no encontrado`);
      if (file === '.env') {
        print('yellow', '💡 Crea un archivo .env basado en env.example');
      }
      return false;
    }
  }
  
  console.log('');
  return true;
}

// Función para verificar dependencias
function checkDependencies() {
  print('blue', '📦 Verificando dependencias...');
  
  if (!fs.existsSync('node_modules')) {
    print('red', '❌ node_modules no encontrado');
    print('yellow', '💡 Ejecuta: npm install');
    return false;
  }
  
  print('green', '✅ Dependencias encontradas');
  console.log('');
  return true;
}

// Función para mostrar información del sistema
function showSystemInfo() {
  print('magenta', '💻 Información del Sistema:');
  print('white', `   Node.js: ${process.version}`);
  print('white', `   Plataforma: ${process.platform}`);
  print('white', `   Arquitectura: ${process.arch}`);
  print('white', `   Directorio: ${process.cwd()}`);
  console.log('');
}

// Función principal
async function main() {
  printBanner();
  showSystemInfo();
  
  // Verificar archivos y dependencias
  if (!checkFiles() || !checkDependencies()) {
    print('red', '❌ Error: Faltan archivos o dependencias necesarias');
    print('yellow', '💡 Asegúrate de haber ejecutado npm install y configurado .env');
    process.exit(1);
  }
  
  print('green', '✅ Todo listo para iniciar el bot');
  print('cyan', '🎮 ¡Tumbados Gaming Bot está iniciando!');
  console.log('');
  
  // Iniciar el bot
  const botProcess = spawn('node', ['src/index.js'], {
    stdio: 'inherit',
    shell: true
  });
  
  // Manejar eventos del proceso
  botProcess.on('error', (error) => {
    print('red', `❌ Error al iniciar el bot: ${error.message}`);
    process.exit(1);
  });
  
  botProcess.on('exit', (code) => {
    if (code === 0) {
      print('green', '✅ Bot cerrado correctamente');
    } else {
      print('red', `❌ Bot cerrado con código de error: ${code}`);
    }
  });
  
  // Manejar señales de terminación
  process.on('SIGINT', () => {
    print('yellow', '\n🛑 Cerrando Tumbados Gaming Bot...');
    botProcess.kill('SIGINT');
  });
  
  process.on('SIGTERM', () => {
    print('yellow', '\n🛑 Cerrando Tumbados Gaming Bot...');
    botProcess.kill('SIGTERM');
  });
}

// Ejecutar el script
main().catch((error) => {
  print('red', `❌ Error fatal: ${error.message}`);
  process.exit(1);
}); 