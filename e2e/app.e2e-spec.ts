import { AlbPage } from './app.po';

describe('alb App', function() {
  let page: AlbPage;

  beforeEach(() => {
    page = new AlbPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
