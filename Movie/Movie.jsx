import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './Movie.css';
import Modal from '../components/Modal';
import NameContext from '../context/nameContext';
import Header from "../components/Header";

const Movie = () => {
    const nameContext = useContext(NameContext);
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [findMovie, setFindMovie] = useState([]);
    const [movieTitleFind, setMovieTitleFind] = useState("");
    const [isFindMovie, setIsFindMovie] = useState(false);
    const [pageFind, setPageFind] = useState(0);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
                    params: {
                        include_adult: false,
                        include_video: false,
                        language: 'en-US',
                        page: page,
                        sort_by: 'popularity.desc'
                    },
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjA1YWY0MGQ4NDQzNjgyYjgyNDc5YWJiZTU2NWQ2ZiIsIm5iZiI6MTcyNDg2MTU5OC45ODYwODYsInN1YiI6IjY2Y2Y0YTE4ZGJhM2U1YTMxYjExOTBiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T8sa9eIZKfKgSFlcJZG_xNyDXZB2rj86pUenUKu7hqQ'
                    }
                });
                setMovies(response.data.results);
            } catch (error) {
                console.error('Erro ao buscar filmes:', error);
            }
        };
        fetchMovies();
    }, [page]);

    const changePage = (event) => {
        if (event.target.value === "+") {
            setPage(page + 1);
        } else if (event.target.value === "-") {
            setPage(page - 1);
        }
    }

    const colectId = (id) => {
        console.log(id);
        fetchDetails(id);
    }

    
    const fetchDetails = async (id) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                params: {
                    language: 'en-US'
                },
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjA1YWY0MGQ4NDQzNjgyYjgyNDc5YWJiZTU2NWQ2ZiIsIm5iZiI6MTcyNDg2MTU5OC45ODYwODYsInN1YiI6IjY2Y2Y0YTE4ZGJhM2U1YTMxYjExOTBiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T8sa9eIZKfKgSFlcJZG_xNyDXZB2rj86pUenUKu7hqQ'
                }
            });
            setSelected(response.data);
            setIsOpenModal(true);
            console.log(isOpenModal);
        } catch (error) {
            console.error('Erro ao buscar detalhes do filme:', error);
        }
    };



    const titleFindHandle = (event) => {
        setMovieTitleFind(event.target.value);
        setPageFind(0);
        
    }


    const findPageOne = () => {
        setPageFind(1);
        console.log(movieTitleFind);
        console.log(pageFind);

    }


    useEffect(() => {
        const fetchFind = async () => {
            try {
                const response = await axios.get("https://api.themoviedb.org/3/search/movie", {
                    params: {
                        query: movieTitleFind,
                        include_adult: false,
                        language: 'en-US',
                        page: pageFind,
                    },
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjA1YWY0MGQ4NDQzNjgyYjgyNDc5YWJiZTU2NWQ2ZiIsIm5iZiI6MTcyNDg2MTU5OC45ODYwODYsInN1YiI6IjY2Y2Y0YTE4ZGJhM2U1YTMxYjExOTBiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T8sa9eIZKfKgSFlcJZG_xNyDXZB2rj86pUenUKu7hqQ'
                    }
                });
                setFindMovie(response.data.results);
                setIsFindMovie(true);
            } catch (error) {
                console.error('Erro ao buscar filmes:', error);
            }
        };
        fetchFind();
    }, [pageFind]);



    const handleCloseModal = () => {
        setIsOpenModal(false);
    };  

    

    const changePageFind = (event) => {
        if (event.target.value === "+") {
            setPageFind(pageFind + 1);
        } else if (event.target.value === "-") {
            setPageFind(pageFind - 1);
        }
    }

    const backList = () => {
        setIsFindMovie(false);
        setMovieTitleFind("");
        setPageFind(0); 
    }

    return (
        <div>
            <Header />
            <div className='title-movies'>
                    <div className='header-txt'>
                        <h1>Movies</h1>
                        {nameContext.isNotSubmitedName ? (
                            <h2>Choose a movie</h2>
                        ) : (
                            <h2><span style={{ color: '#7B4AE2' }}>{nameContext.name}, </span>  choose a movie</h2>
                
                        )}
                        <input
                            className='input-search'
                            type="text"
                            value={movieTitleFind}
                            onChange={titleFindHandle}
                            placeholder="Search for a movie"
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {  // Captura 'Enter' ou 'Return'
                                    findPageOne();
                                }
                            }}
                        />
                    </div>
                    
                    <div className='buttons-search'>

                        <button
                            type='submit'
                            onClick={findPageOne}
                        >
                            Search
                        </button>

                        <button
                            type='button'
                            onClick={backList}
                        >
                            Back to list
                        </button>
                    </div>

                {!isFindMovie ? (
                    <div className='list-container'>
                        <ul className='movie-list'>
                            {movies.map(movie => (
                                <li
                                    className="movie-item"
                                    onClick={() => colectId(movie.id)}
                                    key={movie.id}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                    <h2>{movie.title}</h2>
                                </li>
                            ))}
                        </ul>
                        <div className='container-btn'>
                            <button
                                type='button'
                                value={"-"}
                                onClick={changePage}
                                className='buttons'
                                disabled={page === 1}
                            >
                                Before
                            </button>
                            <button
                                type='button'
                                value={"+"}
                                onClick={changePage}
                                className='buttons'
                            >
                                Next
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className='list-container'>
                        <ul className='movie-list'>
                            {findMovie.map(movie => (
                                <li
                                    className="movie-item"
                                    onClick={() => colectId(movie.id)}
                                    key={movie.id}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                    <h2>{movie.title}</h2>
                                </li>
                            ))}
                        </ul>
                        <div className='container-btn'>
                            <button
                                type='button'
                                value={"-"}
                                onClick={changePageFind}
                                className='buttons'
                                disabled={pageFind === 0}
                            >
                                Before
                            </button>
                            <button
                                type='button'
                                value={"+"}
                                onClick={changePageFind}
                                className='buttons'
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>  

            <Modal
                isOpen={isOpenModal}
                onClose={handleCloseModal}
                selected={selected}
            />
        </div>
    );
}

export default Movie;
