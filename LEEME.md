# Plantilla Maestra — Radio / Iglesia Online

Plantilla reutilizable basada en la web de **Radio 88.1 FM — Gloria de Dios**.
Incluye reproductor en vivo, versículo diario, programación, reuniones,
prédicas de YouTube, ubicación con mapa, transmisión a Smart TV e instalación como app (PWA).

La idea es simple: **todo el contenido se edita en un solo archivo (`config.js`)**.
No hace falta tocar el HTML ni el JavaScript para cambiar textos, colores, redes,
horarios o el nombre de la radio.

---

## 1. Contenido del paquete

```
plantilla-radio/
├── index.html          ← la web (no hace falta editarla)
├── config.js           ← ★ TODO LO EDITABLE ESTÁ ACÁ
├── versiculos.js       ← lista de versículos diarios (358 cargados)
├── manifest.json       ← datos de la app instalable (nombre, colores, ícono)
├── sw.js               ← caché / funcionamiento sin conexión
├── assets/
│   ├── fondo-movil.jpg
│   ├── fondo-escritorio.jpg
│   └── icono.png
├── limpiar-chat.js     ← OPCIONAL: borra mensajes viejos del chat
├── server.js           ← OPCIONAL: backend para saludos de audio
├── package.json
├── .env.example
└── netlify.toml
```

---

## 2. Verla funcionando en 1 minuto

**Opción rápida (sin instalar nada):** abrí `index.html` con doble clic.
Se ve y funciona, pero la app instalable (PWA), el service worker y algunas
funciones del navegador requieren un servidor.

**Opción recomendada (servidor local):**

```bash
# Con Node.js instalado
npm install
npm start
# Abrir http://localhost:3000
```

O cualquier servidor estático, por ejemplo:

```bash
python3 -m http.server 8080
```

---

## 3. Personalización exprés (6 pasos)

1. Abrí `config.js` y cambiá el bloque **`sitio`** (nombre, eslogan, iglesia, descripción).
2. Cambiá los colores en **`marca`** si querés otra identidad visual.
3. Reemplazá las 3 imágenes de la carpeta `assets` (mismos nombres).
4. Cargá tu stream en **`transmision.url`**.
5. Editá **`programacion`**, **`reuniones`**, **`ubicacion`** y **`redes`** con tus datos.
6. Actualizá `manifest.json` con el nombre y el color de tu radio.

Listo. Con eso ya tenés una radio distinta, con la misma calidad de la original.

---

## 4. `config.js` explicado

| Bloque | Para qué sirve |
|---|---|
| `sitio` | Nombre, eslogan, descripción, iglesia, idioma, URL pública y color de la barra del navegador. |
| `marca` | Los 5 colores de la web (primario, oscuro, oro, secundario y fondo de ventanas). |
| `imagenes` | Rutas del fondo para celular, fondo para PC e ícono. |
| `transmision` | URL del stream y datos para mostrar el tema que está sonando. |
| `modulos` | Prende/apaga el versículo y el pie de redes. |
| `barraSuperior` | Botones de arriba: orden, texto, ícono y color. |
| `programacion` | Grilla de programas (ventana "Radio"). |
| `reuniones` | Días y horarios de la iglesia (ventana "Reuniones"). |
| `predicas` | Canal de YouTube y API Key. |
| `ubicacion` | Dirección de la iglesia, mapa de Google y botones «Cómo llegar» / «Usar mi ubicación». |
| `chat` | Chat grupal con Firebase: filtro de palabras, moderación y limpieza automática. |
| `redes` | Botones del pie: Facebook, WhatsApp, oración, YouTube, compartir, Smart TV. |
| `textos` | Mensajes de estado del reproductor. |
| `temporizador` | Minutos del temporizador para dormir. |
| `versiculo` | Lista de versículos (se carga desde `versiculos.js`). |

### Ejemplo: cambiar el nombre y los colores

```js
sitio: {
  nombre: "Radio Vida 99.5",
  nombreCorto: "Vida 99.5",
  eslogan: "Música que te acompaña",
  // ...
},

marca: {
  primario:       "#22c55e",
  primarioOscuro: "#15803d",
  oro:            "#a3e635",
  secundario:     "#38bdf8",
  fondoModal:     "#0f172a"
},
```

### Ejemplo: cambiar un botón de la barra superior

```js
{ id: "reuniones", etiqueta: "Cultos", icono: "fa-solid fa-church", color: "#38bdf8", titulo: "Nuestros cultos" },
```

