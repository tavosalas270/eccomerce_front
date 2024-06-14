import axios from "axios";

function getAllProducts(config) {
    return axios.get("http://localhost:8000/api_products_view/products/", config).then(res => {
        const responseData = res.data;
        return responseData;
    });
}

function postProducts(args, config) {
    return axios.post("http://localhost:8000/api_products_view/products/", args, config).then(res => {
        const responseData = res.data;
        return responseData;
    });
}

function updateProducts(args, config, id) {
    return axios.put("http://localhost:8000/api_products_view/products/" + id + "/", args, config).then(res => {
        const responseData = res.data;
        return responseData;
    });
}

function deleteProducts(id, config) {
    return axios.delete("http://localhost:8000/api_products_view/products/" + id, config).then(res => {
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
    return axios.post("http://localhost:8000/api_products_view/category_products/", args, config).then(res => {
        const responseData = res.data;
        return responseData;
    });
}

function updateCategories(args, config) {
    return axios.put("http://localhost:8000/api_products_view/category_products/" + args.id + "/", args, config).then(res => {
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
    return axios.post("http://localhost:8000/api_products_view/measure_unit/", args, config).then(res => {
        const responseData = res.data;
        return responseData;
    });
}

function updateUnits(args, config) {
    return axios.put("http://localhost:8000/api_products_view/measure_unit/" + args.id + "/", args, config).then(res => {
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
    return axios.post("http://localhost:8000/api_products_view/indicators/", args, config).then(res => {
        const responseData = res.data;
        return responseData;
    });
}

function updateIndicators(args, config) {
    return axios.put("http://localhost:8000/api_products_view/indicators/" + args.id + "/", args, config).then(res => {
        const responseData = res.data;
        return responseData;
    });
}

function deleteIndicators(id, config) {
    return axios.delete("http://localhost:8000/api_products_view/indicators/" + id, config).then(res => {
        const responseData = res.data;
        return responseData;
    });
}


export { getAllProducts, postProducts, updateProducts, deleteProducts, getCategories, postCategories, updateCategories, deleteCategories, getUnits, postUnits, 
    updateUnits, deleteUnits, getIndicators, postIndicators, updateIndicators, deleteIndicators };