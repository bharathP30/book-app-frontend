
import { useState, useEffect } from "react";

export default function useAuth() {
    const [auth, setAuth] = useState(() => {
        try {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');
            
            if (token && user) {
                return { token, user: JSON.parse(user) };
            }
            return null;
        } catch (error) {
            return null;
        }
    });

    useEffect(() => {
        if (auth) {
            localStorage.setItem('token', auth.token);
            localStorage.setItem('user', JSON.stringify(auth.user));
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }, [auth]);

    return [auth, setAuth];
}