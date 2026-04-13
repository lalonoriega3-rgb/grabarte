import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";
import { execSync } from "child_process";
import Anthropic from "@anthropic-ai/sdk";
import { JWT } from "google-auth-library";

// ─── 1. Load .env.local (ts-node doesn't load it automatically) ───────────────

function loadEnvLocal(): void {
  const envPath = path.join(__dirname, "../.env.local");
  if (!fs.existsSync(envPath)) {
    console.error("❌ No se encontró .env.local");
    process.exit(1);
  }
  const raw = fs.readFileSync(envPath, "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvLocal();

// ─── 2. SDK clients (after env is loaded) ────────────────────────────────────

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

// ─── 3. Constants ─────────────────────────────────────────────────────────────

const BASE_URL = "https://grabarte.shop";
const PROJECT_ROOT = path.join(__dirname, "..");

const IMAGES = [
  { name: "cubo-base-led.jpg", path: "/cubo-base-led.jpg" },
  { name: "cubo-gato.jpg",     path: "/cubo-gato.jpg" },
  { name: "cubo-pareja.jpg",   path: "/cubo-pareja.jpg" },
  { name: "cubo-perro.jpg",    path: "/cubo-perro.jpg" },
  { name: "og-image.jpg",      path: "/og-image.jpg" },
];

// ─── 4. CLI prompt helper ─────────────────────────────────────────────────────

function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// ─── 5. Image selection ───────────────────────────────────────────────────────

async function selectImage(): Promise<string> {
  console.log("\nImágenes disponibles:");
  IMAGES.forEach((img, i) => {
    console.log(`  ${i + 1}. ${img.name}`);
  });

  let choice = 0;
  while (choice < 1 || choice > IMAGES.length) {
    const raw = await prompt(`\nElige imagen (1-${IMAGES.length}): `);
    choice = parseInt(raw, 10);
    if (isNaN(choice) || choice < 1 || choice > IMAGES.length) {
      console.log(`  Por favor elige un número entre 1 y ${IMAGES.length}`);
      choice = 0;
    }
  }

  const selected = IMAGES[choice - 1];
  return `${BASE_URL}${selected.path}`;
}

// ─── 6. Parse frontmatter fields from MDX string ─────────────────────────────

function parseFrontmatter(mdx: string): Record<string, string> {
  const match = mdx.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const result: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const eq = line.indexOf(":");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    const val = line.slice(eq + 1).trim();
    result[key] = val;
  }
  return result;
}

// ─── 7. Generate MDX with Claude ─────────────────────────────────────────────

async function generateMDX(
  topic: string,
  imageUrl: string
): Promise<{ mdx: string; slug: string; frontmatter: Record<string, string>; wordCount: number }> {
  process.stdout.write("⏳ Generando artículo con Claude AI...\n");

  const today = new Date().toISOString().split("T")[0];

  const systemPrompt =
    "Eres un redactor experto en SEO para Grabarte, tienda mexicana de cubos de cristal con grabado láser 3D personalizados. Tu audiencia es mexicana. Escribes en español mexicano natural, cálido y cercano. Siempre terminas los artículos con un CTA hacia grabarte.shop.";

  const userPrompt = `Escribe un artículo de blog completo en MDX sobre el siguiente tema: "${topic}"

El artículo debe:
1. Tener entre 800 y 1200 palabras de contenido real (sin contar el frontmatter)
2. Estar en español mexicano
3. Relacionar el tema con regalos personalizados y/o cubos de cristal con grabado láser 3D de Grabarte
4. Terminar con un CTA que dirija al lector a grabarte.shop
5. Usar markdown con ## para secciones principales y ### para subsecciones, **negritas** para énfasis
6. Tener una estructura clara: introducción, secciones con ##, CTA final

IMPORTANTE: Devuelve ÚNICAMENTE el archivo MDX completo, empezando con el bloque frontmatter exactamente así (reemplaza los valores con los apropiados):

---
title: [Título SEO atractivo, máximo 70 caracteres]
date: ${today}
excerpt: [Descripción SEO de 150-160 caracteres que resuma el artículo e incluya keyword principal]
category: [Una de: Regalos, Bodas, Aniversarios, Corporativo, Cumpleaños]
coverImage: ${imageUrl}
keywords: [keyword1, keyword2, keyword3, keyword4, keyword5]
author: Grabarte
readTime: [X min]
slug: [slug-en-kebab-case-sin-acentos-ni-caracteres-especiales]
---

[Contenido del artículo aquí — no repitas el título como h1]

No incluyas texto antes ni después del archivo MDX. No uses bloques de código para envolver el output.`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 2048,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  let mdx = (message.content[0] as { type: string; text: string }).text;

  // Strip accidental code fences
  mdx = mdx.replace(/^```(?:mdx|markdown)?\n?/, "").replace(/\n?```\s*$/, "");

  // Extract slug
  const slugMatch = mdx.match(/^slug:\s*(.+)$/m);
  const slug = slugMatch ? slugMatch[1].trim() : topic.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  // Parse frontmatter
  const frontmatter = parseFrontmatter(mdx);

  // Count words in content (strip frontmatter block)
  const contentOnly = mdx.replace(/^---[\s\S]*?---\n/, "");
  const wordCount = contentOnly.trim().split(/\s+/).length;

  console.log(`✅ Artículo generado: ${wordCount.toLocaleString()} palabras\n`);
  return { mdx, slug, frontmatter, wordCount };
}

// ─── 8. Save MDX file ─────────────────────────────────────────────────────────

function saveMDXFile(slug: string, mdx: string): void {
  process.stdout.write("⏳ Guardando archivo MDX...\n");
  const blogDir = path.join(PROJECT_ROOT, "content/blog");
  if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });
  fs.writeFileSync(path.join(blogDir, `${slug}.mdx`), mdx, "utf8");
  console.log(`✅ Guardado: content/blog/${slug}.mdx\n`);
}

