export const EMAIL = "inaki19san@gmail.com";
export const GITHUB = "https://github.com/queky";

export const INTRO: [string, string][] = [
  ["INTRO 1/3", "I'm a software engineer with 8+ years of experience. For the last 7 I've built payments, invoicing and fraud-prevention systems for Lookiero & Outfittery, a subscription fashion company that operates across Europe."],
  ["INTRO 2/3", "I'm backend-focused (Java, Spring Boot, event-driven microservices) and comfortable on the frontend with React and React Native. I like modernising legacy systems, integrating payment providers and helping a business launch in new markets."],
  ["INTRO 3/3", "I use AI coding assistants every day to design, build and review software. Before all this I programmed a PlayStation 4 game, which is why this page looks the way it does."],
];

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

export const LEVELS: Level[] = [
  { id: "moon", node: "1", when: "2016", where: "Moon Factory Studios",
    title: "Game Programmer", meta: "Moon Factory Studios · Madrid · Mar 2016 – Nov 2016",
    items: [["Programmed Rolling BOB", " for PlayStation 4, an award winner at PlayStation Talents."],
            ["", "Built enemies, gameplay mechanics and character controls in Unreal Engine 4 and C++."]] },
  { id: "comala", node: "2", when: "2018", where: "Comalatech",
    title: "Software Engineer", meta: "Comalatech · Bilbao · Jun 2018 – Oct 2019",
    items: [["", "Developed Atlassian Marketplace apps for Confluence and Jira, for Server / Data Center (Java) and Cloud (JavaScript, React)."],
            ["", "Delivered new features, performance improvements and bug fixes, and supported customers with configuration issues."]] },
  { id: "xd", node: "3", when: "2019", where: "Lookiero · XD Squad",
    title: "Software Engineer · XD Squad", meta: "Lookiero & Outfittery Group · Bilbao · Oct 2019 – Dec 2019",
    items: [["", "Backend work on the middleware connecting the legacy platform with the payment and anti-fraud services (Groovy, Vert.x)."]] },
  { id: "pay", node: "4", when: "2020", where: "Lookiero · Payments Squad",
    title: "Software Engineer · Payments Squad", meta: "Lookiero & Outfittery Group · Bilbao · Jan 2020 – Dec 2022",
    items: [["Helped split the legacy payments and anti-fraud systems", " into Java/Spring microservices, including a payments service independent of any single provider."],
            ["Built a customer balance (wallet) service", " and migrated the platform to use it."],
            ["Built an internal fraud-management tool", " for the Customer Service team, and migrated historical data into the new services."],
            ["Developed payment screens for web, iOS and Android", " (React, React Native), including Strong Customer Authentication and PayPal."],
            ["Published payment data to Databricks", " through domain events for analytics and reporting."]] },
  { id: "gf", node: "5", when: "2023 – now", where: "Lookiero · Growth & Finance",
    title: "Software Engineer · Growth & Finance Squad", meta: "Lookiero & Outfittery Group · Bilbao · Jan 2023 – Present",
    items: [["Expanded the payment platform", " with new payment methods (Klarna, iDeal) and more reliable payment-status updates from Stripe."],
            ["Made payments and invoicing multi-currency,", " allowing the business to launch in new markets."],
            ["One of the main developers of the invoicing service,", " which generates customer invoices automatically from orders and purchases."],
            ["Improved the fraud-prevention service", " to make its alerts more accurate and reduce false positives."],
            ["Built a shared authentication and authorisation library", " reused across the squad's microservices."],
            ["Gradually moved business logic out of the legacy monolith", " into event-driven microservices."],
            ["Streamed payment and order data into Databricks", " through domain events for analytics and reporting."],
            ["Helped bring AI-assisted development into the squad,", " with shared guidelines so coding agents follow our architecture and testing standards."]] },
];

/** Inventory item: [icon, name, description]. */
export type Item = [icon: string, name: string, description: string];

export const INVENTORY: Record<string, Item[]> = {
  Backend: [
    ["JV", "Java", "Main weapon. From Java 8 to 25, across microservices and a large monolith."],
    ["SB", "Spring Boot", "Spring Boot and Spring Cloud for most of the services I've built since 2020."],
    ["VX", "Vert.x · Groovy", "The legacy platform's stack. I know it well enough to take it apart safely."],
    ["ND", "Node.js", "Express services in TypeScript, such as an exchange-rates API."],
    ["PY", "Python", "Scripts, tooling and side projects."],
  ],
  Architecture: [
    ["HX", "Hexagonal / DDD", "Domain code kept free of frameworks, with clear boundaries between contexts."],
    ["EV", "Event-driven", "Services talking through RabbitMQ and Kafka events instead of tight calls."],
    ["CQ", "CQRS", "Separate read and write paths where the domain needs it."],
    ["MG", "Legacy migration", "Moving logic out of a monolith step by step without stopping the business."],
  ],
  Payments: [
    ["ST", "Stripe", "Cards, payment methods, webhooks and Strong Customer Authentication."],
    ["KL", "Klarna · iDeal", "Local and buy-now-pay-later payment methods for European markets."],
    ["PP", "PayPal", "Integrated on web and mobile apps."],
    ["FX", "Multi-currency", "Prices, payments and invoices in several currencies for new markets."],
    ["FR", "Fraud prevention", "More accurate fraud alerts, plus internal tooling for the Customer Service team."],
    ["IN", "Invoicing", "Automatic invoice generation driven by orders and purchases."],
  ],
  Data: [
    ["MQ", "RabbitMQ · Kafka", "Messaging backbone between services."],
    ["DB", "Databricks", "Feeding payment and order data to the data platform through domain events."],
    ["PG", "PostgreSQL · MySQL", "Relational databases, one per service, with Liquibase migrations."],
    ["AW", "AWS", "SQS and S3, plus the AWS developer courses."],
  ],
  Frontend: [
    ["RE", "React", "Web apps and internal tools. This site is built with it too."],
    ["RN", "React Native", "Payment screens shared across web, iOS and Android with Expo."],
    ["TS", "TypeScript", "Helped migrate the payments UI library to TypeScript."],
    ["NG", "Angular", "An internal fraud-management tool."],
  ],
  Quality: [
    ["JU", "JUnit · Mockito", "Unit and integration tests as a habit."],
    ["TC", "Testcontainers", "End-to-end tests against real databases and brokers."],
    ["MU", "Mutation testing", "Pitest to check that tests actually catch bugs."],
    ["CI", "CI/CD", "GitHub Actions, Jenkins, Docker and SonarCloud."],
  ],
  AI: [
    ["CC", "Claude Code", "Daily driver for designing, building, testing and reviewing code."],
    ["AG", "Coding agents", "Shared project guidelines and reusable skills so agents follow the team's standards."],
  ],
};
