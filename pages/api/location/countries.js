
export default (_, res) => {
    fetch('https://restcountries.eu/rest/v2/all?fields=name')
        .then(response => response.json())
        .then(data => data.reduce((acc, item) => [...acc, item['name']], []))
        .then(data => res.status(200).send(data))
        .catch(err => console.log(err))
}
