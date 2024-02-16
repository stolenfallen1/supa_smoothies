import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../config/supabaseClient"

export default function Create() {
    const navigate = useNavigate()

    const [title, setTitle] = useState<string>("")
    const [method, setMethod] = useState<string>("")
    const [rating, setRating] = useState<number>()
    const [formError, setFormError] = useState<string | null>(null)

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if(!title || !method || !rating) {
            setFormError('Please fill in all fields')
            return
        }
        const { data, error } = await supabase.from('smoothies').insert([{ title, method, rating }]).select()

        if (error) {
            console.log(error)
            setFormError('Please fill in all fields')
        }

        if (data) {
            console.log(data)
            setFormError(null)
            navigate('/')
        }
    }

    return (
        <div className="page create">
            <form onSubmit={handleSubmit}>

                <label htmlFor="title">Title:</label>
                <input 
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="method">Method(s):</label>
                <textarea 
                    id="method" 
                    value={method} 
                    onChange={(e) => setMethod(e.target.value)} 
                />
                <label htmlFor="title">Rating:</label>
                <input 
                    type="number"
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))} 
                />

                <button>Create a Smoothie Recipe</button>
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    )
}
