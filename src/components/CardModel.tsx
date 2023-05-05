import {Card, CardMedia} from "@mui/material";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

interface type {
    poster_path: string,
    original_title:string,
    original_name: string,
    id: number
}

const CardModel = ({poster_path, original_title, id, original_name} :type)=>{
  const [showToto, setShowToto] = useState(false);
  const location = useLocation()
    useEffect(() => {
        if (location.pathname !== '/') {
            setShowToto(false);
        }
    }, [location]);
    return (


    <div className="relative">
        <div className="relative" onMouseEnter={() => setShowToto(true)} onMouseLeave={() =>
            setShowToto(false)
        }>
            <Card sx={{ maxWidth: 300, maxHeight: 500 ,minHeight: 500, height: 600}} key={id} className="z-0">
                <div className="relative">
                    <CardMedia
                        component="img"
                        height="50"
                        image={"https://image.tmdb.org/t/p/w300" + poster_path}
                        sx={{maxWidth: 300, maxHeight: 500 ,minHeight: 500, height: 600}}
                    />
                </div>
            </Card>
        </div>
            {showToto && (
                <div className="absolute top-0 left-0 z-40 bg-emerald-700/50 content-card fade-in items-center  text-center text-2xl font-bold text-slate-50 hover:drop-shadow-xl p-5  w-[100%] ">
                    {original_title ?(
                        <h1>{original_title}</h1>
                    ):(
                        <h1>{original_name}</h1>
                    )}
                </div>
            )}
        </div>

    )
}

export default CardModel



