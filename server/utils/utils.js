import jwt, { decode } from 'jsonwebtoken'

export const generateToken = async (payload)=>{
    const genToken = await jwt.sign(payload, process.env.JWT_SECRET)
    return genToken
}

export const decodeToken = async (token)=>{
    const decodedToken = await jwt.decode(token)
    return decodedToken
}