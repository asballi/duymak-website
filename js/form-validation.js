// Contact form validation
(function () {
  'use strict';

  var form = document.getElementById('contact-form');
  if (!form) return;

  var successMessage = document.getElementById('form-success');

  var validators = {
    name: function (value) {
      if (!value.trim()) return 'Ad Soyad alanı zorunludur.';
      if (value.trim().length < 2) return 'Ad Soyad en az 2 karakter olmalıdır.';
      return '';
    },
    phone: function (value) {
      if (!value.trim()) return 'Telefon alanı zorunludur.';
      // Turkish phone: 05XX XXX XX XX or +90 5XX XXX XX XX
      var cleaned = value.replace(/[\s\-\(\)]/g, '');
      var phoneRegex = /^(\+90|0)?5\d{9}$/;
      if (!phoneRegex.test(cleaned)) return 'Geçerli bir Türk telefon numarası giriniz. (Örn: 0532 123 45 67)';
      return '';
    },
    email: function (value) {
      if (!value.trim()) return 'E-posta alanı zorunludur.';
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return 'Geçerli bir e-posta adresi giriniz.';
      return '';
    },
    subject: function (value) {
      if (!value) return 'Lütfen bir konu seçiniz.';
      return '';
    },
    message: function (value) {
      if (!value.trim()) return 'Mesaj alanı zorunludur.';
      if (value.trim().length < 10) return 'Mesajınız en az 10 karakter olmalıdır.';
      return '';
    },
    kvkk: function (value) {
      if (!value) return 'KVKK onayı zorunludur.';
      return '';
    }
  };

  function showError(fieldName, message) {
    var field = form.querySelector('[name="' + fieldName + '"]');
    var errorEl = document.getElementById(fieldName + '-error');
    if (field && field.type !== 'checkbox') {
      field.setAttribute('aria-invalid', 'true');
    }
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  }

  function clearError(fieldName) {
    var field = form.querySelector('[name="' + fieldName + '"]');
    var errorEl = document.getElementById(fieldName + '-error');
    if (field && field.type !== 'checkbox') {
      field.removeAttribute('aria-invalid');
    }
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }
  }

  function validateField(fieldName) {
    var field = form.querySelector('[name="' + fieldName + '"]');
    if (!field) return true;

    var value = field.type === 'checkbox' ? field.checked : field.value;
    var error = validators[fieldName] ? validators[fieldName](value) : '';

    if (error) {
      showError(fieldName, error);
      return false;
    } else {
      clearError(fieldName);
      return true;
    }
  }

  // Real-time validation on blur
  var fields = ['name', 'phone', 'email', 'subject', 'message'];
  fields.forEach(function (fieldName) {
    var field = form.querySelector('[name="' + fieldName + '"]');
    if (field) {
      field.addEventListener('blur', function () {
        validateField(fieldName);
      });
      field.addEventListener('input', function () {
        if (field.getAttribute('aria-invalid') === 'true') {
          validateField(fieldName);
        }
      });
    }
  });

  // Form submit
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var allValid = true;
    var firstInvalid = null;

    var allFields = ['name', 'phone', 'email', 'subject', 'message', 'kvkk'];
    allFields.forEach(function (fieldName) {
      var valid = validateField(fieldName);
      if (!valid && !firstInvalid) {
        firstInvalid = form.querySelector('[name="' + fieldName + '"]');
      }
      if (!valid) allValid = false;
    });

    if (!allValid) {
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Success
    form.style.display = 'none';
    if (successMessage) {
      successMessage.classList.add('visible');
      successMessage.focus();
    }
  });
})();
