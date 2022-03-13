import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly productPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator(".cart_item");
    this.productPrice = page.locator(".cart_item .product-price span bdi");
  }

  async getProductPrice()
  {
      const productPrice = this.productPrice.innerText();
      return (await productPrice).substring(1).substring(0, 2)
  }
}