// ─── 9. Update postMeta registry in page.tsx ─────────────────────────────────

function updatePostMetaRegistry(slug: string, frontmatter: Record<string, string>): void {
  process.stdout.write("⏳ Actualizando registro de artículos...\n");

  const pagePath = path.join(PROJECT_ROOT, "app/blog/[slug]/page.tsx");
  let content = fs.readFileSync(pagePath, "utf8");

  // Format date: "13 Abr 2026"
  const dateISO = frontmatter.date || new Date().toISOString().split("T")[0];
  const dateObj = new Date(`${dateISO}T12:00:00`);
  const dateFormatted = dateObj.toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Parse keywords array from frontmatter string "[kw1, kw2, ...]"
  const kwRaw = (frontmatter.keywords || "").replace(/^\[|\]$/g, "");
  const keywords = kwRaw
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean)
    .map((k) => `      "${k}"`)
    .join(",\n");

  const description = (frontmatter.excerpt || frontmatter.title || "").replace(/"/g, '\\"');
  const title = (frontmatter.title || "").replace(/"/g, '\\"');
  const readTime = frontmatter.readTime || "5 min";
  const category = frontmatter.category || "Regalos";

  const newEntry = `  "${slug}": {
    title: "${title}",
    description: "${description}",
    date: "${dateFormatted}",
    dateISO: "${dateISO}",
    readTime: "${readTime}",
    category: "${category}",
    keywords: [
${keywords},
    ],
  },`;

  // Insert before the closing `};` of the postMeta object
  const updated = content.replace(
    /(const postMeta[\s\S]*?)(\n};)/,
    `$1\n${newEntry}\n$2`
  );

  if (updated === content) {
    throw new Error(
      "No se pudo actualizar postMeta en page.tsx. Agrega la entrada manualmente."
    );
  }

  fs.writeFileSync(pagePath, updated, "utf8");
  console.log(`✅ postMeta actualizado en app/blog/[slug]/page.tsx\n`);
}

// ─── 10. Git add, commit, push ────────────────────────────────────────────────

