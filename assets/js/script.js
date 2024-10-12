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

// Create Action For Hide/Display Element(s)
function action(action_name, elements) {
	if (elements.length >= 1) {
		elmIterates(elements, (elm) =>{
			elm.setAttribute('class', action_name);
		});
	} else {
		elements.setAttribute('class', action_name);
	}
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

// Function to insert a new element after an existing element
function insertNewElement(existingElementId, newElement) {
    // Get the existing element by its ID
    const existingElement = getElm(existingElementId);
    
    // Check if the existing element exists
    if (existingElement) {
        // Insert the new element after the existing element
        existingElement.insertAdjacentElement('afterend', newElement);
    } else {
        console.error('Element with ID ' + existingElementId + ' not found.');
    }
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

// Create Input Elements
const inputConvertion = createMultipleElements([
	{
		// Create Label Conversion
		tag: 'label',
		attributes: {
			'for'	: 'inputConvertionID',
			'id'	: 'inputConvertionlabel',
			'class'	: 'label input-label s-25'
		},
		text: 'Hasil Konversi'
	}, {
		// Create Input Conversion
		tag: 'input',
		attributes: {
			'name'	: 'inputConvertion',
			'id'	: 'inputConvertionID',
			'class'	: 'input s-25 line-box'
		}
	}, {
		// Create Input Conversion Info
		tag: 'input',
		attributes: {
			'id'	: 'inputConvertionInfo',
			'class'	: 'input s-50 line-box'
		}
	}
]);
// Draw Label & InputBox
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
		// Create Title
		tag: 'h1',
		attributes: {},
		text: 'Konversi Suhu'
	}, {
		// Create Toggle Switch Mode
		tag: 'label',
		attributes: {
			'for'	: 'toggleBox',
			'class'	: 'label switch-label'
		},
		text: 'Switch Mode'
	}, {
		// Create Toggle Box
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

// Select the toggle switch
const toggle	= document.querySelector('.toggle');
const body		= document.body;

// Event Listener For Design Mode
toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    body.classList.toggle('dark-mode');
});

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
	action('hide', [getElm('conv-box'), getElm('button-box')]);
});

// Set Action Buttons When On-Load Windows
window.onload = () => {
	disableElements([calcInput, convInput, convInfo, buttonReset, buttonReverse]);
	action('hide', [getElm('conv-box'), getElm('button-box')]);
}

// Function Create Notification Alert
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
				
				action('animate__animated animate__flash', getElm('notification'));
				resetElements([calcInput, convInput]);
				disableElements([buttonReset, buttonReverse]);
				calcInput.setAttribute('class', 'input s-75 danger-info animate__animated animate__shakeX');

			} else {
				// When Input Value Is Number/Float And/Or It Was Not Empty
				action('animate__animated animate__fadeOut', getElm('notification'));
				notif();
				buttonReset.removeAttribute('disabled');
				buttonReverse.removeAttribute('disabled');
				action('show animate__animated animate__bounceInUp', [getElm('button-box'), getElm('info-box')]);
				
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
		let textInfoNotes	= '<summary onclick="actionNoteInfo(this)"><strong>Keterangan:</strong></summary>' + 
			'Suhu S dalam derajat Fahrenheit (&deg;F) sama dengan suhu S dalam derajat Celcius (&deg;C) kali 9/5 tambah 32.' + 
			'<p><code>S(&deg;F) = (S(&deg;C) x 9/5) + 32</code> atau <code>S(&deg;F) = (S(&deg;C) x 1,8) + 32</code></p>'
		;
		
		if ('fahrenheit' === getMethodName) {
			textInfoNotes	= '<summary onclick="actionNoteInfo(this)"><strong>Keterangan:</strong></summary>' + 
				'Suhu S dalam derajat Celcius (&deg;C) sama dengan suhu S dalam derajat Fahrenheit (&deg;F) kurang 32 kali 5/9.'			+ 
				'<p><code>S(&deg;C) = (S(&deg;F) - 32) x 5/9</code> atau <code>S(&deg;C) = (S(&deg;F) - 32 ) x 1,8</code></p>'
			;
		}
		
		infoElements(textInfoValue, textInfoNotes, textInfo);
	}
}

function actionNoteInfo(e) {
	action('info animate__animated animate__fadeInDown', getElm('info-notes'));
	if (null != getElm('info-notes').getAttribute('open')) getElm('info-notes').removeAttribute('class');
}

// Calculation Method For Event Method Listener
function readEventMethodListener(value) {		
	calcInput.removeAttribute('disabled');
	
	if(isEmpty(value)) {
		resetElements([calcInput, convInput, convInfo]);
		action('hide animate__animated animate__bounceInUp', [getElm('conv-box'), getElm('button-box')]);
		disableElements([calcInput, convInput, convInfo, buttonReset, buttonReverse]);
		
	} else {
		drawElementsInfo();
		calcInput.focus();
		action('show animate__animated animate__bounceInUp', getElm('conv-box'));
		
		conversionMethod(calcInput.value);
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

// Function Get Date
function getDate(format) {
	const now = new Date();
	const weekday = ["Ahad","Senin","Selasa","Rabu","Kamis","Jum'at","Sabtu"];
	const month = now.toLocaleDateString('default', {month: 'long'});

	// Format Time
	const hours = now.getHours().toString().padStart(2, '0');
	const minutes = now.getMinutes().toString().padStart(2, '0');
	const seconds = now.getSeconds().toString().padStart(2, '0');
	const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
	
	let result;
	if ('undefined' !== format) {
		switch(format) {
			case 'y'	: result = now.getFullYear();
				break;
			case 'm'	: result = now.getMonth();
				break;
			case 'month': result = month;
				break;
			case 'd'	: result = now.getDate();
				break;
			case 'day'	: result = weekday[now.getDay()];
				break;
			case 'Y-m-d': result = `${now.getFullYear()}-{now.getMonth()}-{now.getDate()}`;
				break;
			case 'ddMY'	: result = `${weekday[now.getDay()]}, ${now.getDate()} ${month} ${now.getFullYear()}`;
				break;
			case 'hours': result = hours;
				break;
			case 'min'	: result = minutes;
				break;
			case 'sec'	: result = seconds;
				break;
			case 'ms'	: result = milliseconds;
		}
	}
	
	return result;
}

// Function Clock
function updateClock() {
    // Update clock
    const clockElement = document.getElementById('clock');
    clockElement.innerHTML = `${getDate('ddMY')} [ <span class="floating">${getDate('hours')}</span>:<span class="floating">${getDate('min')}</span>:<span class="floating">${getDate('sec')}</span>:<span class="floating">${getDate('ms')}</span> ]`;
}

// Update clock every 100 milliseconds
setInterval(updateClock, 100);
updateClock(); // Initial call to display clock immediately

// Create Copy Elements
const copyElm = createMultipleElements([
	{
		// Create Copy
		tag: 'div',
		attributes: {
			'id'	: 'copy',
			'class'	: 'copy'
		},
		text: `<a href="https://incodiy.com/" target="_blank">incoDIY</a> &copy; ${getDate('month')} ${getDate('y')}`
	}
]);
// Draw Buttons
copyElm.forEach(copyElm => insertNewElement('info-box', copyElm));

// Function to set the height of the section to match the document height
function setSectionHeight() {
    const section = document.querySelector('.container');
	let docHeight = parseInt(document.documentElement.scrollHeight - 70);
    if (section) section.style.minHeight = `${docHeight}px`;
}
// Set the initial height on page load
setSectionHeight();