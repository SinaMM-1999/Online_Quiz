let $ = document
let selectCategoryBtn = $.querySelectorAll('.selectCategoryBtn')
let cardBody = $.querySelector('#card-body')

let currentQuestions = []
let currentIndex = 0
let answered = []

selectCategoryBtn.forEach((btn) => {

    if (btn) btn.addEventListener('click', () => {
        let dataArray = {
            url: 'https://quizapi.io/api/v1/questions?apiKey=YOUR_API_KEY&category=vuejs&limit=10',
            key: 'aWogy18ykSQabd2vAnh0lFikOeGCqTqXOS6CcaJZ'
        }

        fetch(`https://quizapi.io/api/v1/questions?apiKey=${dataArray.key}&category=${btn.id}&limit=10`)
            .then(res => res.json())
            .then(data => {
                currentQuestions = data
                currentIndex = 0
                answered = new Array(data.length).fill(null)
                loadIntro()
                console.log(data);
            })
            .catch((err => console.error('Error fetching questions:', err)))
    })
})

function loadIntro() {
    cardBody.innerHTML = `<div id="quiz-intro">
                            <div class="h3 pt-5 text-light">Are You Ready ?</div>
                            <div class="p text-light">( You have to answer all questions in 10 min)</div>
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
        <div class="col-12 w-100 h-75 bg-secondary rounded-4 overflow-scroll d-flex flex-column align-items-start">
            <div class="h6 pt-4 mx-4" id="quiz-question">
                ${questionObj.question}
            </div>
            <div id="answer-box" class="mt-5 pb-5 ms-4 d-flex align-items-start flex-column">
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

    if (currentIndex == currentQuestions.length - 1) {
        let btns = document.querySelector('#N-P-button')
        let resultBtn = document.createElement('button')
        resultBtn.className = "btn btn-outline-success"
        resultBtn.id = "resultBtn"
        resultBtn.innerText = "Result"
        btns.appendChild(resultBtn)
        document.querySelector('#nextBtn').remove()

        resultBtn.addEventListener('click', () => {
            showQuizResult()
        })
    }

    addAnswerListeners(questionObj)
    console.log(currentIndex)
}

function addAnswerListeners(questionObj) {
    let correctAnswers = questionObj.correct_answers

    Object.entries(correctAnswers).forEach(([key, val]) => {
        if (val === "true") {
            let correctId = key.replace("_correct", "")
            let correctInput = document.getElementById(correctId)
            if (correctInput) correctInput.dataset.correct = "true"
        }
    })

    let allOptions = document.querySelectorAll('input[name="radioDefault"]')
    allOptions.forEach(option => {
        option.addEventListener('change', () => {
            if (option.dataset.correct === "true") {
                answered[currentIndex] = true
            } else {
                answered[currentIndex] = false
            }
            allOptions.forEach(opt => opt.disabled = true)
        })
    })
}

function showQuizResult(){
    let correctCount = answered.filter(ans => ans === true).length
    let wrongCount = answered.filter(ans => ans === false).length
    let total = currentQuestions.length
    let percent = Math.round((correctCount / total) * 100)

    cardBody.innerHTML = `
        <div class="col-12 w-100 bg-dark rounded-4 text-light text-center p-4">
            <h3 class="text-info">🎉 Quiz Finished 🎉</h3>
            <p class="mt-3">Total Questions: ${total}</p>
            <p class="text-success">✅ Correct: ${correctCount}</p>
            <p class="text-danger">❌ Wrong: ${wrongCount}</p>
            <h4 class="mt-3">Score: ${percent}%</h4>
            <button class="btn btn-outline-light mt-4" id="restartBtn">Restart</button>
        </div>
    `

    document.querySelector('#restartBtn').addEventListener('click', () => {
        currentIndex = 0
        answered = new Array(currentQuestions.length).fill(null)
        loadIntro()
    })
}

function renderAnswers(answersObj) {
    return Object.entries(answersObj)
        .filter(([key, val]) => val !== null)
        .map(([key, val], idx) => {
            let safeVal = val.includes('<') && val.includes('>')
                ? `<code>${val.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code>`
                : val;

            return `
                <div class="form-check ms-4 align-self-start">
                    ${String.fromCharCode(97 + idx)}.
                    <input class="form-check-input border-dark" type="radio" name="radioDefault" id="${key}">
                    <label class="form-check-label text-dark" for="${key}">
                        ${safeVal}
                    </label>
                </div>
            `
        }).join('')
}
