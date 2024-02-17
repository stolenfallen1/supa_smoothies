import { useState, useEffect } from "react";
import { supabase } from "../config/supabaseClient";

import { SmoothieCard, SmoothieCardProps } from "../components/SmoothieCard";

export default function Home() {
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [smoothies, setSmoothies] = useState<SmoothieCardProps[] | null>(
        null
    );

    useEffect(() => {
        const fetchSmoothies = async () => {
            const { data, error } = await supabase.from("smoothies").select();

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
    }, []);

    return (
        <div className="page home">
            {fetchError && <p>{fetchError}</p>}
            {smoothies && (
                <div className="smoothies">
                    {/* order-by button */}
                    <div className="smoothie-grid">
                        {smoothies.map((smoothie, index) => (
                            <>
                                <SmoothieCard key={index} smoothie={smoothie} />
                            </>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
