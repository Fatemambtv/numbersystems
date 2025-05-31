// DOM Elements
const themeToggle = document.getElementById('theme-toggle-checkbox');

// Theme Toggle Functionality
themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-theme');
    // Save theme preference to localStorage
    const isDarkMode = document.body.classList.contains('dark-theme');
    localStorage.setItem('darkMode', isDarkMode);
});

// Load saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-theme');
        themeToggle.checked = true;
    }
});

// Mini converters functionality
document.querySelectorAll('.mini-converter').forEach((converter, index) => {
    const input = converter.querySelector('.mini-input');
    const result = converter.querySelector('.result');
    
    input.addEventListener('input', () => {
        const value = input.value.trim();
        try {
            switch(index) {
                case 0: // Decimal to Binary
                    if (/^\d+$/.test(value)) {
                        const binary = parseInt(value).toString(2);
                        result.textContent = `Binary: ${binary}`;
                    }
                    break;
                case 1: // Binary to Decimal
                    if (/^[01]+$/.test(value)) {
                        const decimal = parseInt(value, 2);
                        result.textContent = `Decimal: ${decimal}`;
                    }
                    break;
                case 2: // Octal to Decimal
                    if (/^[0-7]+$/.test(value)) {
                        const decimal = parseInt(value, 8);
                        result.textContent = `Decimal: ${decimal}`;
                    }
                    break;
                case 3: // Hexadecimal to Decimal
                    if (/^[0-9A-Fa-f]+$/.test(value)) {
                        const decimal = parseInt(value, 16);
                        result.textContent = `Decimal: ${decimal}`;
                    }
                    break;
            }
        } catch (error) {
            result.textContent = 'Invalid input';
        }
    });
});