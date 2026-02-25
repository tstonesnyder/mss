(function(){
  function ready(fn){
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  ready(() => {
    // These are the page sections:
    const routes = Array.from(document.querySelectorAll('.route'));
    // These are the navigation buttons in the header (to take you to those page sections):
    const tabs = Array.from(document.querySelectorAll('.tab'));

    let cachedMailto = null;

    function show(id){
      // Hide all but the specified section:
      routes.forEach(s => s.hidden = (s.id !== id));
      // Set attribute on the nav btn for the specified section:
      tabs.forEach(t => {
        // Skip tabs that are actually links
        if (!t.dataset.target) return;
        const isCurrent = t.dataset.target === id;
        // t.setAttribute('aria-current', isCurrent ? 'page' : 'false');
        if (isCurrent) {
          t.setAttribute('aria-current', 'page');
        } else {
          t.removeAttribute('aria-current');
        }
      });
    }

    function normalizeHash(){
      const h = (location.hash || '#home').replace('#','').trim();
      return routes.some(s => s.id === h) ? h : 'home';
    }

    function buildMailto() {
      if (cachedMailto) return cachedMailto;

      // Remove the first subdomain only (www., test., etc.)
      const domain = location.hostname.split('.').slice(-2).join('.');

      const e = document.getElementById('email-enc');
      if (!e) return;
      let user = e.getAttribute('data-enc');
      if (!user) return;
      user = `to:${user.replaceAll('obble-b', '').replaceAll('-', '')}`;

      cachedMailto = `mail${user}@${domain}`;
      return cachedMailto;
    }

    function onEmailClick(e) {
      // allow modified clicks to behave normally (new tab etc.)
      const a = e.currentTarget;
      const href = buildMailto();

      // set href just-in-time
      a.setAttribute('href', href);

      // If href was "#", prevent jump and trigger navigation explicitly.
      // For normal clicks, this makes the mail client open immediately.
      if (a.getAttribute('href') === '#') {
        e.preventDefault();
        window.location.href = href;
      }
      // Otherwise let default proceed.
    }
    // // CONTACT ME BUTTON:
    // {
    //   // Remove the first subdomain only (www., test., etc.)
    //   const domain = location.hostname.split('.').slice(-2).join('.');

    //   const e = document.getElementById('email-enc');
    //   if (!e) return;
    //   let user = e.getAttribute('data-enc');
    //   if (!user) return;
    //   user = `to:${user.replaceAll('obble-b', '').replaceAll('-', '')}`;

    //   // const a = document.getElementById('contact-link');
    //   // if (!a) return;
    //   const links = document.querySelectorAll('[data-email-link]');
    //   links.forEach(a => {
    //     // let user = a.getAttribute('data-enc');
    //     // user = `to:${user.replaceAll('obble-b', '').replaceAll('-', '')}`;
    //     // Remove the first subdomain only (www., test., etc.)
    //     // let domain = location.hostname.split('.').slice(-2).join('.');
    //     a.setAttribute('href', `mail${user}@${domain}`);
    //   });
    // }
    document.querySelectorAll('[data-email-link]').forEach(a => {
      a.addEventListener('click', onEmailClick, { capture: true });
      // Optional: also do it on keyboard focus + Enter/Space is already click.
    });

    // Add handler for each nav btn in header:
    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.target;
        // skip tabs that are actually links
        if (!id) return;
        // Add this tab to history (so these nav btns in header work same as Quick Links):
        history.pushState(null, '', `#${id}`);
        show(id);
        // Ensure consistent positioning when switching "tabs"
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        // Move focus for accessibility
        const main = document.getElementById('main');
        if (main && main.focus) {
          // Keep the accessibility focus behavior without triggering scroll on pages longer than 1 screen in length
          try { main.focus({ preventScroll: true }); }
          catch { main.focus(); } // older browsers ignore preventScroll
        }
      });
    });

    window.addEventListener('hashchange', () => show(normalizeHash()));

    // Init
    show(normalizeHash());

    // SET INFO IN FOOTER:
    // Set the copyright year to CURRENT year:
    const y = document.getElementById('y');
    if (y) {
      y.textContent = String(new Date().getFullYear());
    }
    // Set the last updated date to the file's last saved date on the server (may not be correct, but better than manually setting a date).
    const d = document.getElementById('d');
    if (d) {
      const date = new Date(document.lastModified);
      d.textContent = date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      });
    }
  });
})();
