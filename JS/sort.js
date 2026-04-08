export function ascending(problems){
    const easiest = [...problems]
    easiest.sort((a, b) => {
        const ratingA = a.rating || 4000
        const ratingB = b.rating || 4000
        return ratingA - ratingB
    })
    return easiest
}

export function descending(problems){
    const hardest = [...problems]
    hardest.sort((a, b) => {
        const ratingA = a.rating || 0
        const ratingB = b.rating || 0
        return ratingB - ratingA
    })
    return hardest
}