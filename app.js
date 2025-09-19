let $ = document
let selectCategoryBtn = $.querySelectorAll('#selectCategoryBtn')
let cardBody = $.querySelector('#card-body')


selectCategoryBtn.forEach((btn) => {
    
    if(btn) btn.addEventListener('click', (type) => {
        loadIntro(type)
        console.log(type.secondId);
        
        
    })
})

function loadIntro() {
    cardBody.innerHTML = `<div id="quiz-intro">
                            <div class="h3 pt-5 text-light">Are You Ready ?</div>
                            <div class="p fs-5">( You have to answer all questions in 10 min ! )</div>
                            <button class="btn btn-info px-5 py-2 fs-4 mt-5">Start <br>=></button>
                          </div>`
}





// let dataArray = {
//     url: 'https://quizapi.io/api/v1/questions?apiKey=YOUR_API_KEY&category=vuejs&limit=10 / https://quizapi.io/api/v1/questions?apiKey=YOUR_API_KEY&category=html&limit=10 / https://quizapi.io/api/v1/questions?apiKey=YOUR_API_KEY&category=next-js&limit=10 / https://quizapi.io/api/v1/questions?apiKey=YOUR_API_KEY&category=react&limit=10',
//     key: 'Xze1WZdzpyZfV86jHCvyveXN8i53IQBDMzFG9Z5L'
// }
// let dataArrayURL = {
//     vuejs,
//     html,
//     nextjs,
//     react
// }

// fetch(`https://quizapi.io/api/v1/questions?apiKey=${dataArray.key}&category=vuejs&limit=10`)






