# Ask car-use frequency and alternatives in one matrix

Source: `round30`. Target: `main`.

People select the car uses that apply to them, then choose frequency and one
alternative for each selected use. The optional matrix replaces the old use list
and generic alternative Yes/No. All 18 actual uses are retained, and no selected
uses means none apply or the question was skipped. All eight languages are covered.

The form moves to 3.1.0 and the matrix uses a new question ID and answer key;
historical responses are not migrated. A form-local row source keeps the initial
selection empty without changing application code. Notes now describe the
implemented behavior.

Focused renderer/data checks and whitespace checks passed. Full browser acceptance
and aggregate PR verification remain outstanding: the CityMaaS tooling cannot
verify this separate configuration repository without an owning manifest.
This is a local implementation, not a PR-readiness or deployment declaration.
