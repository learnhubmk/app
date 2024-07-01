import { Page } from '@playwright/test';

export abstract class BasePage {
  public page: Page;

  public slug = '/';

  constructor(page: Page) {
    this.page = page;
  }

  async show() {
    await this.page.goto(this.slug);
  }
}
