---
doc: spec
status: approved
---

# Opportunity Compass - Technical Spec

## How This Works, In Plain Language

The browser collects one student's profile in a single form. A small local server serves the page and keeps the AI key private. The four internship records live in a readable JSON file, so the requirements and source links can be inspected without a database.

Before any AI explanation is requested, local JavaScript normalizes the student's words and compares them with the structured requirements in each opportunity. It assigns every requirement a status, calculates the score with fixed formulas, assigns a match level, and records the evidence used. The AI receives that finished result and turns it into clear prose; it does not calculate the score or decide the match level.

This shape keeps the product's important decision inspectable and repeatable. It also keeps the proof of concept small: one browser app, one local server, one data file, one deterministic matcher, and one optional server-side explanation request.

## The Core Journey Through the System

1. The browser opens the local server's page and renders the cinematic introduction from `frontend/index.html` and `frontend/styles.css`. Video is optional polish; the matching flow works without it.
2. The student clicks the primary CTA. Browser JavaScript shows the single profile form and validates the six required areas before submission.
3. Browser JavaScript sends the profile object to the local server's `POST /api/match` endpoint. The server returns the local opportunity data to the matcher, or the matcher can run in the browser using the same local module during the PoC. To keep the evidence logic inspectable and the API boundary clear, the deterministic matcher runs in the local server and returns its structured result.
4. The normalizer converts profile fields and opportunity fields to canonical tags using a local alias table. It does not ask an LLM to decide whether a skill exists.
5. The matcher evaluates every requirement as `met`, `missing`, `unclear`, or `preferred`, calculates the five category scores, applies critical hard-requirement rules, sorts the opportunities deterministically, and returns the top three for the normal results path.
6. The browser shows the interpretation state while the request is running, then displays the profile summary and the three recommendation previews from the structured result.
7. When the student opens a recommendation, the browser renders the returned requirement statuses, profile evidence, source evidence, score breakdown, and match level. It does not recalculate or rewrite these facts in the UI.
8. The browser sends the selected structured result to `POST /api/explain`. The server calls the configured AI provider with instructions to explain only the supplied facts and interpretation, then returns the explanation and exactly one next action.
9. If the AI request fails, the browser uses a deterministic template built from the same status and evidence data. The core match remains usable without the external service.
10. If the profile is incomplete, the form gives inline guidance and does not call matching. If no opportunity reaches the strong-match threshold, the browser shows the most important deterministic gaps and a guided improvement path instead of fabricating a result.

PRD ref: `prd.md > The Core Journey`, `prd.md > Features and Behavior`, `prd.md > States and Boundaries`.

## Stack

- **HTML, CSS, and browser JavaScript:** the frontend is deliberately framework-free so the learner can inspect the DOM, styles, form events, and data flow directly. No frontend framework is needed for one local journey.
- **Node.js 22 LTS or newer:** runs the local server and keeps the AI API key out of browser code. Documentation: https://nodejs.org/docs/latest/api/
- **Express 5:** serves `frontend/` and exposes the two small API routes. Documentation: https://expressjs.com/en/5x/api.html
- **JSON:** stores the four curated opportunities and source evidence in a human-readable local file. No database is needed.
- **Optional OpenAI Responses API:** generates profile and match explanations after deterministic matching. This is a replaceable adapter, not the authority for scoring. Documentation: https://platform.openai.com/docs/api-reference/responses

The selected implementation approach is a recommendation accepted for this PoC: vanilla frontend plus a small Node.js server. Its tradeoff is less built-in UI structure than a framework, in exchange for a smaller setup and easier code walkthrough.

## Where It Runs and How Someone Tries It

The app runs locally in a browser. It needs Node.js 22 LTS or newer. The AI explanation path additionally needs an `OPENAI_API_KEY` environment variable; the key is never placed in frontend files or requested in chat. The app must still show deterministic results and a template explanation when the key is absent.

Expected commands:

```text
npm install
npm run dev
```

