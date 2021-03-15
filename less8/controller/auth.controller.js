const { passwordHasher, tokenizer } = require('../helpers');
const { authService } = require('../service');

module.exports = {

    checkUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await authService.checkUser({ email });

            await passwordHasher.compare(password, user.password);

            const tokens = tokenizer();
            await authService.checkToken(tokens, user);
            // res.json('Login successful');
            res.json(tokens);
        } catch (e) {
            res.status(418).json(e.message);
        }
    },

    createRefreshedToken: async (req, res) => {
        const { tokens } = req;
        try {
            await authService.delToken(tokens);

            const newTokens = tokenizer();

            await authService.delToken(newTokens, tokens);

            res.json(newTokens);
        } catch (e) {
            res.status(418).json(e.message);
        }
    }
};
