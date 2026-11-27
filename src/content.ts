export type Lang = "en" | "es";
export const LANGS: Lang[] = ["en", "es"];
export const DEFAULT_LANG: Lang = "en";

export const EMAIL = "hello@queky.es";
export const GITHUB = "https://github.com/queky";
export const LINKEDIN = "https://www.linkedin.com/in/isanchez92/";
export const TWITTER = "https://x.com/Qu3ky";

/** A quest line: optional bold lead, then the rest of the sentence. */
export type QuestLine = [lead: string, rest: string];

export interface Level {
  id: string;
  node: string;
  when: string;
  where: string;
  title: string;
  meta: string;
  items: QuestLine[];
}

/** Inventory item: [icon, name, description]. */
export type Item = [icon: string, name: string, description: string];

export type GamePhase = "idle" | "landed" | "crashed" | "aborted";

/** A challenge told as a boss fight: what made it hard, how I approached it, what came out of it. */
export interface Boss { id: string; name: string; when: string; challenge: string; strategy: string; result: string }

export interface Content {
  nav: { career: string; bosses: string; skills: string; extras: string; game: string; contact: string; languages: string; sections: string; musicOn: string; musicOff: string; bgmOn: string; bgmOff: string };
  hero: {
    player: string; classLine: string; stats: [label: string, value: string][];
    intro: [title: string, text: string][]; next: string; nextAria: string;
    start: string; contact: string; toHd: string; to8bit: string; avatarAria: string; photoAlt: string;
  };
  map: { title: string; tag: string; hint: string; level: string; current: string; cleared: string; aria: string; levels: Level[] };
  bosses: { title: string; tag: string; bossLabel: string; challenge: string; strategy: string; result: string; defeated: string; list: Boss[] };
  inventory: { title: string; tag: string; equipped: string; aria: string; categories: [name: string, items: Item[]][] };
  extras: {
    title: string; languagesTitle: string; languages: [name: string, level: number, label: string][];
    educationTitle: string; degree: string; degreeMeta: string; sideTitle: string; repos: [name: string, url: string, text: string][];
  };
  game: {
    title: string; tag: string; coins: string; lives: string; time: string; best: string;
    takeOff: string; again: string; restart: string; stop: string; aria: string;
    messages: Record<GamePhase, string>; howTo: string[]; collected: (n: number) => string;
  };
  contact: { title: string; pitch: string; email: string; copy: string; write: string; copied: string; fallback: string };
  footer: string;
  konami: { on: string; off: string };
}

