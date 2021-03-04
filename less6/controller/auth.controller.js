const { passwordHasher, tokenizer } = require('../helpers');
const { authService } = require('../service');

module.exports = {

    checkUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await authService.checkUser({ email });

            await passwordHasher.compare(password, user.password);

            const tokens = tokenizer();

            // res.json('Login successful');
            res.json(tokens);
        } catch (e) {
            res.status(418).json(e.message);
        }
    }
};
