import { Locator, Page } from '@playwright/test';

export class WishListPage {
  readonly page: Page;
  readonly productsInWishList: Locator;
  readonly lnkCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsInWishList = page.locator("tbody tr");
    this.lnkCart = page.locator(".cart-contents").nth(0);
  }

  async getProductPrice(productIndex: number)
  {
    return this.productsInWishList.nth(productIndex).locator(".product-price");    
  }

  async getProductPriceInnerText(productIndex: number)
  {
    return (await this.getProductPrice(productIndex)).innerText()
  }

  async getProductPriceRange(productIndex: number)
  {
    const productPrice = await this.getProductPrice(productIndex);
    const productPriceRange = productPrice.locator(".amount").nth(1).locator("bdi");
    return await productPriceRange.innerText();
  }

  async getSingleProductPrice(productIndex: number)
  {
    const productPrice = await this.getProductPrice(productIndex);
    var singleProductPrice = productPrice.locator(".amount").locator("bdi");
    return await singleProductPrice.innerText();
  }

  async getDiscountedProductPrice(productIndex: number)
  {
    const productPrice = await this.getProductPrice(productIndex);
    var discountedProductPrice = productPrice.locator(".amount").nth(1).locator("bdi");
    return await discountedProductPrice.innerText();
  }

  async getAmountCount(productIndex: number)
  {
    const productPrice = await this.getProductPrice(productIndex);
    return await productPrice.locator(".amount").count();
  }

  async addProductToCart(productIndex: number)
  {
    const btnAddProductToCart = this.productsInWishList
      .nth(productIndex)
      .locator(".product-add-to-cart a")
    await btnAddProductToCart.click();
  }

  async goToCart()
  {
  await this.lnkCart.click();
  }
}