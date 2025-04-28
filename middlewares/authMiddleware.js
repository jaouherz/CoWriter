const jwt = require('jsonwebtoken')

const authentication=(req,res,next)=>{
    const token=req.header("Authorization")
    if(!token){
        res.status(401).send({error:"not Authorized"})
    }
    const decoded=jwt.verify(token.replace("Bearer ",""),process.env.JWT_SECRET)
    req.user=decoded
    next();
}
const adminAuthorization = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(401).send({ error: "Not authorized. No token." });
        }

        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.SECRET_KEY);

        if (decoded.role !== "admin") {
            return res.status(403).send({ error: "Not authorized. Admins only." });
        }

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(400).send({ error: "Invalid token." });
    }
};



module.exports = {
    authentication,
    adminAuthorization
};