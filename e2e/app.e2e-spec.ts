import { IdeaClientPage } from './app.po';

describe('idea-client App', () => {
  let page: IdeaClientPage;

  beforeEach(() => {
    page = new IdeaClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
