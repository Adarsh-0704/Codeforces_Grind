export function searchBar(allProblems, value){
    const search = value.toLowerCase()
    if (!search) return allProblems
    const filtered = allProblems.filter(prob => {
        const nameMatch = prob.name.toLowerCase().includes(search)
        const idMatch = `${prob.contestId}${prob.index}`.toLowerCase().includes(search)
        return nameMatch || idMatch
    })
    return filtered
}