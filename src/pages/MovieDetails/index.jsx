import { Container, Info } from './styles';
import { Header } from '../../components/Header';
import { Tag } from '../../components/Tag';
import { RiArrowLeftLine, RiStarFill, RiStarLine, RiTimeLine } from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';
import { api } from '../../services/api';
import { useState, useEffect } from 'react';

export function MovieDetails() {
	const params = useParams();
	const [data, setData] = useState(null);
	const user = localStorage.getItem('@rocketmovies:user');
	const userData = JSON.parse(user);

	useEffect(() => {
		async function getMovie() {
			try {
				const response = await api.get(`/movies/${params.id}`);
				setData(response.data);
			} catch (error) {
				console.error(error);
			}
		}

		getMovie();
	}, [params.id]);

	if (data === null) {
		return <div>Carregando...</div>;
	}

	const rating = data.rating;
	const stars = [];
	for (let i = 0; i < 5; i++) {
		if (i < rating) {
			stars.push(<RiStarFill key={i} />);
		} else {
			stars.push(<RiStarLine key={i} />);
		}
	}

	return (
		<Container>
			<Header />
			{data && (
				<main>
					<Info>
						<Link to='/'>
							<p>
								<RiArrowLeftLine />
								Voltar
							</p>
						</Link>

						<div id='movie-info'>
							<h1>{data.title}</h1>
							<div id='rating'>{stars}</div>
						</div>

						<div id='created-by'>
							<p>
								<img
									src={`${api.defaults.baseURL}files/${userData.avatar}`}
									alt='foto de perfil do usuario'
								/>
								Por {userData.name}
							</p>
							<p>
								<RiTimeLine />
								{new Date().toLocaleTimeString('pt-BR', {
									day: 'numeric',
									month: 'long',
									hour: '2-digit',
									minute: '2-digit',
								})}
							</p>
						</div>
					</Info>

					<div id='tags'>
						{data.tags.map((tag) => (
							<Tag
								key={tag.id}
								title={tag.name}
							/>
						))}
					</div>
					<p id='movie-summary'>{data.description}</p>
				</main>
			)}
		</Container>
	);
}
