import JWT from 'jsonwebtoken'

//Protected Routes token base
export const requireSignIn = async (req,res,next) => {
   try {
    const decode = JWT.verify(
        req.headers.authorization,
         process.env.JWT_SECRET
         );
         next();
   } catch (error) {
    console.log(error);
   }
}