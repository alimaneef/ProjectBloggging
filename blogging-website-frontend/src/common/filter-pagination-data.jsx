import axios from 'axios';

const FilterPaginationData = async ({ create_new_arr = false, state, data, page, countRoute, data_to_send={},user=undefined}) => {
    let obj;

    let headerObj={};

    if(user){
        headerObj.headers={
            'Authorization':`Bearer ${user}`
        }
    }

    if (state != null && !create_new_arr) {
        obj = { ...state, results: [...(state.results), ...data], page }
    }
    else {
        await axios.post(import.meta.env.VITE_SERVER_DOMAIN + countRoute, data_to_send,headerObj )
            .then(({ data: { totalDocs } }) => {
                obj = { results: data, page: 1, totalDocs }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return obj;
}

export default FilterPaginationData;