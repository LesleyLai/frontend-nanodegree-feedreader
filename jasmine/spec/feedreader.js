/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This suite is all about the RSS feeds definitions,
   * the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* Ensures each feed in the allFeeds object has a URL defined
     * and that the URL is not empty.
     */
    it('has URL defined in each feed', () => {
      allFeeds.forEach((entry) => {
        const url = entry.url;
        expect(url).toBeDefined();
        expect(url).not.toEqual("");
      });
    });

    /* Ensures each feed in the allFeeds object has a name defined
     * and that the name is not empty.
     */
    it('has name defined in each feed', () => {
      allFeeds.forEach((entry) => {
        const name = entry.name;
        expect(name).toBeDefined();
        expect(name).not.toEqual("");
      });
    });
  });


  /*
   * Test Suite about the sidebar menu
   */
  describe("The menu", () => {
    // Ensures the menu element is hidden by default.
    it('is hidden by default', () => {
      expect($('body').hasClass('menu-hidden')).toBeTruthy();
    });

    // Ensures the menu changes visibility
    // when the menu icon is clicked.
    it('changes visibility when clicked', () => {
      const menuIcon = $('.menu-icon-link');
      menuIcon.click();
      expect($('body').hasClass('menu-hidden')).toBeFalsy();
      menuIcon.click();
      expect($('body').hasClass('menu-hidden')).toBeTruthy();
    });
  });

  describe("Initial Entries", () => {
    beforeEach((done) => {
      loadFeed(0, done);
    });

    it('has at lease one feed', () => {
      const feeds = $('.feed .entry');
      expect(feeds.length).not.toBe(0);
    });
  });

  describe("New Feed Selection", () => {
    let initialString;

    beforeEach((done) => {
      loadFeed(0, () => {
        initialString = $(".feed :first-child").text();
        loadFeed(1, done);
      });
    });

    it('changes content when load new feed', () => {
      expect($(".feed :first-child").text()).not.toBe(initialString);
    });


  });
}());
