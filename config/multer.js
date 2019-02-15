const multer =require('multer')
const path = require('path')
const crypto = require('crypto')
console.log(path.resolve(__dirname, '..',  'temp', 'upload'))
module.exports = { 
    dest: path.resolve(__dirname, '..',  'temp', 'upload'),
    storage: multer.diskStorage({
        destination: (req, file, callback)=> {
            callback(null, path.resolve(__dirname, '..', '..',  'temp', 'upload'))
        },
        filename: (req, file, callback)=> {
            crypto.randomBytes(16, (err, hash) => {
                if(err) callback(err)

                const filename = `${hash.toString('hex')}-${file.originalname}`

                callback(null, filename)
            })
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/png',
            'image/jpg',
            'application/pdf'
        ]
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        }
        else{
            cb(new Error ('Formato de arquivo inválido'))
        }
    }
}