Para **quitar** un botón, borrá su línea completa.
Los `id` válidos son: `temporizador`, `programacion`, `reuniones`,
`predicas`, `ubicacion`, `instalarApp`.

### Programación: dos formatos

**Grilla por día** (recomendado cuando hay varios horarios por día):

```js
programacion: {
  dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
  grilla: [
    { dia: "Lunes", hora: "07:00", titulo: "Repetición de predicación del día viernes a las 14 hs" },
    { dia: "Lunes", hora: "10:00", titulo: "Repetición de predicación del día viernes a las 22 hs" }
    // ...
  ]
}
```

La ventana muestra una pestaña por día y abre directamente en el día actual. Si ese día no está en la lista (por ejemplo, sábado o domingo), abre en el primero.
Si un día no tiene programas, aparece vacío sin romper nada.

**Lista simple** (para pocos programas):

```js
programacion: [
  { titulo: "Caminando en Libertad", dias: "Lunes y Miércoles", horario: "10:00 - 12:00" }
]
```

---

## 5. Imágenes

Reemplazá los archivos manteniendo el nombre:

| Archivo | Formato ideal | Dónde se ve |
|---|---|---|
| `assets/fondo-movil.jpg` | Vertical, 1080 × 1920 | Celulares |
| `assets/fondo-escritorio.jpg` | Horizontal, 1920 × 1080 | Computadoras |
| `assets/icono.png` | Cuadrado, 512 × 512 | Ícono de la app instalada |

> Consejo: usá fotos oscuras o con poca información en la zona inferior,
> porque ahí van el versículo, el reproductor y los botones.

---

## 6. Prédicas de YouTube