const es: Content = {
  nav: { career: "Carrera", bosses: "Retos", skills: "Habilidades", extras: "Extras", game: "Sky run", contact: "Contacto", languages: "Idioma", sections: "Secciones", musicOn: "Activar música 8 bits", musicOff: "Silenciar música 8 bits", bgmOn: "ON", bgmOff: "OFF" },
  hero: {
    player: "Jugador 1",
    classLine: "Clase: Ingeniero de software · Pagos y Growth",
    stats: [["Experiencia", "8+ AÑOS"], ["Stack principal", "JAVA·SPRING"], ["Base", "BILBAO"]],
    intro: [
      ["INTRO 1/3", "Soy ingeniero de software con más de 8 años de experiencia. Los últimos 7 he construido sistemas de pagos, facturación y prevención del fraude para Lookiero & Outfittery, una empresa de moda por suscripción que opera en varios países de Europa."],
      ["INTRO 2/3", "Me centro en el backend (Java, Spring Boot, microservicios orientados a eventos) y me muevo con soltura en el frontend con React y React Native. Me gusta modernizar sistemas legacy, integrar proveedores de pago y ayudar a un negocio a abrir nuevos mercados."],
      ["INTRO 3/3", "Uso asistentes de IA para programar a diario: para diseñar, construir y revisar software. Antes de todo esto programé un videojuego para PlayStation 4, y por eso esta web tiene este aspecto."],
    ],
    next: "SIGUIENTE", nextAria: "Siguiente diálogo",
    start: "Pulsa start", contact: "Contacto",
    toHd: "Haz clic para verme en HD", to8bit: "Haz clic para volver a 8 bits",
    avatarAria: "Cambiar entre retrato pixelado y foto", photoAlt: "Retrato de Iñaki Sánchez",
  },
  map: {
    title: "Mapa de carrera", tag: "elige un nivel", hint: "Consejo: usa ← → para moverte entre niveles.",
    level: "Nivel", current: "nivel actual", cleared: "superado", aria: "Niveles de carrera",
    levels: [
      { id: "moon", node: "1", when: "2016", where: "Moon Factory Studios",
        title: "Programador de videojuegos", meta: "Moon Factory Studios · Madrid · mar 2016 – nov 2016",
        items: [["Programé Rolling BOB", " para PlayStation 4, juego premiado en PlayStation Talents."],
                ["", "Desarrollé enemigos, mecánicas de juego y controles del personaje con Unreal Engine 4 y C++."]] },
      { id: "comala", node: "2", when: "2018", where: "Comalatech",
        title: "Ingeniero de software", meta: "Comalatech · Bilbao · jun 2018 – oct 2019",
        items: [["", "Desarrollé apps del Atlassian Marketplace para Confluence y Jira, tanto para Server / Data Center (Java) como para Cloud (JavaScript, React, Redux-Saga)."],
                ["", "Entregué nuevas funcionalidades, mejoras de rendimiento y correcciones de errores, y ayudé a clientes con problemas de configuración."]] },
      { id: "xd", node: "3", when: "2019", where: "Lookiero · Squad XD",
        title: "Ingeniero de software · Squad XD", meta: "Lookiero & Outfittery Group · Bilbao · oct 2019 – dic 2019",
        items: [["", "Trabajo de backend en el middleware que conecta la plataforma legacy con los servicios de pagos y antifraude (Groovy, Vert.x)."]] },
      { id: "pay", node: "4", when: "2020", where: "Lookiero · Squad de Pagos",
        title: "Ingeniero de software · Squad de Pagos", meta: "Lookiero & Outfittery Group · Bilbao · ene 2020 – dic 2022",
        items: [["Ayudé a dividir los sistemas legacy de pagos y antifraude", " en microservicios Java/Spring, incluido un servicio de pagos independiente de cualquier proveedor."],
                ["Construí el servicio de saldo (monedero) con CQRS", " y migradores por lotes con rollback SQL para mover los datos históricos de pagos y fraude sin downtime."],
                ["Construí una herramienta interna de gestión del fraude", " para el equipo de Atención al Cliente."],
                ["Desarrollé pantallas de pago para web, iOS y Android", " (React, React Native, TypeScript, GraphQL), con autenticación reforzada (SCA) y PayPal."],
                ["Añadí caché a una API de tipos de cambio en Node.js/TypeScript", " y mantuve pipelines CI/CD del squad con Jenkins Job DSL."]] },
      { id: "gf", node: "5", when: "2023 – hoy", where: "Lookiero · Growth & Finance",
        title: "Ingeniero de software · Squad de Growth & Finance", meta: "Lookiero & Outfittery Group · Bilbao · ene 2023 – actualidad",
        items: [["Amplié la plataforma de pagos", " con Klarna, iDeal, soporte multidivisa para más de 10 mercados y webhooks de Stripe más fiables."],
                ["Migré a 7M de usuarios de Outfittery", " a la plataforma de Lookiero, incluidos sus pagos activos de Adyen a Stripe."],
                ["Ayudé a consolidar 10 microservicios en un monorepo Gradle", " (Java 25, Spring Boot 4, PostgreSQL, RabbitMQ) con CI/CD filtrado en GitHub Actions y tests E2E con Testcontainers."],
                ["Desarrollador principal del servicio de facturación,", " extrayendo direcciones de facturación del monolito y construyendo flujos de facturación y fiscalidad UE para Personal Shoppers."],
                ["Mejoré el servicio de prevención del fraude", " con alertas más precisas y menos falsos positivos, bajando el fraude por debajo del 2 %."],
                ["Construí una librería compartida de autenticación JWT", " para el squad y simplifiqué la mensajería pasando de Kafka a RabbitMQ en más de 6 servicios."],
                ["Extraje dominios clave del monolito legacy", " (saldo, facturación) hacia microservicios orientados a eventos, y contribuí al BFF de clientes y al panel interno en React/TypeScript."],
                ["Envié eventos de dominio de pagos y pedidos a Databricks", " para analítica y reporting."],
                ["Impulsé el desarrollo asistido por IA en el squad,", " con guías compartidas de arquitectura y skills reutilizables para agentes de código."]] },
    ],
  },
  bosses: {
    title: "Jefes finales", tag: "retos y cómo los resolví", bossLabel: "Jefe",
    challenge: "Reto", strategy: "Estrategia", result: "Resultado", defeated: "DERROTADO",
    list: [
      { id: "outfittery", name: "Migrar 7M de usuarios de Outfittery y sus pagos de Adyen a Stripe", when: "2025",
        challenge: "Integrar dos marcas europeas de moda por suscripción exigía migrar 7M de usuarios y sus pagos recurrentes activos de Adyen a Stripe en más de 10 mercados multidivisa, sin afectar a los cobros en producción.",
        strategy: "Construí soporte multimarca y multidivisa en pagos y facturación detrás de feature flags, de modo que el código llegaba pronto a producción y cada mercado migraba de forma controlada.",
        result: "La migración se completó sin interrupciones y la plataforma unificada da servicio a más de 15M de clientes." },
      { id: "balance", name: "Sacar el saldo de los clientes del monolito sin downtime", when: "2023 – 2024",
        challenge: "El saldo de los clientes (dinero real que se usa en el checkout, promociones, referidos y devoluciones) vivía acoplado dentro del monolito legacy en Vert.x/Groovy. Había que moverlo a un nuevo microservicio CQRS sin downtime ni descuadres.",
        strategy: "Seguí el patrón strangler fig: creé un proxy de saldo en el monolito por el que pasaban todas las llamadas (checkout, promociones, referidos y devoluciones). Un feature flag permitía alternar entre legacy y el nuevo servicio con rollback instantáneo y registro de errores.",
        result: "La plataforma migró al nuevo servicio sin downtime ni descuadres. Una vez estable, eliminé los flags, el proxy y el código legacy." },
      { id: "monorepo", name: "Consolidar 10 microservicios y simplificar la mensajería", when: "2025 – 2026",
        challenge: "Mantener 10 repositorios independientes y dos brokers de eventos (Kafka y RabbitMQ) frenaba las entregas, duplicaba dependencias y aumentaba la carga operativa del equipo.",
        strategy: "Ayudé a unificar los servicios en un monorepo Gradle (Java 25, Spring Boot 4) con una librería compartida de autenticación JWT, CI filtrado por rutas en GitHub Actions y tests E2E con Testcontainers, mientras migraba los publicadores de Kafka a RabbitMQ en más de 6 servicios.",
        result: "Menos fricción diaria, despliegues selectivos más rápidos, una sola plataforma de mensajería y estándares compartidos también para agentes de código." },
    ],
  },
  inventory: {
    title: "Inventario", tag: "inspecciona un objeto", equipped: "★ Equipado", aria: "Categorías de habilidades",
    categories: [
      ["Backend", [
        ["JV", "Java", "Arma principal. De Java 8 a 25, en microservicios y en un gran monolito."],
        ["SB", "Spring Boot", "Spring Boot y Spring Cloud en la mayoría de servicios que he construido desde 2020."],
        ["VX", "Vert.x · Groovy", "El stack de la plataforma legacy. Lo conozco lo bastante bien como para desmontarlo con seguridad."],
        ["ND", "Node.js", "Servicios Express en TypeScript, como una API de tipos de cambio."],
        ["PY", "Python", "Scripts, herramientas y proyectos personales."],
      ]],
      ["Arquitectura", [
        ["HX", "Hexagonal / DDD", "Código de dominio libre de frameworks, con límites claros entre contextos."],
        ["EV", "Orientada a eventos", "Servicios que se comunican con eventos de RabbitMQ y Kafka en lugar de llamadas acopladas."],
        ["CQ", "CQRS", "Caminos de lectura y escritura separados donde el dominio lo necesita."],
        ["MG", "Migración de legacy", "Sacar lógica de un monolito paso a paso sin parar el negocio."],
      ]],
      ["Pagos", [
        ["ST", "Stripe", "Tarjetas, métodos de pago, webhooks y autenticación reforzada (SCA)."],
        ["KL", "Klarna · iDeal", "Métodos de pago locales y de pago aplazado para mercados europeos."],
        ["PP", "PayPal", "Integrado en web y apps móviles."],
        ["FX", "Multidivisa", "Precios, pagos y facturas en varias divisas para nuevos mercados."],
        ["FR", "Prevención del fraude", "Alertas de fraude más precisas y herramientas internas para Atención al Cliente."],
        ["IN", "Facturación", "Generación automática de facturas a partir de pedidos y compras."],
      ]],
      ["Datos", [
        ["MQ", "RabbitMQ · Kafka", "La columna vertebral de mensajería entre servicios."],
        ["DB", "Databricks", "Envío de datos de pagos y pedidos a la plataforma de datos mediante eventos de dominio."],
        ["PG", "PostgreSQL · MySQL", "Bases de datos relacionales, una por servicio, con migraciones de Liquibase."],
        ["AW", "AWS", "SQS y S3."],
      ]],
      ["Frontend", [
        ["RE", "React", "Aplicaciones web y herramientas internas. Esta web también está hecha con React."],
        ["RN", "React Native", "Pantallas de pago compartidas entre web, iOS y Android con Expo."],
        ["TS", "TypeScript", "Ayudé a migrar la librería de UI de pagos a TypeScript."],
        ["NG", "Angular", "Una herramienta interna de gestión del fraude."],
      ]],
      ["Calidad", [
        ["JU", "JUnit · Mockito", "Tests unitarios y de integración como hábito."],
        ["TC", "Testcontainers", "Tests end-to-end contra bases de datos y brokers reales."],
        ["MU", "Mutation testing", "Pitest para comprobar que los tests detectan errores de verdad."],
        ["CI", "CI/CD", "GitHub Actions, Jenkins, Docker y SonarCloud."],
      ]],
      ["IA", [
        ["CC", "Claude Code", "Mi herramienta diaria para diseñar, construir, probar y revisar código."],
        ["AG", "Agentes de código", "Guías de proyecto compartidas y skills reutilizables para que los agentes sigan los estándares del equipo."],
      ]],
      ["Formación", [
        ["AW", "Developing on AWS", "AWS · 2019. Desarrollo de aplicaciones cloud seguras y escalables con el SDK de AWS."],
        ["AE", "AWS Technical Essentials", "AWS · 2019. Servicios principales de AWS y cómo elegirlos según las necesidades del negocio."],
        ["SC", "Smart Cities Week", "UCLL y KU Leuven · 2018. Semana internacional sobre innovación en ciudades inteligentes: datos, energía, seguridad y transporte."],
        ["CE", "CERN Spring Campus", "CERN · 2014. Tres días de sesiones con expertos del CERN sobre informática, trabajo en equipo, seguridad y gestión de proyectos."],
      ]],
    ],
  },
  extras: {
    title: "Extras",
    languagesTitle: "Idiomas",
    languages: [["Español", 5, "Nativo"], ["Euskera", 5, "Nativo"], ["Inglés", 4, "C1"]],
    educationTitle: "Educación",
    degree: "Grado en Ingeniería Informática de Gestión y Sistemas de Información",
    degreeMeta: "UPV/EHU · 2012 – 2018",
    sideTitle: "Misiones secundarias",
    repos: [
      ["android-package-uninstaller", `${GITHUB}/android-package-uninstaller`, "Herramienta en Python para desinstalar paquetes de Android por ADB."],
      ["PythonAI", `${GITHUB}/PythonAI`, "Experimentos de visión artificial con OpenCV."],
      ["Más en GitHub", GITHUB, "Bots de Telegram, Advent of Code y cacharreo con Android."],
    ],
  },
  game: {
    title: "Sky run", tag: "coge las monedas · esquiva los pájaros",
    coins: "Monedas", lives: "Vidas", time: "Tiempo", best: "Récord",
    takeOff: "Despegar", again: "Volar otra vez", restart: "Reiniciar", stop: "Parar",
    aria: "Minijuego Sky run. Pilota el avión con el ratón, el dedo o las flechas para coger monedas y esquivar pájaros.",
    messages: { idle: "LISTO PARA DESPEGAR", landed: "ATERRIZAJE SEGURO", crashed: "¡CHOQUE CON UN PÁJARO!", aborted: "VUELO CANCELADO" },
    howTo: ["PILOTA: RATÓN, DEDO O ↑ ↓", "COGE MONEDAS · ESQUIVA PÁJAROS"],
    collected: n => `${n} MONEDAS RECOGIDAS`,
  },
  contact: {
    title: "Punto de guardado",
    pitch: "¿Buscas un ingeniero backend o full-stack con experiencia en pagos? Hablemos.",
    email: "Email", copy: "Copiar", write: "Escríbeme",
    copied: "Email copiado. ¡Partida guardada!", fallback: "Pulsa Ctrl/Cmd + C para copiar.",
  },
  footer: "Bilbao · Hecho píxel a píxel",
  konami: { on: "TRUCO ACEPTADO · MODO CRT ACTIVADO", off: "MODO CRT DESACTIVADO" },
};

