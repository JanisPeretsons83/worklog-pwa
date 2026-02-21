// Adding event listener for exportPdfBtn
exportPdfBtn.addEventListener('click', function() {
    const monthData = getMonthData(); // Assuming this function exists to retrieve the required month data
    pdfExport.startExport(monthData);
});