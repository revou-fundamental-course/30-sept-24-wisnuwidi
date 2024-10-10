// Simplify The Code To Get The Document Targeting From ID, by Default, Else By Class
function getElm(node, targetID = true) {
	// Return If targetID set with false
	if (!targetID) return document.getElementsByClassName(node);

	// Default Return
	return document.getElementById(node);
}

// Check If Empty Value
function isEmpty(str) {
	return !str.trim().length;
}

// Set Disabled Element
function disabElm(elm) {
	return elm.setAttribute('disabled', '');
}

// Reseting Element Value
function resetValue(elm) {
	return elm.value = '';
}

// Iteration Elements
function elmIterates(elements, actionFunc) {
	elements.forEach((e) => {
		actionFunc(e);
    });
}

// Disable Multiple Elements
function disableElements(elements) {
	elmIterates(elements, disabElm);
}

// Reset Multiple Elements
function resetElements(elements) {
	elmIterates(elements, resetValue);
}

// Calculation By Method
function calculation(input) {
	var resultData;
	switch(getElm('calcMethod').value) {
		case 'celcius': /*(inputValue °C × 9/5) + 32 = Result °F*/
			resultData = Math.floor((parseFloat(input) * 9/5) + 32);
		break;
		case 'fahrenheit': /*(inputValue °F − 32) × 5/9 = Result °C*/
			resultData = Math.ceil((parseFloat(input) - 32) * 5/9);
	}
	
	return resultData;
}

// Parsing Text To HTML
function parsingToHTML(text) {
	const parser		= new DOMParser();
	const doc			= parser.parseFromString(text, 'text/html');

	return doc.body.innerHTML;
}

// Create New Elements
function createNewElement(tag, attributes = {}, text = '') {
	// Create New Tag Element
	const element = document.createElement(tag);

	// Draw Some Attributes For That Element Created
	for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);
	
	// If any text found, then create text.
	// But check and parsing that text into HTML, if contain any HTML character
	if (text) element.innerHTML = parsingToHTML(text);

	// Draw New HTML Element
	return element;
}

let calcResultInfo;
function drawCalculationInfo(methodName, inputNumber) {
	if ('celcius' === methodName) {
		calcResultInfo = '(' + inputNumber + ' &deg;C × 9/5) + 32 = ' + Math.floor((parseFloat(inputNumber) * 9/5) + 32) + ' &deg;F';
	} else {
		calcResultInfo = '(' + inputNumber + ' &deg;F − 32) × 5/9 = ' + Math.ceil((parseFloat(inputNumber) - 32) * 5/9) + ' &deg;C';
	}
	
	return calcResultInfo;
}

// Create Multiple Elements Based On createNewElement() Function Above 
function createMultipleElements(elements) {
	return elements.map(({ tag, attributes, text }) => createNewElement(tag, attributes, text));
}

// Create Const Variable From Document
const headerBox		= getElm('header-box');
const calcBox		= getElm('calc-box');
const convertionBox	= getElm('conv-box');
const buttonsBox	= getElm('button-box');
const infoBox		= getElm('info-box');

// Create Input Elements (Left Box)
const inputCalc = createMultipleElements([
	{
		// Create Select Box Calculation Method
		tag: 'select',
		attributes: {
			'id'	: 'calcMethod',
			'class'	: 'calc-method s-25 line-box'
		},
		text:
			'<option value="">Pilih Konversi</option>' +
			'<option value="celcius">(&deg; C) Celcius</option>' +
			'<option value="fahrenheit">(&deg; F) Fahrenheit</option>'
	}, {
		// Create Calculation Input Box
		tag: 'input',
		attributes: {
			'name'	: 'inputCalc',
			'id'	: 'inputCalcID',
			'class'	: 'input s-75'
		}
	}
]);
// Draw Calculation Box
inputCalc.forEach(inputCalc => calcBox.appendChild(inputCalc));

// Create Input Elements (Right Box)
const inputConvertion = createMultipleElements([
	{
		// Create Label [ Fahrenheit ]
		tag: 'label',
		attributes: {
			'for'	: 'inputConvertionID',
			'id'	: 'inputConvertionlabel',
			'class'	: 'label input-label s-25'
		},
		text: 'Hasil Konversi'
	}, {
		// Create Input [ Fahrenheit ]
		tag: 'input',
		attributes: {
			'name'	: 'inputConvertion',
			'id'	: 'inputConvertionID',
			'class'	: 'input s-25 line-box'
		}
	}, {
		// Create Input [ Fahrenheit ]
		tag: 'input',
		attributes: {
			'id'	: 'inputConvertionInfo',
			'class'	: 'input s-50 line-box'
		}
	}
]);
// Draw Label & InputBox [ Fahrenheit ]
inputConvertion.forEach(inputConvertion => convertionBox.appendChild(inputConvertion));