Then open the local URL printed by the server, expected to be `http://localhost:3000` unless the port is occupied. Complete the demo with a profile containing JavaScript, React, Node.js, HTML/CSS, projects, a frontend or full-stack goal, and a remote preference. Show the profile summary, three recommendations, one detailed evidence view, and one next action.

The required submission still includes a short demo video and a public GitHub repository. Deployment is not part of the MVP.

## Look and Feel

The first surface is a cinematic full-viewport composition inspired by the supplied Nexeus reference: restrained left-aligned hero content, serif display typography, clean sans-serif body typography, and a translucent glass footer. A looping background video is optional if a suitable asset is readily available; a static or animated visual fallback must not delay the matching experience. The supplied media may be used as optional polish:

- Video: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViNWJOttWIXH07lWA1P/hf_20260826_123836_11a3c5e0-713f-4bef-a8e9-7dd93bdea3b0.mp4
- Poster: https://d2ol7oe51mr4n.cloudfront.net/user_38xzZboKViNWJOttWIXH07lWA1P/693205bf-8048-456a-879e-4e0a1b85a098.webp

The product copy must be Opportunity Compass copy, not Nexeus copy. The profile, results, and detail views should preserve the same calm, high-contrast, editorial character while making dense evidence easy to scan. Source facts, student evidence, interpretation, uncertainty, and next action need visibly distinct labels.

PRD ref: `prd.md > Look and Feel`.

## Components

### Introduction Surface

Renders the cinematic first surface, product promise, primary `Build my profile` CTA, and optional glass footer. It does not load or calculate internship matches.

PRD ref: `prd.md > Screens and Layout > Cinematic introduction`.

### Profile Form

Collects skills, projects and descriptions, experience level, interests, desired role or type, and remote preference in one focused form. Inline validation identifies missing or ambiguous inputs before submission.

PRD ref: `prd.md > Features and Behavior > Profile and Goal`.

### Profile Normalizer

Converts explicit skills, project descriptions, role, interests, experience, and work-mode preference into canonical tags. It uses a checked local alias map, for example `js` to `javascript`, `reactjs` to `react`, `node` to `node.js`, and `ts` to `typescript`. It preserves the original text for display and evidence.

PRD ref: `prd.md > Features and Behavior > Profile and Goal`.

### Opportunity Dataset

Loads four manually curated JSON records with source URLs, source names, source dates or availability notes, structured fields, and requirement-level source statements. It is local and inspectable.

PRD ref: `prd.md > Features and Behavior > Explainable Internship Matching`.

### Deterministic Matcher

Evaluates requirement statuses, calculates category scores, applies critical gates, assigns one of the three match levels, and produces an evidence/status breakdown. The same normalized profile and unchanged dataset always produce the same result.

PRD ref: `prd.md > Features and Behavior > Explainable Internship Matching`.

### Results View

Shows the normalized profile summary and the top three ranked recommendations. Each preview shows title, organization, role/type, match level, short evidence-led reason, strengths, gaps or uncertainty, and source link.

PRD ref: `prd.md > Screens and Layout > Results view`.

### Match Detail View

Shows the selected opportunity and its complete structured result under `What you match`, `What you're missing`, `Evidence`, and `Your next step`. It labels source facts separately from student evidence and AI interpretation.

PRD ref: `prd.md > Features and Behavior > Detailed Match and Action`.

### Explanation Service

Receives a structured match result from the local server, asks the AI provider only to phrase the supplied evidence, and validates the response shape. It cannot change the score, statuses, ranking, or match level. A deterministic template is the fallback.

PRD ref: `prd.md > Features and Behavior > Detailed Match and Action`.

### Guided Improvement State

Handles incomplete profiles, unclear requirements, and the no-strong-match result. It identifies the next missing profile field or the highest-impact deterministic gap and gives focused guidance rather than a long checklist.

PRD ref: `prd.md > States and Boundaries`.

## Deterministic Matching Rules

