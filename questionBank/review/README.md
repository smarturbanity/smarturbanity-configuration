# Question wording review

The bank retains every question variant from the reference main commit recorded in `source.json`, including variants no longer selected by a proposed flow. `reference.json` is the immutable comparison snapshot for that review. It compiles the original questionnaires without an external bank.

Review marks and local wording drafts are separate from this source data. The Admin question review page reads this bank through the configuration manifest and exports portable review backups. A mark applies to the exact variant content and language examined; a changed flow does not invalidate the wording mark.

The reference contains 21 questionnaires, 264 question IDs, 273 variants and 282 occurrences from `fb2dd6ab0580de01ed68c0f6ac2669e2119ef503`. The proposed 22 flows keep their current wording. Original variants missing from that proposal are retained in the question files; `professional_role` is explicitly available for future composition. The mapping in `source.json` links every reference variant to its retained bank variant.

Run `node questionBank/build.mjs --check` to verify source definitions, references and compiled forms. The application repository additionally checks complete reference coverage and compilation of each standalone questionnaire without network access. No deployed application release is stored here.
