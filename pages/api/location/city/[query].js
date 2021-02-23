
export default (req, res) => {
    const {
        query: { query },
    } = req
    console.log(query)
    fetch(`https://restcountries.eu/rest/v2/name/${query}`)
        .then(response => response.json())
        .then(response => response[0]['capital'])
        .then(data => res.status(200).json({name: `${data}`}))
        .catch(err => console.log(err))
}