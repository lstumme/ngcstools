module.exports = (data) => {
    result = [];
    for (let i = 0; i < data.length; i++) {
        result.push(data[i].toString());
    }
    return result;
};