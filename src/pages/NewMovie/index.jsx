import { RiArrowLeftLine } from 'react-icons/ri';
import { Container, Form, Section } from './styles';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { MovieTag } from '../../components/MovieTag';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function NewMovie() {
	const [tags, setTags] = useState([]);
	const [newTag, setNewTag] = useState('');

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
					<a>
						<RiArrowLeftLine />
						Voltar
					</a>
				</Link>
				<Form>
					<h2>Novo filme</h2>
					<Input
						placeholder='Título'
						type='text'
					/>
					<Input
						placeholder='Sua nota (de 0 a 5)'
						type='number'
						min='0'
						max='5'
					/>
					<TextArea placeholder='Observações' />
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
					<Button title='Salvar alterações' />
				</Form>
			</main>
		</Container>
	);
}
