import { Page } from '@playwright/test';
import { BasePage } from '@tests-pages/BasePage';

export class Home extends BasePage {
  public mainLogoButton = this.page.locator(
    '//a[contains(@class, "navigation_navigationLogoLink")]'
  );

  public footerLinkedInButton = this.page.locator('//img[@alt="Linkedin"]/parent::a');

  public footerGithubButton = this.page.locator('//img[@alt="Github"]/parent::a');

  public footerYoutubeButton = this.page.locator('//img[@alt=""Youtube]/parent::a');

  constructor(page: Page) {
    super(page);
    this.slug = '/';
  }

  async clickLogo() {
    await this.mainLogoButton.click();
  }

  async clickLinkedInFooterButton() {
    await this.footerLinkedInButton.click();
  }

  async clickGithubFooterButton() {
    await this.footerGithubButton.click();
  }

  async clickYoutubeFooterButton() {
    await this.footerYoutubeButton.click();
  }
}
