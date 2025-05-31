// Quiz Questions and Functionality

// DOM Elements
const themeToggle = document.getElementById('theme-toggle-checkbox');
const quizContainer = document.getElementById('quiz-container');
const checkAnswersBtn = document.getElementById('check-answers-btn');
const resetQuizBtn = document.getElementById('reset-quiz-btn');
const quizScore = document.getElementById('quiz-score');

// Theme Toggle Functionality (same as in script.js)
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
    
    // Initialize quiz
    initializeQuiz();
});

// Quiz questions
const quizQuestions = [
    {
        question: "What is the binary representation of decimal 13?",
        options: ["1101", "1011", "1111", "1001"],
        correctAnswer: "1101",
        explanation: "Decimal 13 = 8 + 4 + 1 = 1101 in binary"
    },
    {
        question: "What is the decimal value of binary 10110?",
        options: ["22", "24", "26", "28"],
        correctAnswer: "22",
        explanation: "Binary 10110 = 16 + 4 + 2 = 22 in decimal"
    },
    {
        question: "What is the hexadecimal representation of decimal 255?",
        options: ["FF", "EE", "FE", "1F"],
        correctAnswer: "FF",
        explanation: "Decimal 255 = 15×16¹ + 15×16⁰ = FF in hexadecimal"
    },
    {
        question: "What is the octal representation of decimal 64?",
        options: ["100", "64", "80", "40"],
        correctAnswer: "100",
        explanation: "Decimal 64 = 1×8² + 0×8¹ + 0×8⁰ = 100 in octal"
    },
    {
        question: "In which number system is 'F' a valid digit?",
        options: ["Binary", "Decimal", "Octal", "Hexadecimal"],
        correctAnswer: "Hexadecimal",
        explanation: "Hexadecimal uses digits 0-9 and letters A-F"
    },
    {
        question: "How many bits are needed to represent a single hexadecimal digit?",
        options: ["2", "4", "8", "16"],
        correctAnswer: "4",
        explanation: "Each hexadecimal digit represents 4 bits (or half a byte)"
    },
    {
        question: "What is the binary equivalent of octal 17?",
        options: ["1111", "10111", "1111111", "1111"],
        correctAnswer: "1111",
        explanation: "Octal 17 = 15 in decimal = 1111 in binary"
    },
    {
        question: "Which of these is NOT a power of 2?",
        options: ["32", "64", "96", "128"],
        correctAnswer: "96",
        explanation: "96 is not a power of 2. It's 3×2⁵ or 3×32"
    },
    {
        question: "What is the ASCII binary code for the letter 'A'?",
        options: ["01000001", "01100001", "01000010", "01100010"],
        correctAnswer: "01000001",
        explanation: "The ASCII code for 'A' is 65, which is 01000001 in binary"
    },
    {
        question: "Which number system is most commonly used in everyday life?",
        options: ["Binary", "Decimal", "Octal", "Hexadecimal"],
        correctAnswer: "Decimal",
        explanation: "The decimal (base-10) system is most commonly used in everyday life"
    }
];

// Initialize quiz
function initializeQuiz() {
    quizContainer.innerHTML = '';
    quizScore.textContent = '';
    
    quizQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        
        const questionTitle = document.createElement('h3');
        questionTitle.textContent = `Question ${index + 1}: ${q.question}`;
        questionDiv.appendChild(questionTitle);
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'quiz-options';
        
        q.options.forEach((option, optIndex) => {
            const optionLabel = document.createElement('label');
            optionLabel.className = 'quiz-option';
            
            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = `question-${index}`;
            radioInput.value = option;
            radioInput.id = `q${index}-opt${optIndex}`;
            
            const optionText = document.createTextNode(option);
            
            optionLabel.appendChild(radioInput);
            optionLabel.appendChild(optionText);
            optionsDiv.appendChild(optionLabel);
        });
        
        questionDiv.appendChild(optionsDiv);
        
        // Add explanation div (hidden initially)
        const explanationDiv = document.createElement('div');
        explanationDiv.className = 'quiz-explanation';
        explanationDiv.textContent = q.explanation;
        explanationDiv.style.display = 'none';
        questionDiv.appendChild(explanationDiv);
        
        quizContainer.appendChild(questionDiv);
    });
}

// Check answers
checkAnswersBtn.addEventListener('click', () => {
    const questions = document.querySelectorAll('.quiz-question');
    let score = 0;
    let totalAnswered = 0;
    
    questions.forEach((questionDiv, index) => {
        const selectedOption = questionDiv.querySelector(`input[name="question-${index}"]:checked`);
        const explanationDiv = questionDiv.querySelector('.quiz-explanation');
        
        // Reset previous result classes
        questionDiv.classList.remove('correct', 'incorrect');
        
        if (selectedOption) {
            totalAnswered++;
            const userAnswer = selectedOption.value;
            const correctAnswer = quizQuestions[index].correctAnswer;
            
            if (userAnswer === correctAnswer) {
                score++;
                questionDiv.classList.add('correct');
            } else {
                questionDiv.classList.add('incorrect');
            }
            
            // Show explanation
            explanationDiv.style.display = 'block';
        }
    });
    
    if (totalAnswered === 0) {
        quizScore.textContent = 'Please answer at least one question.';
        quizScore.className = 'quiz-score warning';
    } else {
        const percentage = Math.round((score / quizQuestions.length) * 100);
        quizScore.textContent = `Your Score: ${score}/${quizQuestions.length} (${percentage}%)`;
        quizScore.className = 'quiz-score';
        
        if (percentage >= 80) {
            quizScore.classList.add('excellent');
        } else if (percentage >= 60) {
            quizScore.classList.add('good');
        } else {
            quizScore.classList.add('needs-improvement');
        }
    }
});

// Reset quiz
resetQuizBtn.addEventListener('click', () => {
    initializeQuiz();
});