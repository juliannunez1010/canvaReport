import ExcelJS from 'exceljs';
import path from 'path';
import { Report } from '../types/report';


export async function exportToExcel(data: Report[], fileName = 'report.xlsx') {
    const workBook = new ExcelJS.Workbook();
    const workSheet = workBook.addWorksheet('Data');

    workSheet.columns = [
        {header: 'Template', key: 'template'},
        {header: 'Published', key: 'published'},
        {header: 'Total Applied', key: 'totalApplied'},
        {header: 'Total Usages', key: 'totalUsages'}
    ]

    workSheet.getRow(1).font = {bold: true};

    workSheet.addRows(data);

    try {
        const fullPath = path.resolve(process.cwd(), fileName);
        await workBook.xlsx.writeFile(fullPath);
        console.log(`Data successfully saved in ${fullPath}`);
    } catch (error) {
        console.log("Error creating data: ", error);
    }
}