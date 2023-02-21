const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const generateImage = async (req, res)=>{
    const {prompt, size} = req.body;
    const imageSize = size === 'small'? '256x256' : size ==='medium' ? '512x512' : '1024x1024'
    try{
        const responce = await openai.createImage({
            prompt,
            n:1,
            size: imageSize
        })
        const imageUrl = responce.data.data[0].url;
        res.redirect(imageUrl)
        // res.status(200).json({
        //     sucess: true,
        //     imageUrl: imageUrl
        // })
    }catch(error){
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }
        res.status(400).json({
            check:`Prompt box could'nt be empty`,
            message: 'Image is not genrated due to an random issue'
        })
    }
}

module.exports = {generateImage}