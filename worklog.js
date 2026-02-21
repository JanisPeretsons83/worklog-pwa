// PDF Export Button Listener
const exportPdfBtn = document.getElementById('exportPdfBtn');
if(exportPdfBtn) {
  exportPdfBtn.addEventListener('click', function() {
    const entries = loadEntries();
    const settings = loadSettings();
    const [ms, me] = monthBounds(currentMonthAnchor);
    const startISO = localISO(ms);
    const endISO = localISO(me);
    const totals = sumPeriod(entries, startISO, endISO, settings);
    
    const monthData = {
      title: monthTitle(ms),
      workdays: countWorkdaysInMonth(ms.getFullYear(), ms.getMonth()),
      required: countWorkdaysInMonth(ms.getFullYear(), ms.getMonth()) * 8,
      totalHours: totals.total,
      normalHours: totals.normal,
      overHours: totals.over,
      amount: totals.amount,
      entries: entries.filter(e=> e.date>=startISO && e.date<=endISO)
    };
    
    if(typeof pdfExport !== 'undefined') {
      pdfExport.startExport(monthData);
    }
  });
}