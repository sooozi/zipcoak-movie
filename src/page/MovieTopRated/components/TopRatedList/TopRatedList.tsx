import React from 'react';
import MovieCard from '../../../../common/MovieCard/MovieCard';
import { useTopRatedMoviesQuery } from '../../../../hooks/useTopRatedMovie';

interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
    year: number;
}

interface TopRatedMovieListProps {
    title: string;
}

const TopRatedMovieList: React.FC<TopRatedMovieListProps> = ({ title }) => {
    const {
        data: response,
        isLoading,
        isError,
        error,
    } = useTopRatedMoviesQuery();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    const movies = response?.data?.results || [];

    return (
        <div className="space-y-4">
            <div className="py-20">
                <div className="items-center space-y-2">
                    <h2 className="text-5xl font-bold text-white text-center tracking-wide animate-slide-up">
                        {title}
                    </h2>
                    <p className="text-lg text-center font-medium animate-slide-up">
                        Explore the highest-rated movies that are making waves
                        right now.
                    </p>
                </div>
            </div>
            <div className="relative">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 pb-4 place-items-center">
                    {movies.length > 0 ? (
                        movies.map((movie: Movie) => {
                            const mappedMovie = {
                                id: movie.id,
                                title: movie.title,
                                imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                                year: parseInt(
                                    movie.release_date.split('-')[0],
                                ),
                                rating: movie.vote_average,
                            };

                            return (
                                <MovieCard key={movie.id} movie={mappedMovie} />
                            );
                        })
                    ) : (
                        <p>No movies available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopRatedMovieList;