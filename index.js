// implement your API here
const express = require('express'); // import the express package

const db = require('./data/db')

const server = express(); // creates the server

server.use(express.json())

// handle requests to the root of the api, the / route
server.get('/', (req, res) => {
  res.send('Hello from Express');
});


server.get('/users', (req, res) => {

    db.find()
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'failded to get users'
        });
    });
})

server.post('/users', (req, res) => {
    const newUser = req.body;

    db.insert(newUser)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'failded to add a new user'
        });
    });
})

server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
    .then(user => {
        if(user){
           res.json(user);
        } else {
            res.status(404).json({
                message: 'invalid user id'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'failded to get user'
        });
    });
})

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
    .then(deletedUser => {
        if(deletedUser){
           res.json(deletedUser); 
        } else {
            res.status(404).json({
                message: 'invalid user id'
            })
        }
        
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'failded to delete user'
        });
    });
})

server.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db.update(id, changes)
    .then(updatedUser => {
        if(updatedUser){
           res.json(updatedUser); 
        }  else {
            res.status(404).json({
                message: 'invalid user id'
            })
        }
        
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'failded to update user'
        });
    });
})






// watch for connections on port 5000
server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);