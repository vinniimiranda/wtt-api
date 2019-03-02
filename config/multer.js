const multer =require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = { 
    dest: path.resolve(__dirname, '..',  'temp', 'upload'),
    storage: multer.diskStorage({
        destination: (req, file, callback)=> {
            callback(null, path.resolve(__dirname, '..',  'temp', 'upload'))
        },
        filename: (req, file, callback)=> {
            crypto.randomBytes(16, (err, hash) => {
                if(err) callback(err)

                const filename = `${hash.toString('hex')}-${file.originalname.replace(/\s/g, '')}`

                callback(null, filename)
            })
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
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