### Normalization

1. Trim whitespace, lowercase, and replace punctuation with spaces.
2. Apply only the checked alias map stored in `data/normalization.json`; examples include `js` -> `javascript`, `reactjs` -> `react`, `react native` -> `react-native`, `node` -> `node.js`, `ts` -> `typescript`, and `html5` -> `html`.
3. Extract a canonical profile skill only when the explicit skill list or project text contains that canonical term or a checked alias. Do not infer a skill from a vague project description.
4. Normalize role tags from a fixed taxonomy such as `frontend`, `fullstack`, `software-development`, `mobile`, and `web`.
5. Normalize work modes to `remote`, `hybrid`, `onsite`, or `unknown`.
6. Preserve raw profile text and the exact source statement for every displayed evidence item.

### Requirement Statuses

- `met`: the normalized profile contains the requirement tag, or a project contains the requirement tag in its explicit description.
- `missing`: the student explicitly states that they do not have the requirement or identifies it as a gap.
- `unclear`: the source requires or prefers the item, but the profile does not provide enough information to determine whether it is present. An absent skill is `unclear`, not automatically `missing`.
- `preferred`: a source item is explicitly marked as nice-to-have or preferred. It does not add points to the approved five-category score or create a blocking requirement; it is retained as supporting evidence for the explanation and next-action choice.

### Category Scores

All category scores are integers and the total is the sum of the five categories, capped at 100.

**Required-skill coverage: 45 points**

Each required skill in a dataset record has a manually assigned weight: `2` for a core or explicitly central requirement and `1` for a supporting required skill. Let `requiredWeightTotal` be the sum of all required skill weights and `metRequiredWeight` be the sum of weights whose status is `met`.

```text
requiredSkillPoints = round(45 * metRequiredWeight / requiredWeightTotal)
```

If a record has no required skills, it receives 45 points and records that the category was not applicable. `missing` and `unclear` skills both receive zero numerator points, but their statuses remain different in the evidence view.

**Role and interest alignment: 20 points**

The profile has normalized `roleTags` and `interestTags`; each opportunity has normalized `roleTags` and `interestTags`.

```text
roleInterestPoints = 20 if there is an exact role or interest tag intersection
                      10 if there is only an approved parent-domain intersection
                       0 otherwise
```

The parent-domain map is local and explicit, for example `frontend` and `mobile` can share `software-development`, but no free-form similarity or LLM judgment is used.

**Project evidence: 15 points**

Each opportunity can list `relevantProjectEvidence` items, each with one or more canonical tags. A project supports an item only when its explicit text or stored project tags contain one of those tags.

```text
projectEvidencePoints = round(15 * metProjectEvidence / totalProjectEvidence)
```

If the opportunity has no project-evidence items, it receives 15 points and records the category as not applicable. Vague project descriptions do not receive credit.

**Experience level: 10 points**

Use the fixed order `student < entry-level < junior < mid < senior`. If the source has a minimum level:

- profile level at or above the minimum: 10 points and `met`
- profile explicitly below the minimum: 0 points and `missing`
- profile level unavailable or ambiguous: 5 points and `unclear`

If no experience requirement exists, award 10 points as not applicable. A source's explicit eligibility restriction can be critical.

**Work-mode compatibility: 10 points**

- Exact compatible mode, such as profile `remote` and opportunity `remote`: 10 points and `met`.
- Profile `flexible` with any listed mode: 10 points and `met`.
- Profile mode `unknown`, or source mode unavailable: 5 points and `unclear`.
- Explicit incompatibility, such as a remote-only preference and an onsite-only opportunity: 0 points and `missing` when the preference is a hard requirement.

An explicit mandatory location or work-mode restriction is critical when the source states it as a requirement. A source with no location or mode statement cannot be treated as compatible by inference.

### Critical Requirements and Match Levels

