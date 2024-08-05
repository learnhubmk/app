import { Page } from '@playwright/test';

export abstract class BaseStep {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
