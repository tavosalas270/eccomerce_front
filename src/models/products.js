import axios from "axios";

function getAllProducts(config) {
    return axios.get("http://localhost:8000/api_products_view/products/", config).then(res => {
        const responseData = res.data;
        return responseData;
    });
}

function getCategories(config) {
    return axios.get("http://localhost:8000/api_products_view/category_products/", config).then(res => {
        const responseData = res.data;
        return responseData;
    });
}

function postCategories(args, config) {
    return axios.post("http://localhost:8000/api_products_view/category_products/", config, args).then(res => {
        const responseData = res.data;
        return responseData;
    });
}

function updateCategories(args, config) {
    return axios.put("http://localhost:8000/api_products_view/category_products/" + args.id + "/", config, args).then(res => {
        const responseData = res.data;
        return responseData;
    });
}

function deleteCategories(id, config) {
    return axios.delete("http://localhost:8000/api_products_view/category_products/" + id, config).then(res => {
        const responseData = res.data;
        return responseData;
    });
}

function getUnits(config) {
    return axios.get("http://localhost:8000/api_products_view/measure_unit/", config).then(res => {
        const responseData = res.data;
        return responseData;
    });
}

function postUnits(args, config) {
    return axios.post("http://localhost:8000/api_products_view/measure_unit/", config, args).then(res => {
        const responseData = res.data;
        return responseData;
    });
}

function updateUnits(args, config) {
    return axios.put("http://localhost:8000/api_products_view/measure_unit/" + args.id + "/", config, args).then(res => {
        const responseData = res.data;
        return responseData;
    });
}

function deleteUnits(id, config) {
    return axios.delete("http://localhost:8000/api_products_view/measure_unit/" + id, config).then(res => {
        const responseData = res.data;
        return responseData;
    });
}

function getIndicators(config) {
    return axios.get("http://localhost:8000/api_products_view/indicators/", config).then(res => {
        const responseData = res.data;
        return responseData;
    });
}

function postIndicators(args, config) {
    return axios.post("http://localhost:8000/api_products_view/indicators/", args).then(res => {
        const responseData = res.data;
        return responseData;
    });
}

function updateIndicators(args, config) {
    return axios.put("http://localhost:8000/api_products_view/indicators/" + args.id + "/", args).then(res => {
        const responseData = res.data;
        return responseData;
    });
}

function deleteIndicators(id, config) {
    return axios.delete("http://localhost:8000/api_products_view/indicators/" + id).then(res => {
        const responseData = res.data;
        return responseData;
    });
}


export { getAllProducts, getCategories, postCategories, updateCategories, deleteCategories, getUnits, postUnits, 
    updateUnits, deleteUnits, getIndicators, postIndicators, updateIndicators, deleteIndicators };