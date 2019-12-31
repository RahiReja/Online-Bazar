// here we are protecting the routes so that without login nobody can reach that route//

module.exports = (req,res,next)=>{

    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
}