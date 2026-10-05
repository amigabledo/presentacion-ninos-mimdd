# Presentación de niños - Monte de Dios

Plataforma oficial para la inscripción pública y gestión administrativa de la presentación de niños en el Ministerio Internacional Monte de Dios.

- **URL de producción**: [https://presentacion-ninos-mimdd.pages.dev/](https://presentacion-ninos-mimdd.pages.dev/)
- **Gestión administrativa**: [https://presentacion-ninos-mimdd.pages.dev/gestion](https://presentacion-ninos-mimdd.pages.dev/gestion)

---

## 1. Características principales

- **Formulario público de inscripción**:
  - Nombre completo del niño o niña.
  - Fecha de nacimiento con cálculo automático de edad aproximada.
  - Edad del niño o niña editable y validada.
  - Nombre completo y teléfono con formato del padre.
  - Nombre completo y teléfono con formato de la madre.
  - Pantalla de confirmación amigable con animación de celebración en formal "usted".
- **Identidad institucional**:
  - Cabecera limpia con el nombre oficial **Monte de Dios** y sin botones administrativos visibles al público general.
  - Tarjeta Open Graph optimizada en alta resolución (1200 x 630 px) para compartir el enlace por WhatsApp y redes sociales.
- **Panel administrativo protegido (`/gestion`)**:
  - Métricas en tiempo real: total inscritos, pendientes, confirmados y presentados.
  - Búsqueda en tiempo real por nombre del niño, padre, madre o teléfono.
  - Enlaces directos a WhatsApp para contactar inmediatamente tanto al padre como a la madre.
  - Selector de cambio de estado (pendiente, confirmado, presentado, cancelado).
  - Exportación de listados a formato CSV.
- **Base de datos en Supabase**:
  - Tabla aislada e independiente `public.presentaciones_ninos`.
  - Políticas de seguridad por fila (RLS) y concesión explícita de permisos (`GRANT`).
- **Usuarios autorizados para gestión**:
  - `marcos`
  - `kramos`
  - `admin`
  - `servidor`

---

## 2. Historial de cambios
- **05/10/2026**:
  - Corrección visual en iPad / iPadOS Safari para el campo "Fecha de nacimiento" y "Edad del niño o niña".
  - Se agregaron reglas de normalización en CSS para `input[type="date"]` (`-webkit-appearance: none`, `min-width: 0`, `max-width: 100%`) y `::-webkit-date-and-time-value`.
  - Se aplicó `min-w-0` a las columnas del grid y altura uniforme `h-11` (44 px estándar de accesibilidad táctil) en los campos de entrada, evitando desbordamientos y solapamientos en pantallas de tablet.
  - Se añadió `pointer-events-none` a los iconos de los campos para asegurar enfoque directo y activación del selector nativo al tocar.
  - Auto-desenfoque (`blur`) automático en el selector de fecha al elegir día para que no permanezca el borde azul activo en iPad/iOS.
  - Ajuste de espaciado interno a `pl-11` para dar mayor separación visual entre el icono del calendario y el texto de la fecha elegida.
  - Confirmación de acceso al panel de gestión para `kramos` con contraseña `kramos123` (y alternativa `kamos123`).
- **03/10/2026**:
  - Diseño del título principal "Presentación de niños" en pastilla blanca redondeada destacada con elevación y sombra.
  - Centrado del logotipo institucional y el nombre "Ministerio Internacional Monte de Dios" en la barra superior.
  - Inversión de colores en el título principal: "Presentación" en rosa y "de niños" en azul.
  - Remoción de los textos informativos superiores del formulario ("Inscripción" y "Todos los campos son obligatorios").
  - Actualización del subtítulo de la página de inicio indicando la fecha de presentación para el domingo 25/octubre/2026.
  - Validación estricta y obligatoriedad en todos los campos del formulario de inscripción, incluyendo verificación de 10 dígitos telefónicos.
  - Remoción del pie de página con información institucional en la página de inicio pública.
  - Actualización del nombre en toda la plataforma a "Ministerio Internacional Monte de Dios" (incluyendo inicio de sesión de gestión y cabecera del panel).
  - Configuración de clave de acceso específica `kamos123` para la administradora `kramos`.
  - Botón de exportar CSV actualizado con icono de flecha hacia arriba.
  - Diseño responsivo dual en el panel de gestión: tarjetas limpias sin desbordes en dispositivos móviles y tabla estructurada en tablets y computadoras.
  - Apertura de permisos RLS para lectura y actualización directa desde la consola PostgREST en Supabase.
  - Aplicación de la paleta cromática del volante oficial (celeste suave y lila pastel).
  - Fondo ambiental con formas pastel difuminadas estilo nubes y marco redondeado con borde celeste.
  - Ajuste del encabezado institucional a "Ministerio Internacional Monte de Dios" y subtítulo a dos líneas.
  - Bloques de datos del padre (celeste) y de la madre (lila) diferenciados visualmente.
  - Botón de envío con degradado institucional celeste-lila y texto "Enviar registro".
  - Pantalla de éxito en 3 líneas con resumen de datos del niño y padres.
- **02/10/2026**: Se actualizó el usuario administrador `cicatrices` por `kramos` para unificar los accesos institucionales con la cuenta de Diác. Katherine Ramos.

---

## 2. Flujo de despliegue en Cloudflare Pages

El flujo definitivo de despliegue es:

1. Compilar el proyecto:
   ```bash
   npm run build
   ```
2. Documentar los cambios en este `README.md`.
3. Confirmar cambios en Git:
   ```bash
   git add .
   git commit -m "feat: implementacion inicial de presentacion de ninos"
   git push origin main
   ```
4. Desplegar en Cloudflare Pages:
   ```bash
   npx wrangler pages deploy dist --project-name=presentacion-ninos-mimdd --branch=main
   ```
