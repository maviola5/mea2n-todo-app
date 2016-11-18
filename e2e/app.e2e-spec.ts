import { Mea2nTodoAppPage } from './app.po';

describe('mea2n-todo-app App', function() {
  let page: Mea2nTodoAppPage;

  beforeEach(() => {
    page = new Mea2nTodoAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
