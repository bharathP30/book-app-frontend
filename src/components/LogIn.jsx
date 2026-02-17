import { useState } from "react"

export default function LogIn ({ setAuth }) {
    const API_URL = "http://localhost:3000/api"

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleLogIn = async (e) => {
        e.preventDefault();
        
        try {
            const res = await fetch(`${API_URL}/auth/LogIn`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if(!res.ok) {
                throw new Error("Failed to Log In");
            } else {
                const data = await res.json();
                setAuth({ token: data.token, user: data.user });
            }

        } catch (error) {
            console.error(error);
        }
    }

    return(
        <>
            <form 
            className="flex flex-col justify-center items-center gap-2 m-2"
            action="submit" onSubmit={(e) => handleLogIn(e)}>
                        
                        <label htmlFor="email">Email: 
                        <input required
                        className="m-4 bg-black/20 rounded-md p-2"
                               type="email"
                               name="email"
                                placeholder="Enter email"
                                value={formData.email || ""}
                                onChange={(e) => {
                                    setFormData((prev) => ({...prev, email: e.target.value}))
                                }}
                        /> </label>

                        <label htmlFor="password">Password: 
                        <input required
                        className="m-4 bg-black/20 rounded-md p-2"
                               type="password"
                               name="password"
                                placeholder="********"
                                value={formData.password || ""}
                                onChange={(e) => {
                                    setFormData((prev) => ({...prev, password: e.target.value}))
                                }}
                        /> </label>

                        <button type="submit">Log In</button>
                    </form>
        </>
    )
}