import { useState, useEffect } from "react";
import { supabase } from "../config/supabaseClient";

import { SmoothieCard, Smoothie } from "../components/SmoothieCard";

export default function Home() {
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [smoothies, setSmoothies] = useState<Smoothie[] | null>(null);
    const [orderBy, setOrderBy] = useState<string>("created_at");

    const handleDelete = (id: number) => {
        setSmoothies((prevSmoothies) => {
            const prevSmoothiesArray = prevSmoothies as Smoothie[] | null;
            if (!prevSmoothiesArray) return null;
            return prevSmoothiesArray?.filter((sm) => sm.id !== id);
        });
    };

    useEffect(() => {
        const fetchSmoothies = async () => {
            const { data, error } = await supabase
                .from("smoothies")
                .select()
                .order(orderBy, { ascending: false });

            if (error) {
                setFetchError("Could not fetch the smoothies");
                setSmoothies(null);
                console.log(error);
            }
            if (data) {
                setSmoothies(data);
                // console.log(data);
                setFetchError(null);
            }
        };
        fetchSmoothies();
    }, [orderBy]);

    return (
        <div className="page home">
            {fetchError && <p>{fetchError}</p>}
            {smoothies && (
                <div className="smoothies">
                    <div className="order-by">
                        <button onClick={() => setOrderBy("created_at")}>
                            Time Created
                        </button>
                        <button onClick={() => setOrderBy("rating")}>
                            Rating
                        </button>
                    </div>
                    <div className="smoothie-grid">
                        {smoothies.map((smoothie) => (
                            <>
                                <SmoothieCard
                                    key={smoothie.id}
                                    smoothie={smoothie}
                                    onDelete={handleDelete}
                                />
                            </>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
