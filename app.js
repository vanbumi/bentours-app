const express = require('express')
const fs = require('fs')
const morgan = require('morgan')

const app = express()

// (1) MIDDLEWARES

app.use(morgan('dev'))
app.use(express.json())

// CREATE INDEX PAGE
app.get('/', (req, res) => {
    res.send('Welcome to Ben Tours!')
})

// MEMBACA DATA DARI FOLDER
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))


// (2) ROUTE HANDLER
const getAllTours = (req, res) => {
  res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {tours}
  })
}

const getTour = (req, res) => {

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
}

const createTour = (req, res) => {

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
}

const updateTour = (req, res) => {
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
}

const deleteTour = (req, res) => {
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
}

// Users Request
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet!'
  })
}

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet!'
  })
}

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet!'
  })
}

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet!'
  })
}

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet!'
  })
}


// (3) ROUTES
// Menggunakan Middleware Router
const tourRouter = express.Router()
const userRouter = express.Router()

tourRouter
  .route('/')
  .get(getAllTours)
  .post(createTour)

tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

// Users Routes
userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser)
  
userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

  app.use('/api/v1/tours', tourRouter)
  app.use('/api/v1/users', userRouter)

// (4) START SERVER
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}...`)
})

