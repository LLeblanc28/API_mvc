class HomeController {
    static index(req, res) {
        res.sendFile('index.html', { root: 'public' });
    }
}

export default HomeController;
