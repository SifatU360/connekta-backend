// import jwt, { JwtPayload } from 'jsonwebtoken';

// export const createToken = (
//   jwtPayload: { userId: string; role: string },
//   secret: string,
//   expiresIn: string,
// ) => {
//   return jwt.sign(jwtPayload, secret, {
//     expiresIn,
//   });
// };

// export const verifyToken = (token: string, secret: string) => {
//   return jwt.verify(token, secret) as JwtPayload;
// };

import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken'
export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string,
): string => {
  const signOptions: SignOptions = {
    expiresIn: expiresIn as SignOptions['expiresIn'],
  }

  return jwt.sign(jwtPayload as object, secret, signOptions)
};
 export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};