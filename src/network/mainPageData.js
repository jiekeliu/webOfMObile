import baseAxiso from "./baseAxiso";

export function getAllintro() {
    return baseAxiso({
        url: '/Extra/results/view/php/getAllintro.php'
    })
}
