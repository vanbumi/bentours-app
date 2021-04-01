const express = require('express')
const fs = require('fs')

const app = express()

// Add middleware
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to Ben Tours!')
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

// GET REQUREST
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {tours}
    })
})

// GET REQUEST DENGAN ID
app.get('/api/v1/tours/:id', (req, res) => {

    // Merubah ID dari string ke number
    const id = req.params.id * 1

    if (id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    // Query ke data collections
    const tour = tours.find(el => el.id === id)

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
})

// POST REQUEST
app.post('/api/v1/tours', (req, res) => {
    // console.log(req.body)
    // res.send('Done')

    // menambakan ID
  const newId = tours[tours.length -1].id + 1;
  const newTour = Object.assign({id: newId}, req.body);

  tours.push(newTour);
  
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      })
    }
  )
})

// PATCH REQUEST
app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here....>'
    }
  })
})

// DELETE REQUEST
app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }

  res.status(204).json({
    status: 'success',
    data: null
  })
})


// SETUP SERVER
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}...`)
})

