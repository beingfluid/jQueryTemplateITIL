

STORE = [
    {
        "set": "Practice Set 2",
        "number":1,
        "question":"What is the definition of utility?",
        "answer":[
           "The assurance that a product or service will meet agreed requirements",
            "A possible event that could cause harm or loss, or make it more difficult to achieve objectives",
            "The functionality offered by a product or service to meet a particular need",
            "A tangible or intangible deliverable that is produced by carrying out an activity"
        ],
        "ans":"C",
        "correctAnswer":"The functionality offered by a product or service to meet a particular need"
    },
    {
        "set": "Practice Set 2",
        "number":2,
        "question":"Identify the missing word(s) in the following sentence.<br />A customer is a person who defines the requirements for a service and takes responsibility for the [?] of service consumption.",
        "answer":[
            "Outcomes",
            "Cost",
            "Outputs",
            "Benefits"
        ],
        "ans":"A",
        "correctAnswer":"Outcomes"
    },
    {
        "set": "Practice Set 2",
        "number":3,
        "question":"What is the definition of an IT asset?",
        "answer":[
            "A particular set of settings or options on a given piece of equipment",
"Any valuable component that can contribute to the delivery of an IT product or service",
"A means of enabling value co-creation by facilitating outcomes that customers want to achieve, without the customer having to manage specific costs and risks",
"Any component that needs to be managed in order to deliver an IT service"
        ],
        "ans":"B",
        "correctAnswer":"Any valuable component that can contribute to the delivery of an IT product or service"
    }
    
];
/* sets initial values to zero for the question number and score */

let qNumber = 0;
let score = 0;

/* event listener for start quiz button. Hides the start page and calls the function generateQuizQuestion */
function startQuiz() {
    $('main').on('click', '#button-start', function(event){
        $('.start-quiz').hide();
        generateQuizQuestion();
    });
}

/* begins displaying quiz questions from the STORE array until the very last question has been displayed, then calls the displayResults function */
function generateQuizQuestion() {
    if (qNumber < STORE.length) {
    let question =$(`<form class ="js-quiz-form">
    <legend class = "question">${STORE[qNumber].question}</legend>
    <ul class="radiogroup" role="radiogroup" aria-labelledby="question"></ul>`);
    let answers = STORE[qNumber].answer.map(function(answerValue, answerIndex){
        return `<label for="${answerValue}"><input type="radio" id="${answerValue}" name="answer" tabindex="${answerIndex}" value="${answerValue}" aria-checked="false" required>${answerValue}</label><br>`;
    });
    let button = $(`<button type="submit" id ="button-submit">Submit</button></form>`)
    $('.js-quiz').append(question);
    $('.radiogroup').append(answers, button);
    questionNumber();
} else {
    displayResults();
}

}

/* event listener for the submit button. Then checks to see if an input is selected, and if the answer selected is correct */
function questionChecker(){
    $('main').on('click','#button-submit', function (event){
        if ($('input:radio').is(':checked')) {
        event.preventDefault();
        let selectedAnswer= $("input[name=answer]:checked").val();
        console.log(selectedAnswer);
        if (selectedAnswer === STORE[qNumber].correctAnswer) {
            rightAnswer();
        } else {
                wrongAnswer();
            }
        }else {
            alert('Please select an answer.')
        }
    });
}

/* updates the question number and displays it at the top of the page */
function questionNumber(){
    $('header').find('#question-number').text(qNumber+1);
}

/* keeps score of correct answers and displays at the top of the page */
function scoreKeeper(){
    score++;
    $('header').find('#score').text(`${score}/${STORE.length}`);

}

/* displays the page for when the answer is right, updates score accordingly */
function rightAnswer() {
    console.log('rightAnswer ran');
    $('.js-quiz-form').hide();
    $('.js-answer').append(`<h2>You're Right!</h2>
    <img src="img/right-answer.jpg" alt="abstract painting" id="right-answer"/>
    <p>Great Job.</p>
    <button type="button" id ="button-next">Next Question</button>`).show();
    scoreKeeper();
}

/* displays page for when the answer is wrong and displays the correct answer */
function wrongAnswer() {
    $('.js-quiz-form').hide();
    $('.js-answer').append(`<h2>That answer is not quite right...</h2>
        <img src="img/wrong-answer.jpg" alt="child with paint all over face" id="wrong-answer"/>
        <h3>The correct answer is:</h3>
        <p><span class="correct-answer">${STORE[qNumber].correctAnswer}</span></p>
        <button type="button" id ="button-next">Next</button>`).show();
}

/* event listener for the next question button, calls the generateQuizQuestion function to display the next question */
function nextQuestion() {
    $('main').on('click','#button-next', function(event) {
        $('.js-answer').empty();
        $('.js-quiz-form').empty();
        qNumber++;
        generateQuizQuestion();
        $('js-quiz-form').show();
    });
}

/* displays the final percentage score and total number of correct answers */
function displayResults(){
    console.log("`displayResults` ran");
    let finalScore = (score/(STORE.length))*100;
    $('.js-answer').append(`<h2>Test Results</h2>
    <img id="paint-bucket" alt="red paint bucket" src = "img/paint-bucket.jpg"/>
    <h3>${finalScore}%</h3>
    <p>You got <span class="right-answers">${score} </span>out of ${STORE.length} questions right.</p>
    <button type="button" id ="button-restart">Start a New Quiz</button>`)
}

function restartQuiz(){
    console.log('restart quiz ran');
 $('main').on('click', '#button-restart', function(event){
     console.log('restart button clicked');
    score = 0;
    qNumber = 0;
    $('.js-answer').empty();
    $('.js-quiz-form').empty();
    $('.start-quiz').show();
    $('header').find('#score').text(`${score}/${STORE.length}`);
    $('header').find('#question-number').text(`${qNumber}`);
 });
}

function handleQuizApp(){
    startQuiz();
    questionChecker();
    nextQuestion();
    restartQuiz();
}

/* calls the handleQuizApp to activate functions with event listeners */
$(handleQuizApp);
