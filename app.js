const express = require('express')

const app = express()

// app.get('/', (req, res) => {
//     res.status(200).send('Halo ini pesan dari server side!')
// })

app.get('/', (req, res) => {
    res.status(200).json({message: 'Halo ini pesan dari server side!', app: 'bentours'})
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}...`)
})

