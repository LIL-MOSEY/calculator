function showFields() {
    const operation = document.getElementById('operation').value;
    const inputFields = document.getElementById('input-fields');
    inputFields.innerHTML = '';

    let fields = '';

    switch (operation) {
        case 'q1':
            fields += '<input type="number" id="p" placeholder="Enter present value" required>';
            fields += '<input type="number" id="r" placeholder="Enter annual interest rate (%)" required>';
            fields += '<input type="number" id="y" placeholder="Enter number of years" required>';
            break;
        case 'q2':
            fields += '<input type="number" id="f" placeholder="Enter future value" required>';
            fields += '<input type="number" id="r" placeholder="Enter annual interest rate (%)" required>';
            fields += '<input type="number" id="y" placeholder="Enter number of years" required>';
            break;
        case 'q3':
            fields += '<input type="number" id="f" placeholder="Enter future value" required>';
            fields += '<input type="number" id="r1" placeholder="Enter initial interest rate (%)" required>';
            fields += '<input type="number" id="r2" placeholder="Enter new interest rate (%)" required>';
            fields += '<input type="number" id="y" placeholder="Enter number of years" required>';
            break;
        case 'q4':
            fields += '<input type="number" id="gdp" placeholder="Enter initial GDP" required>';
            fields += '<input type="number" id="growth" placeholder="Enter growth rate (%)" required>';
            fields += '<input type="number" id="year" placeholder="Enter number of years" required>';
            break;
        case 'q5':
            fields += '<input type="number" id="c" placeholder="Enter consumption" required>';
            fields += '<input type="number" id="i" placeholder="Enter investment" required>';
            fields += '<input type="number" id="g" placeholder="Enter government spending" required>';
            fields += '<input type="number" id="x" placeholder="Enter exports" required>';
            fields += '<input type="number" id="m" placeholder="Enter imports" required>';
            break;
        case 'aggregateModel':
            fields += '<input type="number" id="a" placeholder="Enter autonomous consumption" required>';
            fields += '<input type="number" id="b" placeholder="Enter marginal propensity to consume" required>';
            fields += '<input type="number" id="i" placeholder="Enter investment" required>';
            fields += '<input type="number" id="g" placeholder="Enter government spending" required>';
            fields += '<input type="number" id="go" placeholder="Enter change in government spending" required>';
            fields += '<input type="number" id="x" placeholder="Enter exports" required>';
            fields += '<input type="number" id="m" placeholder="Enter imports" required>';
            fields += '<input type="number" id="t" placeholder="Enter taxes" required>';
            fields += '<input type="number" id="to" placeholder="Enter change in taxes" required>';
            fields += '<input type="number" id="raised" placeholder="Enter the raised amount (default is 5)" value="5" required>';
            break;
        case 'interestRateParity':
            fields += '<input type="number" id="us_rate" placeholder="Enter US interest rate (%)" required>';
            fields += '<input type="number" id="foreign_rate" placeholder="Enter foreign interest rate (%)" required>';
            fields += '<input type="number" id="exchange_rate" placeholder="Enter current exchange rate" required>';
            break;
        case 'q6':
            fields += '<input type="number" id="p" placeholder="Enter present value" required>';
            fields += '<input type="number" id="r" placeholder="Enter annual interest rate (%)" required>';
            fields += '<input type="number" id="y" placeholder="Enter number of years" required>';
            break;
    }

    inputFields.innerHTML = fields;
}

