const problemsList = document.getElementById('problems')
const page_controls = document.getElementById('page_controls')
let allProblems = [], currPage = 1
const maxPer = 100

async function problems(){
    try{
        const response = await fetch('https://codeforces.com/api/problemset.problems')
        const data = await response.json()

        if (data.status == 'OK'){
            allProblems = data.result.problems.slice(0, 100);
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
}

problems()
function colorrating(rating){
    if (!rating) return '#000'
    switch (true){
        case rating < 1200:
            return 'grey'
        case rating < 1400:
            return 'green'
        case rating < 1600:
            return 'cyan'
        case rating < 1900:
            return 'darkblue'
        case rating < 2100:
            return 'purple'
        case rating < 2400:
            return 'yellow'
        case rating < 3000:
            return 'red'
        default:
            return '#991b1b'
    }

}