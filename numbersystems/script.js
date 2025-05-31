// DOM Elements
const themeToggle = document.getElementById('theme-toggle-checkbox');
const conversionSelect = document.getElementById('conversion-select');
const inputValue = document.getElementById('input-value');
const errorMessage = document.getElementById('error-message');
const convertBtn = document.getElementById('convert-btn');
const resetBtn = document.getElementById('reset-btn');
const copyButtons = document.querySelectorAll('.copy-btn');
const resultContainers = {
    decimal: document.getElementById('decimal-result'),
    binary: document.getElementById('binary-result'),
    octal: document.getElementById('octal-result'),
    hexadecimal: document.getElementById('hexadecimal-result'),
    ascii: document.getElementById('ascii-result')
};
const resultValues = {
    decimal: document.getElementById('decimal-value'),
    binary: document.getElementById('binary-value'),
    octal: document.getElementById('octal-value'),
    hexadecimal: document.getElementById('hexadecimal-value'),
    ascii: document.getElementById('ascii-value')
};
const spinner = document.getElementById('conversion-spinner');

// Theme Toggle Functionality
themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-theme');
    // Save theme preference to localStorage
    const isDarkMode = document.body.classList.contains('dark-theme');
    localStorage.setItem('darkMode', isDarkMode);
});

// Load saved theme preference
// Add this code at the end of your existing script.js file

// Theme toggle for all pages
document.addEventListener('DOMContentLoaded', () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-theme');
        if (themeToggle) {
            themeToggle.checked = true;
        }
    }
});

// Update UI based on conversion type
conversionSelect.addEventListener('change', updateUIForConversionType);

function updateUIForConversionType() {
    const conversionType = conversionSelect.value;
    
    // Reset error message
    errorMessage.textContent = '';
    
    // Update input placeholder
    switch (conversionType) {
        case 'decimal':
            inputValue.placeholder = 'Enter a decimal number (e.g., 42)';
            break;
        case 'binary':
            inputValue.placeholder = 'Enter a binary number (e.g., 101010)';
            break;
        case 'octal':
            inputValue.placeholder = 'Enter an octal number (e.g., 52)';
            break;
        case 'hexadecimal':
            inputValue.placeholder = 'Enter a hexadecimal number (e.g., 2A)';
            break;
        case 'ascii':
            inputValue.placeholder = 'Enter text or binary (e.g., Hello or 01001000)';
            break;
        case 'unicode':
            inputValue.placeholder = 'Enter text or binary (e.g., 你好 or binary)';
            break;
    }
    
    // Show/hide relevant result containers
    for (const key in resultContainers) {
        if (conversionType === 'ascii' || conversionType === 'unicode') {
            resultContainers[key].style.display = key === 'binary' || key === 'ascii' ? 'flex' : 'none';
        } else {
            resultContainers[key].style.display = key !== 'ascii' ? 'flex' : 'none';
        }
    }
    
    // Reset result values
    resetResults();
}

// Initialize UI
updateUIForConversionType();

// Convert button click handler
convertBtn.addEventListener('click', performConversion);

// Perform conversion based on selected type
// Update performConversion function
async function performConversion() {
    const conversionType = conversionSelect.value;
    const input = inputValue.value.trim();
    
    spinner.style.display = 'block';
    errorMessage.textContent = '';
    
    try {
        // Artificial delay to show loading state
        await new Promise(resolve => setTimeout(resolve, 300));
        
        if (!input) {
            throw new Error('Please enter a value to convert');
        }
        
        switch (conversionType) {
            case 'decimal':
                convertFromDecimal(input);
                break;
            case 'binary':
                convertFromBinary(input);
                break;
            case 'octal':
                convertFromOctal(input);
                break;
            case 'hexadecimal':
                convertFromHexadecimal(input);
                break;
            case 'ascii':
                convertAscii(input);
                break;
            case 'unicode':
                convertUnicode(input);
                break;
        }
    } catch (error) {
        showError(error.message);
    } finally {
        spinner.style.display = 'none';
    }
}

// Conversion functions
function convertFromDecimal(input) {
    if (!/^\d+$/.test(input)) {
        throw new Error('Invalid decimal number. Please enter digits only.');
    }
    
    const decimal = parseInt(input, 10);
    
    resultValues.decimal.textContent = decimal;
    resultValues.binary.textContent = decimal.toString(2);
    resultValues.octal.textContent = decimal.toString(8);
    resultValues.hexadecimal.textContent = decimal.toString(16).toUpperCase();
}

function convertFromBinary(input) {
    if (!/^[01]+$/.test(input)) {
        throw new Error('Invalid binary number. Please enter 0s and 1s only.');
    }
    
    const decimal = parseInt(input, 2);
    
    resultValues.decimal.textContent = decimal;
    resultValues.binary.textContent = input;
    resultValues.octal.textContent = decimal.toString(8);
    resultValues.hexadecimal.textContent = decimal.toString(16).toUpperCase();
}