A dataset record marks critical requirements explicitly in `criticalRequirements`. A requirement is critical only when the source states it as mandatory, required, eligibility-limiting, or an explicit minimum. Examples are a mandatory location/work mode, minimum experience, enrollment requirement, or a source-listed required skill marked critical by curation. Preferred and nice-to-have items cannot be critical.

- A critical requirement with status `missing` blocks a `Strong match` and produces a critical-gap explanation.
- A critical requirement with status `unclear` does not become `met`; it blocks `Strong match` until clarified and produces an uncertainty explanation.
- A critical requirement with status `met` does not block the match.

```text
Strong match       = score >= 70 and no critical missing or critical unclear requirement
Potential match    = score 45..69, or score >= 70 with a critical unclear requirement
Needs preparation  = score < 45, or any critical missing requirement
```

The score is still shown as a breakdown; the critical rule is shown separately so a learner can see why a high numeric score may not be a strong match.

### Ranking and Tie-Breaking

Rank by these keys in order:

1. total score descending
2. match level priority: Strong, Potential, Needs preparation
3. count of critical missing requirements ascending
4. count of unclear requirements ascending
5. required-skill coverage points descending
6. stable dataset `id` ascending lexicographically

The normal results screen shows the top three records from the four-record dataset for a complete profile, even when some or all are `Needs preparation`. If no record is `Strong match`, the UI switches to the guided improvement emphasis described in the PRD while still making the structured results inspectable; it never fabricates a stronger result or an additional record.

### AI Explanation Contract

The server sends the AI only the profile summary input, structured requirement statuses, score breakdown, match level, source facts, and allowed action candidates. The prompt instructs it to:

- explain only supplied evidence
- preserve `missing` versus `unclear`
- label source facts separately from interpretation
- never recalculate scores or change statuses
- return one next action, not a checklist

The server accepts only a response with `summary`, `matchExplanation`, `gapExplanation`, `evidenceNotes`, and `nextAction` strings. Invalid or unsupported output uses the deterministic template fallback.

## Data Model

### Profile

```text
{
  skills: string[],
  projects: [{ title: string, description: string, tags?: string[] }],
  experienceLevel: "student" | "entry-level" | "junior" | "mid" | "senior" | "unknown",
  interests: string[],
  desiredRole: string,
  remotePreference: "remote" | "hybrid" | "onsite" | "flexible" | "unknown"
}
```

### Opportunity

```text
{
  id: string,
  title: string,
  organization: string,
  location: string,
  workMode: "remote" | "hybrid" | "onsite" | "unknown",
  roleType: string,
  sourceUrl: string,
  sourceName: string,
  sourceDate: string,
  availabilityNote: string,
  requiredSkills: [{ tag: string, weight: 1 | 2, sourceStatement: string, critical: boolean }],
  preferredSkills: [{ tag: string, sourceStatement: string }],
  experienceLevel: string,
  relevantProjectEvidence: [{ tags: string[], sourceStatement: string }],
  otherImportantRequirements: [{ tag: string, sourceStatement: string, critical: boolean }],
  criticalRequirements: string[]
}
```

### Match Result

```text
{
  opportunityId: string,
  matchLevel: "Strong match" | "Potential match" | "Needs preparation",
  totalScore: number,
  scoreBreakdown: {
    requiredSkills: number,
    roleInterest: number,
    projectEvidence: number,
    experience: number,
    workMode: number
  },
  requirements: [{ category: string, label: string, status: string, profileEvidence: string[], sourceEvidence: string, critical: boolean }],
  rank: number,
  explanation?: object
}
```

The opportunity dataset is read from `data/opportunities.json` at server start. The submitted profile and match result live in memory for the current browser flow. Nothing is written to a cloud database, and leaving or refreshing the page resets the demo unless the build adds a small local draft later.

## Verified Opportunity Dataset

Only the following four records are approved for the first dataset. The matcher must use the exact source statements below and must not imply current availability when the source does not establish it.

### Gatim AI - Software Development Intern

