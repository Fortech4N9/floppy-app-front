import axios from "axios";

const API_PROFILE = "http://localhost:9000/profile";

class profileService {
    getProfileComponents(user, token){
        try {
            return axios.post(API_PROFILE+'/get-profile/'+ user.id,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }).then(response =>{
                if (response.status === 201 && response.data) {
                    return response.data;
                }else{
                    console.error('Error getMessages:', response.status, response.data);
                    return [];
                }
            });
        }catch (error){
            console.error('Error getMessages:', error);
            return [];
        }
    }

    setProfileComponents(user, token, components) {
        try {
            const data = JSON.stringify(components) ?? [];
            return axios.post(API_PROFILE+'/set-profile/'+ user.id,
                {
                    data
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }).then(response =>{
                if (response.status === 201) {
                    //TODO что то тут придумать(может давать оповещение)
                }else{
                    console.error('Error getMessages:', response.status, response.data);
                }
            });
        }catch (error){
            console.error('Error getMessages:', error);
            return [];
        }
    }

    getUnusedProfileComponents(user, token){
        try {
            return axios.post(API_PROFILE+'/get-unused-components/'+ user.id,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }).then(response =>{
                if (response.status === 201 && response.data) {
                    return response.data;
                }else{
                    console.error('Error getMessages:', response.status, response.data);
                }
            });
        }catch (error){
            console.error('Error getMessages:', error);
            return [];
        }
    }

    async getLayout(user, token) {
        return this.getProfileComponents(user, token)
            .then(components => {
                return new Proxy({ components:components }, {});
            })
            .catch(error => {
                console.error("Ошибка при получении компонентов:", error);
            });
    }

    getUser(idUser, token){
        try {
            return axios.post(API_PROFILE+'/get-user/'+ idUser,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }).then(response =>{
                if (response.status === 201 && response.data) {
                    return response.data;
                }else{
                    console.error('Error getMessages:', response.status, response.data);
                }
            });
        }catch (error){
            console.error('Error getMessages:', error);
            return [];
        }
    }
}

export default new profileService();