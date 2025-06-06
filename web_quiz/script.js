document.addEventListener('DOMContentLoaded', () => {
    const questionTextElement = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const nextButton = document.getElementById('next-button');
    const feedbackTextElement = document.getElementById('feedback-text');
    const scoreElement = document.getElementById('score');

    const quizQuestions = [
        {
            question: "What is the output of the Python script `1-hello-world/02_hello_world.py` that contains just `print('Hello World!')`?",
            options: ["Hello World!", "Hello Python!", "print('Hello World!')", "Error"],
            answer: "Hello World!"
        },
        {
            question: "The script `2-variables/07_temperature.py` converts 56°F to Celsius. What is the approximate Celsius value printed?",
            options: ["13.33°C", "10.0°C", "15.55°C", "20.0°C"],
            answer: "13.33°C"
        },
        {
            question: "In `3-control-flow/11_coin_flip.py`, `random.randint(0, 1)` generates a number. If it's 0, what is printed?",
            options: ["Heads", "Tails", "Error", "Nothing"],
            answer: "Tails"
        },
        {
            question: "Which of these is NOT a typical file extension for a Python script or related file?",
            options: [".py (source code)", ".pyc (compiled bytecode)", ".ipynb (Jupyter Notebook)", ".pys (Python Script - System)"],
            answer: ".pys (Python Script - System)"
        },
        {
            question: "If you wanted to repeat a block of code multiple times, which Python concept (also a directory name in this project) would you primarily use?",
            options: ["2-variables", "3-control-flow", "4-loops", "6-functions"],
            answer: "4-loops"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let answerSelected = false;

    function displayQuestion() {
        answerSelected = false;
        feedbackTextElement.textContent = '';
        optionsContainer.innerHTML = ''; // Clear previous options
        const currentQuestion = quizQuestions[currentQuestionIndex];
        questionTextElement.textContent = currentQuestion.question;

        // Add fade-in animation to question
        questionTextElement.parentElement.classList.remove('fade-in');
        void questionTextElement.parentElement.offsetWidth; // Trigger reflow
        questionTextElement.parentElement.classList.add('fade-in');

        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => selectAnswer(button, option, currentQuestion.answer));
            optionsContainer.appendChild(button);
        });

        nextButton.style.display = 'none'; // Hide next button until an answer is selected
    }

    function selectAnswer(button, selectedOption, correctAnswer) {
        if (answerSelected) return; // Prevent changing answer after selection
        answerSelected = true;

        // Animate feedback text
        feedbackTextElement.classList.remove('feedback-animate');
        void feedbackTextElement.offsetWidth; // Trigger reflow
        feedbackTextElement.classList.add('feedback-animate');

        Array.from(optionsContainer.children).forEach(btn => {
            btn.disabled = true; // Disable all option buttons
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            } else if (btn === button) { // If this is the button clicked and it's wrong
                btn.classList.add('incorrect');
            }
        });

        if (selectedOption === correctAnswer) {
            score++;
            feedbackTextElement.textContent = "Correct!";
            feedbackTextElement.style.color = 'green';
        } else {
            feedbackTextElement.textContent = `Incorrect. The correct answer was ${correctAnswer}.`;
            feedbackTextElement.style.color = 'red';
        }
        scoreElement.textContent = score;
        nextButton.style.display = 'block'; // Show next button
    }

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            displayQuestion();
        } else {
            // Quiz finished
            questionTextElement.textContent = "Quiz Complete!";
            optionsContainer.innerHTML = '';
            feedbackTextElement.textContent = `Your final score is ${score} out of ${quizQuestions.length}.`;
            nextButton.style.display = 'none';
        }
    });

    // Start the quiz
    displayQuestion();
});
