const faqs = document.querySelectorAll('.faq');

faqs.forEach(faq => {
  faq.addEventListener('click', e => {
    if (faq.classList.contains('active')) {
      faq.classList.remove('active');
    } else {
      faqs.forEach(faq => faq.classList.remove('active'));
      faq.classList.add('active');
    }
  });
});
