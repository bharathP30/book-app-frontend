import { useState } from "react";


export default function SignUp ({ setAuth, API_URL }) {
    console.log(API_URL);
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleSignUp = async (e) => {
        e.preventDefault();
        
        try {
                console.log(formData);
                const res = await fetch(`${API_URL}/auth/SignUp`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            console.log(res);

            if(!res.ok) {
                const data = await res.json();
                alert(data.message);
                throw new Error("Failed to sign up");
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
            <form className="flex flex-col justify-center items-center gap-2 m-2"
            action="submit" onSubmit={(e) => handleSignUp(e)}>
                        <input required
                                className="m-4 bg-black/20 rounded-md p-2"
                                type="text"
                                placeholder="Enter name"
                                value={formData.name || ""}
                                onChange={(e) => {
                                    setFormData((prev) => ({...prev, name: e.target.value}))
                                }}
                        />
                        <input required
                            className="m-4 bg-black/20 rounded-md p-2"
                               type="email"
                                placeholder="Enter email"
                                value={formData.email || ""}
                                onChange={(e) => {
                                    setFormData((prev) => ({...prev, email: e.target.value}))
                                }}
                        />
                        <input required
                            className="m-4 bg-black/20 rounded-md p-2"
                               type="password"
                                placeholder="********"
                                value={formData.password || ""}
                                onChange={(e) => {
                                    setFormData((prev) => ({...prev, password: e.target.value}))
                                }}
                        />

                        <button type="submit">Sign Up</button>
                    </form>
        </>
    )
}