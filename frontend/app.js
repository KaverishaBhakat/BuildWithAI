const landingView = document.querySelector('#landing-view');
const formView = document.querySelector('#form-view');
const summaryView = document.querySelector('#summary-view');
const profileForm = document.querySelector('#profile-form');
const formError = document.querySelector('#form-error');
const summaryCard = document.querySelector('#summary-card');

const showView = (view) => {
  [landingView, formView, summaryView].forEach((candidate) => candidate.classList.add('is-hidden'));
  view.classList.remove('is-hidden');
};

document.querySelector('#start-button').addEventListener('click', () => showView(formView));
document.querySelector('#edit-button').addEventListener('click', () => showView(formView));

function parseProjects(value) {
  return value.split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, ...descriptionParts] = line.split(':');
      return { title: title.trim(), description: descriptionParts.join(':').trim() || title.trim() };
    });
}

function toProfile(formData) {
  return {
    skills: formData.get('skills').split(',').map((item) => item.trim()).filter(Boolean),
    projects: parseProjects(formData.get('projects')),
    experienceLevel: formData.get('experienceLevel'),
    interests: formData.get('interests').split(',').map((item) => item.trim()).filter(Boolean),
    desiredRole: formData.get('desiredRole').trim(),
    remotePreference: formData.get('remotePreference')
  };
}

function renderSummary(profile) {
  const projectNames = profile.projects.map((project) => project.title).join(', ');
  summaryCard.innerHTML = `
    <dl>
      <dt>Skills we heard</dt><dd>${profile.skills.join(', ')}</dd>
      <dt>Projects</dt><dd>${projectNames}</dd>
      <dt>Direction</dt><dd>${profile.desiredRole}</dd>
      <dt>Interests</dt><dd>${profile.interests.join(', ')}</dd>
      <dt>Experience</dt><dd>${profile.experienceLevel}</dd>
      <dt>Preference</dt><dd>${profile.remotePreference}</dd>
      <dt>Normalized tags</dt><dd>${profile.skills.join(', ') || 'None yet'}</dd>
    </dl>`;
}

profileForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  formError.textContent = '';
  const submitButton = profileForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Understanding your profile...';

  try {
    const response = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toProfile(new FormData(profileForm)))
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Please review your profile.');
    renderSummary(result.profile);
    showView(summaryView);
  } catch (error) {
    formError.textContent = error.message;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Understand my profile';
  }
});
