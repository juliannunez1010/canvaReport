import { expect, Locator, Page } from "@playwright/test";
import { humanClick, humanType } from "../utils/humanBehavior";

export class LoginPage {

    readonly page: Page;
    readonly loginLink: Locator;
    readonly continueWithEmailButton: Locator;
    readonly emailInput: Locator;
    readonly continueButton: Locator;
    readonly passInput: Locator;
    readonly loginButton: Locator;
    readonly mainHeader: Locator;
    readonly searchBar: Locator;

    constructor(page:Page) {
        this.page = page;
        this.loginLink = page.getByRole("link", {name: "Iniciar sesión"});
        this.continueWithEmailButton = page.getByRole("button", {name: "Usar mi correo"});
        this.emailInput = page.getByRole('textbox', { name: 'Correo (personal o del' });
        this.continueButton = page.getByRole("button", {name: "Continuar"});
        this.passInput = page.getByRole("textbox", {name: "Contraseña"});
        this.loginButton = page.getByRole("button", {name: "Iniciar sesión"});
        this.mainHeader = page.getByRole("heading", {name: "What will you design today?"});
        this.searchBar = page.getByRole("searchbox");

    }

    async goToCanva() {
        await this.page.goto("/");
    }

    async loginUser(user: string, password: string) {
        await this.goToCanva();
        await humanClick(this.loginLink);
        await humanClick(this.continueWithEmailButton);
        await humanType(this.emailInput, user);
        await humanClick(this.continueButton);
        await humanType(this.passInput, password);
        await humanClick(this.loginButton);
        //await expect(this.mainHeader).toBeVisible();
        await expect(this.searchBar).toBeVisible();
    }

    async goToTemplateAnalytics() {
        await this.page.goto("/creators/template/dashboard");
    }
}