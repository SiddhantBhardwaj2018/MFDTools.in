import { API_URL } from "../../../../config/url";

const registerUser  = async (req, res) => {

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Replace with your allowed origins
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(200).end();
    return;
  }

  // checking if is a post request
  if(req.method === 'POST') {

    let { email, password } = req.body;
    console.log(JSON.stringify({
        email,password
    }));
    console.log(API_URL)
    // Making a post request to hit our backend api-endpoint
   /* const apiRes = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        email,
        password
      })
    }); */

    const apiRes = await fetch(`${API_URL}/api/auth/register`,{
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            email,password
        })
    });
    const data = await apiRes.json();
    if(apiRes.ok){
        res.status(200).json(data)
    }else{
        res.status(apiRes.status).json({message: "error"})
    }


    
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({message: `Method ${req.method} not allowed`})
  }
}

export default registerUser;