// Create Button Elements
const buttonsElm = createMultipleElements([
	{
		// Create Reset Button
		tag: 'button',
		attributes: {
			'name'	: 'reset',
			'id'	: 'buttonReset',
			'class'	: 'button'
		},
		text: 'Reset'
	}, {
		// Create Reverse Button
		tag: 'button',
		attributes: {
			'name'	: 'reverse',
			'id'	: 'buttonReverse',
			'class'	: 'button'
		},
		text: 'Reverse'
	}
]);
// Draw Buttons
buttonsElm.forEach(buttonsElm => buttonsBox.appendChild(buttonsElm));

// Create Toggle Elements
const headerElm = createMultipleElements([
	{
		// Create Clock
		tag: 'div',
		attributes: {
			'id'	: 'clock',
			'class'	: 'clock-container'
		},
		text: ''
	}, {
		// Create Label [ Fahrenheit ]
		tag: 'h1',
		attributes: {},
		text: 'Konversi Suhu'
	}, {
		// Create Label [ Fahrenheit ]
		tag: 'label',
		attributes: {
			'for'	: 'toggleBox',
			'class'	: 'label input-label'
		},
		text: 'Switch Mode'
	}, {
		// Create Reset Button
		tag: 'div',
		attributes: {
			'id'	: 'toggleContainer',
			'class'	: 'toggle-container'
		},
		text: '<div id="toggleBox" class="toggle"></div>'
	}
]);
// Draw Buttons
headerElm.forEach(headerElm => headerBox.appendChild(headerElm));

// Identifiers Variable
let calcInput		= getElm('inputCalcID');
let convInput		= getElm('inputConvertionID');
let convInfo		= getElm('inputConvertionInfo');
let notification	= getElm('notification');

// Initialize Buttons
const buttonReset	= getElm('buttonReset');
const buttonReverse = getElm('buttonReverse');

// Event Listener For Reset Button
buttonReset.addEventListener('click', () => {
	getElm('info-box').innerHTML = '';
	resetElements([getElm('calcMethod'), calcInput, convInput, convInfo]);
	disableElements([calcInput, convInput, convInfo, buttonReset, buttonReverse]);
});

// Set Action Buttons When On-Load Windows
window.onload = () => {
	disableElements([calcInput, convInput, convInfo, buttonReset, buttonReverse]);
}

function notif(alert = '') {
	return notification.innerHTML = alert;
}

// Event Listener For Input Calulation
function conversionMethod(inputValue = 0) {
	var methodName;
	
	if (!isEmpty(inputValue)) {
		// Check If Selection Method Change With Input Value Not Empty[0]
		methodName = 'celcius';
		if ('celcius' === getElm('calcMethod').value) methodName = 'fahrenheit';
		getElm('inputConvertionInfo').value = parsingToHTML('&deg;') + methodName;
		
		return convInput.value = calculation(calcInput.value);
		
	} else {
		// Check If Method Selected
		return calcInput.addEventListener('input', () => {
			
			// Check Input Data Type
			if (isNaN(calcInput.value) || isEmpty(calcInput.value)) {
				// When Input Value Is Not Number/Float And/Or It Was Empty
				notif (
					'<div class="danger">' +
					'<span class="close-btn" onclick="this.parentElement.style.display=\'none\';">&times;</span>' +
					'Ups, Data Harus Diisi Dan Wajib Berupa Angka Atau Desimal!' +
					'</div>'
				);
				resetElements([calcInput, convInput]);
				disableElements([buttonReset, buttonReverse]);
				calcInput.setAttribute('class', 'input s-75 danger-info');

			} else {
				// When Input Value Is Number/Float And/Or It Was Not Empty
				notif();
				buttonReset.removeAttribute('disabled');
				buttonReverse.removeAttribute('disabled');
				
				methodName = 'celcius';
				if ('celcius' === getElm('calcMethod').value) methodName = 'fahrenheit';
				getElm('inputConvertionInfo').value = parsingToHTML('&deg;') + methodName;
				
				drawElementsInfo();
				calcInput.setAttribute('class', 'input s-75');
				convInput.value = calculation(calcInput.value);
			}
		});
	}
}

