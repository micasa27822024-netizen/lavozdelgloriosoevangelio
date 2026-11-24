/* ============================================================================
   PLANTILLA MAESTRA — RADIO / IGLESIA ONLINE
   ----------------------------------------------------------------------------
   ESTE ES EL ÚNICO ARCHIVO QUE NECESITÁS EDITAR PARA PERSONALIZAR LA WEB.
   Todo el contenido (textos, colores, redes, programación, reuniones,
   transmisión, YouTube) se toma de acá.

   Reglas de oro:
   • Los textos van siempre entre "comillas dobles".
   • Cada bloque termina con una coma. La última coma antes de } es opcional.
   • Si querés ELIMINAR un botón, borrá su línea completa del arreglo
     barraSuperior o de redes.
   • Si querés OCULTAR una sección, poné su valor en false dentro de modulos.
   ============================================================================ */

window.CONFIG = {

  /* ==========================================================================
     1) IDENTIDAD DEL SITIO
     ========================================================================== */
  sitio: {
    nombre:      "Radio La Voz del Glorioso Evangelio", // Aparece en la pestaña y al compartir
    nombreCorto: "La voz del glorioso evangelio",                     // Nombre corto (PWA / notificaciones)
    eslogan:     "Un mensaje de Gracia",
    descripcion: "¡Escuchá Radio La Voz del glorioso Evangelio en vivo y bendecí tu vida!",
    iglesia:     "Iglesia El Glorioso Evangelio",
    ciudad:      "",                                // Ej: "Rosario, Santa Fe"
    idioma:      "es",
    urlPublica:  "",                                // Ej: "https://radio881.com" (se usa al compartir)

    // Color de la barra del navegador / celular (debe ser un color sólido)
    colorBarra:  "#f59e0b"
  },

  /* ==========================================================================
     2) COLORES DE LA MARCA
     Cambiá estos 5 valores y toda la web se re-colorea sola.
     ========================================================================== */
  marca: {
    primario:       "#f59e0b", // Ámbar (botón de play, títulos, acentos)
    primarioOscuro: "#d97706", // Sombra del degradé del botón
    oro:            "#d4af37", // Detalles dorados (ecualizador, tarjeta de canción)
    secundario:     "#38bdf8", // Celeste (sección Reuniones)
    fondoModal:     "#121824"  // Fondo de las ventanas emergentes
  },

  /* ==========================================================================
     3) IMÁGENES
     Reemplazá los archivos dentro de la carpeta "assets" manteniendo
     los nombres, o cambiá acá las rutas.
     • fondo-movil:     vertical, recomendado 1080 x 1920
     • fondo-escritorio: horizontal, recomendado 1920 x 1080
     • icono:           512 x 512 en PNG
     ========================================================================== */
  imagenes: {
    fondoMovil:      "assets/fondo-movil.jpg",
    fondoEscritorio: "assets/fondo-escritorio.jpg",
    icono:           "assets/icono.png"
  },

  /* ==========================================================================
     4) TRANSMISIÓN DE AUDIO
     ========================================================================== */
  transmision: {
    url:  "https://stream.zeno.fm/2cswccyju0ktv.mp3", // Link directo del stream
    tipo: "audio/mp3",
    textoEspera: "Sintonizando transmisión en vivo...",

    /* Título de la canción que se está emitiendo ("now playing").
       proveedor: "zeno" usa la API de Zeno.fm.
       Si no usás Zeno, dejá proveedor en "" y se mostrará el nombre del sitio. */
    metadatos: {
      proveedor: "zeno",
      streamId:  "2cswccyju0ktv" // ID que aparece en api.zeno.fm de tu emisora
    }
  },

  /* ==========================================================================
     5) MÓDULOS OPCIONALES (true = se ve / false = se oculta)
     ========================================================================== */
  modulos: {
    versiculo:     true,  // Tarjeta con el versículo del día
    redesSociales: true   // Pie con botones de contacto y redes
  },

  /* ==========================================================================
     6) BARRA SUPERIOR DE BOTONES
     Ordená, renombrá o borrá líneas. Los "id" válidos son:
     temporizador | programacion | reuniones | predicas | ubicacion | instalarApp
     ========================================================================== */
  barraSuperior: [
    { id: "temporizador", etiqueta: "Off",       icono: "fa-solid fa-clock",                  titulo: "Temporizador para dormir" },
    { id: "programacion", etiqueta: "Radio",     icono: "fa-solid fa-radio",                  titulo: "Programación de la radio" },
    { id: "reuniones",    etiqueta: "Reuniones", icono: "fa-solid fa-church",   color: "#38bdf8", titulo: "Nuestras reuniones" },
    { id: "predicas",     etiqueta: "Prédicas",  icono: "fa-brands fa-youtube", color: "#ff4d4d", titulo: "Prédicas y mensajes" },
    { id: "ubicacion",    etiqueta: "Ubicación", icono: "fa-solid fa-location-dot", color: "#f59e0b", titulo: "Cómo llegar a la iglesia" },
    { id: "instalarApp",  etiqueta: "App",       icono: "fa-solid fa-mobile-screen-button",  titulo: "Instalar la aplicación" }
  ],

  /* ==========================================================================
     7) PROGRAMACIÓN (ventana "Radio")
     --------------------------------------------------------------------------
     Hay dos formatos posibles; usá el que te resulte cómodo:

     A) GRILLA POR DÍA (recomendado si tenés varios horarios por día)
        Se muestran pestañas con los días y, debajo, los horarios de ese día.

     B) LISTA SIMPLE (para pocos programas)
        programacion: [
          { titulo: "Caminando en Libertad", dias: "Lunes y Miércoles", horario: "10:00 - 12:00" }
        ]
     ========================================================================== */
  programacion: {
    dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
    grilla: [
      /* LUNES */
      { dia: "Lunes",     hora: "07:00", titulo: "Repetición de predicación del día viernes a las 14 hs" },
      { dia: "Lunes",     hora: "10:00", titulo: "Repetición de predicación del día viernes a las 22 hs" },
      { dia: "Lunes",     hora: "14:00", titulo: "Estudio de Los 7 Gozos del Creyente" },
      { dia: "Lunes",     hora: "22:00", titulo: "Estudio de 1 de Juan" },

      /* MARTES */
      { dia: "Martes",    hora: "07:00", titulo: "Repetición de Estudio de los 7 Gozos del Creyente" },
      { dia: "Martes",    hora: "10:00", titulo: "Repetición de Estudio de 1 de Juan" },
      { dia: "Martes",    hora: "14:00", titulo: "Estudio Los Nombres de Dios" },
      { dia: "Martes",    hora: "22:00", titulo: "Repetición de Las 7 Unidades de la Iglesia" },

      /* MIÉRCOLES */
      { dia: "Miércoles", hora: "07:00", titulo: "Repetición de Estudio Los Nombres de Dios" },
      { dia: "Miércoles", hora: "10:00", titulo: "Repetición de Las 7 Unidades de la Iglesia" },
      { dia: "Miércoles", hora: "14:00", titulo: "Prédicas Libres" },
      { dia: "Miércoles", hora: "22:00", titulo: "Prédicas Libres" },

      /* JUEVES */
      { dia: "Jueves",    hora: "07:00", titulo: "Repetición de prédica libre" },
      { dia: "Jueves",    hora: "10:00", titulo: "Repetición de prédica libre" },
      { dia: "Jueves",    hora: "14:00", titulo: "Estudio de 1 Juan" },
      { dia: "Jueves",    hora: "22:00", titulo: "Estudio de Los 7 Gozos del Creyente" },

      /* VIERNES */
      { dia: "Viernes",   hora: "07:00", titulo: "Repetición de Estudio de 1 de Juan" },
      { dia: "Viernes",   hora: "10:00", titulo: "Repetición de Estudio de los 7 Gozos del Creyente" },
      { dia: "Viernes",   hora: "14:00", titulo: "Estudio de Las 7 Unidades de la Iglesia" },
      { dia: "Viernes",   hora: "22:00", titulo: "Estudio Los Nombres de Dios" }
    ]
  },

  /* ==========================================================================
     8) REUNIONES DE LA IGLESIA (ventana "Reuniones")
     ========================================================================== */
  reuniones: {
    titulo:      "Nuestras Reuniones",
    subtitulo:   "Iglesia Cristiana",
    nombre:      "El Glorioso Evangelio",
    items: [
      { dia: "DOMINGO",   hora: "10:00 HS", nombre: "Culto General",                  icono: "fa-solid fa-church", destacado: true },
      { dia: "DOMINGO",   hora: "12:00 HS", nombre: "Reunión de Jóvenes y Escuelita", icono: "fa-solid fa-children" },
      { dia: "MIÉRCOLES", hora: "20:00 HS", nombre: "Estudio Bíblico",                icono: "fa-solid fa-book-bible" }
    ]
  },

  /* ==========================================================================
     9) PRÉDICAS (YouTube)
     --------------------------------------------------------------------------
     Para que funcione necesitás una API Key de YouTube (gratis):
       console.cloud.google.com  →  Crear proyecto  →  Habilitar
       "YouTube Data API v3"  →  Credenciales  →  Crear clave de API.
     IMPORTANTE: restringí la clave al dominio de tu web.
     ========================================================================== */
  predicas: {
    titulo:      "Prédicas & Mensajes",
    apiKey:      "AIzaSyBi8WgjIWwqfvzCG4Xd1P098VZPVgpeHCY",  // ← Clave del proyecto "Demo Asistencia" (YouTube Data API v3)
    canalHandle: "@aycge1055",
    canalId:     "UCXzmgsj_63CUB92Fg2fOwHg", // Se usa si la búsqueda por handle falla
    cantidadUltimas: 4,
    intervaloRefresco: 60000, // milisegundos (60 s)
    textoBotonVivo: "Ver Vivo",
    textoBotonArchivo: "Ver aquí"
  },

  /* ==========================================================================
     10) UBICACIÓN DE LA IGLESIA (ventana "Ubicación")
     --------------------------------------------------------------------------
     • linkMapa: enlace para abrir la ficha del lugar en Google Maps.
     • embedUrl: mapa que se muestra dentro de la web (no necesita API Key).
     • direccion, localidad, provincia y codigoPostal: se muestran juntos y
       se usan para calcular "Cómo llegar".
     • Botón extra "Consultar por las congregaciones de la común fe":
         consultaWhatsapp → número con código de país, sin + ni espacios
                            (ej: "5491139064858").
         consultaUrl      → opcional; si lo completás, el botón abre ese
                            enlace en lugar del chat de WhatsApp.
         Si no ponés número ni enlace, el botón no se muestra.
     ========================================================================== */
  ubicacion: {
    titulo:         "Nuestra Ubicación",
    direccion:      "Edison 1406",
    localidad:      "El Jagüel, Esteban Echeverría",
    provincia:      "Buenos Aires",
    codigoPostal:   "1805",
    linkMapa:       "https://maps.app.goo.gl/MCT7WQuWEcYYdarv9",
    embedUrl:       "https://www.google.com/maps?q=Edison%201406%2C%20El%20Jag%C3%BCel%2C%20Esteban%20Echeverr%C3%ADa%2C%20Buenos%20Aires&z=16&output=embed",
    textoComoLlegar: "Cómo llegar",
    textoMiUbicacion: "Usar mi ubicación",

    // Botón de consulta por las congregaciones de la común fe
    textoConsultarCongregaciones: "Consultar por las congregaciones de la común fe",
    consultaWhatsapp: "5491139064858", // ← número que recibe las consultas
    consultaUrl:      "",              // ← opcional: enlace propio (formulario, etc.)
    mensajeConsultarCongregaciones: "Hola, quisiera consultar por las congregaciones de la común fe. ¿Me pueden dar información?"
  },

  /* ==========================================================================
     11) REDES Y ACCIONES (pie de página)
     --------------------------------------------------------------------------
     tipo: facebook | whatsapp | oracion | youtube | compartir | chromecast
     Los tipos "compartir" y "chromecast" son acciones internas (no llevan url).
     ========================================================================== */
  redes: [
    { tipo: "facebook", etiqueta: "Facebook",       icono: "fa-brands fa-facebook-f", url: "https://www.facebook.com/iglesiael.gloriosoevangelio" },
    { tipo: "whatsapp", etiqueta: "WhatsApp",       icono: "fa-brands fa-whatsapp",    url: "https://wa.me/5491139064858?text=Hola%20Radio%20la%20voz%20del%20glorioso%20evangelio%20quiero%20mandar%20un%20saludo" },
    { tipo: "oracion",  etiqueta: "Pedir Oración",  icono: "fa-solid fa-hands-praying", url: "https://wa.me/5491139064858?text=Hola%20Radio%20la%20voz%20del%20glorioso%20evangelio%20quisiera%20dejar%20una%20petición%20de%20oración:" },
    { tipo: "youtube",  etiqueta: "YouTube",        icono: "fa-brands fa-youtube",     url: "https://www.youtube.com/@aycge1055" },
    { tipo: "compartir",  etiqueta: "Compartir App",           icono: "fa-solid fa-share-nodes" },
    { tipo: "chromecast", etiqueta: "Transmitir a Smart TV",    icono: "fa-solid fa-tv" }
  ],

  /* ==========================================================================
     12) CHAT DE LA IGLESIA (Firebase)
     --------------------------------------------------------------------------
     Chat grupal: cualquiera que entra puede leer y escribir, y el ministerio
     puede borrar mensajes en "modo moderador".
     Funciona con una base gratuita de Firebase (Realtime Database).
     Los pasos completos están en la guía, sección "Chat de la iglesia".

     databaseURL: la URL que aparece arriba de todo en Firebase, dentro de
     Realtime Database. Ejemplo:
       "https://mi-iglesia-chat-default-rtdb.firebaseio.com"
     Si queda vacía, el botón del chat no se muestra.
     ========================================================================== */
  chat: {
    habilitado:  true,
    titulo:      "Chat de la iglesia",
    databaseURL: "https://el-glorioso-evangelio-chat-default-rtdb.firebaseio.com/",  // ← Pegá acá la URL de tu Realtime Database
    ruta:        "chat/mensajes",
    maxNombre:   20,
    maxCaracteres: 280,
    esperaEnvio: 4000, // milisegundos entre mensaje y mensaje
    textoVacio:  "Todavía no hay mensajes. ¡Escribí el primero!",
    textoBloqueado: "Ese mensaje tiene palabras que no están permitidas.",

    // Filtro automático de palabras ofensivas.
    // modo: "censurar" tacha las palabras con asteriscos.
    //       "bloquear" no deja enviar el mensaje.
    filtro: {
      activo: true,
      modo: "censurar",
      palabras: [
        "puta", "puto", "putita", "putito", "mierda", "concha", "conchuda",
        "forro", "forra", "pelotudo", "pelotuda", "boludo", "boluda", "sorete",
        "orto", "cagon", "cagada", "pija", "verga", "chota", "imbecil",
        "idiota", "tarado", "mogolico", "zorra", "perra", "maricon",
        "hijo de puta", "la concha de tu madre", "andate a la mierda"
      ]
    },

    // Moderación: permite borrar mensajes con correo y contraseña.
    // Si "apiKey" queda vacío, el botón de moderador no aparece.
    moderacion: {
      apiKey: "AIzaSyCOjDEnU9rVz7GtLC1h73OllI3ag7I6O7Q",  // ← Web API Key del proyecto (Configuración del proyecto → General)
      email:  "josue@elgloriosoevangelio.com",  // ← se completa solo en el formulario (no es la contraseña)
      emails: ["josue@elgloriosoevangelio.com", "guillermo@elgloriosoevangelio.com"]  // ← los que pueden moderar (deben figurar en las reglas de Firebase)
    }
  },

  /* ==========================================================================
     13) TEXTOS DE ESTADO DEL REPRODUCTOR
     ========================================================================== */
  textos: {
    enPausa:      "EN PAUSA",
    enLinea:      "EN LÍNEA",
    conectando:   "CONECTANDO",
    reconectando: "RECONECTANDO",
    buffering:    "BUFFERING",
    sinRed:       "SIN RED",
    pieRedes:     "Contacto & Redes Sociales"
  },

  /* ==========================================================================
     14) TEMPORIZADOR PARA DORMIR (minutos)
     ========================================================================== */
  temporizador: {
    opciones: [15, 30, 60]
  },

  /* ==========================================================================
     15) VERSÍCULOS
     La lista completa está en "versiculos.js". Podés editarla ahí.
     ========================================================================== */
  versiculo: {
    lista: window.VERSICULOS || []
  },
};
