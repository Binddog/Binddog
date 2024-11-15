import docsAxios from "./docsAxios";

// API 플로우 실행
export const runFlow = async (endpoint, method = 'GET', paramObject, paramValue, pathVariable, parameter) => {
    try {
        let response;

        switch (method) {
            case 'POST':
                response = await docsAxios.post(endpoint, paramObject);
                break;
            case 'PUT':
                response = await docsAxios.put(endpoint, paramObject);
                break;
            case 'DELETE':
                response = await docsAxios.delete(endpoint);
                break;
            case 'GET':
            default:
                response = await docsAxios.get(endpoint, { params: paramObject });
                break;
        }

        return {
            success: true,
            response: response
        }
    } catch (err) {
        return {
            success: false,
            response: err,
        };
    }
}