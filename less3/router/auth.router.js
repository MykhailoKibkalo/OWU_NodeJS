const router = require('express').Router();

router.get('/', (req, res) => {
    res.json('Auth is ok');
});

module.exports = router;
