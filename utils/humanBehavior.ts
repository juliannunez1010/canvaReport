import { Locator, Page } from "@playwright/test";

export async function humanClick(locator:Locator) {
    await randomDelay(100, 500);
    await locator.hover();
    await randomDelay(50, 200);
    await locator.click();
}

export async function humanType(locator:Locator, text:string) {
    await locator.click();
    await randomDelay(50, 150);
    await locator.pressSequentially(text);
}

export async function humanScroll(page: Page, verticalPixels: number) {
    await randomDelay(1000, 2000);
    await page.mouse.wheel(0, verticalPixels);
    await randomDelay(2000, 3000);
}

async function randomDelay(min: number, max: number) {
    const duration = Math.floor(Math.random() * (max - min +1)) + min;
    return new Promise(resolve => setTimeout(resolve, duration));
}