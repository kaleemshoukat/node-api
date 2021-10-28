exports.error= (message='Something went wrong.', data=null) => {
    return {
        status: false,
        message : message,
        data : data,
    }
}

exports.success= (message='Operation succeeded!', data=null) => {
    return {
        status: true,
        message : message,
        data : data,
    }
}

exports.validation= (data, message='Please resolve the following errors!') => {
    return {
        status: false,
        message : message,
        data : data,
    }
}
