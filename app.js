const textArea = document.getElementById("text");
const discount = document.getElementById("discount");
const tableContainer = document.getElementById("table");
const tableHeader = document.getElementById("head");

function handleSubmit() {
    const textData = textArea.value;

    const items = textData.split("\n");

    const separatedValues = items.map((item) => {
        const itemArr = item.split(",");
        return { year: itemArr[0], chargers: itemArr[1] };
    });
    console.log(separatedValues, parseInt(discount.value));

    const data = calculate(separatedValues, parseInt(discount.value));

    displayData(data);
}

function calculate(sampleData, discountsPerPeriod) {
    let totalDiscounts = discountsPerPeriod;
    const discountsByYear = [];

    sampleData.forEach((year, i) => {
        const discountYear = {};
        if (totalDiscounts !== 0) {
            if (totalDiscounts > year.chargers) {
                totalDiscounts = totalDiscounts - year.chargers;
                discountYear["year"] = year.year;
                discountYear["chargers"] = year.chargers;
                discountsByYear.push(discountYear);
            } else if (totalDiscounts < year.chargers) {
                discountYear["year"] = year.year;
                discountYear["chargers"] = totalDiscounts;
                discountsByYear.push(discountYear);
            }
        }
    });
    console.log(discountsByYear);
    return discountsByYear;
}

function displayData(data) {
    const table = document.createElement("table");
    table.innerHTML = `
    <tr id="head">
        <th>Year</th>
        <th># chargers</th>
        <th>annualcost</th>
    </tr>
    `;
    tableContainer.appendChild(table);
    data.forEach((year) => {
        console.log(year);
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${year.year}</td>
        <td>${year.chargers}</td>
        <td>$${year.chargers * 1400}</td>
        `;
        table.appendChild(row);
    });
}
