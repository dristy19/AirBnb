// ------------------------ Form Validation ------------------------
(function () {
  'use strict';

  const forms = document.querySelectorAll('.needs-validation');
  Array.prototype.slice.call(forms).forEach(form => {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();

// ------------------------ Toggle Full Review ------------------------
function toggleFullReview(link) {
  const shortText = link.closest('.rvw-comment').querySelector('.rvw-short');
  const fullText = link.closest('.rvw-comment').querySelector('.rvw-full');

  if (fullText.style.display === '' || fullText.style.display === 'none') {
    fullText.style.display = 'inline';
    shortText.style.display = 'none';
    link.textContent = 'Show less';
  } else {
    fullText.style.display = 'none';
    shortText.style.display = 'inline';
    link.textContent = 'Show more';
  }
}

// ------------------------ Navbar Scroll ------------------------
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  navbar.style.top = (scrollTop > lastScrollTop && scrollTop > 50) ? '-70px' : '0';
  lastScrollTop = scrollTop;
});

// ------------------------ Category Filter ------------------------
document.addEventListener('DOMContentLoaded', function () {
  const categoryItems = document.querySelectorAll('.category-item');
  const listingCards = document.querySelectorAll('.listing-card-wrapper');

  function filterListings(selectedCategory) {
    listingCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      card.style.display = (selectedCategory === '' || cardCategory === selectedCategory) ? 'block' : 'none';
    });
  }

  categoryItems.forEach(item => {
    item.addEventListener('click', function () {
      categoryItems.forEach(cat => cat.classList.remove('active'));
      this.classList.add('active');
      filterListings(this.getAttribute('data-category'));
    });
  });
});

// ------------------------ Auto Close Alerts ------------------------
setTimeout(() => {
  document.querySelectorAll('.alert').forEach(alert => {
    const bsAlert = bootstrap.Alert.getOrCreateInstance(alert);
    bsAlert.close();
  });
}, 30000);
