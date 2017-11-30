import { ProjetPage } from './app.po';

describe('projet App', function() {
  let page: ProjetPage;

  beforeEach(() => {
    page = new ProjetPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
