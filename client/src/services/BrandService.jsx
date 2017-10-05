import axios from 'axios'

class BrandService {
    sendData(data){
        axios.post('/brand/create', {
            item: data
        })
        .then((res)=>{
            console.log(res)
        })
        .catch(err=>console.log(err))
    }
}

export default BrandService;