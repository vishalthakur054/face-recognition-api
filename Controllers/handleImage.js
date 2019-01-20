const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '15046794adcc4d3088157394100746f0'
   });

const handleAPICall = (req,res) =>{
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL,  req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('fail to call API'));

}
   

const handleImage = (req,res,db) => {
    const { id } = req.body;
    db('users').where('id','=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0] )
    })
    .catch(err => res.status(400).json('unable to get count'))

}


module.exports = {
    handleImage,
    handleAPICall
}