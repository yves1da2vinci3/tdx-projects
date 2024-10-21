function formatMoney (money) {
    const formatedMoney =   new Intl.NumberFormat("en-EN",{style : "currency", currency : "GHS" }).format(money)

        return formatedMoney
}

export default formatMoney