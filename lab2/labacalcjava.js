document.querySelectorAll('input[name="inputType"]').forEach(radio => {
    radio.addEventListener('change', function() {
        updateLabels();
    });
});

function updateLabels() {
    const inputType = document.querySelector('input[name="inputType"]:checked').value;
    const label1 = document.querySelector('label[for="input1"]');
    const label2 = document.querySelector('label[for="input2"]');
    const image = document.getElementById('triangle-image');

    if (inputType === 'catHyp') {
        label1.textContent = 'Катет (a):';
        label2.textContent = 'Гипотенуза (c):';
        image.src = 'treug.png';
    } else {
        label1.textContent = 'Катет (a):';
        label2.textContent = 'Противолежащий угол (θ):';
        image.src = 'treug.png';
    }
}

function calculate() {
    const inputType = document.querySelector('input[name="inputType"]:checked').value;
    const a = parseFloat(document.getElementById('input1').value);
    const b = parseFloat(document.getElementById('input2').value);
    const selectedOptions = Array.from(document.getElementById('calculations').selectedOptions).map(option => option.value);
    const output = document.getElementById('output');

    let errors = false;

    if (inputType === 'catHyp') {
        if (isNaN(a) || a <= 0) {
            handleError('input1');
            errors = true;
        }
        if (isNaN(b) || b <= 0) {
            handleError('input2');
            errors = true;
        }
    } else if (inputType === 'catAngle') {
        if (isNaN(a) || a <= 0) {
            handleError('input1');
            errors = true;
        }
        if (isNaN(b) || b <= 0 || b >= 90) {
            handleError('input2');
            errors = true;
        }
    }

    if (errors) {
        return;
    }

    clearError();

    let results = ["Результат:"];

    if (inputType === 'catHyp') {
        const c = b;
        const bSide = Math.sqrt(c * c - a * a);
        const bisectorA = (2 * a * bSide) / (a + bSide);
        const bisectorB = (2 * bSide * c) / (bSide + c);
        const bisectorC = (2 * a * c) / (a + c);
        const height = (a * bSide) / c;
        const radius = c / 2;
        const perimeter = a + bSide + c;

        if (selectedOptions.includes('height')) {
            results.push("Высота: " + height.toFixed(2));
        }
        if (selectedOptions.includes('radius')) {
            results.push("Радиус описанной окружности: " + radius.toFixed(2));
        }
        if (selectedOptions.includes('bisectors')) {
            results.push("Биссектрисы: " + bisectorA.toFixed(2) + ", " + bisectorB.toFixed(2) + ", " + bisectorC.toFixed(2));
        }
        if (selectedOptions.includes('perimeter')) {
            results.push("Периметр: " + perimeter.toFixed(2));
        }
    } else if (inputType === 'catAngle') {
        const theta = b;
        const c = a / Math.sin(theta * Math.PI / 180);
        const bSide = a * Math.tan(theta * Math.PI / 180);
        const bisectorA = (2 * a * bSide) / (a + bSide);
        const bisectorB = (2 * bSide * c) / (bSide + c);
        const bisectorC = (2 * a * c) / (a + c);
        const height = a * Math.tan(theta * Math.PI / 180);
        const radius = c / 2;
        const perimeter = a + bSide + c;

        if (selectedOptions.includes('height')) {
            results.push("Высота: " + height.toFixed(2));
        }
        if (selectedOptions.includes('radius')) {
            results.push("Радиус описанной окружности: " + radius.toFixed(2));
        }
        if (selectedOptions.includes('bisectors')) {
            results.push("Биссектрисы: " + bisectorA.toFixed(2) + ", " + bisectorB.toFixed(2) + ", " + bisectorC.toFixed(2));
        }
        if (selectedOptions.includes('perimeter')) {
            results.push("Периметр: " + perimeter.toFixed(2));
        }
    }

    output.textContent = results.join(' ');
}

function handleError(inputId) {
    document.getElementById(inputId).classList.add('error');
}

function clearError() {
    document.getElementById('input1').classList.remove('error');
    document.getElementById('input2').classList.remove('error');
}

function clearOutput() {
    document.getElementById('output').textContent = '';
}
