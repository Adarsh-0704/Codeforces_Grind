export const cfTags = [
    "implementation", "math", "greedy", "dp", "data structures", 
    "brute force", "constructive algorithms", "graphs", "sortings", 
    "binary search", "dfs and similar", "trees", "strings", 
    "number theory", "combinatorics", "*special", "geometry", 
    "bitmasks", "two pointers", "dsu", "shortest paths", 
    "probabilities", "divide and conquer", "hashing", "games", 
    "flows", "interactive", "matrices", "string suffix structures", 
    "fft", "graph matchings", "ternary search", "expression parsing", 
    "meet-in-the-middle", "2-sat", "chinese remainder theorem", "schedules"
]

export function filter(allProblems, tag){
    if (tag === 'all'){
        return allProblems
    }
    const filtered = allProblems.filter(prob => {
        return prob.tags && prob.tags.includes(tag)
    })
    return filtered
}