1. Entrá a [console.cloud.google.com](https://console.cloud.google.com) y creá un proyecto.
2. Buscá **"YouTube Data API v3"** y presioná **Habilitar**.
3. Andá a **Credenciales → Crear credenciales → Clave de API**.
4. Copiá la clave y pegala en `config.js`:

```js
predicas: {
  apiKey: "TU_CLAVE_ACÁ",
  canalHandle: "@tucanal",
  canalId: "UCxxxxxxxxxxxxxxxxxxxxxx",
  // ...
}
```

5. **Restringí la clave** (muy importante): en Credenciales → tu clave →
   "Restricciones de aplicación" → *Sitios web* → agregá tu dominio.

El bloque muestra automáticamente:
- la **transmisión en vivo** si en ese momento hay una (si no hay, no aparece nada),
- los **últimos 4 videos publicados** en el canal, sean o no transmisiones,
- y se actualiza solo cada 60 segundos mientras la ventana está abierta.

La API Key es **gratuita** y no hace falta tarjeta. Sin la clave, la ventana
muestra un aviso con el enlace al canal, pero no la lista de videos.

Si no ponés la clave, la ventana muestra un aviso indicando dónde configurarla.

---

## 7. Ubicación de la iglesia

La ventana **Ubicación** muestra el mapa, la dirección y dos botones:
**«Cómo llegar»** (abre Google Maps con la ruta hasta la iglesia) y
**«Usar mi ubicación»** (calcula la ruta desde donde está la persona).

Todo se edita en el bloque `ubicacion`:

```js
ubicacion: {
  titulo:          "Nuestra Ubicación",
  direccion:       "Edison 1406",
  localidad:       "El Jagüel, Esteban Echeverría",
  provincia:       "Buenos Aires",
  codigoPostal:    "1805",
  linkMapa:        "https://maps.app.goo.gl/xxxxxxxx",  // enlace corto del lugar
  embedUrl:        "https://www.google.com/maps?q=...&output=embed",
  textoComoLlegar: "Cómo llegar",
  textoMiUbicacion: "Usar mi ubicación"
}
```

- **`embedUrl`**: es el mapa que se ve dentro de la web. La forma más simple es
  escribir la dirección en Google Maps, copiar el enlace y reemplazar el texto
  de la dirección en `'https://www.google.com/maps?q=AQUÍ_LA_DIRECCIÓN&z=16&output=embed`.'
  Los espacios y las tildes se escriben codificados (`%20`, `%C3%BC`).
- **`linkMapa`**: el enlace corto del lugar (Google Maps → Compartir → Copiar enlace).
- Los botones de ruta no necesitan ninguna clave de API.
- **«Usar mi ubicación»** solo funciona en sitios publicados con **HTTPS**.

Si tu iglesia cambia de dirección, alcanza con corregir `direccion`,
`localidad`, `provincia`, `codigoPostal`, `embedUrl` y `linkMapa`.

---

## 8. Chat de la iglesia (Firebase)

Es un chat grupal: cualquiera que entra a la web puede leer y escribir, sin
crear cuenta. Aparece como un botón redondo con ícono de chat en el costado
derecho de la pantalla, y los mensajes se actualizan solos, en tiempo real.

Trae tres cosas pensadas para una iglesia:

- **Filtro automático de palabras ofensivas** (se tachan con asteriscos o se
  bloquea el envío, según cómo lo configures).
- **Modo moderador** para que el ministerio borre mensajes con correo y
  contraseña.
- **Script de limpieza** (`limpiar-chat.js`) para borrar mensajes viejos
  automáticamente.

Funciona con **Firebase Realtime Database**, un servicio gratuito de Google.
No hay que instalar nada ni tocar código: solo crear la base y pegar su
dirección en `config.js`.

### Paso a paso

1. Entrá a [console.firebase.google.com](https://console.firebase.google.com) con
   la cuenta de Gmail de la iglesia.
2. **Agregar proyecto** → nombre (por ejemplo `iglesia-chat`) → podés
   desactivar Google Analytics → **Crear proyecto**.
3. Menú izquierdo: **Compilación → Realtime Database** → **Crear base de datos**.
4. Ubicación: la que propone → arrancá en **modo bloqueado**.
5. Pestaña **Reglas**: borrá lo que hay, pegá esto y tocá **Publicar**.
   Cambiá `moderador@iglesia.com` por el correo real del moderador.

```json
{
  "rules": {
    "chat": {
      "mensajes": {
        ".read": true,
        ".indexOn": ["ts"],
        "$mensaje": {
          ".write": "(!data.exists() && newData.child('texto').isString() && newData.child('texto').val().length <= 300 && newData.child('nombre').isString() && newData.child('nombre').val().length <= 24 && newData.child('ts').isNumber()) || (data.exists() && !newData.exists() && auth != null && auth.token.email === 'moderador@iglesia.com')",
          ".validate": "!newData.exists() || newData.hasChildren(['nombre','texto','ts'])"
        }
      }
    }
  }
}
```

   Estas reglas dejan leer a todos y escribir mensajes nuevos, pero nadie puede
   editar ni borrar los que ya están, **salvo el correo del moderador**.

6. Arriba de la tabla aparece la dirección de la base, algo así:
   `https://iglesia-chat-default-rtdb.firebaseio.com`
   (a veces termina en `.firebasedatabase.app`). Copiala.
7. Pegala en `config.js`:

```js
chat: {
  habilitado:  true,
  titulo:      "Chat de la iglesia",
  databaseURL: "https://iglesia-chat-default-rtdb.firebaseio.com",
  ruta:        "chat/mensajes",
  maxNombre:   20,
  maxCaracteres: 280,
  esperaEnvio: 4000,
  textoVacio:  "Todavía no hay mensajes. ¡Escribí el primero!",
  textoBloqueado: "Ese mensaje tiene palabras que no están permitidas.",

  filtro: {
    activo: true,
    modo: "censurar",
    palabras: ["puta", "pelotudo", "mierda"]
  },

  moderacion: {
    apiKey: "",
    email:  ""
  }
}
```

8. Publicá la web (o probá en `http://localhost:3000`). El botón del chat
   aparece solo si `databaseURL` tiene una dirección.

### Filtro de palabras ofensivas

Se aplica **al enviar y también al mostrar**, así que si alguien escribe
saltándose la web, igual se ve tachado. Entiende mayúsculas, tildes, letras
repetidas (`puuuta`), y algunos reemplazos típicos (`put4`, `pel0tudo`).

- `modo: "censurar"` (recomendado): la palabra se tacha con asteriscos y el
  mensaje se envía igual. `Sos un pelotudo` → `Sos un ********`.
- `modo: "bloquear"`: no deja enviar y muestra el aviso de `textoBloqueado`.

La lista de `palabras` es tuya: agregá o quitá las que quieras. Si alguna
palabra normal te queda tachada, sacala de la lista.

### Moderación: borrar mensajes

**a) Activar el ingreso con correo y contraseña**
1. **Compilación → Authentication → Comenzar**.
2. Pestaña **Sign-in method** → **Correo electrónico/Contraseña** → **Habilitar**.
3. Pestaña **Usuarios** → **Agregar usuario** → correo y contraseña del
   moderador. Esa contraseña no se guarda en la web.

**b) Poner ese correo en las reglas** (el mismo del paso 5).
Si hay dos moderadores: `auth.token.email === 'uno@iglesia.com' || auth.token.email === 'dos@iglesia.com'`.

