const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Load .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const eqIndex = line.indexOf('=');
    if (eqIndex > 0) {
      const key = line.slice(0, eqIndex).trim();
      const value = line.slice(eqIndex + 1).trim();
      if (key && !process.env[key]) {
        process.env[key] = value;
      }
    }
  }
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY || OPENAI_API_KEY === 'tu_api_key_aqui') {
  console.error('\n❌ Configura OPENAI_API_KEY en .env.local antes de continuar.\n');
  process.exit(1);
}

function slugify(keyword) {
  return keyword
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[¿?¡!]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Batch size: how many NEW articles to generate per run (default 5, override with --batch N)
const batchArg = process.argv.indexOf('--batch');
const BATCH_SIZE = batchArg !== -1 ? parseInt(process.argv[batchArg + 1], 10) : 5;

const SYSTEM_PROMPT = `Eres el redactor de contenido de WeblynMX, un estudio digital premium en CDMX.

VOZ DE MARCA:
- Directo, sin relleno, orientado a resultados
- Oraciones cortas y contundentes
- Hablas del problema del cliente antes que de WeblynMX
- Nunca dices: "somos apasionados", "soluciones integrales", "años de experiencia"
- Sin signos de exclamación
- "Tu negocio" aparece más que "nosotros"
- Usas datos reales y ejemplos concretos cuando existen

CLIENTE IDEAL: dueño de negocio en México que ya vende pero se ve amateur digitalmente. Tiene entre 30-55 años, opera en CDMX o ciudades principales, entiende que su imagen digital importa pero no sabe exactamente qué hacer.

LONGITUD: el artículo debe tener aproximadamente 1500 palabras. Desarrolla cada sección con profundidad real, ejemplos concretos y contexto para México.

ESTRUCTURA DEL ARTÍCULO:
1) Frontmatter MDX con: title, description, date, slug, ogDescription
2) Título H1 con la keyword
3) Intro de 3-4 líneas que golpee el problema real sin rodeos
4) 5-6 secciones con H2, cada una con al menos 2-3 párrafos desarrollados
5) Usa listas cuando aporten claridad, no para rellenar
6) Incluye datos concretos, precios reales en MXN cuando aplique, ejemplos de negocios mexicanos
7) CTA final: "¿Tu negocio necesita esto? Comenzamos con una conversación." con link a weblynmx.com/diagnostico

FORMATO: entrega directo en MDX válido con frontmatter. Sin bloques de código envolviendo el resultado.`;

async function generateArticle(keyword) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-5.4-mini',
      max_completion_tokens: 4000,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Escribe un artículo de aproximadamente 1500 palabras optimizado para la keyword: ${keyword}` },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API ${response.status}: ${error}`);
  }

  const data = await response.json();
  let content = data.choices[0].message.content;
  // Strip markdown code fences if GPT wraps the output
  content = content.replace(/^```(?:mdx)?\r?\n/, '').replace(/\r?\n```\s*$/, '').trim();
  return content;
}

async function main() {
  const csvPath = path.join(__dirname, 'keywords.csv');
  const keywords = fs
    .readFileSync(csvPath, 'utf8')
    .split('\n')
    .map(k => k.trim())
    .filter(k => k.length > 0);

  const blogDir = path.join(__dirname, '..', 'content', 'blog');
  fs.mkdirSync(blogDir, { recursive: true });

  console.log(`\nWeblynMX Blog Generator — batch de ${BATCH_SIZE} artículos (~1500 palabras c/u)\n`);

  let generated = 0;
  let skipped = 0;
  let errors = 0;

  for (let i = 0; i < keywords.length; i++) {
    if (generated >= BATCH_SIZE) {
      console.log(`\nBatch completado (${BATCH_SIZE} artículos). Corre el script de nuevo para continuar.`);
      break;
    }

    const keyword = keywords[i];
    const slug = slugify(keyword);
    const filePath = path.join(blogDir, `${slug}.mdx`);

    if (fs.existsSync(filePath)) {
      console.log(`Saltando: ${keyword} (ya existe)`);
      skipped++;
      continue;
    }

    process.stdout.write(`Generando: ${keyword}... `);

    try {
      const content = await generateArticle(keyword);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('✓');
      generated++;
    } catch (err) {
      console.log(`✗  ${err.message}`);
      errors++;
    }

    // Wait 2s between calls (skip on last item)
    if (i < keywords.length - 1) {
      await sleep(2000);
    }
  }

  console.log(`\nResumen: ${generated} generados, ${skipped} saltados, ${errors} errores\n`);

  if (generated > 0) {
    console.log('Publicando en Vercel...');
    try {
      const root = path.join(__dirname, '..');
      execSync('git add content/blog/', { stdio: 'inherit', cwd: root });
      execSync(
        'git commit -m "blog: agregar artículos generados automáticamente"',
        { stdio: 'inherit', cwd: root }
      );
      execSync('git push', { stdio: 'inherit', cwd: root });
      console.log('\n✓ Artículos publicados. Vercel deployará en 1-2 minutos.');
    } catch (err) {
      console.error('\n✗ Error al publicar:', err.message);
    }
  } else {
    console.log('No hay artículos nuevos para publicar.');
  }
}

main().catch(err => {
  console.error('Error fatal:', err.message);
  process.exit(1);
});
