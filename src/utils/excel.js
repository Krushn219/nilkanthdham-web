import ExcelJS from 'exceljs';

const generateExcelSheet = (data, type) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Employee Details');

  // Add headers
  worksheet.addRow(['Employee ID', 'Name', 'Department', '...']); // Add necessary columns

  // Add data
  data.forEach((employee) => {
    worksheet.addRow([employee.id, employee.name, employee.department, '...']);
  });

  // Save the workbook
  const fileName = `EmployeeDetails_${type}_${new Date().toISOString()}.xlsx`;
  return workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);

    // Create a link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
  });
};

export default generateExcelSheet;
