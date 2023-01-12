
const admin = (req,res,next) => {
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).json({err : 'Not authorized as an admin'})
        throw new Error ('Not authorized as an admin')
    }
}

export {admin}