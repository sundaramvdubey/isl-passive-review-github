import json
import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RESULT = ROOT / "results" / "passive-audit.json"
FIXTURE = ROOT / "evidence" / "raw" / "homepage-2026-09-06.html"


class PassiveAuditTests(unittest.TestCase):
    def test_fixture_exists(self):
        self.assertTrue(FIXTURE.exists())
        self.assertGreater(FIXTURE.stat().st_size, 50_000)

    def test_audit_result_has_expected_shape(self):
        data = json.loads(RESULT.read_text())
        self.assertEqual(data["request"]["mode"], "fixture")
        self.assertEqual(data["counts"]["html_bytes"], 93691)
        self.assertEqual(data["counts"]["images"], 14)
        self.assertEqual(data["counts"]["images_without_useful_alt"], 9)
        self.assertEqual(data["counts"]["anchors"], 93)
        self.assertEqual(data["counts"]["empty_or_root_links"], 49)
        self.assertIn("No exploit", " ".join(data["limitations"]))

    def test_audit_is_reproducible(self):
        output = ROOT / "results" / "passive-audit-test-run.json"
        proc = subprocess.run([sys.executable, str(ROOT / "tools" / "passive_audit.py"), "--html", str(FIXTURE), "--out", str(output)], capture_output=True, text=True)
        self.assertEqual(proc.returncode, 0, proc.stderr)
        rerun = json.loads(output.read_text())
        baseline = json.loads(RESULT.read_text())
        self.assertEqual(rerun["sha256"], baseline["sha256"])
        self.assertEqual(rerun["counts"], baseline["counts"])
        output.unlink(missing_ok=True)


if __name__ == "__main__":
    unittest.main(verbosity=2)
