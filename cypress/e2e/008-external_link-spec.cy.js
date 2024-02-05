describe('External Link', () => {
  const externalLinks = [
    {
      selector: 'a#about_sidebar_link',
      URL: 'https://saucelabs.com/',
      name: 'About',
    },
    {
      selector: '.social_twitter a',
      URL: 'https://twitter.com/saucelabs',
      name: 'Twitter',
    },
    {
      selector: '.social_facebook a',
      URL: 'https://www.facebook.com/saucelabs',
      name: 'Facebook',
    },
    {
      selector: '.social_linkedin > a',
      URL: 'https://www.linkedin.com/company/sauce-labs/',
      name: 'LinkedIn',
    },
  ];

  externalLinks.forEach((link) => {
    it(`contains correct URL for ${link.name}`, () => {
      // Navigate to site and login
      cy.visit('/');
      cy.loginWithCredentials();

      cy.get(link.selector).should(
        'have.attr',
        'href',
        link.URL
      );
    });
  });
});
