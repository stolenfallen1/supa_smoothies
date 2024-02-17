import { useState, useEffect, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../config/supabaseClient";

export default function Update() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>("");
    const [method, setMethod] = useState<string>("");
    const [rating, setRating] = useState<number>();
    const [formError, setFormError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title || !method || !rating) {
            setFormError("Please fill in all fields");
            return;
        }

        const { data, error } = await supabase
            .from("smoothies")
            .update({ title, method, rating })
            .eq("id", id)
            .select();

        if (error) {
            setFormError("There was an error updating the smoothie recipe");
            console.log(error);
        }

        if (data) {
            setFormError(null);
            navigate("/", { replace: true });
        }
    };

    useEffect(() => {
        const fetchSmoothie = async () => {
            const { data, error } = await supabase
                .from("smoothies")
                .select()
                .eq("id", id)
                .single();

            if (error) {
                navigate("/", { replace: true });
            }

            if (data) {
                setTitle(data.title);
                setMethod(data.method);
                setRating(data.rating);
            }
        };
        fetchSmoothie();
    }, [id, navigate]);

    return (
        <div className="page update">
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

                <button>Update Smoothie Recipe</button>
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    );
}
