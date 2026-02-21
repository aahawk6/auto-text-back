document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const clientValueInput = document.getElementById('client-value');
    const missedCallsInput = document.getElementById('missed-calls');
    const closeRateInput = document.getElementById('close-rate');

    const monthlyLeftEl = document.getElementById('monthly-left');
    const weChargeEl = document.getElementById('we-charge');
    const roiEl = document.getElementById('roi');

    function calculateROI() {
        // Get values, default to 0 if empty
        const clientValue = parseFloat(clientValueInput.value) || 0;
        const weeklyMissedCalls = parseFloat(missedCallsInput.value) || 0;
        const closeRate = parseFloat(closeRateInput.value) || 0;

        // Logic:
        // 1. Convert weekly missed calls to monthly (approx 4.33 weeks/month)
        const monthlyMissedCalls = weeklyMissedCalls * 4.33;

        // 2. Calculate potential revenue from those missed calls
        // Revenue = Monthly Missed Calls * (Close Rate / 100) * Client Value
        const potentialRevenue = monthlyMissedCalls * (closeRate / 100) * clientValue;

        // 3. Calculate "Monthly Left on Table" (Net gain after cost)
        // The site subtracts the monthly cost ($297) from the potential revenue
        const monthlyCost = 297;
        const monthlyLeft = potentialRevenue - monthlyCost;

        // 4. Calculate ROI
        // ROI = (Net Profit / Cost) * 100
        let roi = 0;
        if (monthlyCost > 0) {
            roi = (monthlyLeft / monthlyCost) * 100;
        }

        // Update DOM
        monthlyLeftEl.textContent = monthlyLeft.toFixed(2);
        // weChargeEl is static 297.00
        roiEl.textContent = roi.toFixed(2) + '%';
    }

    calculateBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent form submission if inside a form (though we didn't use <form> tag to avoid reload)
        calculateROI();
    });

    // Optional: Calculate on 'Enter' key in inputs
    const inputs = [clientValueInput, missedCallsInput, closeRateInput];
    inputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                calculateROI();
            }
        });
    });
});
