(() => {
  const buddy = document.querySelector('#protoBuddy');
  if (!buddy) return;
  const panel = buddy.querySelector('#buddyAssistant');
  const close = buddy.querySelector('.assistant-close');

  function toggleAssistant(force) {
    if (!panel) return;
    const open = typeof force === 'boolean' ? force : panel.hidden;
    panel.hidden = !open;
    buddy.setAttribute('aria-expanded', String(open));
  }

  buddy.addEventListener('click', event => {
    if (event.target.closest('.buddy-assistant')) return;
    toggleAssistant();
  });

  buddy.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleAssistant();
    }
    if (event.key === 'Escape') toggleAssistant(false);
  });

  close?.addEventListener('click', () => toggleAssistant(false));

  document.addEventListener('click', event => {
    if (panel && !panel.hidden && !buddy.contains(event.target)) toggleAssistant(false);
  });

  buddy.querySelectorAll('[data-assist]').forEach(button => {
    button.addEventListener('click', () => {
      const action = button.dataset.assist;
      toggleAssistant(false);
      if (action === 'idea') {
        const modal = document.querySelector('#ideaModal');
        if (modal?.showModal) modal.showModal();
        else window.location.href = 'index.html#start';
      } else if (action === 'help') {
        const modal = document.querySelector('#helpModal');
        if (modal?.showModal) modal.showModal();
        else window.location.href = 'index.html#help';
      }
    });
  });
})();