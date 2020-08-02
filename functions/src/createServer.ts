import * as express from 'express'
import * as admin from 'firebase-admin'

var firebaseConfig:any= {
    "type": "service_account",
    "project_id": "nxt-instagram",
    "private_key_id": "28ed2d8d365853c81d69e526c144f22a0e0f26a0",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDEfjQ3Jj0zB22h\nmjf7v21chyS7bpX7EdqkvKh1ybyVn0M+Y89Npq42KIFdEXtA4rvrw2VPR/NWvDNK\ne8dX7LeRwQ1Cjd3JYU/MijnNKMcRybJW7bfTE9PdfylyJFEI9ruGFPNp2i2dcNaL\nji5HdbIJDJd/wYigUe30wAj47qjw5knVPdUwTRtMlNqHqsFqwVT7LApyt6OMF3e8\nvebha39YXI62DOQTdZ6s2Alktv4RduVOPS9FHk2RyLsDm3QhvopwVsIvq0Tf8sbi\nnZQx8HTZ9Bmji8QxtkDtwgMhOo/cOHIWMeJov0+JuKN8V4N0w3i7H9LPCZfTZgL4\nEIK6o651AgMBAAECggEAN9GoULBmu0vVa46Nb9FSJnJnz20bYy8PvzOu4YM1NQYA\nysT825DJta3tDfzM2EJw4wlnis2kRZQCOBsQppwjC99dPnZhtncT/cWYpPz8DEQR\nixtN2MMtsSMSKZBCivrYi78A5SWrRqoK8Ksr33YCZQq0MQFQKEcOA7TX96uIx6IM\nktUj/BPeOkZyHtOVMc7Rj0HxoG0YAiQdT72RtUCokuHdnoO9y59IO7IMb771qrwg\nXLzjNvkSsw+/d0LuRRrCUZW53M/8/wW/K7VZCDiQFhlyzYN3ass2gXTntCTwZnEI\nTGfOnFeof3LXREysheD5QdWYlhxge87kqEiK1lWGMwKBgQDghtYwuNUoS+OEvvvZ\nKPuJ7foyZqXps51nH480clo3n1ysPh13IzEWLgvO6xsT1YF6djX6jsxqxs2hcADR\nTj29/8jmkPvTLbZUOoNwJI1y6TgEOCtb4F8DTvX+6qRA8Kj/OUzu5MUrGgd64eKV\nKYa+GAjcVflKNBsrYdb3T+j2UwKBgQDgCV/Xb9GEDESsVS0b7Qq2Z3P1PAAejRMB\najC4EvKlfJ1zntZcaY2OpiJTTCpBJ8TV4vMRpntxxpFS43fooVA52sTvrmr/Kwtx\n/0s2i7fbkwEAplsNeLFkSpAFU4syf9/L5DACFQcJHpR8YFkTIzyvmRobGfV1/3/b\nkK46zmifFwKBgEUnImdFNlm/7eZf0D/VUIvt4QaO+QDe0lcFsFyt77179tYSF48v\nJpo3OmnTnbZhJwzpxbxTKQCmFIVpcscEex2+30isVPN4+9Q7ZWovx+UhkaAzEJ+u\nnnTtZ/TInihmNxbMtjZJ/bRFwxIE6n2YmaiIzInYbPx+yfN1ofjwAseDAoGBAIfS\npxxBWlAn7+paqUJo7zmudoqSma/r7z3IV0kBk8HoTryt61+TTpLQ/bZqUqO1rIvP\nT3W/7M8Jh0ktRqDuS2kHzKVSpOOWARZXpA2pnwmrkcwHDuSX61PWMIJKJ/WxuMgv\nyzs37FAHDhZpgxcrIbuDomQT1NB42dcPW9GjGaJ5AoGBAMA3eiiwMSBV9BQHaCrp\nYHrXj0n4YQcihDur9/gIunetDUaz7q1ta0gwJ73ql6KxZTgTrgea6O06Kvq7EJya\n4C6hjlpcwrnte0dhvleGKOQ0HS6Hy34ccgdhQ1y8u69vRps2K7OBlG+thMU2MxF7\nyBZbfvJKKcL6ocgsDgQqLA32\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-is6sk@nxt-instagram.iam.gserviceaccount.com",
    "client_id": "109719631453806874571",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-is6sk%40nxt-instagram.iam.gserviceaccount.com"
  }

admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    databaseURL: "https://nxt-instagram.firebaseio.com"
})
const db = admin.firestore()
db.settings({ timestampsInSnapshots: true })
const auth = admin.auth()

export default () => {
    const app = express()
    app.use(async (req, res, next) => {
        const token: any = req.headers.authorization
        try{
            const { uid, email } = await auth.verifyIdToken(token)
            const snap = await db.collection('users').doc(uid).get()
            const user = snap.data()
            Object.assign(req, {
                user: {
                    ...user,
                    uid,
                    email
                } 
            })
            next()
        }catch(e){
            res.status(403).send('Error al autorizar'+e)
        }
    })

    app.get('/posts/:postId/like', async (req: any, res) => {
        const { uid } = req.user
        const { postId } = req.params
        const snaps = await db.collection('like')
            .where('userId', '==', uid)
            .where('postId', '==', postId)
            .limit(1)
            .get()
        const result:{id?: string} = {}
        snaps.forEach(x => Object.assign(result, { ...x.data(), id: x.id }))
        if (result.id){
            db.collection('like').doc(result.id).delete()
        }
        if(!result.id){
            await db.collection('like').doc().set({
                userId: uid,
                postId,
                createdAt: new Date(),
            })
        }
        res.sendStatus(204)
    })
    app.get('/posts/:postId/share', async (req: any, res) => {
        const { uid } = req.user
        const { postId } = req.params
        const snap = await db.collection('posts').doc(postId).get()
        const post = snap.data()
        const result = await db.collection('posts').add({
            ...post,
            userId: uid,
        })
        res.send({ id: result.id })
    })
    return app
}