**c) Copiar la Web API Key**
**Configuración del proyecto → General → Tus apps → Configuración del SDK →
`apiKey`** (empieza con `AIza`). No es la misma clave de YouTube.

**d) Completar en `config.js`**
```js
moderacion: {
  apiKey: "AIza...la_clave_web",
  email:  "moderador@iglesia.com"
}
```

Con eso aparece un escudito arriba a la derecha del chat. Se ingresa correo y
contraseña, y cada mensaje muestra un tachito para borrarlo (pide
confirmación). Si `moderacion.apiKey` queda vacío, el escudito no aparece.

### Limpieza automática de mensajes viejos

El archivo `limpiar-chat.js` borra los mensajes con más de X días. Usa la API
de Firebase, así que **necesita un usuario moderador** (el mismo del paso a).

1. Copiá `.env.example` a `.env` y completá:

```
FIREBASE_DB_URL=https://iglesia-chat-default-rtdb.firebaseio.com
FIREBASE_API_KEY=AIza...la_clave_web
MODERADOR_EMAIL=moderador@iglesia.com
MODERADOR_PASSWORD=la_contraseña_del_moderador
DIAS_RETENCION=30
```

2. Probá primero en modo simulación (no borra nada):

```bash
node limpiar-chat.js --simular
```

3. Si la lista es la correcta, corré la limpieza de verdad:

```bash
node limpiar-chat.js
```

Opciones útiles:

```bash
node limpiar-chat.js --dias 15     # conserva solo 15 días en esta corrida
node limpiar-chat.js --ayuda       # ayuda
```

**Para que se haga solo**, programalo una vez por semana:

- **Windows:** Programador de tareas → Crear tarea básica → Semanal →
  Acción: `node`, argumentos `limpiar-chat.js`, iniciar en la carpeta del proyecto.
- **Linux/Mac (cron):** `0 3 * * 0 cd /ruta/al/proyecto && node limpiar-chat.js`
  (todos los domingos a las 3 de la mañana).
- **GitHub Actions:** un workflow semanal con `node limpiar-chat.js` y los
  datos guardados en *Secrets*.

> El `.env` tiene la contraseña del moderador: no lo subas a GitHub ni lo
> mandes por WhatsApp. Ya está excluido en `.gitignore`.

### Qué conviene saber

- **Es gratis** dentro del plan Spark: 100 conexiones simultáneas y 1 GB.
  Para una iglesia sobra.
- El nombre se recuerda en el celular de cada persona.
- Hay 4 segundos de espera entre mensaje y mensaje (`esperaEnvio`).
- Para apagar el chat sin borrar nada: `habilitado: false`.
- Avisá en la web que no se compartan datos personales en el chat.

---

## 9. App instalable (PWA)

Para que el celular ofrezca "Instalar app":

1. La web tiene que estar publicada con **HTTPS** (localhost también sirve para probar).
2. Editá `manifest.json`: `name`, `short_name`, `theme_color`, `background_color`.
3. En `sw.js`, subí la versión cada vez que publiques cambios:

```js
const VERSION = 'radio-v2'; // antes radio-v1
```

Con eso los celulares descargan la versión nueva en lugar de la vieja guardada.

---

## 10. Servidor opcional (saludos de audio)

Solo necesario si querés recibir saludos grabados y guardarlos en la nube.

```bash
npm install
cp .env.example .env
# completá .env con tus datos de Cloudinary
npm start
```

