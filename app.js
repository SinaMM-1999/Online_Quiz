let $ = document
let selectCategoryBtn = $.querySelectorAll('.selectCategoryBtn')
let cardBody = $.querySelector('#card-body')

let currentQuestions = []
let currentIndex = 0

selectCategoryBtn.forEach((btn) => {

    if (btn) btn.addEventListener('click', () => {
        console.log(btn.id);
        let dataArray = {
            url: 'https://quizapi.io/api/v1/questions?apiKey=YOUR_API_KEY&category=vuejs&limit=10',
            key: 'Xze1WZdzpyZfV86jHCvyveXN8i53IQBDMzFG9Z5L'
        }

        fetch(`https://quizapi.io/api/v1/questions?apiKey=${dataArray.key}&category=${btn.id}&limit=10`)
            .then(res => res.json())
            .then(data => {
                currentQuestions = data
                currentIndex = 0
                loadIntro()
                console.log(data);

            })
            .catch(err => console.error('Error fetching questions:', err))




    })
})

function loadIntro() {
    cardBody.innerHTML = `<div id="quiz-intro">
                            <div class="h3 pt-5 text-light">Are You Ready ?</div>
                            <div class="p fs-5">( You have to answer all questions in 10 min ! )</div>
                            <button id="startQuiz" class="btn btn-info px-5 py-2 fs-4 mt-5">Start <br>=></button>
                          </div>`
    let startQuizBtn = $.querySelector('#startQuiz')
    startQuizBtn.addEventListener('click', () => {
        loadQuizQuestionsBody()
    })
}

function loadQuizQuestionsBody() {
    let questionObj = currentQuestions[currentIndex]
    if (!questionObj) return

    cardBody.innerHTML = `
        <div class="col-12 w-100 min-h-100 bg-secondary rounded-4 d-flex flex-column">
            <div class="h6 pt-4 mx-4" id="quiz-question">
                ${questionObj.question}
            </div>
            <div id="answer-box" class="mt-5 pb-5 ms-4 align-self-start">
                ${renderAnswers(questionObj.answers)}
            </div>
        </div>
        <div id="N-P-button" class="d-flex justify-content-between mt-5 p-1">
            <button class="btn btn-outline-danger" id="prevBtn">Previous</button>
            <button class="btn btn-outline-info" id="nextBtn">Next</button>
        </div>
                        `
    document.querySelector('#nextBtn').addEventListener('click', () => {
        if (currentIndex < currentQuestions.length - 1) {
            currentIndex++
            loadQuizQuestionsBody()
        }
    })
    document.querySelector('#prevBtn').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--
            loadQuizQuestionsBody()
        }
    })


}
function renderAnswers(answersObj) {
    return Object.entries(answersObj)
        .filter(([key, val]) => val !== null)
        .map(([key, val], idx) => `
            <div class="form-check ms-4 align-self-start">
                ${String.fromCharCode(97 + idx)}.
                <input class="form-check-input border-dark" type="radio" name="radioDefault" id="${key}">
                <label class="form-check-label" for="${key}">
                    ${val}
                </label>
            </div>
        `).join('')
}









