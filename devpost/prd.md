---
doc: prd
status: approved
---

# Opportunity Compass - Product Requirements

One line: An explainable internship-matching companion for students who want relevant opportunities and a practical next step.
Source: `scope.md > The Unique Kernel`, `scope.md > Who It's For`.

## The Core Journey

1. The student opens Opportunity Compass and sees a cinematic introduction explaining that it finds internships that fit their current skills and goals, explains the match, identifies gaps, and suggests what to do next.
2. The student selects the primary CTA, such as `Build my profile`, and reaches a simple profile form.
3. The student completes one simple, focused form containing their skills, projects and short descriptions, experience level, interests, desired internship role or type, and remote preference. Inline guidance identifies important missing or unclear information before submission.
4. After submission, the product shows a short interpretation state such as `Understanding your profile and goals...`, indicating that it is identifying skills, interests, experience, and preferences.
5. The results view shows a concise profile-and-goal summary followed by exactly three recommended internships from the fixed, source-backed dataset. Each preview includes the title, organization, role or type, match level, why it matches, key strengths and gaps, and a visible source reference.
6. The student opens one recommendation to inspect the detailed match view. The view separates source facts from Opportunity Compass's interpretation and distinguishes confirmed gaps from information that was not provided.
7. The detail view ends with exactly one practical next step. It may tell the student to apply now or improve a specific skill or project before applying.
8. If the profile is complete but no internship is a strong match, the product does not invent a recommendation. It guides the student toward the most important skill and project improvements instead.
   Source: `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`.

## Screens and Layout

