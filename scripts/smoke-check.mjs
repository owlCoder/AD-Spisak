const targets = [
  { name: "glavni API", baseUrl: process.env.API_URL },
  { name: "Excel servis", baseUrl: process.env.XLSX_API_URL },
];

const missing = targets.filter(({ baseUrl }) => !baseUrl);
if (missing.length > 0) {
  console.error("Nedostaju promenljive okruženja:");
  console.error("  API_URL=https://<api-host>");
  console.error("  XLSX_API_URL=https://<xlsx-host>");
  process.exit(1);
}

let failed = false;

for (const target of targets) {
  const url = `${target.baseUrl.replace(/\/$/, "")}/api/health`;

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
    const body = await response.text();

    if (!response.ok) {
      failed = true;
      console.error(`✗ ${target.name}: HTTP ${response.status} — ${url}`);
      continue;
    }

    console.log(`✓ ${target.name}: ${body}`);
  } catch (error) {
    failed = true;
    console.error(`✗ ${target.name}: ${error.message} — ${url}`);
  }
}

process.exit(failed ? 1 : 0);
