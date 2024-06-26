import { Browser, BrowserContext, Page } from '@playwright/test';
import { HomeSteps } from '@tests-steps/home-step';
import { randomUUID } from 'crypto';
import { GetConfig, TestConfig } from '@tests-utils/config';
import { Logger } from 'winston';

export class BaseSpec {
  public browser: Browser;

  public context: BrowserContext;

  public page: Page;

  public logger: Logger;

  public testId: string;

  public testConfig: TestConfig;

  // Defining all steps here for reusability during tests
  public homeSteps: HomeSteps;

  constructor(browser: Browser, context: BrowserContext, page: Page) {
    this.testConfig = GetConfig();
    this.logger = this.testConfig.logger;
    this.page = page;
    this.context = context;
    this.browser = browser;

    // Setting a unique ID for each test if we decide to stream test analytics in the future
    this.testId = randomUUID();

    // Init steps
    this.homeSteps = new HomeSteps(this.page);
    this.logger.info(`Initialized base spec with BASE_URL: ${this.testConfig.BASE_URL}`);
  }
}