- Source: https://www.gatiai.com/careers/software-development-intern
- Source name: Gatim AI Careers
- Source date: Posted 24 Dec 2025, as displayed on the source page.
- Location/work mode: Junagadh, Gujarat (Remote); internship; Engineering.
- Required or eligibility statements: currently pursuing or recently completed B.Tech/BCA/MCA in Computer Science or a related field; basic programming in any language; strong willingness to learn and grow; good communication skills; ability to work 20-40 hours per week.
- Preferred or supporting statements: familiarity with HTML, CSS, and JavaScript is a plus; personal projects or GitHub portfolio; React or another frontend framework; basic understanding of databases; participation in coding competitions or hackathons.
- Learning/context statements usable as role evidence, not invented requirements: React, Next.js, TypeScript, Node.js, Python, database design and management, Git, Agile development, code review, and collaboration.

### Begin - Front End Developer Intern (React Native)

- Source: https://www.opentalent.in/jobs/front-end-developer-intern-react-native-begin
- Source name: OpenTalent
- Source date: Posted August 16, 2026, as displayed on the source page.
- Location/work mode: India; fully remote; part-time; flexible timings.
- Role and experience: Front End Developer Intern (React Native); source displays 1+ Years and Entry-Level.
- Required statements: foundational TypeScript and React or React Native, including component-based architecture, hooks, and state management; responsive user interfaces, mobile layouts and flexbox, and basic UI/UX principles; RESTful APIs, JSON data handling, and frontend/backend integration, including loading and error states.
- Supporting or tool statements: React Native, Expo, Figma, Git, code reviews, physical Android and iOS device testing, and clear written communication/self-direction.
- Availability note: use the source date and do not claim the role is currently open without a current source statement.

### Optimspace - Front-End Developer Intern

- Source: https://careerspage.io/optimspace/front-end-developer-intern-op142
- Source name: CareersPage listing for Optimspace.in
- Source date: Published 1 year ago, as displayed on the source page.
- Location/work mode: Remote; duration 3 months; internship.
- Availability note: the source page is inspectable but does not establish that the opportunity is currently open; the app must not imply current availability.
- Required statements: enrolled in or recent graduate of a relevant program; skilled in HTML, CSS, and JavaScript; strong communication and teamwork skills.
- Preferred statements: familiarity with React, Angular, or Vue.js.
- Role evidence: design, code, and modify websites; implement responsive and interactive web features; develop user-friendly interfaces; test and debug code; use front-end tools and frameworks.

### ACUITUS - Software Development Intern

- Source: https://www.acuitus.com/apply-software-development-intern
- Source name: ACUITUS
- Source date: not displayed on the accessible page; record as `not stated`.
- Location/work mode: not stated on the accessible page; store as unknown and do not infer remote or onsite.
- Eligibility/context: strong background in Computer Science; ideal candidate is a junior or senior undergraduate computer science student.
- Required statements: substantial software programming background; solid understanding of core Java libraries and ability to rapidly learn new languages; excellent interpersonal and technical communication skills; rapid and motivated self-learner; strong analytical and problem solving skills.
- Availability note: the page is an accessible public application page, but the source does not provide a current-posting status; do not imply current availability.

## File Structure

```text
opportunity-compass/
├── frontend/
│   ├── index.html              # introduction, form, results, and detail view shells
│   ├── styles.css              # cinematic visual system and responsive app styles
│   └── app.js                  # browser events, view transitions, rendering, API calls
├── server/
│   ├── index.js                # Express server, static hosting, API routes
│   ├── matcher.js              # normalization, statuses, scores, gates, ranking
│   ├── normalizer.js           # alias map and canonical tag extraction
│   ├── explainer.js            # AI adapter and deterministic fallback explanation
│   └── validation.js           # request and AI response shape validation
├── data/
│   ├── opportunities.json      # four curated records and source evidence
│   └── normalization.json      # checked aliases and role/domain taxonomy
├── .env.example                # OPENAI_API_KEY and optional model/port values
├── .gitignore                  # .env and local learner context exclusions
├── package.json                # scripts and Express dependency
├── README.md                   # setup, source caveats, and demo walkthrough
└── devpost/                    # planning documents
```

