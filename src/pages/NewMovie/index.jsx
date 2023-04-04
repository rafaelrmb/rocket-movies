import { RiArrowLeftLine } from 'react-icons/ri';
import { Container, Form, Section } from './styles';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { MovieTag } from '../../components/MovieTag';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { api } from '../../services/api';

export function NewMovie() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [rating, setRating] = useState(0);

	const [tags, setTags] = useState([]);
	const [newTag, setNewTag] = useState('');

	const navigate = useNavigate();

	async function handleNewMovie(e) {
		e.preventDefault();
		const { movie } = await api.post('/movies', {
			title,
			description,
			rating,
			tags,
		});
		console.log(movie);
		alert('Filme cadastrado com sucesso!');
		navigate('/');
	}

	function handleAddTag(e) {
		e.preventDefault();
		setTags((prevState) => [...prevState, newTag]);
		setNewTag('');
	}

	function handleRemoveTag(e, deletedTag) {
		e.preventDefault();
		setTags((prevState) => prevState.filter((tag) => tag !== deletedTag));
	}

	return (
		<Container>
			<Header />
			<main>
				<Link to='/'>
					<p>
						<RiArrowLeftLine />
						Voltar
					</p>
				</Link>
				<Form>
					<h2>Novo filme</h2>
					<Input
						placeholder='Título'
						type='text'
						onChange={(e) => setTitle(e.target.value)}
					/>
					<Input
						placeholder='Sua nota (de 0 a 5)'
						type='number'
						min='0'
						max='5'
						onChange={(e) => setRating(e.target.value)}
					/>
					<TextArea
						placeholder='Descreva o filme'
						onChange={(e) => setDescription(e.target.value)}
					/>
					<Section>
						<span>Marcadores</span>
						<div id='tags'>
							{tags.map((tag, index) => (
								<MovieTag
									key={String(index)}
									value={tag}
									isNew={false}
									onClick={(e) => handleRemoveTag(e, tag)}
								/>
							))}
							<MovieTag
								placeholder='Adicione um marcador'
								value={newTag}
								isNew={true}
								onChange={(e) => setNewTag(e.target.value)}
								onClick={handleAddTag}
							/>
						</div>
					</Section>
					<Button
						title='Excluir filme'
						id='delete-btn'
					/>
					<Button
						title='Salvar alterações'
						onClick={(e) => handleNewMovie(e)}
					/>
				</Form>
			</main>
		</Container>
	);
}
