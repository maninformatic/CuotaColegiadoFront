import { CuotaColegiadoFrontPage } from './app.po';

describe('cuota-colegiado-front App', function() {
  let page: CuotaColegiadoFrontPage;

  beforeEach(() => {
    page = new CuotaColegiadoFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
