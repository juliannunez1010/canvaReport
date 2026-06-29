import {test as baseTest, type Page} from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { TemplatesPage } from '../pages/templates-page'

type CanvaFixture = {
    login: LoginPage
    template: TemplatesPage
}

export const test = baseTest.extend<CanvaFixture>({
    login: async({page}, use) => {
        await use(new LoginPage(page));
    },
    template: async({page}, use) => {
        await use(new TemplatesPage(page));
    }
})