const problemsList = document.getElementById('problems')
const page_controls = document.getElementById('page_controls')
let allProblems = [], currPage = 1
const maxPer = 10

async function problems(){
    try{
        const response = await fetch('https://codeforces.com/api/problemset.problems')
        const data = await response.json()

        if (data.status == 'OK'){
            allProblems = data.result.problems.slice(0, 40);
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
        const probDiv = document.createElement('div')
        probDiv.className = 'problem_container'

        probDiv.innerHTML = `
            <div class = "name">
                ${problem.contestId}${problem.index} - ${problem.name}
            </div>
            <div class = "rating">
                Rating: ${problem.rating || "Unrated"}
            </div>`
        problemsList.appendChild(probDiv)      
    })
}

problems()