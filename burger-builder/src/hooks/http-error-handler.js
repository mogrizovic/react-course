import { useState, useEffect } from 'react';

// not naming the function, just exporting it as a default
export default httpClient => {

    const [err, setErr] = useState(null);

    const reqInterceptor = httpClient.interceptors.request.use((req) => {
        setErr(null);
        return req;
    });

    const resInterceptor = httpClient.interceptors.response.use(
        (res) => res,
        (error) => {
            setErr(error)
        }
    );

    const { request, response } = httpClient.interceptors;
    useEffect(() => {
        return () => {
            request.eject(reqInterceptor);
            response.eject(resInterceptor);
        }
    }, [reqInterceptor, resInterceptor, request, response])

    const errorConfirmedHandler = () => {
        setErr(null);
    };

    return [err, errorConfirmedHandler];
}