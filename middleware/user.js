const checkAuth = (req, res, next) => {
    // Check if the user is logged out
    if (!req.session.username) {
        // If the user is not logged in, redirect to the login page
        return res.redirect('/');
    }
    else {
        // If the user is logged in, continue to the next middleware or route handler
        next();
    }
};

module.exports = checkAuth;