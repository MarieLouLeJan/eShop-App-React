
const setTTCPrice = (HT, TVA) => {
    HT = parseFloat(HT)
    let totalTTC = (HT * TVA) + HT;
    const TTC = parseFloat(totalTTC)
    return TTC.toFixed(2)
}

export const setTTCFilter = (HT, TVA) => {
    HT = parseFloat(HT)
    let totalTTC = (HT * TVA) + HT;
    return parseFloat(totalTTC)
}

export default setTTCPrice