function calculate() {
    const operation = document.getElementById('operation').value;
    const result = document.getElementById('result');
    result.innerHTML = '';

    switch (operation) {
        case 'q1':
            const p = parseFloat(document.getElementById('p').value);
            const r = parseFloat(document.getElementById('r').value);
            const y = parseInt(document.getElementById('y').value);
            const futureValue = p * (1 + r / 100) ** y;
            result.innerHTML = 'Q1. The future value is ' + futureValue.toFixed(2);
            break;
        case 'q2':
            const f = parseFloat(document.getElementById('f').value);
            const r2 = parseFloat(document.getElementById('r').value);
            const y2 = parseInt(document.getElementById('y').value);
            const presentValue = f / (1 + r2 / 100) ** y2;
            result.innerHTML = 'Q2. The present value is ' + presentValue.toFixed(2);
            break;
        case 'q3':
            const f3 = parseFloat(document.getElementById('f').value);
            const r13 = parseFloat(document.getElementById('r1').value);
            const r23 = parseFloat(document.getElementById('r2').value);
            const y3 = parseInt(document.getElementById('y').value);
            const drop = Math.abs(f3 / (1 + r13 / 100) ** y3 - f3 / (1 + r23 / 100) ** y3);
            result.innerHTML = 'Q3. The present value will drop ' + drop.toFixed(2);
            break;
        case 'q4':
            const gdp = parseFloat(document.getElementById('gdp').value);
            const growth = parseFloat(document.getElementById('growth').value);
            const year = parseInt(document.getElementById('year').value);
            const realGdp = gdp * (1 + growth / 100) ** year;
            result.innerHTML = 'Q4. Real GDP at the end of the period will be ' + realGdp.toFixed(2);
            break;
        case 'q5':
            const c = parseFloat(document.getElementById('c').value);
            const i = parseFloat(document.getElementById('i').value);
            const g = parseFloat(document.getElementById('g').value);
            const x = parseFloat(document.getElementById('x').value);
            const m = parseFloat(document.getElementById('m').value);
            const gdpValue = c + i + g + x - m;
            result.innerHTML = 'Q5. GDP was ' + gdpValue.toFixed(2);
            break;
        case 'aggregateModel':
            const a = parseFloat(document.getElementById('a').value);
            const b = parseFloat(document.getElementById('b').value);
            const i1 = parseFloat(document.getElementById('i1').value);
            const g1 = parseFloat(document.getElementById('g1').value);
            const go = parseFloat(document.getElementById('go').value);
            const x1 = parseFloat(document.getElementById('x1').value);
            const m1 = parseFloat(document.getElementById('m1').value);
            const t = parseFloat(document.getElementById('t').value);
            const to = parseFloat(document.getElementById('to').value);
            const raised = parseFloat(document.getElementById('raised').value);

            const y1 = (a + i1 + g1 + x1 - m1 - b * t) / (1 - b + b * to + go);
            const multiplier = 1 / (1 - b + b * to + go);
            const taxMultiplier = -b / (1 - b + b * to + go);
            const new_y = y1 + raised * multiplier;
            const new_b = (1 - 1 / multiplier + go) / (1 - to);
            const new_c = a + b * y1;
            const new_g = g - go * y1;
            const new_t = t + to * y1;

            result.innerHTML = `
                Equilibrium y is ${y1.toFixed(2)}<br>
                Multiplier for investment is ${multiplier.toFixed(2)}<br>
                Multiplier for government spending is ${multiplier.toFixed(2)}<br>
                Multiplier for tax is ${taxMultiplier.toFixed(2)}<br>
                New value of Y will be ${new_y.toFixed(2)}<br>
                Value of b is ${new_b.toFixed(2)}<br>
                Value of C at equilibrium is ${new_c.toFixed(2)}<br>
                Value of G at equilibrium is ${new_g.toFixed(2)}<br>
                Value of T at equilibrium is ${new_t.toFixed(2)}
            `;
            break;
        case 'interestRateParity':
            const us_rate = parseFloat(document.getElementById('us_rate').value);
            const foreign_rate = parseFloat(document.getElementById('foreign_rate').value);
            const exchange_rate = parseFloat(document.getElementById('exchange_rate').value);

            const e1 = exchange_rate / (1 + us_rate / 100) * (1 + foreign_rate / 100);
            let parityResult = `If the exchange rate in one year becomes ${e1.toFixed(3)}, it will leave the investor indifferent.`;

            if (e1 < exchange_rate) {
                parityResult += '<br>Given the new exchange rate, foreign appreciated.';
            } else if (e1 > exchange_rate) {
                parityResult += '<br>Given the new exchange rate, foreign depreciated.';
            } else {
                parityResult += '<br>The exchange rate is the same, so nothing happened.';
            }
            result.innerHTML = parityResult;
            break;
        case 'q6':
            const p6 = parseFloat(document.getElementById('p').value);
            const r6 = parseFloat(document.getElementById('r').value);
            const y6 = parseInt(document.getElementById('y').value);
            const futureValue6 = p6 * (1 + r6 / 100) ** y6;
            result.innerHTML = 'Q6. The future value with simple annual compounding is ' + futureValue6.toFixed(2);
            break;
    }
}
