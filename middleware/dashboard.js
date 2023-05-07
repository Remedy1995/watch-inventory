

const dashBoardAuth = (req, res, next) => {
    if (req.session.username) {
        return res.redirect('/userhome');
    }
    else {
        next();
    }
};

module.exports = dashBoardAuth;