Endpoints disponibles:

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/api/saludos` | Recibe `{ nombre, ubicacion, audioBase64 }` y lo sube a Cloudinary. |
| `GET` | `/api/saludos` | Lista los saludos guardados. |
| `GET` | `/api/estado` | Estado del servicio. |

**Nunca escribas las credenciales dentro de `server.js`.** Van en `.env`,
que está excluido por `.gitignore`.

---

## 11. Cómo publicarla

| Servicio | Cómo |
|---|---|
| **Netlify** | Arrastrá la carpeta completa a [app.netlify.com/drop](https://app.netlify.com/drop). |
| **Vercel** | `vercel` dentro de la carpeta (sitio estático). |
| **GitHub Pages** | Subí los archivos al repositorio y activá Pages. |
| **Firebase Hosting** | `firebase init hosting` apuntando a la carpeta y `firebase deploy`. |
| **Hosting tradicional** | Subí todo por FTP a `public_html`. |

---

## 12. Antes de publicar: checklist

- [ ] Nombre, eslogan e iglesia cambiados en `config.js`.
- [ ] Stream propio funcionando en `transmision.url`.
- [ ] Programación y reuniones reales.
- [ ] Dirección, mapa y enlace de Google Maps revisados.
- [ ] Chat funcionando, reglas publicadas y filtro de palabras revisado.
- [ ] Usuario moderador creado y borrado de mensaje probado.
- [ ] Redes sociales y WhatsApp con tus números.
- [ ] Fondos e ícono reemplazados.
- [ ] `manifest.json` con nombre y colores correctos.
- [ ] API Key de YouTube restringida por dominio.
- [ ] Versión del service worker actualizada (`sw.js`).
- [ ] Probada en celular y en computadora.
- [ ] Sin credenciales escritas en el código.

---

## 13. Problemas frecuentes

**No suena el audio.**
Verificá que `transmision.url` sea un enlace directo al stream (termina en
`.mp3`, `.aac` o similar) y que empiece con `https://`. Los navegadores bloquean
audio mixto (http dentro de una web https).

**No aparece el botón de instalar app.**
Solo aparece con HTTPS, con `manifest.json` y `sw.js` accesibles, y en algunos
navegadores requiere unos segundos o una segunda visita. En iPhone se instala
con *Compartir → Agregar al inicio*.

**La ventana de Prédicas dice que falta la API Key.**
Falta pegar la clave en `config.js` o la clave no tiene habilitada la
"YouTube Data API v3".

**El versículo no cambia.**
Se elige según el día del año. Si la lista se vacía, la tarjeta se oculta sola.

**Hice cambios y el celular sigue mostrando lo viejo.**
Subí la versión en `sw.js` (`radio-v1` → `radio-v2`) y volvé a publicar.

**El mapa no carga o queda en gris.**
El mapa se arma con la dirección escrita en `ubicacion` (calle, localidad,
provincia y código postal). Si el bloqueo del navegador o de la red no deja ver
Google Maps, el botón **«Ver ficha en Google Maps»** abre el lugar igual.
También podés pegar el enlace corto del lugar en `ubicacion.linkMapa`.

**El botón «Usar mi ubicación» no hace nada.**
El navegador solo comparte la ubicación en sitios con **HTTPS** (o en
`localhost`) y pide permiso la primera vez. Si el usuario lo rechaza, se abre
el mapa con la dirección de la iglesia como destino y sin punto de partida.

**No aparece el botón del chat.**
Falta pegar la dirección de Firebase en `chat.databaseURL`, o `chat.habilitado`
está en `false`.

**El chat dice «No se pudo cargar el chat».**
La dirección está mal copiada o las reglas no se publicaron. Abrí esa dirección
en el navegador: tiene que responder algo, no un error.

**Se tachan palabras que no debería.**
Sacá esa palabra de la lista `chat.filtro.palabras`.

**El script dice «No se pudo iniciar sesión».**
Revisá `MODERADOR_EMAIL` y `MODERADOR_PASSWORD` en `.env`, y que el usuario
exista en Authentication.

**El script dice «No se pudieron leer los mensajes».**
Las reglas no tienen `.indexOn: ["ts"]` o el correo de las reglas no coincide
con el usuario que inicia sesión.

**El botón de Smart TV no funciona.**
Requiere Chrome, la misma red Wi-Fi y un dispositivo compatible (Chromecast o
TV con Google Cast).

---

## 14. Crear una segunda radio desde esta plantilla

1. Copiá la carpeta completa y renombrala (ej. `radio-vida`).
2. Cambiá `config.js` (identidad, colores, stream, redes, horarios).
3. Reemplazá las imágenes de `assets`.
4. Editá `manifest.json` y subí la versión en `sw.js`.
5. Publicá como un sitio nuevo.

No hace falta tocar `index.html`: está pensado para no modificarse.

---

*Plantilla armada sobre el proyecto original, con el mismo diseño y todas las
funciones, pero con el contenido centralizado y los secretos fuera del código.*
