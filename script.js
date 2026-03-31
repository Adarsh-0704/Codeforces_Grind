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