function gitPublish(slug: string, title: string): void {
  process.stdout.write("⏳ Publicando en GitHub...\n");

  const mdxFile = `content/blog/${slug}.mdx`;
  const pageTsx = "app/blog/[slug]/page.tsx";

  execSync(`git add "${mdxFile}" '${pageTsx}'`, { cwd: PROJECT_ROOT, stdio: "pipe" });
  const commitMsg = `blog: ${title}`;
  const result = execSync(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`, {
    cwd: PROJECT_ROOT,
    stdio: "pipe",
  });
  const commitLine = result.toString().split("\n")[0];
  const shaMatch = commitLine.match(/\[[\w/]+ ([a-f0-9]+)\]/);
  const sha = shaMatch ? shaMatch[1] : "";

  execSync("git push origin main", { cwd: PROJECT_ROOT, stdio: "pipe" });

  console.log(`✅ Push exitoso${sha ? `: commit ${sha}` : ""}\n`);
}

// ─── 11. Poll Vercel deploy ───────────────────────────────────────────────────

async function waitForVercelDeploy(): Promise<void> {
  process.stdout.write("⏳ Esperando deploy en Vercel...\n");

  const token = process.env.VERCEL_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;

  if (!token || !projectId) {
    console.log("⚠️  VERCEL_TOKEN o VERCEL_PROJECT_ID no configurados — saltando paso\n");
    return;
  }

  const url = `https://api.vercel.com/v6/deployments?projectId=${projectId}&limit=1`;
  const TIMEOUT_MS = 3 * 60 * 1000;
  const POLL_MS = 5000;
  const start = Date.now();
  let elapsed = 0;

  while (elapsed < TIMEOUT_MS) {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      throw new Error(`Vercel API error: ${res.status} ${await res.text()}`);
    }

    const data = (await res.json()) as {
      deployments: Array<{ state: string; url: string }>;
    };

    const deploy = data.deployments?.[0];
    const state = (deploy?.state || "").toUpperCase();

    if (state === "READY") {
      console.log(`✅ Deploy completado en ${Math.round(elapsed / 1000)}s\n`);
      return;
    }

    if (state === "ERROR" || state === "CANCELED") {
      throw new Error(`Deploy fallido con estado: ${state}`);
    }

    process.stdout.write(`   Estado: ${state || "PENDING"} — esperando...\r`);
    await new Promise((r) => setTimeout(r, POLL_MS));
    elapsed = Date.now() - start;
  }

  throw new Error("Timeout: el deploy tardó más de 3 minutos");
}

// ─── 12. Google Indexing API ──────────────────────────────────────────────────

async function notifyGoogleIndexing(slug: string): Promise<void> {
  process.stdout.write("⏳ Notificando a Google Indexing API...\n");

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!email || !rawKey) {
    console.log("⚠️  Google credentials no configuradas — saltando paso\n");
    return;
  }

  // .env.local stores the private key with literal \n sequences
  const privateKey = rawKey.replace(/^"([\s\S]*)"$/, "$1").replace(/\\n/g, "\n");

  const jwtClient = new JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/indexing"],
  });

  const tokens = await jwtClient.authorize();
  const accessToken = tokens.access_token;

  const articleUrl = `${BASE_URL}/blog/${slug}`;

  const res = await fetch(
    "https://indexing.googleapis.com/v3/urlNotifications:publish",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: articleUrl, type: "URL_UPDATED" }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google Indexing API error: ${res.status} — ${errText}`);
  }

  console.log(`✅ URL indexada: ${articleUrl}\n`);
}

// ─── 13. Main orchestrator ────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log("\n✦ Blog Agent — Grabarte\n");
  console.log("─".repeat(40));

  const startTime = Date.now();

  // Step 1: inputs
  const topic = await prompt("¿Cuál es el tema del artículo? ");
  if (!topic) {
    console.error("❌ El tema no puede estar vacío.");
    process.exit(1);
  }

  // Step 2: image selection
  const imageUrl = await selectImage();
  console.log(`\n   Imagen seleccionada: ${imageUrl}\n`);
  console.log("─".repeat(40) + "\n");

  try {
    // Step 3: generate MDX
    const { mdx, slug, frontmatter } = await generateMDX(topic, imageUrl);

    // Step 4: save file
    saveMDXFile(slug, mdx);

    // Step 5: update postMeta
    updatePostMetaRegistry(slug, frontmatter);

    // Step 6: git publish
    gitPublish(slug, frontmatter.title || topic);

    // Step 7: wait for Vercel
    await waitForVercelDeploy();

    // Step 8: Google Indexing
    await notifyGoogleIndexing(slug);

    const elapsed = Math.round((Date.now() - startTime) / 1000);
    const articleUrl = `${BASE_URL}/blog/${slug}`;

    console.log("━".repeat(40));
    console.log("🎉 Blog publicado exitosamente");
    console.log(`📝 Título:  ${frontmatter.title || topic}`);
    console.log(`🔗 URL:     ${articleUrl}`);
    console.log(`📸 Imagen:  ${imageUrl}`);
    console.log(`⏱  Tiempo:  ${elapsed}s`);
    console.log("━".repeat(40) + "\n");
  } catch (err) {
    console.error("\n❌ Error en el blog agent:");
    console.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
}

main();
