import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly title: Locator;
  readonly products: Locator;
  readonly lnkAddToWishlist: Locator;
  readonly lnkWishList: Locator;
  readonly logo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator("title")
    this.products = page.locator(".products").nth(0).locator("li")
    this.lnkAddToWishlist = page.locator("a[href*='add_to_wishlist']")
    this.lnkWishList = page.locator(".header-right > .header-wishlist > a[title='Wishlist']");
    this.logo = page.locator(".custom-logo").nth(0);
  }

  async addProductsToWishList(number: number)
  {
      for (let p: number = 0; p < number; p++)
      {
        await this.products.nth(p).first().click();
        await this.logo.click();
        await this.lnkAddToWishlist.first().click();
      }
  }

  async viewWishList()
  {
    await this.lnkWishList.click();
  }
}