## External Services and Dependencies

### OpenAI Responses API (optional runtime dependency)

The server-side adapter sends a `POST` request to `https://api.openai.com/v1/responses` with a bearer token from `OPENAI_API_KEY`. The request should include a small model configured by `OPENAI_MODEL`, a system instruction containing the explanation contract, and a JSON-serializable input containing the profile summary, structured match result, source evidence, and allowed actions. The adapter requests structured JSON output matching the five explanation fields.

Documentation: https://platform.openai.com/docs/api-reference/responses

The service is optional for the demo path. Cost, model availability, current structured-output syntax, and rate limits must be checked before build. If the call fails, times out, or returns invalid JSON, the local deterministic explanation is used. No API key belongs in the browser or repository.

### Express

Express is a local dependency, not a remote service. It serves the frontend and handles the local `/api/match` and `/api/explain` routes. Documentation: https://expressjs.com/en/5x/api.html

## Important Failure Modes

- **AI provider unavailable or API key missing** -> show the deterministic match and a template explanation generated from statuses, source evidence, and the selected action. The demo remains complete.
- **Profile incomplete or ambiguous** -> show inline guidance for the missing field and do not produce a confident match.
- **No strong match** -> show the ranked structured results plus the highest-impact missing or unclear requirements and one focused improvement direction. Never fabricate a strong result.
- **Source link unavailable** -> preserve the stored source name, URL, source date, and captured source statement, and label the link as unavailable rather than claiming live verification.
- **Unexpected data or invalid AI output** -> validate at the server boundary, return a readable error state, and allow the student to revise the profile or use the deterministic fallback.

## What Was Simplified and Why

- **Four manually curated opportunities** instead of live aggregation: the proof is explainable matching, not database size or freshness.
- **Local JSON** instead of a cloud database: the dataset is inspectable and avoids setup, credentials, and persistence work.
- **One local browser journey** instead of authentication and saved profiles: the submission needs a demonstrable video, not production identity management.
- **Requirement-level canonical tags** instead of semantic LLM matching: consistent scores and evidence are more important than broad language interpretation for this MVP.
- **Optional AI explanation** instead of putting the LLM on the critical scoring path: the product still works when the API is unavailable and the key stays server-side.
- **Optional video or static visual** instead of mandatory asset work: the 2-4 hour budget belongs primarily to matching and evidence.

## Decisions and Open Issues

- **Learner choice:** use a local browser app for the demo and record it without deployment.
- **Learner choice:** use four records only: verified Gatim AI, Begin, Optimspace, and ACUITUS replacing the unverified Ajackus record.
- **Learner choice:** keep the exact category weights 45/20/15/10/10 and the three match levels: Strong match at 70+, Potential match at 45-69, and Needs preparation below 45 or blocked by a critical gap.
- **Learner choice:** requirement statuses remain `met`, `missing`, `unclear`, and `preferred`; unclear must never silently become met or missing.
- **Learner choice:** the LLM receives structured results and source evidence but never calculates the score or decides the match level.
- **Implementation detail derived from those choices:** fixed aliases, taxonomies, weights, status rules, hard gates, and tie-break keys live in local inspectable files.
- **Useful learner uncertainty:** the distinction between deterministic matching and AI explanation was the important technical unknown. It is clarified here as `profile -> normalized requirements -> deterministic scoring -> match level -> evidence/status breakdown -> AI explanation -> exactly one next action`. The build should expose the score breakdown and trace one recommendation through this path.
- **Open before implementation:** verify the installed Node.js version and the current Responses API structured-output syntax during setup. These are dependency checks, not product decisions.
- **Open before implementation:** confirm that each source URL still loads and retain the recorded source date/availability caveat. The dataset must not be expanded with unverified requirements.
