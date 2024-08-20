function clearDisplay() {
    document.querySelector('#display').value = '';
}

function deleteLast() {
    let display = document.querySelector('#display');
    display.value = display.value.toString().slice(0, -1);
}

function appendToDisplay(value) {
    let display = document.querySelector('#display');
    display.value += value;
}

function calculateResult() {
    let display = document.querySelector('#display');
    try {
        display.value = eval(display.value);
    } catch (e) {
        display.value = 'Error';
    }
}
function power() {
    let display = document.querySelector('#display');
   
}
function calculatePower() {
    let display = document.querySelector('#display');
    let value = display.value;
    if (value.includes('^')) {
        let [base, exponent] = value.split('^').map(Number);

        if (!isNaN(base) && !isNaN(exponent)) {
            display.value = Math.pow(base, exponent);
        } else {
            display.value = 'Error';
        }
    } else {
        display.value += '^';
    }
}
function calculateRoot() {
    let display = document.querySelector('#display');
    let value = parseFloat(display.value);

    if (!isNaN(value)) {
        display.value = Math.sqrt(value);
    } else {
        display.value = 'Error';
    }
}



