let correspond = {
    'Название': 'schoolName',
    'Субъект федерации': 'federalSubject',
    'Город': 'city',
    'Балл': ['scoreFrom', 'scoreTo'],
    'Доля бюджетников': ['budgetShareFrom', 'budgetShareTo']
};

document.addEventListener("DOMContentLoaded", function() {
    createTable(school, 'list');
    document.getElementById("filter").addEventListener("submit", function(event) {
        event.preventDefault();
        applyFilters();
    });
    document.getElementById("clearFilters").addEventListener("click", function(event) {
        event.preventDefault();
        clearFilters();
    });
    document.getElementById("sort").addEventListener("submit", function(event) {
        event.preventDefault();
        applySort();
    });
    document.getElementById("graphForm").addEventListener("submit", function(event) {
        event.preventDefault();
        drawGraph();
    });
});

let createTable = (data, idTable) => {
    let table = document.getElementById(idTable);
    table.innerHTML = '';

    let tr = document.createElement('tr');
    for (let key in data[0]) {
        let th = document.createElement('th');
        th.innerHTML = key;
        tr.append(th);
    }
    table.append(tr);

    data.forEach(item => {
        let tr = document.createElement('tr');
        for (let key in item) {
            let td = document.createElement('td');
            td.innerHTML = item[key];
            tr.append(td);
        }
        table.append(tr);
    });
};

let dataFilter = (dataForm) => {
    let dictFilter = {}; // данные фильтра
    for (let j = 0; j < dataForm.elements.length; j++) {
        let item = dataForm.elements[j];
        let valInput = item.value;
        if (item.type == "text") {
            valInput = valInput.toLowerCase();
        } else if (item.type == "number") {
            valInput = valInput ? parseFloat(valInput) : (item.id.includes('From') ? -Infinity : Infinity);
        }
        dictFilter[item.id] = valInput;
    }
    return dictFilter;
};

let filterTable = (data, idTable, dataForm) => {
    try {
        let datafilter = dataFilter(dataForm);

        let tableFilter = data.filter(item => {
            let result = true;
            for (let key in item) {
                let val = item[key];
                if (typeof val == 'string') {
                    val = val.toLowerCase();
                    result &&= val.includes(datafilter[correspond[key]]);
                }
                if (typeof val == 'number') {
                    let range = correspond[key];
                    result &&= val >= datafilter[range[0]] && val <= datafilter[range[1]];
                }
            }
            return result;
        });

        createTable(tableFilter, idTable);
    } catch (error) {
        console.error("Error filtering table:", error);
    }
};

let applyFilters = () => {
    try {
        let dataForm = document.getElementById("filter");
        filterTable(school, "list", dataForm);
    } catch (error) {
        console.error("Error applying filters:", error);
    }
};

let clearFilters = () => {
    try {
        document.getElementById('filter').reset();
        createTable(school, 'list');
    } catch (error) {
        console.error("Error clearing filters:", error);
    }
};

let getSortOrder = (selectElement) => {
    return selectElement.value === "По возрастанию" ? 1 : -1;
};

let applySort = () => {
    try {
        let firstLevelField = document.getElementById("firstLevelField").value;
        let firstLevelOrder = getSortOrder(document.getElementById("firstLevelOrder"));
        let secondLevelField = document.getElementById("secondLevelField").value;
        let secondLevelOrder = getSortOrder(document.getElementById("secondLevelOrder"));
        let thirdLevelField = document.getElementById("thirdLevelField").value;
        let thirdLevelOrder = getSortOrder(document.getElementById("thirdLevelOrder"));

        let sortFields = [
            { field: firstLevelField, order: firstLevelOrder },
            { field: secondLevelField, order: secondLevelOrder },
            { field: thirdLevelField, order: thirdLevelOrder }
        ];

        let sortedData = school.slice().sort((a, b) => {
            for (let sortField of sortFields) {
                let field = sortField.field;
                let order = sortField.order;
                if (a[field] > b[field]) return order;
                if (a[field] < b[field]) return -order;
            }
            return 0;
        });

        createTable(sortedData, 'list');
    } catch (error) {
        console.error("Error applying sort:", error);
    }
};

