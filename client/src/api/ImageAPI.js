import axios from 'axios';


export const uploadImage = (formData) => {
    const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    }
    axios.post("/user", formData, config)
      .then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error);
      })
}

export const getImage = async (name) => {
  const response = await axios.get("/user");
  return response.data;
}