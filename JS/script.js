import { ascending, descending } from "./sort.js"

const problemsList = document.getElementById('problems')
const page_control = document.getElementById('page_control')
const easy = document.getElementsByClassName('ascending')[0]
const hard = document.getElementsByClassName('descending')[0]
let allProblems = [], currPage = 1
const maxPer = 20

async function problems(){
    try{
        const response = await fetch('https://codeforces.com/api/problemset.problems')
        const data = await response.json()

        if (data.status == 'OK'){
            allProblems = data.result.problems.slice(0,);
            showProblems()
        }
        else{
            throw new Error ("API failed");
        }
    }
    catch(err){
        console.log("Error while fetching problems: ", err)
        problemsList.innerHTML = `<p style = "text-align: center;">Failed to load Problems. Refresh to try again.`
    }
}

function showProblems(){
    problemsList.innerHTML = ''
    const start = (currPage - 1) * maxPer
    const end = start + maxPer
    const toShow = allProblems.slice(start, end)
    
    toShow.forEach(problem => {
        const probDiv = document.createElement('a')
        probDiv.className = 'problem_container'
        const color = colorrating(problem.rating);
        probDiv.href = `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`
        probDiv.target = "_blank"
        probDiv.innerHTML = `
            <div class = "name">
                ${problem.contestId}${problem.index} - ${problem.name}
            </div>
            <div class = "rating" style="background-color: ${color}; box-shadow: 0 4px 8px ${color};">
                  Rating: ${problem.rating || "Unrated"}
            </div>`
        problemsList.appendChild(probDiv)      
    })
    pages()
}

function pages(){
    const total = Math.ceil(allProblems.length / maxPer)
    page_control.innerHTML = `
    <button id = "previous" class = "page" ${currPage === 1 ? 'disabled' : ''}>Previous</button>
    <span class = "info">Page ${currPage} of ${total}</span>
    <button id = "next" class = "page" ${currPage == total ? 'disabled' : ''}>Next</button>
    `
    const next = document.getElementById('next')
    const prev = document.getElementById('previous')
    prev.addEventListener('click', () => {
        if (currPage > 1){
            currPage--
            showProblems()
        }
    })
    
    next.addEventListener('click', () => {
        if (currPage < total){
            currPage++
            showProblems()
        }
    })

}

function colorrating(rating){
    if (!rating) return '#000'
    switch (true){
        case rating < 1200:
            return 'grey'
        case rating < 1400:
            return 'green'
        case rating < 1600:
            return 'teal'
        case rating < 1900:
            return 'darkblue'
        case rating < 2100:
            return 'purple'
        case rating < 2400:
            return 'gold'
        case rating < 3000:
            return 'red'
        default:
            return '#991b1b'
    }

}

easy.addEventListener('click' , () =>{
    allProblems = ascending(allProblems)
    currPage = 1
    showProblems()
})
hard.addEventListener('click' , () =>{
    allProblems = descending(allProblems)
    currPage = 1
    showProblems()
})
problems()