//График
function What_is(data){
    if(data.oy[0].checked ) return 0
    if(data.oy[1].checked ) return 0
    if(data.oy[2].checked ) return 1
    if(data.oy[3].checked ) return 1
    if(data.oy[4].checked ) return 2
    if(data.oy[5].checked ) return 2
}

function createArrGraph(data, key,number) {
    let what = number==0?'Средний размер':number==1?'Средний вес':'Средняя продолжительность жизни'
    groupObj = d3.group(data, (d) => d[key]);

    return Array.from(groupObj, ([labelX, values]) => ({
        labelX,
        values: d3.extent(values, d => d[what])

    }));
}

const marginX = 100;
const marginY = 150;
const height = 600;
const width = 1000;
let svg = d3.select("svg").attr("height", height).attr("width", width);

function What_is(form) {
    let values = [];
    for (let i = 0; i < form.oy.length; i++) {
        if (form.oy[i].checked) {
            values.push(form.oy[i].value);
        }
    }
    console.log("Selected values for Y axis:", values); // Debug output
    return values;
}

function createArrGraph(data, key, values) {
    let groupObj = d3.group(data, d => d[key]);
    let arrGraph = Array.from(groupObj, ([labelX, valuesArr]) => {
        let result = { labelX };
        values.forEach(value => {
            let min = d3.min(valuesArr, d => d[value]);
            let max = d3.max(valuesArr, d => d[value]);
            result[value] = [min, max];
        });
        return result;
    });
    console.log("Array for graph:", arrGraph); // Debug output
    return arrGraph;
}

function drawGraph() {
    const form = document.getElementById('graphForm');
    const keyX = form.ox.value;
    const values = What_is(form);

    console.log("Key for X axis:", keyX); // Debug output

    if (values.length === 0) return;

    const arrGraph = createArrGraph(school, keyX, values);

    console.log("Array for graph:", arrGraph); // Debug output

    svg.selectAll("*").remove();
    const [scX, scY] = createAxis(arrGraph, values);

    values.forEach((value, index) => {
        createChart(arrGraph, scX, scY, value, index);
    });
}

function createAxis(data, values) {
    let ranges = values.map(value => d3.extent(data.map(d => d[value])));
    let min = d3.min(ranges.flat());
    let max = d3.max(ranges.flat());

    console.log("Axis ranges - Min:", min, "Max:", max); // Debug output

    let scaleX = d3.scaleBand()
        .domain(data.map(d => d.labelX))
        .range([0, width - 2 * marginX]);
    let scaleY = d3.scaleLinear()
        .domain([min * 0.85, max * 1.1])
        .range([height - 2 * marginY, 0]);

    let axisX = d3.axisBottom(scaleX);
    let axisY = d3.axisLeft(scaleY);
    svg.append("g")
        .attr("transform", `translate(${marginX}, ${height - marginY})`)
        .call(axisX)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");
    svg.append("g")
        .attr("transform", `translate(${marginX}, ${marginY})`)
        .call(axisY);

    return [scaleX, scaleY];
}

function createChart(data, scaleX, scaleY, key, index) {
    const colors = ["lightgreen", "purple", "blue", "orange"];
    svg.selectAll(".rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "rect")
        .attr("x", d => scaleX(d.labelX))
        .attr("y", d => scaleY(d[key][1]) - marginY)
        .attr("width", scaleX.bandwidth() - 5)
        .attr("height", d => height - scaleY(d[key][0]) - marginY)
        .attr("transform", `translate(${marginX}, ${marginY})`)
        .style("fill", colors[index % colors.length]);
}

function changeState(form, value){
    for(let i=0;i<6;++i){
        if(!form.oy[i].value.includes(value)) form.oy[i].checked=false;
    }
}