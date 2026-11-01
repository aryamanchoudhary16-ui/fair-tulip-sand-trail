import type { FileChange, Patch } from "./types";

function src(value: string): string {
  const raw = value.replace(/^\n/, "").replace(/\s+$/, "");
  const lines = raw.split("\n");
  const widths = lines.filter((line) => line.trim().length > 0).map((line) => line.match(/^ */)?.[0].length ?? 0);
  const cut = widths.length ? Math.min(...widths) : 0;
  return lines.map((line) => (line.trim().length === 0 ? "" : line.slice(cut))).join("\n");
}

function files(entries: [string, string, string][]): FileChange[] {
  return entries.map(([path, before, after]) => ({ path, before: src(before), after: src(after) }));
}

export const EXPERIMENT = {
  id: "fixture-py-2026",
  title: "AI-assisted vs human patches (Python pilot)",
  creator: "student researcher",
  createdAt: "2026-09-06T09:00:00.000Z",
  language: "python",
  dateWindow: ["2026-01-01", "2026-08-31"] as const,
  sampleCap: 200,
  notes: "Bundled offline-replay fixture. Metrics are computed in the browser from these diffs.",
  toolVersion: "1.0.0-model",
  analysers: [
    { name: "quality-heuristic", version: "1.0.0" },
    { name: "security-heuristic", version: "1.0.0" },
    { name: "test-presence", version: "1.0.0" },
  ],
};

export const COLLECTION_LOG = [
  "cache hit: github/pulls for 6 public repositories (offline replay of cache/)",
  "accepted public repositories in owner/name form",
  "filter: language=python, date window 2026-01-01..2026-08-31, files touched 1..12",
  "skipped acme/internal-billing — private or inaccessible (HTTP 404)",
  "sample cap 200 not reached; stored 23 pull requests",
  "collection log written; a later audit can read it without the network",
];

