const JsonFormat = ({ response }) => {
    // URL 디코딩 함수
    const decodeURIsInObject = (obj) => {
        if (typeof obj === 'string') {
            try {
                return decodeURIComponent(obj);
            } catch {
                return obj; // 디코딩에 실패하면 원본 반환
            }
        } else if (Array.isArray(obj)) {
            return obj.map(decodeURIsInObject);
        } else if (typeof obj === 'object' && obj !== null) {
            return Object.fromEntries(
                Object.entries(obj).map(([key, value]) => [key, decodeURIsInObject(value)])
            );
        }
        return obj; // 기본적으로 원본 반환
    };

    // response 객체에서 URL 디코딩 처리
    const decodedResponse = decodeURIsInObject(response);
    return (
        <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
            {JSON.stringify(decodedResponse, null, 2)}
        </div>
    );
};

export default JsonFormat;
