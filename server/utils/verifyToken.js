import { firebase } from "../firebase.js";


export const verifyToken = async (req, res, next) => {
    if (req.headers?.authorization?.startsWith('Bearer ')) {
      const idToken = req.headers.authorization.split('Bearer ')[1];
      try {
        const decodedToken = await firebase.auth().verifyIdToken(idToken);
        req.uid = decodedToken.uid;
        next();
      } catch (err) {
        res.status(400).send({error: "invalid id token"})
      }
    } else {
        res.status(400).send({error: "no bearer in auth header"})
    }
    
  }