export const PATCHES: Patch[] = [
  {
    id: "harbor--auth-helpers--184",
    repo: "harbor/auth-helpers",
    source: "pr",
    externalId: "184",
    title: "Compare tokens in constant time",
    author: "mira",
    createdAt: "2026-02-03T11:12:00.000Z",
    seedLabel: "human",
    seedNotes: "Author describes a review comment about == on secrets. Test added.",
    rater2: "human",
    files: files([
      [
        "auth_helpers/tokens.py",
        `
        def tokens_match(given, expected):
            return given == expected
        `,
        `
        import hmac


        def tokens_match(given: str, expected: str) -> bool:
            if not given or not expected:
                return False
            return hmac.compare_digest(given.encode(), expected.encode())
        `,
      ],
      [
        "tests/test_tokens.py",
        ``,
        `
        from auth_helpers.tokens import tokens_match


        def test_mismatch():
            assert tokens_match("a", "b") is False


        def test_match():
            assert tokens_match("same", "same") is True
        `,
      ],
    ]),
  },
  {
    id: "harbor--auth-helpers--191",
    repo: "harbor/auth-helpers",
    source: "pr",
    externalId: "191",
    title: "Add an admin token fallback",
    author: "devpatil",
    createdAt: "2026-02-18T08:04:00.000Z",
    seedLabel: "ai-assisted",
    seedNotes: "PR body says the snippet was drafted with Copilot and then lightly edited.",
    rater2: "mixed",
    hint: "PR body mentions Copilot.",
    files: files([
      [
        "auth_helpers/fallback.py",
        `
        import os


        def admin_token() -> str:
            return os.environ["ADMIN_TOKEN"]
        `,
        `
        import os


        def admin_token() -> str:
            api_key = "sk-live-please-rotate"
            return os.environ.get("ADMIN_TOKEN", api_key)
        `,
      ],
    ]),
  },
  {
    id: "harbor--auth-helpers--203",
    repo: "harbor/auth-helpers",
    source: "pr",
    externalId: "203",
    title: "Split session expiry into a helper",
    author: "sora",
    createdAt: "2026-03-02T15:40:00.000Z",
    seedLabel: "mixed",
    seedNotes: "Refactor looks hand-written. The TODO reads like an assistant leftover.",
    rater2: "human",
    files: files([
      [
        "auth_helpers/session.py",
        `
        def session_open(now: int, exp: int) -> bool:
            return now < exp
        `,
        `
        def session_open(now: int, exp: int, skew: int = 30) -> bool:
            # TODO: confirm the skew default with the auth reviewer
            if exp <= 0:
                return False
            return now + skew < exp
        `,
      ],
      [
        "tests/test_session.py",
        ``,
        `
        from auth_helpers.session import session_open


        def test_expired():
            assert session_open(100, 90) is False
        `,
      ],
    ]),
  },
  {
    id: "kiln--config-kit--42",
    repo: "kiln/config-kit",
    source: "pr",
    externalId: "42",
    title: "Read typed environment values",
    author: "nayak",
    createdAt: "2026-01-21T09:18:00.000Z",
    seedLabel: "human",
    seedNotes: "Small parser with a test. No assistant mention.",
    rater2: "human",
    files: files([
      [
        "configkit/env.py",
        `
        import os
        `,
        `
        import os


        def read_int(name: str, default: int) -> int:
            raw = os.environ.get(name)
            if raw is None or raw == "":
                return default
            return int(raw)
        `,
      ],
      [
        "tests/test_env.py",
        ``,
        `
        from configkit.env import read_int


        def test_default_when_missing(monkeypatch):
            monkeypatch.delenv("PORT", raising=False)
            assert read_int("PORT", 8000) == 8000
        `,
      ],
    ]),
  },
  {
    id: "kiln--config-kit--55",
    repo: "kiln/config-kit",
    source: "pr",
    externalId: "55",
    title: "Load YAML config and evaluate expressions",
    author: "leung",
    createdAt: "2026-03-11T12:01:00.000Z",
    seedLabel: "ai-assisted",
    seedNotes: "Commit message: 'chatgpt wrote the loader, I only renamed the function'.",
    rater2: "ai-assisted",
    hint: "Commit message mentions ChatGPT.",
    files: files([
      [
        "configkit/load.py",
        `
        def load_settings(text: str) -> dict:
            return {"raw": text}
        `,
        `
        import yaml


        def load_settings(text: str) -> dict:
            data = yaml.load(text)
            expr = data.get("expr")
            if expr:
                data["value"] = eval(expr, {}, {})
            return data
        `,
      ],
    ]),
  },
  {
    id: "kiln--config-kit--61",
    repo: "kiln/config-kit",
    source: "pr",
    externalId: "61",
    title: "Clarify the loader comment",
    author: "berg",
    createdAt: "2026-03-19T16:22:00.000Z",
    seedLabel: "unknown",
    seedNotes: "Comment-only. No provenance signal either way.",
    rater2: "unknown",
    files: files([
      [
        "configkit/load.py",
        `
        # read settings from a string
        def load_settings(text: str) -> dict:
            return {"raw": text}
        `,
        `
        # Read settings from a caller-supplied string. Does not touch the network.
        def load_settings(text: str) -> dict:
            return {"raw": text}
        `,
      ],
    ]),
  },
  {
    id: "northwind--ledger-core--310",
    repo: "northwind/ledger-core",
    source: "pr",
    externalId: "310",
    title: "Round invoice totals half away from zero",
    author: "okonkwo",
    createdAt: "2026-04-02T10:11:00.000Z",
    seedLabel: "human",
    seedNotes: "Decimal change with a regression test. Review thread is ordinary.",
    rater2: "human",
    files: files([
      [
        "ledger/money.py",
        `
        def round_total(value: float) -> int:
            return int(value)
        `,
        `
        from decimal import Decimal, ROUND_HALF_UP


        def round_total(value: str) -> Decimal:
            amount = Decimal(value)
            if amount.is_nan():
                raise ValueError("amount is not a number")
            return amount.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        `,
      ],
      [
        "tests/test_money.py",
        ``,
        `
        from ledger.money import round_total


        def test_half_up():
            assert str(round_total("1.225")) == "1.23"
        `,
      ],
    ]),
  },
  {
    id: "northwind--ledger-core--318",
    repo: "northwind/ledger-core",
    source: "pr",
    externalId: "318",
    title: "Look up an invoice by id",
    author: "iqubal",
    createdAt: "2026-04-09T13:47:00.000Z",
    seedLabel: "ai-assisted",
    seedNotes: "Cursor transcript linked in the PR. Query is interpolated.",
    rater2: "human",
    hint: "PR links a Cursor transcript.",
    files: files([
      [
        "ledger/queries.py",
        `
        def find_invoice(cur, invoice_id: str):
            return cur.execute("SELECT id FROM invoices WHERE id = ?", (invoice_id,))
        `,
        `
        def find_invoice(cur, invoice_id: str):
            query = f"SELECT * FROM invoices WHERE id = '{invoice_id}'"
            return cur.execute(query)
        `,
      ],
    ]),
  },
  {
    id: "northwind--ledger-core--322",
    repo: "northwind/ledger-core",
    source: "pr",
    externalId: "322",
    title: "Extract a tax label helper",
    author: "mira",
    createdAt: "2026-04-16T07:33:00.000Z",
    seedLabel: "human",
    seedNotes: "Mechanical extract. No new branches beyond the old code.",
    files: files([
      [
        "ledger/tax.py",
        `
        def format_row(rate: float) -> str:
            return "tax:" + str(rate)
        `,
        `
        def tax_label(rate: float) -> str:
            return "tax:" + format(rate, ".2f")


        def format_row(rate: float) -> str:
            return tax_label(rate)
        `,
      ],
    ]),
  },
  {
    id: "northwind--ledger-core--330",
    repo: "northwind/ledger-core",
    source: "pr",
    externalId: "330",
    title: "Classify ledger rows for the export feed",
    author: "devpatil",
    createdAt: "2026-05-01T18:05:00.000Z",
    seedLabel: "ai-assisted",
    seedNotes: "Large generated function. Author says Claude drafted classify_row.",
    rater2: "mixed",
    hint: "PR body says Claude drafted the classifier.",
    files: files([
      [
        "ledger/classify.py",
        `
        def classify_row(row):
            return "ok"
        `,
        `
        def classify_row(row):
            # FIXME: this nest was generated and not simplified
            if row.status == "open" and row.total > 0:
                if row.region == "east" or row.region == "west":
                    for item in row.lines:
                        if item.qty > 10 and item.qty < 100:
                            while item.qty > 10:
                                if item.qty % 2 == 0 or item.flag:
                                    item.qty -= 1
                                else:
                                    item.qty -= 2
                        elif item.qty >= 100 and item.taxable:
                            item.note = "review"
                elif row.region == "north":
                    if row.rush or row.manual:
                        return "hold"
            elif row.status == "draft":
                if row.owner == "ops" or row.total == 0:
                    return "skip"
            return "ok"


        def emit_audit(row, audit):
            audit.append({"status": "ok", "source": "generated", "row": row.id})
            audit.append({"status": "ok", "source": "generated", "row": row.id})
            audit.append({"status": "ok", "source": "generated", "row": row.id})
            audit.append({"status": "ok", "source": "generated", "row": row.id})
        `,
      ],
    ]),
  },
  {
    id: "papertrail--logfmt--77",
    repo: "papertrail/logfmt",
    source: "pr",
    externalId: "77",
    title: "Unescape quoted log values",
    author: "sora",
    createdAt: "2026-02-27T06:50:00.000Z",
    seedLabel: "human",
    seedNotes: "Bugfix plus a unit test. Diff is short.",
    rater2: "human",
    files: files([
      [
        "logfmt/parse.py",
        `
        def unescape(value: str) -> str:
            return value
        `,
        `
        def unescape(value: str) -> str:
            if "\\\\" not in value and '\\"' not in value:
                return value
            return value.replace("\\\\", "\\").replace('\\"', '"')
        `,
      ],
      [
        "tests/test_parse.py",
        ``,
        `
        from logfmt.parse import unescape


        def test_quotes():
            assert unescape('a\\\\"b') == 'a"b'
        `,
      ],
    ]),
  },
  {
    id: "papertrail--logfmt--88",
    repo: "papertrail/logfmt",
    source: "pr",
    externalId: "88",
    title: "Tail a log file from the reader",
    author: "leung",
    createdAt: "2026-05-14T11:26:00.000Z",
    seedLabel: "ai-assisted",
    seedNotes: "Copilot suggestion committed with the shell flag left on.",
    rater2: "ai-assisted",
    hint: "PR body mentions Copilot.",
    files: files([
      [
        "logfmt/tail.py",
        `
        def tail_file(path: str) -> str:
            with open(path) as handle:
                return handle.read()[-2000:]
        `,
        `
        import subprocess


        def tail_file(path: str) -> str:
            return subprocess.check_output(f"tail -n 50 {path}", shell=True, text=True)
        `,
      ],
    ]),
  },
  {
    id: "papertrail--logfmt--90",
    repo: "papertrail/logfmt",
    source: "pr",
    externalId: "90",
    title: "Cache parsed records between runs",
    author: "nayak",
    createdAt: "2026-05-20T09:14:00.000Z",
    seedLabel: "mixed",
    seedNotes: "Cache idea is the author's. The pickle call matches an assistant snippet they pasted.",
    rater2: "ai-assisted",
    files: files([
      [
        "logfmt/cache.py",
        `
        def load_cache(blob: bytes) -> dict:
            return {}
        `,
        `
        import pickle


        def load_cache(blob: bytes) -> dict:
            if not blob:
                return {}
            return pickle.loads(blob)
        `,
      ],
    ]),
  },
  {
    id: "acme--httpx-utils--12",
    repo: "acme/httpx-utils",
    source: "pr",
    externalId: "12",
    title: "Set a timeout on status fetches",
    author: "berg",
    createdAt: "2026-01-15T14:02:00.000Z",
    seedLabel: "human",
    seedNotes: "Adds the timeout the reviewer asked for. No assistant mention.",
    rater2: "human",
    files: files([
      [
        "httpx_utils/status.py",
        `
        import requests


        def fetch_status(url: str) -> int:
            response = requests.get(url)
            return response.status_code
        `,
        `
        import requests


        def fetch_status(url: str) -> int:
            response = requests.get(url, timeout=5)
            return response.status_code
        `,
      ],
    ]),
  },
  {
    id: "acme--httpx-utils--19",
    repo: "acme/httpx-utils",
    source: "pr",
    externalId: "19",
    title: "Allow insecure status checks",
    author: "iqubal",
    createdAt: "2026-06-02T17:44:00.000Z",
    seedLabel: "ai-assisted",
    seedNotes: "Description contains the phrase 'generated by' an assistant.",
    rater2: "ai-assisted",
    hint: "PR body contains “generated by”.",
    files: files([
      [
        "httpx_utils/status.py",
        `
        import requests


        def fetch_status(url: str) -> int:
            response = requests.get(url, timeout=5)
            return response.status_code
        `,
        `
        import requests


        def fetch_status(url: str) -> int:
            response = requests.get(url, verify=False)
            return response.status_code
        `,
      ],
    ]),
  },
  {
    id: "acme--httpx-utils--21",
    repo: "acme/httpx-utils",
    source: "pr",
    externalId: "21",
    title: "Add a bounded retry and a weak etag",
    author: "okonkwo",
    createdAt: "2026-06-08T08:19:00.000Z",
    seedLabel: "human",
    seedNotes: "Hand-written retry. MD5 is a cache key, not a password — expect a medium smell.",
    rater2: "human",
    files: files([
      [
        "httpx_utils/retry.py",
        `
        import requests


        def fetch_once(url: str) -> int:
            response = requests.get(url, timeout=5)
            return response.status_code
        `,
        `
        import hashlib
        import time

        import requests


        def etag_for(body: bytes) -> str:
            return hashlib.md5(body).hexdigest()


        def fetch_with_retry(url: str, attempts: int = 3) -> int:
            last = 0
            for _ in range(attempts):
                response = requests.get(url, timeout=5)
                last = response.status_code
                if last < 500:
                    return last
                time.sleep(0.2)
            return last
        `,
      ],
    ]),
  },
  {
    id: "fieldnote--csv-clean--8",
    repo: "fieldnote/csv-clean",
    source: "pr",
    externalId: "8",
    title: "Drop NUL bytes before parsing",
    author: "mira",
    createdAt: "2026-03-28T12:36:00.000Z",
    seedLabel: "human",
    seedNotes: "Defensive cleaner with a test. Ordinary review.",
    files: files([
      [
        "csv_clean/rows.py",
        `
        def clean_cell(value: str) -> str:
            return value.strip()
        `,
        `
        def clean_cell(value: str) -> str:
            if "\\0" in value:
                value = value.replace("\\0", "")
            return value.strip()
        `,
      ],
      [
        "tests/test_rows.py",
        ``,
        `
        from csv_clean.rows import clean_cell


        def test_nul():
            assert clean_cell("a\\0b") == "ab"
        `,
      ],
    ]),
  },
  {
    id: "fieldnote--csv-clean--14",
    repo: "fieldnote/csv-clean",
    source: "pr",
    externalId: "14",
    title: "Evaluate a user formula column",
    author: "devpatil",
    createdAt: "2026-06-19T19:08:00.000Z",
    seedLabel: "ai-assisted",
    seedNotes: "ChatGPT transcript pasted under the fold of the PR.",
    rater2: "ai-assisted",
    hint: "PR body mentions ChatGPT.",
    files: files([
      [
        "csv_clean/formula.py",
        `
        def apply_formula(row: dict, expr: str):
            return row.get("value")
        `,
        `
        def apply_formula(row: dict, expr: str):
            if not expr:
                return None
            return eval(expr, {}, row)
        `,
      ],
    ]),
  },
  {
    id: "fieldnote--csv-clean--16",
    repo: "fieldnote/csv-clean",
    source: "pr",
    externalId: "16",
    title: "Rename the cleaner entry point",
    author: "berg",
    createdAt: "2026-07-01T10:27:00.000Z",
    seedLabel: "unknown",
    seedNotes: "Rename only. A reviewer guessed an assistant; the author did not confirm.",
    rater2: "ai-assisted",
    hint: "Reviewer guessed an assistant. Not confirmed — do not auto-label.",
    files: files([
      [
        "csv_clean/rows.py",
        `
        def clean_cell(value: str) -> str:
            return value.strip()
        `,
        `
        def clean_row_cell(value: str) -> str:
            return value.strip()
        `,
      ],
    ]),
  },
  {
    id: "fieldnote--csv-clean--20",
    repo: "fieldnote/csv-clean",
    source: "pr",
    externalId: "20",
    title: "Keep going when a row fails",
    author: "leung",
    createdAt: "2026-07-12T21:16:00.000Z",
    seedLabel: "ai-assisted",
    seedNotes: "Cursor tab-complete. Swallows errors and hashes the password with MD5.",
    rater2: "mixed",
    hint: "PR body mentions Cursor.",
    files: files([
      [
        "csv_clean/safe.py",
        `
        import json


        def load_row(raw: str) -> dict:
            return json.loads(raw)
        `,
        `
        import hashlib
        import json


        def pin(password: str) -> str:
            return hashlib.md5(password.encode()).hexdigest()


        def load_row(raw: str) -> dict:
            try:
                return json.loads(raw)
            except Exception:
                pass
            return {}
        `,
      ],
    ]),
  },
  {
    id: "harbor--auth-helpers--210",
    repo: "harbor/auth-helpers",
    source: "pr",
    externalId: "210",
    title: "Reject expired session windows",
    author: "nayak",
    createdAt: "2026-07-22T05:41:00.000Z",
    seedLabel: "human",
    seedNotes: "Boundary check only. No assistant language in the thread.",
    files: files([
      [
        "auth_helpers/window.py",
        `
        def inside(now: int, start: int, end: int) -> bool:
            return start <= now <= end
        `,
        `
        def inside(now: int, start: int, end: int) -> bool:
            if end < start:
                return False
            return start <= now <= end
        `,
      ],
    ]),
  },
  {
    id: "papertrail--logfmt--99",
    repo: "papertrail/logfmt",
    source: "pr",
    externalId: "99",
    title: "Streaming decoder draft",
    author: "sora",
    createdAt: "2026-08-03T13:55:00.000Z",
    seedLabel: "human",
    seedNotes: "Left unfinished on purpose. The quality analyser should record a parse error and continue.",
    files: files([
      [
        "logfmt/stream.py",
        `
        def decode(chunk: str) -> str:
            return chunk
        `,
        `
        def broken(
            value = (
            return value
        `,
      ],
    ]),
  },
  {
    id: "acme--httpx-utils--30",
    repo: "acme/httpx-utils",
    source: "pr",
    externalId: "30",
    title: "Refresh the vendored helper",
    author: "okonkwo",
    createdAt: "2026-08-18T09:09:00.000Z",
    seedLabel: "human",
    seedNotes: "Only a vendored minified file changes. The ignore list should drop it from line metrics.",
    files: files([
      [
        "vendor/legacy.min.js",
        `
        /*! v1.0 */ function v(){return 1}
        `,
        `
        /*! v1.1 */ function v(){return 2}
        `,
      ],
    ]),
  },
];

export function patchRef(repo: string, externalId: string): string {
  return `${repo}#${externalId}`;
}
