import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';
// export default function App() {
//   const notify = () => toast('Wow so easy !');}


const manager = () => {
    const ref = useRef()
    const PasswordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPasswordArray(passwords)
        console.log(passwords)
    }
    useEffect(() => {
        getPasswords() 
    }, [])
    const copyText = (text) => {

        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        alert("show the passowrd");
        console.log(ref.current.src)
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png";
            PasswordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyecross.png";
            PasswordRef.current.type = "text"
        }
    }
    const savePassword = async  () => {
        // if any such id exist in the database delete it 

        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
          if (form.id) {
            await fetch ("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })
                    }
                const id = uuidv4()
        setPasswordArray([...passwordArray, { ...form, id }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id}) })

            // Otherwise clear the form and show toast
            setform({ site: "", username: "", password: "" })
            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast('Error: password Not saved!!')
        }
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const deletePassword = async (id) => {
        let c = confirm("Do you want to delete this password")
        if (c) {
            let c = confirm("Do you really want to delete this password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

            toast('Passwod Deleted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
}
   const editPassword = (id) => {
        setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />


            <div>
                <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,
            #8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]">
                    </div></div>
                <div className="p-2 pt-9 md:p-0 md:mycontainer ">
                    <h1 className='text-4xl text font-bold text-center'>

                        <span className='text-green-700'>&lt;</span>
                        Pass
                        <span className='text-green-500'>OP/&gt;</span>
                    </h1>
                    <p className="text-green-900 text-lg text-center">Your own Password Manager</p>
                    <div className=" flex flex-col p-4 text-black gap-5 items-center">
                        <input value={form.site} onChange={handleChange} placeholder='Enter website url' className="w-full rounded-full border border-green-800    p-4 py-1" type="text" name="site" id="site" />
                        <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                            <input value={form.username} onChange={handleChange} placeholder='Enter username' className="w-full rounded-full border border-green-500    p-4 py-1" type="text" name="username" id="username" />
                            <div className="relative flex flex-col md:flex-row">
                                <input ref={PasswordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className="w-full rounded-full border border-green-500    p-4 py-1" type="password" name="password" id="password" />
                                <span className='absolute right-[1px] top-[2px] cursor-pointer' onClick={showPassword}>
                                    <img ref={ref} className='p-1' width={30} src="icons/eye.png" alt="eye" />
                                </span>
                            </div>

                        </div>

                        <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-600 rounded-full px-2 py-2 w-fit hover:bg-green-500 hover:border-2 border-green-800'>
                            <script src="https://cdn.lordicon.com/lordicon.js"></script>
                            <lord-icon
                                src="https://cdn.lordicon.com/efxgwrkc.json"
                                trigger="hover">
                            </lord-icon>
                            Save Password</button>
                    </div>
                    <div className="passwords"><h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                        {passwordArray.length === 0 && <div>No passwords to show</div>}
                        {passwordArray.length !== 0 &&
                            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                                <thead className='bg-green-800 text-white'>
                                    <tr>

                                        <th className='py-2 border border-white text-center'>Site</th>
                                        <th className='py-2 border border-white text-center'>Username</th>
                                        <th className='py-2 border border-white text-center'>Password</th>
                                        <th className='py-2 border border-white text-center'>Actions</th>
                                    </tr>

                                </thead>
                                <tbody className='bg-green-100'>
                                    {passwordArray.map((item, index) => (
                                        <tr key={index}>
                                            <td className='py-2 border border-white text-center'>
                                                <div className='flex items-center justify-center '>
                                                    <a href={item.site} target='_blank'>{item.site}</a>
                                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                        <lord-icon
                                                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover" >
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-2 border border-white text-center'>
                                                <div className='flex items-center justify-center '>
                                                    <span>{item.username}</span>
                                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                        <lord-icon
                                                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover" >
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-2 border border-white text-center'>
                                                <div className='flex items-center justify-center '>
                                                    <span>{item.password}</span>
                                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                        <lord-icon
                                                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover" >
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='justify-center py-2 border border-white text-center'>
                                                <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </span>
                                                <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default manager