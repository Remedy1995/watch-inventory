const RoleAuth = (req, res, next) => {
    if (req.cookies.role === "user" && req.session.username) {
        return res.redirect('/userhome');
    }
     if (req.cookies.role === "admin" && req.session.username) {
        return res.redirect('/adminhome');
    }
    else {
        next();
    }
};

module.exports = RoleAuth;