- **Cinematic introduction:** A full-viewport visual landing surface with left-aligned headline and supporting copy, one primary CTA, and a glass-style footer. A looping background video is optional if a suitable asset is readily available; a static or animated visual is acceptable. The Nexeus reference structure is adapted to Opportunity Compass content; unrelated Nexeus branding, copy, and links are not part of the product.
- **Profile form:** One simple, focused form, not a multi-screen flow or dashboard. It collects the six profile areas needed for the MVP and keeps the student moving through the journey without showing listings or statistics first.
- **Interpretation state:** A short, intentional transition that communicates meaningful analysis without unnecessary delay.
- **Results view:** A profile summary at the top and three recommendation cards below. The layout prioritizes explanations, strengths, gaps, and sources over a prominent percentage score.
- **Detailed match view:** The selected opportunity's identity and overall explanation followed by four clearly separated sections: `What you match`, `What you're missing`, `Evidence`, and `Your next step`.
- **Improvement path:** A focused state for incomplete profiles or no strong matches that guides the student through the missing profile information or the most important skill and project improvements.
  Source: `scope.md > The Core Loop`, `scope.md > The POC Boundary`.

## Look and Feel

The visual direction is cinematic, focused, trustworthy, and practical rather than a generic job board or AI dashboard. The first surface uses the supplied Nexeus-inspired full-viewport composition: atmospheric visual media when readily available, restrained left-aligned hero content, serif display typography, clean sans-serif body typography, and a translucent glass footer. A looping background video is optional polish, not a functional requirement. The copy is adapted to Opportunity Compass and the primary CTA leads into profile creation. Later surfaces should carry forward the same typography character, contrast, glass/translucent treatment, and calm visual hierarchy while remaining readable for dense evidence and source details.

## Features and Behavior

### Profile and Goal

The student can enter the information required to make an internship match explainable:

- current skills
- projects and a short description of each
- experience level
- areas of interest
- desired internship role or type
- remote preference

The product should preserve the student's wording for matching evidence while also creating a concise summary. Required information must be clear. When information is incomplete, the product asks for the missing piece step by step and explains why it matters before attempting recommendations.

- [ ] A student can complete the MVP profile and submit it.
- [ ] The product does not present a confident match when a required profile detail is unavailable or ambiguous.
- [ ] The student sees a concise summary that reflects the submitted skills, projects, interests, experience, and goal.

### Explainable Internship Matching

The product compares the completed profile with a small fixed set of identifiable internship records. The result is exactly three recommendations for the normal demo profile. Matching should be consistent for the same profile and source data. A structured, inspectable matching process determines requirement states, match levels, and strong-match thresholds. AI may interpret free-text descriptions and phrase explanations, but it must not be the unpredictable authority that decides the core match.

Each recommendation preview shows the opportunity identity, role or type, a simple match level, a short explanation of why it appeared, relevant strengths, relevant gaps, and a source reference. The explanation is more important than the match indicator.

- [ ] The same profile and unchanged opportunity records produce the same selected recommendations and match states.
- [ ] Every stated match or gap points to a profile detail or opportunity requirement that the student can inspect.
- [ ] The results view shows three recommendations for the normal demo path, without becoming a large listing feed.
- [ ] Each recommendation includes an identifiable source reference.

### Detailed Match and Action

The detailed view begins with the internship name, organization, role, and an overall explanation. It then presents:

- **What you match:** important requirements the student appears to satisfy, each connected to a specific profile skill or project.
- **What you're missing:** important requirements not present in the profile, distinguished between definitely missing and not provided. Each gap is described as a learnable gap or a significant eligibility issue where the evidence supports that distinction.
- **Evidence:** relevant source information used in the analysis, with source facts clearly labeled separately from AI-generated interpretation and a source name or link.
- **Your next step:** exactly one practical action connected to the most important gap or opportunity, such as applying now or improving a specific skill or project before applying.

If the profile does not provide enough information to determine whether a requirement is met, the product labels it as unclear rather than a match or a gap.

- [ ] A student can open a recommendation and inspect all four sections.
- [ ] The detail view makes the difference between source fact, profile evidence, interpretation, missing information, and confirmed gap understandable.
- [ ] The detail view provides one actionable next step, not a checklist.
- [ ] The next step is traceable to the most important identified gap or strength.

## States and Boundaries

- **First use:** The student sees the cinematic introduction and must choose the primary CTA before entering profile information.
- **Incomplete profile:** The product explains what information is needed and guides the student through each missing step. It does not generate recommendations from insufficient context.
- **Interpreting:** A short loading state explains that the profile and goals are being understood. It should not be an empty or unexplained transition.
- **Normal results:** The student sees a concise summary and exactly three source-backed recommendations.
- **Unclear requirement:** A requirement that cannot be determined from the profile is labeled unclear, not incorrectly marked as satisfied or missing.
- **No strong match:** The product avoids fabricated or weakly confident recommendations and guides the student toward the most important skill and project improvements.
- **Source limitation:** The fixed opportunity records are the available dataset for the MVP. The product does not imply that it searched every internship platform.
- **Failure or unavailable analysis:** The student should receive a clear explanation and a way to return to or revise their profile rather than an invented result.
- **Persistence:** Persistence between sessions is not part of the approved POC unless required by the later technical plan; the demo only needs the single end-to-end journey.

## Product Decisions

- Use one internship-focused journey for the MVP; hackathons, communities, mentors, and networking remain later expansions because a full career platform would dilute the core proof.
- Use a small fixed, source-backed opportunity set instead of live aggregation because live collection would make the build too large and the demo unreliable.
- Show exactly three recommendations because this demonstrates comparison without recreating an overwhelming job board.
- Prioritize explanations and evidence over a match percentage because the product's value is understanding relevance and next action.
- Separate source facts from interpretation and mark uncertainty because the student should not have to blindly trust an AI decision.
- End with exactly one next action because a long checklist would reduce the practical focus.
- Use the adapted cinematic Nexeus-inspired visual structure for the first surface because the learner chose it as the UI direction; the product copy and identity remain Opportunity Compass.
- Treat a looping background video as optional polish so the 2-4 hour build prioritizes matching and evidence over asset work.

## What We're Building

A polished, single-student internship-matching proof of concept that takes a profile and goal, interprets them, compares them with a fixed source-backed dataset, returns three explainable recommendations, supports detailed evidence inspection, and gives one practical action or a guided improvement path.

## Deferred From the POC

- Accounts, saved profiles, and cross-session history: not needed to prove one complete demo journey.
- Live scraping, ingestion, and synchronization across external platforms: too large and unreliable for the timebox.
- Community, mentor, teammate, and networking discovery: connected to the learner's motivation but outside the internship matching proof.
- Application submission, messaging, and follow-up tracking: the MVP recommends actions but does not act for the student.

## Possible Later Enhancements

The fixed opportunity set could expand into fresh internships, hackathons, learning programs, communities, and mentors once the explainable matching model is proven. The product could later track progress on skill gaps, remember preferences, and connect students to people around an opportunity.

## Non-Goals

- It will not be a general job board or a complete career platform.
- It will not claim to find every available internship.
- It will not invent opportunity requirements, sources, eligibility, or student experience.
- It will not treat uncertain information as a confirmed match or gap.
- It will not automatically apply, contact people, or make decisions on the student's behalf.

## Open Questions

- **Before `4-spec`:** Which small set of real, identifiable internship sources and records will populate the demo dataset? The records must contain enough explicit requirements and source details to support the evidence view.
- **Before `4-spec`:** What exact criteria and weighting define the stable match level and the threshold for a strong match? The technical plan should make this structured and inspectable rather than leaving the core result to unpredictable LLM judgment.
- **Can wait until build:** Exact wording for loading messages, field labels, and individual action-plan phrasing, provided they preserve the behaviors above.
