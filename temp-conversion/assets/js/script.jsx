// Simplify The Code To Get The Document Targeting From ID, by Default, Else By Class
function getElm(node, targetID = true) {
    // Return If targetID set with false
    if (!targetID) return document.getElementsByClassName(node);
    
    // Default Return
    return document.getElementById(node);
}

// Create New Elements
function createNewElement(tag, attributes = {}, text = '') {
    // Create New Tag Element
    const element = document.createElement(tag);
    
    // Draw Some Attributes For That Element Created
    for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);

    // If any text found, then create text.
    // But check and parsing that text into HTML, if contain any HTML character
    if (text) {
        const parser        = new DOMParser();
        const doc           = parser.parseFromString(text, 'text/html');
        element.innerHTML   = doc.body.innerHTML;
    }

    // Draw New HTML Element
    return element;
}

// Create Multiple Elements Based On createNewElement() Function Above 
function createMultipleElements(elements) {
    return elements.map(({ tag, attributes, text }) => createNewElement(tag, attributes, text));
}

// Create Const Variable From Document
const leftBox       = getElm('left-box');
const rightBox      = getElm('right-box');
const buttonsBox    = getElm('button-box');
const infoBox       = getElm('info-box');

// Create Input Elements (Left Box)
const inputLeft = createMultipleElements([
    {
        // Create Label [ Celcius ]
        tag: 'label',
        attributes: { 
            'for'   : 'inputLeftID',
            'id'    : 'inputLeftlabel',
            'class' : 'label input-label'
        }, 
        text: 'Celcius (&deg;C)' 
    }, {
        // Create Input [ Celcius ]
        tag: 'input',
        attributes: {
            'name'  : 'inputLeft',
            'id'    : 'inputLeftID',
            'class' : 'input'
        }
    }
]);
// Draw Label & InputBox [ Celcius ]
inputLeft.forEach(inputLeft => leftBox.appendChild(inputLeft));

// Create Input Elements (Right Box)
const inputRight = createMultipleElements([
    {
        // Create Label [ Fahrenheit ]
        tag: 'label',
        attributes: { 
            'for'   : 'inputRightID',
            'id'    : 'inputRightlabel',
            'class' : 'label input-label'
        }, 
        text: 'Fahrenheit (&deg;F)' 
    }, {
        // Create Input [ Fahrenheit ]
        tag: 'input',
        attributes: {
            'name'  : 'inputRight',
            'id'    : 'inputRightID',
            'class' : 'input'
        }
    }
]);
// Draw Label & InputBox [ Fahrenheit ]
inputRight.forEach(inputRight => rightBox.appendChild(inputRight));

// Create Button Elements
const buttonsElm = createMultipleElements([
    {
        // Create Reset Button
        tag: 'button',
        attributes: {
            'name'  : 'reset',
            'id'    : 'buttonReset',
            'class' : 'button'
        }, 
        text: 'Reset' 
    }, {
        // Create Reverse Button
        tag: 'button',
        attributes: {
            'name'  : 'reverse',
            'id'    : 'buttonReverse',
            'class' : 'button'
        }, 
        text: 'Reverse' 
    }
]);
// Draw Buttons
buttonsElm.forEach(buttonsElm => buttonsBox.appendChild(buttonsElm));

// Event Listener
getElm('inputLeftID').addEventListener('input', (n) => {

    // Check Input Data Type
    if (isNaN(getElm('inputLeftID').value)) {
        getElm('notification').innerHTML    = 'Not a Number!';
        getElm('inputLeftID').value         = '';
        getElm('inputRightID').value        = '';
        
    } else {
        getElm('notification').innerHTML    = '';
        const nValue                        = getElm('inputLeftID').value;
        getElm('inputRightID').value        = parseFloat(nValue) * (9/5) + 32;
    }
});

// Initialize Buttons
const buttonReset   = getElm('buttonReset');
const buttonReverse = getElm('buttonReverse');

// Set Action Buttons When On-Load Windows
window.onload = () => {
    buttonReset.setAttribute('disabled', '');
    buttonReverse.setAttribute('disabled', '');
}

// Event Listener For Reset Button
buttonReset.addEventListener('click', (n) => {
    alert(getElm('buttonReset').value);
});

// Create Informations Box
const infoElm = createMultipleElements([
    {
        // Create Reset info
        tag: 'h3',
        attributes: {
            'id'    : 'info',
            'class' : 'info'
        }, 
        text: 'Info Kalkulasi'
    }
]);
// Draw Info Box
infoElm.forEach(infoElm => infoBox.appendChild(infoElm));