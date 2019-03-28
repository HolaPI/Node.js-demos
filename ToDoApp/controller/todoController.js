
module.exports = function (app) {
    app.get('/todo', (req, res) => {
        res.send("You are visiting: " + req.url)
    })
}