---
doc: scope
status: approved
---

# Opportunity Compass

One line: An explainable internship-matching companion that turns a student's profile and goal into a small set of source-backed matches and one useful next action.

## The Unique Kernel

Instead of acting like a generic job board, the product explains why each fixed internship opportunity matches a specific student, what evidence supports the match, what is missing, and what the student should do next. It separates facts from the opportunity source from the AI's interpretation.

## Who It's For

A student who wants a tech internship but is unsure which opportunities fit their current skills, projects, interests, experience level, and remote-work preferences. Today, they search scattered platforms and must work out relevance, eligibility, skill gaps, and next steps themselves.

## The Core Loop

The student describes their current profile and internship goal. The product creates a concise profile summary, compares it with a small fixed set of source-backed internship records, and returns a few relevant matches. The student opens a match to inspect the evidence, strengths, gaps, and recommended next action, then chooses one opportunity and receives a specific action plan.

## Inspiration & Identity

No specific product or visual reference was provided. The intended identity is an intelligent, trustworthy career and learning companion: focused, clear, practical, and evidence-based rather than overwhelming or generic.

## Why This Matters to the Learner

The learner personally wants to grow in tech, find internships, build projects, join hackathons and coding communities, and meet people with similar interests. They experience the ecosystem as fragmented and want to understand how AI can turn scattered opportunity information into personalized, actionable guidance. Building this will also let them practice understanding AI-generated code, APIs, data processing, product planning, and better agent prompting.

## What "Working" Looks Like

A demo student enters a profile containing skills such as HTML, CSS, JavaScript, React, and Node.js, several projects, an experience level, interests, and a preference for a remote internship. The app summarizes the profile and goal, selects relevant internships from its fixed source-backed dataset, and explains each match using the student's actual details and the opportunity's requirements. When the student selects one, the app recommends a concrete next action such as applying now or improving a specific skill or project first. The compelling moment is seeing a recommendation that is traceable to both sides of the match rather than a generic AI suggestion.

## The POC Boundary

- One student-facing internship-matching journey.
- A profile and goal input covering skills, projects, experience, interests, internship type, and remote preference.
- A concise AI-generated profile-and-goal summary.
- A small fixed set of identifiable, source-backed internship opportunities stored in the application.
- Consistent matching based on profile and opportunity data.
- Explanations showing matching evidence, unmet requirements or gaps, and the distinction between source facts and interpretation.
- One specific next-action plan for a selected opportunity.
- A polished, demonstrable end-to-end flow; database size and live aggregation are not the goal.

## Later

Hackathons, learning opportunities, coding communities, mentors, teammates, networking connections, live opportunity collection, broader personalization, and richer action tracking.

## Explicitly Cut

- Live scraping or aggregation across LinkedIn, Discord, WhatsApp, GitHub, Devpost, college groups, and other platforms: too large and unreliable for the demo.
- A complete career or social-network platform: it would dilute the core matching and reasoning experience.
- A large opportunity database: the proof is the quality and traceability of the match, not the number of listings.
- Automated applications or messaging: the MVP should recommend an action, not act on the student's behalf.
