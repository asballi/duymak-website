// Product category filtering
(function () {
  'use strict';

  var filterButtons = document.querySelectorAll('.filter-btn');
  var productCards = document.querySelectorAll('.product-card');
  var emptyMessage = document.querySelector('.products-empty');

  if (filterButtons.length === 0 || productCards.length === 0) return;

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var category = this.getAttribute('data-category');

      // Update active button
      filterButtons.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-pressed', 'true');

      // Filter cards
      var visibleCount = 0;
      productCards.forEach(function (card) {
        var cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // Show/hide empty message
      if (emptyMessage) {
        if (visibleCount === 0) {
          emptyMessage.classList.add('visible');
        } else {
          emptyMessage.classList.remove('visible');
        }
      }
    });
  });
})();
