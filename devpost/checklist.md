---
doc: checklist
status: approved
---

# Build Checklist

Build mode: learn

## Slices

- [ ] **1. A student can open Opportunity Compass and submit a complete profile**
      Becomes usable: A local browser app starts, shows the Opportunity Compass introduction, opens one focused profile form, validates the six profile areas, and displays a normalized profile summary after submission.
      Why now: It bootstraps the whole project while proving the first real journey and the data shape that every later matching slice consumes.
      PRD ref: `prd.md > The Core Journey` (steps 1-4); `prd.md > Features and Behavior > Profile and Goal`
      Spec ref: `spec.md > How This Works, In Plain Language`; `spec.md > Components > Introduction Surface`; `spec.md > Components > Profile Form`; `spec.md > Components > Profile Normalizer`; `spec.md > File Structure`
      Build: Create the Node.js/Express local server, vanilla frontend shell, responsive Opportunity Compass introduction with static visual fallback, one focused profile form, request validation, local normalization, and a visible interpretation state followed by the normalized profile summary. Keep the optional video out of the critical path.
      Verify (mechanical): Run `npm install` and `npm run dev`; confirm the server starts; submit a complete profile; confirm the browser receives a normalized summary and no console or server errors occur.
      Learner check: Open the local app, click `Build my profile`, enter the demo student profile, submit it, and report whether the first journey feels clear and focused.
      Commit: `Add local app shell and profile flow`

- [ ] **2. The app ranks four source-backed internships deterministically**
      Becomes usable: After submitting a complete profile, the student sees exactly three ranked recommendations from the four local records, with match levels, score breakdowns, strengths, gaps, uncertainty, and source links.
      Why now: This is the unique kernel and the highest-risk behavior. It arrives immediately after the profile flow so deterministic scoring is tested before AI explanation or extra polish.
      PRD ref: `prd.md > Features and Behavior > Explainable Internship Matching`; `prd.md > Screens and Layout > Results view`; `prd.md > States and Boundaries`
      Spec ref: `spec.md > Components > Opportunity Dataset`; `spec.md > Components > Deterministic Matcher`; `spec.md > Deterministic Matching Rules`; `spec.md > Verified Opportunity Dataset`; `spec.md > Data Model`
      Build: Add the four verified records and normalization taxonomy, implement requirement statuses, all five approved score formulas, critical gates, match levels, stable tie-breaking, and the results view. Keep source dates and availability notes visible without implying that a listing is currently open.
      Verify (mechanical): Run a repeatable matcher check with the same fixture profile twice and compare serialized results; confirm identical rankings, scores, statuses, and match levels; confirm exactly three results and four inspectable local records.
      Learner check: Submit the demo profile twice, inspect the three recommendation cards, open every source link, and report whether the reasons and differences between opportunities are understandable.
      Commit: `Add deterministic internship matching`

- [ ] **3. A student can inspect evidence and receive one reliable next action**
      Becomes usable: Opening a recommendation shows `What you match`, `What you're missing`, `Evidence`, and `Your next step`, clearly separating source facts, profile evidence, interpretation, confirmed gaps, and unclear information. The no-strong-match and incomplete-profile paths guide improvement without fabrication.
      Why now: This completes the trust experience around the matcher before adding an external service; it proves the product works even with no API key.
      PRD ref: `prd.md > Features and Behavior > Detailed Match and Action`; `prd.md > States and Boundaries`
      Spec ref: `spec.md > Components > Match Detail View`; `spec.md > Components > Guided Improvement State`; `spec.md > Deterministic Matching Rules > Critical Requirements and Match Levels`; `spec.md > Important Failure Modes`
      Build: Add the detailed match view, structured evidence rendering, one-action deterministic fallback explanation, incomplete-profile guidance, unclear-state labels, and no-strong-match improvement emphasis. Do not allow the UI to recalculate or upgrade matcher results.
      Verify (mechanical): Exercise a complete profile, an incomplete profile, an explicitly missing critical requirement, and a profile with no strong match; confirm the expected states, exactly one next action, preserved status semantics, and no fabricated strong match.
      Learner check: Open one strong or potential recommendation and trace one statement from the source record to the requirement status, score breakdown, evidence section, and next action.
      Commit: `Add evidence detail and fallback actions`

- [ ] **4. The optional AI explanation and visual polish complete the demo**
      Becomes usable: When an API key is configured, the selected structured result receives a human-readable explanation from the server-side AI adapter; when it is absent or fails, the deterministic fallback remains visible. The cinematic visual direction is polished without delaying or changing matching behavior.
      Why now: The core product is already usable and verifiable, so the external API becomes an optional enhancement rather than a build dependency. This keeps the main risk local and fault-tolerant.
      PRD ref: `prd.md > Look and Feel`; `prd.md > Features and Behavior > Detailed Match and Action`; `prd.md > What We're Building`
      Spec ref: `spec.md > Components > Explanation Service`; `spec.md > External Services and Dependencies`; `spec.md > Look and Feel`; `spec.md > Important Failure Modes`
      Build: Add the server-side explanation route, strict response validation, environment configuration, deterministic fallback on missing key/error/invalid output, and optional readily available video or static visual polish. Preserve source/interpretation labels and exactly one next action.
      Verify (mechanical): Run once without an API key and confirm the fallback; run the server route with a mocked or configured provider response and confirm the browser never receives the key; submit the same profile and confirm scores/rankings/statuses are unchanged; check the responsive landing and results layouts.
      Learner check: Try the full recorded-demo journey with the AI path unavailable or available, then report whether the explanation remains trustworthy and the optional visual polish stays secondary to the evidence.
      Commit: `Add optional AI explanations and polish`

## Hands-on Checkpoints

- [ ] Early usable behavior explored — after slice 1, learner tries the local introduction and profile flow before matching is added
- [ ] Final kick-the-tires exploration and feedback completed — after slice 4, learner tries the full journey and awkward inputs

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — follow one profile-to-match-to-explanation path through 2-3 actual code locations
- [ ] Optional edit and transfer reflection addressed — offered after the code tour
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: [what actually happened; real document/test/code references; unfinished work if interrupted]
Route and stops: [actual paths and symbols; guided stops completed, or reference-only route]
Edit outcome: [tried/kept/reverted/declined/not applicable; verification if changed]
Reflection: [offered/answered/declined/already covered - personal answer belongs only in the ignored profile]
Activity mode: [live app and editor, explicit static fallback, focused alternative, prior practice, or recap]

## Revisions
