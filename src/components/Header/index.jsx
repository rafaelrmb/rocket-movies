import { Container, Profile } from "./styles";
import { Input } from "../../components/Input";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";

export function Header() {
	const { signOut, user } = useAuth();

	const avatarUrl = user.avatar ? `${api.defaults.baseURL}files/${user.avatar}` : avatarPlaceholder;

	return (
		<Container>
			<Link to="/">
				<span>RocketMovies</span>
			</Link>
			<Input placeholder="Pesquisar por título" type="search" />
			<Profile>
				<div>
					<p>{user.name}</p>
					<a href="/" onClick={signOut}>
						Sair
					</a>
				</div>
				<Link to="/profile">
					<img src={avatarUrl} alt="Foto de perfil" />
				</Link>
			</Profile>
		</Container>
	);
}
