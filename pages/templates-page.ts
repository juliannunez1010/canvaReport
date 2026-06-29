import { expect, Locator, Page } from "@playwright/test";
import { humanScroll } from "../utils/humanBehavior";
import { Report } from "../types/report";



export class TemplatesPage {
    readonly page: Page;
    readonly myPerformanceHeader: Locator;
    readonly bodyPage: Locator;
    readonly contentTypeComboBox: Locator;
    readonly freeButton: Locator;
    readonly proButton: Locator;
    readonly templateUsageTable: Locator;
    readonly dataRangeComboBox: Locator;
    readonly lastMonthButton: Locator;

    constructor(page:Page) {
        this.page = page;
        this.myPerformanceHeader = page.getByRole("heading", { name: "Mi desempeño" });
        this.bodyPage = page.locator(".L74Q6g");
        this.contentTypeComboBox = page.getByRole('combobox', { name: 'Gratis y Pro' });
        this.freeButton = page.getByRole("option", { name: "Free", exact: true });
        this.proButton = page.getByRole("option", { name: "Pro", exact: true });
        this.templateUsageTable = page.locator("._57YXoA");
        this.dataRangeComboBox = page.getByRole('combobox', { name: 'Filtrar por fecha' });
        this.lastMonthButton = page.getByRole("option", { name: "El mes pasado", exact: true });
    }

    async goToFree() {
        await this.contentTypeComboBox.click();
        await this.freeButton.click();
        await this.dataRangeComboBox.click();
        await this.lastMonthButton.click();
    }

    async goToPro() {
        await this.contentTypeComboBox.click();
        await this.proButton.click();
        await this.dataRangeComboBox.click();
        await this.lastMonthButton.click();
    }

    async scrollToBottom() {
        let currentHeight;
        let heightAfterScroll;
        let coincidences = 0;
        const scrollingStep = 5900;
        await expect(this.myPerformanceHeader).toBeVisible();
        await this.bodyPage.hover();
        
        do {
            currentHeight = await this.getViewHeight();
            console.log(`Current height: ${currentHeight}`);
            await humanScroll(this.page, scrollingStep);
            heightAfterScroll = await this.getViewHeight();
            console.log(`Height after scrolling: ${heightAfterScroll}`);
            coincidences = currentHeight === heightAfterScroll ? coincidences + 1 : 0;
            console.log(`Coincidences: ${coincidences}`)
        } while (coincidences < 4)
    }

    async getViewHeight(): Promise<number> {
        const viewHeight = await this.page.evaluate(async () => {
            const templatesContainer = document.querySelector(".L74Q6g");

            if (!templatesContainer) {
                throw new Error(`No se encontró elemento para hacer scroll`)
            }

            return templatesContainer?.scrollHeight;
        });
        return viewHeight;
    }

    async getDataFromTable(): Promise<Array<Report>> {
        let reportArray: Array<Report> = [];

        const rows = await this.templateUsageTable.locator("tr").all();
        for (const row of rows) {
            const cells = await row.locator('td').all();

            const template = await cells.at(0)?.innerText() ?? "Error";
            const published = await cells.at(1)?.innerText() ?? "Error";
            const totalApplied = await cells.at(2)?.innerText() ?? "Error";
            const totalUsages = await cells.at(3)?.innerText() ?? "Error";

            const reportObject: Report = {
                template: template.split('\n')[0],
                published: published.split('\n')[0],
                totalApplied: totalApplied.split('\n')[0],
                totalUsages: totalUsages.split('\n')[0]
            }

            console.log(`Template object: ${JSON.stringify(reportObject)}`);
            reportArray.push(reportObject);
            
        }

        console.log(`Full template array: ${JSON.stringify(reportArray)}`);
        return reportArray;
    }

    async generateDataObject() {

    }
}