function convertFromOctal(input) {
    if (!/^[0-7]+$/.test(input)) {
        throw new Error('Invalid octal number. Please enter digits 0-7 only.');
    }
    
    const decimal = parseInt(input, 8);
    
    resultValues.decimal.textContent = decimal;
    resultValues.binary.textContent = decimal.toString(2);
    resultValues.octal.textContent = input;
    resultValues.hexadecimal.textContent = decimal.toString(16).toUpperCase();
}

function convertFromHexadecimal(input) {
    if (!/^[0-9A-Fa-f]+$/.test(input)) {
        throw new Error('Invalid hexadecimal number. Please enter digits 0-9 and letters A-F only.');
    }
    
    const decimal = parseInt(input, 16);
    
    resultValues.decimal.textContent = decimal;
    resultValues.binary.textContent = decimal.toString(2);
    resultValues.octal.textContent = decimal.toString(8);
    resultValues.hexadecimal.textContent = input.toUpperCase();
}

function convertAscii(input) {
    if (/^[01]+$/.test(input)) {
        if (input.length % 8 !== 0) {
            throw new Error('Binary input must be a multiple of 8 bits for ASCII conversion.');
        }
        let ascii = '';
        for (let i = 0; i < input.length; i += 8) {
            const byte = input.substr(i, 8);
            const charCode = parseInt(byte, 2);
            ascii += String.fromCharCode(charCode);
        }
        resultValues.binary.textContent = input;
        resultValues.ascii.textContent = ascii;
    } else {
        let binary = '';
        for (let i = 0; i < input.length; i++) {
            const charCode = input.charCodeAt(i);
            const bin = charCode.toString(2).padStart(8, '0');
            binary += bin;
        }
        resultValues.binary.textContent = binary;
        resultValues.ascii.textContent = input;
    }
}

function convertUnicode(input) {
    if (/^[01]+$/.test(input)) {
        if (input.length % 16 !== 0) {
            throw new Error('Binary input must be a multiple of 16 bits for Unicode conversion.');
        }
        let unicode = '';
        for (let i = 0; i < input.length; i += 16) {
            const word = input.substr(i, 16);
            const charCode = parseInt(word, 2);
            unicode += String.fromCharCode(charCode);
        }
        resultValues.binary.textContent = input;
        resultValues.ascii.textContent = unicode;
    } else {
        let binary = '';
        for (let i = 0; i < input.length; i++) {
            const charCode = input.charCodeAt(i);
            const bin = charCode.toString(2).padStart(16, '0');
            binary += bin;
        }
        resultValues.binary.textContent = binary;
        resultValues.ascii.textContent = input;
    }
}

// Reset button click handler
resetBtn.addEventListener('click', () => {
    inputValue.value = '';
    errorMessage.textContent = '';
    resetResults();
    updateUIForConversionType();
});

// Reset result values
function resetResults() {
    for (const key in resultValues) {
        resultValues[key].textContent = '-';
    }
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
}

// Copy to clipboard functionality
copyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const resultId = button.getAttribute('data-result');
        const textToCopy = document.getElementById(resultId).textContent;
        
        if (textToCopy && textToCopy !== '-') {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    // Show temporary success message
                    const originalText = button.innerHTML;
                    button.innerHTML = '<i class="fas fa-check"></i>';
                    button.style.color = 'var(--success-color)';
                    
                    setTimeout(() => {
                        button.innerHTML = originalText;
                        button.style.color = '';
                    }, 1500);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        }
    });
});

// Add input validation on keyup
inputValue.addEventListener('keyup', (e) => {
    const conversionType = conversionSelect.value;
    const input = inputValue.value.trim();
    
    // Clear error when input is empty
    if (!input) {
        errorMessage.textContent = '';
        return;
    }
    
    // Validate input based on conversion type
    try {
        switch (conversionType) {
            case 'decimal':
                if (!/^\d+$/.test(input)) {
                    showError('Invalid decimal number. Please enter digits 0-9 only (e.g., 42, 255, 1024)');
                } else {
                    errorMessage.textContent = '';
                }
                break;
            case 'binary':
                if (!/^[01]+$/.test(input)) {
                    showError('Invalid binary number. Please enter only 0s and 1s (e.g., 101010, 11110000)');
                } else {
                    errorMessage.textContent = '';
                }
                break;
            case 'octal':
                if (!/^[0-7]+$/.test(input)) {
                    showError('Invalid octal number. Please enter digits 0-7 only (e.g., 52, 177, 644)');
                } else {
                    errorMessage.textContent = '';
                }
                break;
            case 'hexadecimal':
                if (!/^[0-9A-Fa-f]+$/.test(input)) {
                    showError('Invalid hexadecimal number. Please enter digits 0-9 and letters A-F only (e.g., 2A, FF, 1B4)');
                } else {
                    errorMessage.textContent = '';
                }
                break;
        }
    } catch (error) {
        showError(error.message);
    }
    
    // If Enter key is pressed, perform conversion
    if (e.key === 'Enter') {
        performConversion();
    }
});
window.addEventListener('scroll', function() {
    const backToTopButton = document.getElementById('back-to-top');
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

document.getElementById('back-to-top').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});