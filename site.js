const supportedLanguages = ['tr', 'en'];
const savedLanguage = localStorage.getItem('sahtekar-site-language');
const browserLanguage = navigator.language.toLowerCase().startsWith('tr')
  ? 'tr'
  : 'en';

function setLanguage(language) {
  const nextLanguage = supportedLanguages.includes(language) ? language : 'en';
  document.documentElement.lang = nextLanguage;
  document.body.dataset.language = nextLanguage;
  localStorage.setItem('sahtekar-site-language', nextLanguage);

  document.querySelectorAll('[data-language-button]').forEach(button => {
    const selected = button.dataset.languageButton === nextLanguage;
    button.classList.toggle('is-selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });

  document.title =
    document.body.dataset[`title${nextLanguage.toUpperCase()}`] ??
    document.title;
}

document.querySelectorAll('[data-language-button]').forEach(button => {
  button.addEventListener('click', () => {
    setLanguage(button.dataset.languageButton);
  });
});

document.querySelectorAll('[data-year]').forEach(element => {
  element.textContent = new Date().getFullYear();
});

setLanguage(savedLanguage || browserLanguage);
