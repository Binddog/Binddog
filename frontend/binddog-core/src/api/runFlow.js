import docsAxios from "./docsAxios";

// API 플로우 실행
export const runFlow = async (endpoint, method = 'GET', paramObject, headerObject, requestBody) => {
    try {
        let response;

        switch (method) {
            case 'POST':
                response = await docsAxios.post(endpoint, requestBody, { headers: headerObject });
                break;
            case 'PUT':
                response = await docsAxios.put(endpoint, requestBody, { headers: headerObject });
                break;
            case 'DELETE':
                response = await docsAxios.delete(endpoint, { data: paramObject, headers: headerObject });
                break;
            case 'GET':
            default:
                response = await docsAxios.get(endpoint, { params: paramObject, headers: headerObject });
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