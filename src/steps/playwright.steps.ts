import { Given, When, Then } from '@cucumber/cucumber'
import { ICustomWorld } from '../support/custom-world'
import { expect } from '@playwright/test';
import { HomePage } from '../page-objects/homepage'
import { WishListPage } from '../page-objects/wishlistpage'
import { CartPage } from '../page-objects/cartpage'

Given('I add {string} different products to my wish list', async function (
  this: ICustomWorld,
  number: string) 
{
  const page = this.page!;
  await page.goto('https://testscriptdemo.com');
  const homePage = new HomePage(page);
  expect(homePage.title).toHaveText("TESTSCRIPTDEMO – Automation Practice")
  await homePage.addProductsToWishList(parseInt(number));
});

    When('I view my wishlist table', async function (this: ICustomWorld) {
        const page = this.page!;
        const homePage = new HomePage(page);
        await homePage.viewWishList();   
    });

    Then('I find total {string} selected items in my Wishlist', async function (
      this: ICustomWorld,
      number: string) {
        const page = this.page!;
        const wishListPage = new WishListPage(page);
        await expect(wishListPage.productsInWishList).toHaveCount(parseInt(number));    
    });

    When('I search for lowest price product', async function (this: ICustomWorld) {
        const page = this.page!;
        const wishListPage = new WishListPage(page);
        this.lowestPrice = 0.00;
        this.lowestPriceRowIndex = -1;
        for (var p = 0; p < await wishListPage.productsInWishList.count(); p++)
        {
          var priceInnerText = await wishListPage.getProductPrice(p);

          if ((await priceInnerText.innerText()).includes(" – "))
          {
            var amountInnerText = await wishListPage.getProductPriceRange(p);
          }
          else
          {
            if (await wishListPage.getAmountCount(p) == 1)
            {
              var amountInnerText = await wishListPage.getSingleProductPrice(p);
            }
            else
            {
              var amountInnerText = await wishListPage.getDiscountedProductPrice(p);
            }
          }

          var amountParsed = parseInt(amountInnerText.substring(1));

          if (this.lowestPrice == 0.00)
          {
            this.lowestPrice = amountParsed;
            this.lowestPriceRowIndex = p;
          }
          else
          {
            if (amountParsed < this.lowestPrice)
            {
              this.lowestPrice = amountParsed;
              this.lowestPriceRowIndex = p;
            }
          }
        }
        console.log(`Lowest Price product was: £${this.lowestPrice}`)   
    });  

    When('I am able to add the lowest price item to my cart', async function (this: ICustomWorld) {
        const page = this.page!;
        const wishListPage = new WishListPage(page);
        await wishListPage.addProductToCart(this.lowestPriceRowIndex)     
    });

    Then('I am able to verify the item in my cart', async function (this: ICustomWorld) {
        const page = this.page!;
        const wishListPage = new WishListPage(page);
        const cartPage = new CartPage(page);
        wishListPage.goToCart();
        await expect(cartPage.cartItems).toHaveCount(1);
        expect(parseInt((await cartPage.getProductPrice()))).toBe(this.lowestPrice);
    });