const en: Content = {
  nav: { career: "Career", bosses: "Challenges", skills: "Skills", extras: "Extras", game: "Sky run", contact: "Contact", languages: "Language", sections: "Sections", musicOn: "Play 8-bit background music", musicOff: "Mute 8-bit background music", bgmOn: "ON", bgmOff: "OFF" },
  hero: {
    player: "Player 1",
    classLine: "Class: Software Engineer · Payments & Growth",
    stats: [["Experience", "8+ YRS"], ["Main stack", "JAVA·SPRING"], ["Base", "BILBAO"]],
    intro: [
      ["INTRO 1/3", "I'm a software engineer with 8+ years of experience. For the last 7 I've built payments, invoicing and fraud-prevention systems for Lookiero & Outfittery, a subscription fashion company that operates across Europe."],
      ["INTRO 2/3", "I'm backend-focused (Java, Spring Boot, event-driven microservices) and comfortable on the frontend with React and React Native. I like modernising legacy systems, integrating payment providers and helping a business launch in new markets."],
      ["INTRO 3/3", "I use AI coding assistants every day to design, build and review software. Before all this I programmed a PlayStation 4 game, which is why this page looks the way it does."],
    ],
    next: "NEXT", nextAria: "Next dialog",
    start: "Press start", contact: "Contact",
    toHd: "Click to render in HD", to8bit: "Click to go back to 8-bit",
    avatarAria: "Switch between pixel and photo portrait", photoAlt: "Portrait of Iñaki Sánchez",
  },
  map: {
    title: "Career map", tag: "select a level", hint: "Tip: use ← → to move between levels.",
    level: "Level", current: "current level", cleared: "cleared", aria: "Career levels",
    levels: [
      { id: "moon", node: "1", when: "2016", where: "Moon Factory Studios",
        title: "Game Programmer", meta: "Moon Factory Studios · Madrid · Mar 2016 – Nov 2016",
        items: [["Programmed Rolling BOB", " for PlayStation 4, an award winner at PlayStation Talents."],
                ["", "Built enemies, gameplay mechanics and character controls in Unreal Engine 4 and C++."]] },
      { id: "comala", node: "2", when: "2018", where: "Comalatech",
        title: "Software Engineer", meta: "Comalatech · Bilbao · Jun 2018 – Oct 2019",
        items: [["", "Developed Atlassian Marketplace apps for Confluence and Jira, for Server / Data Center (Java) and Cloud (JavaScript, React, Redux-Saga)."],
                ["", "Delivered new features, performance improvements and bug fixes, and supported customers with configuration issues."]] },
      { id: "xd", node: "3", when: "2019", where: "Lookiero · XD Squad",
        title: "Software Engineer · XD Squad", meta: "Lookiero & Outfittery Group · Bilbao · Oct 2019 – Dec 2019",
        items: [["", "Backend work on the middleware connecting the legacy platform with the payment and anti-fraud services (Groovy, Vert.x)."]] },
      { id: "pay", node: "4", when: "2020", where: "Lookiero · Payments Squad",
        title: "Software Engineer · Payments Squad", meta: "Lookiero & Outfittery Group · Bilbao · Jan 2020 – Dec 2022",
        items: [["Helped split the legacy payments and anti-fraud systems", " into Java/Spring microservices, including a payments service independent of any single provider."],
                ["Built a CQRS customer wallet service", " and batch data migrators with SQL rollback to move historical payment and fraud data without downtime."],
                ["Built an internal fraud-management tool", " for the Customer Service team."],
                ["Developed payment screens for web, iOS and Android", " (React, React Native, TypeScript, GraphQL), including Strong Customer Authentication (SCA) and PayPal."],
                ["Added caching to a Node.js/TypeScript FX rates API", " and maintained squad CI/CD pipelines with Jenkins Job DSL."]] },
      { id: "gf", node: "5", when: "2023 – now", where: "Lookiero · Growth & Finance",
        title: "Software Engineer · Growth & Finance Squad", meta: "Lookiero & Outfittery Group · Bilbao · Jan 2023 – Present",
        items: [["Expanded the payment platform", " with Klarna, iDeal, multi-currency support across 10+ markets and more reliable Stripe webhooks."],
                ["Migrated 7M Outfittery users", " to the Lookiero platform, including their live payments from Adyen to Stripe."],
                ["Helped consolidate 10 microservices into a Gradle monorepo", " (Java 25, Spring Boot 4, PostgreSQL, RabbitMQ) with path-filtered GitHub Actions CI and Testcontainers E2E suites."],
                ["Core developer of the automated invoicing service,", " extracting customer billing addresses from the monolith and building freelance Personal Shopper EU billing workflows."],
                ["Improved the fraud-prevention service", " with more accurate alerts and fewer false positives, bringing fraud below 2%."],
                ["Built a shared JWT authentication library", " reused across squad services, and simplified messaging by migrating from Kafka to RabbitMQ across 6+ services."],
                ["Extracted core domains from the legacy monolith", " (balances, billing) into event-driven microservices, and contributed to the customer BFF and React/TypeScript admin tools."],
                ["Streamed payment and order domain events to Databricks", " for analytics and reporting."],
                ["Promoted AI-assisted development in the squad,", " with shared architecture guidelines and reusable coding-agent skills."]] },
    ],
  },
  bosses: {
    title: "Boss fights", tag: "challenges and how I solved them", bossLabel: "Boss",
    challenge: "Challenge", strategy: "Strategy", result: "Result", defeated: "DEFEATED",
    list: [
      { id: "outfittery", name: "Migrating 7M Outfittery users & payments from Adyen to Stripe", when: "2025",
        challenge: "Integrating two European subscription-fashion brands meant migrating 7M users and live recurring payments from Adyen to Stripe across 10+ multi-currency markets with zero disruption to live checkouts.",
        strategy: "I built multi-brand and multi-currency payment and invoicing flows behind feature flags so changes shipped early to production and each market cut over safely.",
        result: "The migration completed seamlessly, unifying both brands on a single platform serving 15M+ customers." },
      { id: "balance", name: "Extracting customer balances from the monolith with zero downtime", when: "2023 – 2024",
        challenge: "Customer balance (real money used across checkout, promotions, referrals and refunds) was tightly coupled inside the legacy Vert.x/Groovy monolith. It had to move to a new CQRS microservice with zero downtime and zero balance mismatches.",
        strategy: "I used the strangler fig pattern: added a balance proxy inside the monolith routing every caller (checkout, promotions, referrals and refunds) behind a feature flag for gradual rollout, instant rollback and per-operation error logging.",
        result: "The platform switched over with zero downtime or mismatches. Once stable, I removed the flags, the proxy and the legacy code." },
      { id: "monorepo", name: "Consolidating 10 microservices & simplifying event infrastructure", when: "2025 – 2026",
        challenge: "Maintaining 10 separate service repositories and dual message brokers (Kafka and RabbitMQ) slowed delivery, duplicated dependencies and added operational overhead.",
        strategy: "I helped unify the services into a Gradle monorepo (Java 25, Spring Boot 4) with a shared JWT auth library, path-filtered GitHub Actions CI and Testcontainers E2E suites, while decommissioning Kafka publishers in favour of RabbitMQ across 6+ services.",
        result: "Faster selective builds, simpler single-broker messaging, lower maintenance cost and shared standards for both engineers and coding agents." },
    ],
  },
  inventory: {
    title: "Inventory", tag: "inspect an item", equipped: "★ Equipped", aria: "Skill categories",
    categories: [
      ["Backend", [
        ["JV", "Java", "Main weapon. From Java 8 to 25, across microservices and a large monolith."],
        ["SB", "Spring Boot", "Spring Boot and Spring Cloud for most of the services I've built since 2020."],
        ["VX", "Vert.x · Groovy", "The legacy platform's stack. I know it well enough to take it apart safely."],
        ["ND", "Node.js", "Express services in TypeScript, such as an exchange-rates API."],
        ["PY", "Python", "Scripts, tooling and side projects."],
      ]],
      ["Architecture", [
        ["HX", "Hexagonal / DDD", "Domain code kept free of frameworks, with clear boundaries between contexts."],
        ["EV", "Event-driven", "Services talking through RabbitMQ and Kafka events instead of tight calls."],
        ["CQ", "CQRS", "Separate read and write paths where the domain needs it."],
        ["MG", "Legacy migration", "Moving logic out of a monolith step by step without stopping the business."],
      ]],
      ["Payments", [
        ["ST", "Stripe", "Cards, payment methods, webhooks and Strong Customer Authentication."],
        ["KL", "Klarna · iDeal", "Local and buy-now-pay-later payment methods for European markets."],
        ["PP", "PayPal", "Integrated on web and mobile apps."],
        ["FX", "Multi-currency", "Prices, payments and invoices in several currencies for new markets."],
        ["FR", "Fraud prevention", "More accurate fraud alerts, plus internal tooling for the Customer Service team."],
        ["IN", "Invoicing", "Automatic invoice generation driven by orders and purchases."],
      ]],
      ["Data", [
        ["MQ", "RabbitMQ · Kafka", "Messaging backbone between services."],
        ["DB", "Databricks", "Feeding payment and order data to the data platform through domain events."],
        ["PG", "PostgreSQL · MySQL", "Relational databases, one per service, with Liquibase migrations."],
        ["AW", "AWS", "SQS and S3."],
      ]],
      ["Frontend", [
        ["RE", "React", "Web apps and internal tools. This site is built with it too."],
        ["RN", "React Native", "Payment screens shared across web, iOS and Android with Expo."],
        ["TS", "TypeScript", "Helped migrate the payments UI library to TypeScript."],
        ["NG", "Angular", "An internal fraud-management tool."],
      ]],
      ["Quality", [
        ["JU", "JUnit · Mockito", "Unit and integration tests as a habit."],
        ["TC", "Testcontainers", "End-to-end tests against real databases and brokers."],
        ["MU", "Mutation testing", "Pitest to check that tests actually catch bugs."],
        ["CI", "CI/CD", "GitHub Actions, Jenkins, Docker and SonarCloud."],
      ]],
      ["AI", [
        ["CC", "Claude Code", "Daily driver for designing, building, testing and reviewing code."],
        ["AG", "Coding agents", "Shared project guidelines and reusable skills so agents follow the team's standards."],
      ]],
      ["Training", [
        ["AW", "Developing on AWS", "AWS · 2019. Building secure, scalable cloud applications with the AWS SDK."],
        ["AE", "AWS Technical Essentials", "AWS · 2019. Core AWS services and how to choose them for a business need."],
        ["SC", "Smart Cities Week", "UCLL & KU Leuven · 2018. International week on smart-city innovation: data, energy, security and transport."],
        ["CE", "CERN Spring Campus", "CERN · 2014. Three days of sessions with CERN experts on IT, teamwork, security and project management."],
      ]],
    ],
  },
  extras: {
    title: "Extras",
    languagesTitle: "Languages",
    languages: [["Spanish", 5, "Native"], ["Basque", 5, "Native"], ["English", 4, "C1"]],
    educationTitle: "Education",
    degree: "BSc in Computer Management & Information Systems Engineering",
    degreeMeta: "UPV/EHU · 2012 – 2018",
    sideTitle: "Side quests",
    repos: [
      ["android-package-uninstaller", `${GITHUB}/android-package-uninstaller`, "Python tool to remove Android packages over ADB."],
      ["PythonAI", `${GITHUB}/PythonAI`, "Computer-vision experiments with OpenCV."],
      ["More on GitHub", GITHUB, "Telegram bots, Advent of Code, Android tinkering."],
    ],
  },
  game: {
    title: "Sky run", tag: "grab the coins · dodge the birds",
    coins: "Coins", lives: "Lives", time: "Time", best: "Best",
    takeOff: "Take off", again: "Fly again", restart: "Restart", stop: "Stop",
    aria: "Sky run mini-game. Steer the plane with the mouse, a finger or the arrow keys to collect coins and avoid birds.",
    messages: { idle: "READY FOR TAKE-OFF", landed: "SAFE LANDING", crashed: "BIRD STRIKE!", aborted: "FLIGHT ABORTED" },
    howTo: ["STEER: MOUSE, FINGER OR ↑ ↓", "GRAB COINS · DODGE BIRDS"],
    collected: n => `${n} COINS COLLECTED`,
  },
  contact: {
    title: "Save point",
    pitch: "Looking for a backend or full-stack engineer who knows payments? I'd be happy to talk.",
    email: "Email", copy: "Copy", write: "Write me",
    copied: "Email copied. Game saved!", fallback: "Press Ctrl/Cmd + C to copy.",
  },
  footer: "Bilbao · Built pixel by pixel",
  konami: { on: "CHEAT CODE ACCEPTED · CRT MODE ON", off: "CRT MODE OFF" },
};

export const CONTENT: Record<Lang, Content> = { es, en };
