import { test } from '../fixtures/test'
import { exportToExcel } from '../utils/excelUtils';

test.beforeEach(async ({login}) => {
    const user = process.env.CANVAUSERNAME!;
    const password = process.env.PASSW!;

    await login.loginUser(user, password);
    await login.goToTemplateAnalytics();
});

test("Create canva usage report Pro", async({template}) => {
    const reportName = "ReportPro.xlsx"
    await template.goToPro();
    await template.scrollToBottom();
    const reportData = await template.getDataFromTable();
    await exportToExcel(reportData, reportName);
})

test("Create canva usage report Free", async({template}) => {
    const reportName = "ReportFree.xlsx"
    await template.goToFree();
    await template.scrollToBottom();
    const reportData = await template.getDataFromTable();
    await exportToExcel(reportData, reportName);
})