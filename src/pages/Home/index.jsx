import { Container } from './styles';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { MovieCard } from '../../components/MovieCard';
import { RiAddFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

export function Home() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		async function getMovies() {
			const { data } = await api.get('/movies');
			console.log(data);
			setMovies(data);
		}
		getMovies();
	}, []);

	return (
		<Container>
			<Header />
			<main>
				<header>
					<h1>Meus filmes</h1>
					<Link to='/new-movie'>
						<Button
							title='Adicionar Filme'
							icon={RiAddFill}
						/>
					</Link>
				</header>
				<section className='movies'>
					{movies.map((movie) => (
						<MovieCard
							key={String(movie.id)}
							data={movie}
						/>
					))}
				</section>
			</main>
		</Container>
	);
}
