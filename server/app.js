//constant variables
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//My data
var data = [{
    item: 'Create to do list',
    id: 0,
    done: false,
    image: false,
    src: ""
  },
  {
    item: 'Do the miracle',
    id: 1,
    done: false,
    image: false,
    src: ""
  },
  {
    item: 'Create the board for to do',
    id: 2,
    done: false,
    image: false,
    src: ""
  },
  {
    item: 'Profile login',
    id: 3,
    done: false,
    image: false,
    src: ""
  },
  {
    item: 'Create to do list',
    id: 4,
    done: false,
    image: false,
    src: ""
  },
  {
    item: 'Create to do list',
    id: 5,
    done: false,
    image: false,
    src: ""
  },
  {
    item: 'Do the miracle',
    id: 6,
    done: false,
    image: false,
    src: ""
  },
  {
    item: 'Create the board for to do',
    id: 7,
    done: false,
    image: false,
    src: ""
  },
  {
    item: 'Profile login',
    id: 8,
    done: false,
    image: false,
    src: ""
  },
  {
    item: 'Create to do list',
    id: 9,
    done: false,
    image: false,
    src: ""
  },
  {
    item: 'Create to do list',
    id: 10,
    done: false,
    image: false,
    src: ""
  },
  {
    item: 'Create to do list',
    id: 11,
    done: true,
    image: false,
    src: ""
  },
  {
    item: 'Do the miracle',
    id: 12,
    done: true,
    image: false,
    src: ""
  },
  {
    item: 'Create the board for to do',
    id: 13,
    done: true,
    image: false,
    src: ""
  },
  {
    item: 'Profile login',
    id: 14,
    done: true,
    image: false,
    src: ""
  },
  {
    item: 'Create to do list',
    id: 15,
    done: true,
    image: false,
    src: ""
  },
  {
    item: 'Create to do list',
    id: 16,
    done: true,
    image: false,
    src: ""
  },
  {
    item: 'Do the miracle',
    id: 17,
    done: true,
    image: false,
    src: ""
  },
  {
    item: 'Create the board for to do',
    id: 18,
    done: true,
    image: false,
    src: ""
  },
  {
    item: 'Profile login',
    id: 19,
    done: true,
    image: false,
    src: ""
  },
  {
    item: 'Create to do list',
    id: 20,
    done: true,
    image: false,
    src: ""
  }
];

//Get data
app.get('/', function (req, res) {
  res.send(data);
});

//Editing item name
app.post('/', function (req, res) {
  data.forEach((part, index, theArray) => {
    if (theArray[index].id == parseInt(req.body.id)) {
      theArray[index].item = req.body.item;
    }
  });
  //Adding new item
  if (parseInt(req.body.id) > data.length - 1) {
    data.push({item: req.body.item,id: req.body.id,done: req.body.done});
  }
  res.send(data);
});

//Drag and drop order change
app.post('/dragAndDrop', function (req, res) {
  data = req.body;
  res.send(data);
});


//Post image source
app.post('/image', function (req, res) {
  data.forEach((part, index, theArray) => {
    if (theArray[index].id == parseInt(req.body.id)) {
      theArray[index].src = req.body.src;
      theArray[index].image = true;
    }
  });
  res.send(data);
});

//Change after checkmark click
app.post('/checkmark', function (req, res) {
  data.forEach((part, index, theArray) => {
    if (theArray[index].id == parseInt(req.body.id)) {
      theArray[index].done = !theArray[index].done;
    }
  });
  res.send(data);
});

//Delete one item
app.delete('/deleteItem', function (req, res) {
  data = data.filter((item) => item.id !== req.body.id);
  data.forEach((part, index, theArray) => {
    theArray[index].id = index;
  });
  res.json(data)
})


//Delete all items in table Done
app.delete('/deleteAllDone', function (req, res) {
  data = data.filter((item) => item.done !== true);
  data.forEach((part, index, theArray)=>{
    theArray[index].id = index;
  });
  res.json(data)
})

//Port 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
