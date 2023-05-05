import CardModel from "../components/CardModel.tsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Pagination} from "@mui/material"
import Loader from "../components/Loader/Loader.tsx"
import {MyContext} from "../App.tsx";
const Film = ()=>{
    const [films, setFilms] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const {genreId, setGenreId} = useContext(MyContext)
    let response
    useEffect(()=>{
        const fetchData = async () =>{
            if (genreId){
                setLoading(true)
                response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=d598beac85ec8a6c9fa830227429ff7f&language=fr&page=${page}&with_genres=${genreId}`)
            }else {
                setLoading(true)
                response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=d598beac85ec8a6c9fa830227429ff7f&language=fr&page=${page}`)
            }
            const data = response.data
            setFilms(data.results)
        }
        fetchData()
        setTimeout(()=>{
            setLoading(false)
        }, 1000)
    }, [ page, genreId])

    const handleChange = (e:any, p:number)=>{
        setPage(p)
    }
    return !loading ? (

        < div className="flex flex-wrap justify-center" style={{alignItems: 'stretch'}}>
            {films.map((film: object, index: number) => (
                <div className="p-5 flex-grow-1 fade-in" key={index}>
                    <CardModel {...film} />
                </div>
            ))}
            <Pagination count={1000} onChange={handleChange} color="primary" />
        </div>
    ) : (
           <div className="flex justify-center p-10">
               <Loader/>
           </div>
    );
};

export default Film