// Create Information Elements
function infoElements(infoCalc = null, infoNotes = null, title = 'Info Kalkulasi') {
	getElm('info-box').innerHTML = '';
	
	dataArray = [
		{
			// Title
			tag: 'h3',
			attributes: {
				'id'	: 'info-title',
				'class'	: 'info'
			},
			text: title
		}, {
			// Calc Text Info
			tag: 'p',
			attributes: {
				'id'	: 'info-calc',
				'class'	: 'info'
			},
			text: infoCalc
		}, {
			// Text Notes
			tag: 'details',
			attributes: {
				'id'	: 'info-notes',
				'class'	: 'info'
			},
			text: infoNotes
		}
	];
	
	if (null !== infoCalc && '' !== infoCalc) {
		// Create Informations Box
		const infoElm = createMultipleElements(dataArray);
		
		// Draw Info Box
		infoElm.forEach(infoElm => infoBox.appendChild(infoElm));
	}
}

// Draw Information Elements
function drawElementsInfo() {
	if (!isEmpty(calcInput.value)) {
		let getMethodName	= getElm('calcMethod').value;
		let textInfoValue	= 'Rumus Kalkulasi: <code>' + drawCalculationInfo(getMethodName, calcInput.value) + '</code>';
		let methodNameInfo	= '<u>Konversi Celcius Ke Fahrenheit</u>';
		
		if ('fahrenheit' === getMethodName) methodNameInfo	= '<u>Konversi Fahrenheit Ke Celcius</u>';
		
		let textInfo		= 'Info Kalkulasi: ' + methodNameInfo;
		let textInfoNotes	= '<summary><strong>Keterangan:</strong></summary>' + 
			'Suhu S dalam derajat Fahrenheit (&deg;F) sama dengan suhu S dalam derajat Celcius (&deg;C) kali 9/5 tambah 32.' + 
			'<p><code>S(&deg;F) = (S(&deg;C) x 9/5) + 32</code> atau <code>S(&deg;F) = (S(&deg;C) x 1,8) + 32</code></p>'
		;
		
		if ('fahrenheit' === getMethodName) {
			textInfoNotes	= '<summary><strong>Keterangan:</strong></summary>' + 
				'Suhu S dalam derajat Celcius (&deg;C) sama dengan suhu S dalam derajat Fahrenheit (&deg;F) kurang 32 kali 5/9.'			+ 
				'<p><code>S(&deg;C) = (S(&deg;F) - 32) x 5/9</code> atau <code>S(&deg;C) = (S(&deg;F) - 32 ) x 1,8</code></p>'
			;
		}
		
		return infoElements(textInfoValue, textInfoNotes, textInfo);
	}
}

// Calculation Method For Event Method Listener
function readEventMethodListener(value) {		
	calcInput.removeAttribute('disabled');
	
	if(isEmpty(value)) {
		resetElements([calcInput, convInput, convInfo]);
		disableElements([calcInput, convInput, convInfo, buttonReset, buttonReverse]);
	} else {
		drawElementsInfo();
		calcInput.focus();
		return conversionMethod(calcInput.value);
	}
}

// Event Listener For Selection Method
getElm('calcMethod').addEventListener('change', () => {
	infoElements();
	readEventMethodListener(getElm('calcMethod').value);
});

// Event Listener For Reverse Button
buttonReverse.addEventListener('click', () => {
	let methodName	= getElm('calcMethod');
	let nodeValue	= convInput.value;
	
	var setMethod;
	if ('celcius' === methodName.value) {
		setMethod = 'fahrenheit';
	} else {
		setMethod = 'celcius';
	}
	
	methodName.value	= setMethod;
	calcInput.value		= nodeValue;
	
	readEventMethodListener(setMethod);
});

// Select the toggle switch
const toggle	= document.querySelector('.toggle');
const body		= document.body;

// Function to toggle dark mode
toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    body.classList.toggle('dark-mode');
});

function updateClock() {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };

    // Format date
    const date = now.toLocaleDateString('en-GB', options);
    
    // Format time
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0'); // Get milliseconds

    // Update clock
    const clockElement = document.getElementById('clock');
    clockElement.innerHTML = `${date} <span class="floating">${hours}</span>:<span class="floating">${minutes}</span>:<span class="floating">${seconds}</span>:${milliseconds}`;
}

// Update clock every 100 milliseconds
setInterval(updateClock, 100);
updateClock(); // Initial call to display clock immediately