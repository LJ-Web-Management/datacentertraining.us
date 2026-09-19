document.addEventListener('DOMContentLoaded', function () {

  var stripeCheckoutForm = document.getElementById('stripeCheckoutForm');
  if (!stripeCheckoutForm) return;

  var apiBaseUrl = window.API_BASE_URL || (typeof API_BASE_URL !== 'undefined' ? API_BASE_URL : 'https://hazwoper-osha.com/api');
  var activeStripeKey = (typeof STRIPE_PUBLISHABLE_KEY !== 'undefined' && STRIPE_PUBLISHABLE_KEY)
    ? STRIPE_PUBLISHABLE_KEY
    : (window.STRIPE_PUBLISHABLE_KEY || '');

  var stripe = null;
  var elements = null;
  var cardElement = null;
  var currentOrderDetails = null;

  var submitPaymentBtn = document.getElementById('submitPaymentBtn');
  var paymentErrorAlert = document.getElementById('payment-error');
  var checkoutSuccessView = document.getElementById('checkoutSuccessView');

  var getErrorMessage = function (err) {
    if (!err) return 'Payment failed. Please check your card details and try again.';
    if (typeof err === 'string') return err;
    if (err.message && typeof err.message === 'string') return err.message;
    if (err.error && typeof err.error === 'string') return err.error;
    if (err.error && err.error.message && typeof err.error.message === 'string') return err.error.message;
    try { return JSON.stringify(err); } catch (e) { return 'An unexpected error occurred during payment processing.'; }
  };

  // Parse URL search params — ?item=<slug from DC_COURSES / DC_BUNDLES in config.js>
  var urlParams = new URLSearchParams(window.location.search);
  var itemSlug = urlParams.get('item') || 'data-center-safety-bundle';
  var selected = (typeof findDcItem === 'function') ? findDcItem(itemSlug) : null;
  if (!selected) {
    selected = { type: 'bundle', name: 'Data Center Safety Bundle', price: 69, courseId: null };
  }

  var basePrice = selected.price;

  var getStripe = function () {
    if (stripe) return stripe;
    if (window.Stripe) {
      stripe = window.Stripe(activeStripeKey);
    } else {
      console.error('Stripe.js SDK not loaded');
    }
    return stripe;
  };

  var setButtonLoading = function (isLoading) {
    if (!submitPaymentBtn) return;
    var btnText = submitPaymentBtn.querySelector('.btn-text');
    var btnSpinner = submitPaymentBtn.querySelector('.btn-spinner');
    submitPaymentBtn.disabled = isLoading || (typeof CHECKOUT_DISABLED !== 'undefined' && CHECKOUT_DISABLED);
    if (btnText) btnText.hidden = isLoading;
    if (btnSpinner) btnSpinner.hidden = !isLoading;
  };

  var initCheckoutPage = function () {
    currentOrderDetails = {
      itemSlug: itemSlug,
      name: selected.name,
      type: selected.type,
      courseId: selected.courseId,
      basePrice: basePrice,
      totalPrice: basePrice
    };

    var fmt = function (amt) {
      if (typeof formatMoney === 'function') return formatMoney(amt);
      return Number(amt).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    var summaryNameEl = document.getElementById('summaryCourseName');
    var summaryQtyEl = document.getElementById('summaryCourseQty');
    var summaryAmtEl = document.getElementById('summaryCourseAmount');
    var summarySubtotalEl = document.getElementById('summarySubtotal');
    var summaryTotalEl = document.getElementById('summaryTotal');

    if (summaryNameEl) summaryNameEl.textContent = selected.name;
    if (summaryQtyEl) summaryQtyEl.textContent = selected.type === 'bundle' ? 'Bundle' : 'Qty: 1';
    if (summaryAmtEl) summaryAmtEl.textContent = '$' + fmt(basePrice);
    if (summarySubtotalEl) summarySubtotalEl.textContent = '$' + fmt(basePrice);
    if (summaryTotalEl) summaryTotalEl.textContent = '$' + fmt(basePrice);

    // Mount Stripe Card Element — fully wired even while checkout is disabled,
    // so enabling it later only requires flipping CHECKOUT_DISABLED in config.js.
    var stripeInstance = getStripe();
    if (!stripeInstance) return;

    var container = document.getElementById('payment-element');
    if (!container) return;

    try {
      elements = stripeInstance.elements();
      cardElement = elements.create('card', {
        style: {
          base: {
            fontSize: '16px',
            color: '#1d1d1f',
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
            '::placeholder': { color: '#aeaeb2' }
          },
          invalid: { color: '#dc2626' }
        }
      });
      container.innerHTML = '';
      cardElement.mount('#payment-element');
    } catch (err) {
      console.warn('Error mounting Stripe Card Element:', err);
    }

    // Checkout is disabled until Data Center Safety courses are live in the LMS.
    if (typeof CHECKOUT_DISABLED !== 'undefined' && CHECKOUT_DISABLED && submitPaymentBtn) {
      submitPaymentBtn.disabled = true;
      submitPaymentBtn.setAttribute('aria-disabled', 'true');
      var btnText = submitPaymentBtn.querySelector('.btn-text');
      if (btnText) btnText.textContent = 'Enrollment Opening Soon';
    }
  };

  // Initialize International Telephone Input (intl-tel-input)
  var iti = null;
  var phoneInput = document.getElementById('billingPhone');
  var phoneErrorEl = document.getElementById('phone-error');

  if (phoneInput && window.intlTelInput) {
    iti = window.intlTelInput(phoneInput, {
      initialCountry: 'us',
      preferredCountries: ['us', 'ca'],
      separateDialCode: true,
      autoPlaceholder: 'polite',
      formatOnDisplay: true,
      utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js'
    });

    phoneInput.addEventListener('input', function () {
      if (phoneErrorEl) phoneErrorEl.hidden = true;
      if (iti && window.intlTelInputUtils) {
        var currentVal = phoneInput.value;
        var formatted = iti.getNumber(window.intlTelInputUtils.numberFormat.NATIONAL);
        if (formatted && currentVal.length >= 3) phoneInput.value = formatted;
      }
    });

    phoneInput.addEventListener('blur', function () {
      if (phoneInput.value.trim() !== '') {
        if (!iti.isValidNumber()) {
          if (phoneErrorEl) {
            phoneErrorEl.textContent = 'Please enter a valid phone number.';
            phoneErrorEl.hidden = false;
          }
        } else if (phoneErrorEl) {
          phoneErrorEl.hidden = true;
        }
      }
    });
  }

  // Handle Form Submit
  stripeCheckoutForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Hard stop: checkout is disabled until courses are live in the LMS.
    if (typeof CHECKOUT_DISABLED !== 'undefined' && CHECKOUT_DISABLED) {
      if (paymentErrorAlert) {
        paymentErrorAlert.textContent = 'Online enrollment is opening soon. Call 1-866-429-6742 or email info@hazwoper-osha.com to enroll now.';
        paymentErrorAlert.hidden = false;
      }
      return;
    }

    setButtonLoading(true);

    if (paymentErrorAlert) { paymentErrorAlert.hidden = true; paymentErrorAlert.textContent = ''; }
    if (phoneErrorEl) phoneErrorEl.hidden = true;

    if (iti && phoneInput && phoneInput.value.trim() !== '') {
      if (!iti.isValidNumber()) {
        if (phoneErrorEl) {
          phoneErrorEl.textContent = 'Please enter a valid phone number before proceeding.';
          phoneErrorEl.hidden = false;
        }
        phoneInput.focus();
        setButtonLoading(false);
        return;
      }
    }

    var firstName = document.getElementById('billingFirstName') ? document.getElementById('billingFirstName').value.trim() : '';
    var lastName = document.getElementById('billingLastName') ? document.getElementById('billingLastName').value.trim() : '';
    var company = document.getElementById('billingCompany') ? document.getElementById('billingCompany').value.trim() : '';
    var phone = (iti && typeof iti.getNumber === 'function') ? iti.getNumber() : (document.getElementById('billingPhone') ? document.getElementById('billingPhone').value.trim() : '');
    var userEmail = document.getElementById('billingEmail') ? document.getElementById('billingEmail').value.trim() : '';
    var address1 = document.getElementById('billingAddress') ? document.getElementById('billingAddress').value.trim() : '';
    var address2 = document.getElementById('billingAddress2') ? document.getElementById('billingAddress2').value.trim() : '';
    var city = document.getElementById('billingCity') ? document.getElementById('billingCity').value.trim() : '';
    var state = document.getElementById('billingState') ? document.getElementById('billingState').value.trim() : '';
    var zip = document.getElementById('billingZip') ? document.getElementById('billingZip').value.trim() : '';
    var country = document.getElementById('billingCountry') ? document.getElementById('billingCountry').value : 'US';

    var stripeInstance = getStripe();
    if (!stripeInstance || !cardElement) {
      if (paymentErrorAlert) {
        paymentErrorAlert.textContent = 'Stripe payment SDK is not initialized. Please refresh the page.';
        paymentErrorAlert.hidden = false;
      }
      setButtonLoading(false);
      return;
    }

    // STEP 1: Process Payment with Stripe SDK FIRST
    var pmResult = await stripeInstance.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: firstName + ' ' + lastName,
        email: userEmail,
        phone: phone,
        address: { line1: address1, line2: address2, city: city, state: state, postal_code: zip, country: country }
      }
    });

    if (pmResult.error) {
      if (paymentErrorAlert) {
        paymentErrorAlert.textContent = getErrorMessage(pmResult.error);
        paymentErrorAlert.hidden = false;
      }
      setButtonLoading(false);
      return;
    }

    var paymentMethodId = pmResult.paymentMethod ? pmResult.paymentMethod.id : '';

    // STEP 2: Call add_new_user API to get customer ID
    var customerId = 0;
    try {
      var userPayload = {
        first_name: firstName, last_name: lastName, email: userEmail,
        user_name: firstName + ' ' + lastName, user_role_id: 2, phone: phone
      };
      var addUserRes = await fetch(apiBaseUrl + '/add_new_user', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userPayload)
      });
      if (addUserRes.ok) {
        var userData = await addUserRes.json();
        if (userData) {
          customerId = userData.user_id ||
            (userData.data && userData.data.user_id) ||
            (userData.success && userData.success.user_id) ||
            (userData.user && userData.user.user_id) || 0;
        }
      }
    } catch (userErr) {
      console.warn('add_new_user API call notice:', userErr);
    }

    // STEP 3: Call add_order API
    var orderId = 'DCT-' + Math.floor(100000 + Math.random() * 900000);
    try {
      var orderPayload = {
        customer_id: customerId,
        payment_method: 'stripe',
        payment_method_id: paymentMethodId,
        order_type: 'normal',
        order_status: 'pending',
        order_from: 'datacentertraining.us',
        billing_first_name: firstName,
        billing_last_name: lastName,
        billing_name: firstName + ' ' + lastName,
        billing_email: userEmail,
        billing_phone: phone,
        billing_company: company,
        billing_address_1: address1,
        billing_address_2: address2,
        billing_city: city,
        billing_state: state,
        billing_postcode: zip,
        billing_country: country,
        shipping_address_1: address1,
        shipping_address_2: address2,
        shipping_city: city,
        shipping_state: state,
        shipping_postcode: zip,
        shipping_country: country,
        courses: [
          {
            course_id: currentOrderDetails ? currentOrderDetails.courseId : null,
            quantity: 1,
            users: [ { first_name: firstName, last_name: lastName, email: userEmail, user_name: "" } ]
          }
        ]
      };

      var addOrderRes = await fetch(apiBaseUrl + '/add_order', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(orderPayload)
      });

      if (addOrderRes.ok) {
        var orderData = await addOrderRes.json();

        if (orderData && (orderData.success === false || orderData.error)) {
          if (paymentErrorAlert) {
            paymentErrorAlert.textContent = getErrorMessage(orderData.error || orderData);
            paymentErrorAlert.hidden = false;
          }
          setButtonLoading(false);
          return;
        }

        if (orderData && (orderData.order_id || orderData.id)) {
          orderId = '#' + (orderData.order_id || orderData.id);
        }

        if (orderData && orderData.clientSecret && stripeInstance) {
          var confirmRes;
          if (paymentMethodId) {
            confirmRes = await stripeInstance.confirmCardPayment(orderData.clientSecret, { payment_method: paymentMethodId });
          } else if (cardElement) {
            confirmRes = await stripeInstance.confirmCardPayment(orderData.clientSecret, {
              payment_method: { card: cardElement, billing_details: { name: firstName + ' ' + lastName, email: userEmail, phone: phone } }
            });
          } else {
            confirmRes = await stripeInstance.confirmCardPayment(orderData.clientSecret);
          }

          if (confirmRes && confirmRes.error) {
            if (paymentErrorAlert) {
              paymentErrorAlert.textContent = getErrorMessage(confirmRes.error);
              paymentErrorAlert.hidden = false;
            }
            setButtonLoading(false);
            return;
          }
        }
      } else {
        var errorData = await addOrderRes.json();
        if (paymentErrorAlert) {
          paymentErrorAlert.textContent = getErrorMessage(errorData);
          paymentErrorAlert.hidden = false;
        }
        setButtonLoading(false);
        return;
      }
    } catch (orderErr) {
      console.warn('Error executing add_order API:', orderErr);
      if (paymentErrorAlert) {
        paymentErrorAlert.textContent = getErrorMessage(orderErr);
        paymentErrorAlert.hidden = false;
      }
      setButtonLoading(false);
      return;
    }

    // Render Order Confirmation View ONLY after complete success
    stripeCheckoutForm.hidden = true;
    stripeCheckoutForm.style.display = 'none';

    var pageHeader = document.querySelector('.checkout-header');
    if (pageHeader) { pageHeader.hidden = true; pageHeader.style.display = 'none'; }

    if (checkoutSuccessView) {
      document.getElementById('successOrderId').textContent = orderId.startsWith('#') ? orderId : '#' + orderId;
      document.getElementById('successUserEmail').textContent = userEmail || 'your email';
      checkoutSuccessView.hidden = false;
      checkoutSuccessView.style.display = 'block';
      checkoutSuccessView.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    setButtonLoading(false);
  });

  initCheckoutPage();
});
