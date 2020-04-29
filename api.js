var express = require('express')
var router = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser')

// mongodb
const {MongoClient} = require('mongodb');
const config = require('./.env.json');
// default uri "mongodb://localhost:27017/test?retryWrites=true&w=majority&useUnifiedTopology=true"
const uri = config.mongo.uri;
const client = new MongoClient(uri);

router.use(bodyParser.json());

var corsOptions = {
    origin: "*",
    methods: ['GET', 'PUT', 'POST'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
  }
  
router.use(cors(corsOptions));

client.connect();

async function mongoSelectStore(q){
  var result = {};
    try {
        const db = client.db('up');
        const collection = db.collection('stores')
        result = await collection.find(q).toArray();
    } catch (e) {
        console.error(e);
    }
  return result;
}

async function mongoInsertStore(data){
    try {
        const db = client.db('up');
        const collection = db.collection('stores')
        await collection.insertOne(data);
        return 1;
    } catch (e) {
        console.error(e);
        return -1;
    }
}


async function mongoSelectReadyData(q) {
    var result = {};
      try {
          const db = client.db('up');
          const collection = db.collection('readydata')
          result = await collection.find(q).toArray();
      } catch (e) {
          console.error(e);
      }
    return result;
  }

  async function mongoInsertReadyData(data) {
      try {
          const db = client.db('up');
          const collection = db.collection('readydata')
          await collection.insertOne(data);
          return 1;
        } catch (e) {
            console.error(e);
            return -1;
        }
    }

    async function mongoSelectRawData(q) {
      var result = {};
        try {
            const db = client.db('up');
            const collection = db.collection('rawdata')
            result = await collection.find(q).toArray();
        } catch (e) {
            console.error(e);
        }
      return result;
    }

  async function mongoInsertRawData(data) {
        try {
            const db = client.db('up');
            const collection = db.collection('rawdata')
            await collection.insertOne(data);
            return 1;
        } catch (e) {
            console.error(e);
            return -1;
        }
    }

    async function mongoSelectPlatforms(q) {
        var result = {};
        try {
            const db = client.db('up');
            const collection = db.collection('platforms')
            result = await collection.find(q).toArray();
        } catch (e) {
            console.error(e);
        }
        return result;
    }
  
    async function mongoInsertPlatform(data) {
        try {
            const db = client.db('up');
            const collection = db.collection('platforms')
            await collection.insertOne(data);
            return 1;
        } catch (e) {
            console.error(e);
            return -1;
        }
    }

// middleware that is specific to this router
/*router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})*/

router.get('/negozianti/:id', cors(), async function (req, res) {
    res.send(await mongoSelectStore({id: req.params.id}).catch(console.error));
})

router.get('/negozianti', cors(), async function (req, res) {
    res.send(await mongoSelectStore({}).catch(console.error));
})

router.get('/readydata', cors(), async function (req, res) {
    res.send(await mongoSelectReadyData(req.query?req.query:{}).catch(console.error));
})

router.post('/readydata', async function (req, res) {
    res.send(await mongoSelectReadyData(req.body?req.body:{}).catch(console.error));
})

router.get('/rawdata', cors(), async function (req, res) {
    res.send(await mongoSelectRawData(req.params.q?req.params.q:{}).catch(console.error));
})

router.get('/platforms', cors(), async function (req, res) {
    res.send(await mongoSelectPlatforms(req.query?req.query:{}).catch(console.error));
})

router.get('/negozianti/add/:name/:type', cors(), async function (req, res) {
    res.send({"state":await mongoInsertStore({name: req.params.name,type: req.params.type})});
})

router.post('/negozianti/add/', cors(), async function (req, res) {
    res.send({"state":await mongoInsertStore(req.body)});
})

router.post('/readydata/add/', cors(), async function (req, res) {
    res.send({"state":await mongoInsertReadyData(req.body)});
})

router.post('/rawdata/add/', cors(), async function (req, res) {
    res.send({"state":await mongoInsertRawData(req.body)});
})

router.post('/platforms/add/', cors(), async function (req, res) {
    res.send({"state":await mongoInsertPlatform(req.body)});
})

module.exports = router
