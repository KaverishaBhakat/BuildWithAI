import normalization from '../data/normalization.json' with { type: 'json' };

const aliasEntries = Object.entries(normalization.aliases).map(([alias, tag]) => [clean(alias), tag]);

function clean(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[.,/()]/g, ' ')
    .replace(/\s+/g, ' ');
}

function canonicalize(value) {
  const cleaned = clean(value);
  return aliasEntries.find(([alias]) => alias === cleaned)?.[1] ?? cleaned.replace(/\s+/g, '-');
}

function extractTags(values) {
  return [...new Set(values.flatMap((value) => {
    const cleaned = clean(value);
    const directTag = aliasEntries.find(([alias]) => alias === cleaned)?.[1];
    const matchingTags = aliasEntries
      .filter(([alias]) => cleaned.includes(alias))
      .map(([, tag]) => tag);
    return directTag ? [directTag, ...matchingTags] : matchingTags;
  }))].filter(Boolean);
}

function findRoleTags(values) {
  const combined = values.map(clean).join(' ');
  return Object.entries(normalization.roleTags)
    .filter(([, aliases]) => aliases.some((alias) => combined.includes(alias)))
    .map(([tag]) => tag);
}

export function normalizeProfile(profile) {
  const projects = Array.isArray(profile.projects) ? profile.projects : [];
  const skillValues = Array.isArray(profile.skills) ? profile.skills : [];
  const interestValues = Array.isArray(profile.interests) ? profile.interests : [];
  const projectText = projects.map((project) => `${project.title ?? ''} ${project.description ?? ''}`);
  const desiredRole = String(profile.desiredRole ?? '').trim();

  return {
    raw: profile,
    skills: extractTags(skillValues),
    projectTags: extractTags(projectText),
    interests: extractTags(interestValues),
    roleTags: findRoleTags([desiredRole, ...interestValues]),
    desiredRole,
    experienceLevel: profile.experienceLevel || 'unknown',
    remotePreference: profile.remotePreference || 'unknown',
    projects
  };
}

export function validateProfile(profile) {
  const missing = [];
  if (!Array.isArray(profile.skills) || profile.skills.length === 0) missing.push('skills');
  if (!Array.isArray(profile.projects) || profile.projects.length === 0) missing.push('projects');
  if (!profile.experienceLevel) missing.push('experience level');
  if (!Array.isArray(profile.interests) || profile.interests.length === 0) missing.push('interests');
  if (!profile.desiredRole?.trim()) missing.push('desired role');
  if (!profile.remotePreference) missing.push('remote preference');
  return missing;
}
