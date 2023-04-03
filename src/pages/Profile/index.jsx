import { Container, Form } from "./styles";
import { RiArrowLeftLine, RiCameraLine, RiMailLine, RiUserLine, RiLockLine } from "react-icons/ri";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/auth";

export function Profile() {
	const { user } = useAuth();

	const [profileImg, setProfileImg] = useState(null);
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [newPassword, setNewPassword] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");

	return (
		<Container>
			<header>
				<Link to="/">
					<a>
						<RiArrowLeftLine />
						Voltar
					</a>
				</Link>
			</header>
			<Form>
				<div className="image-container">
					<img src="https://github.com/rafaelrmb.png" alt="Foto de perfil" />
					<label htmlFor="profile-img">
						<RiCameraLine />
						<input type="file" id="profile-img" />
					</label>
				</div>

				<Input
					placeholder="Nome"
					type="text"
					icon={RiUserLine}
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Input
					placeholder="E-mail"
					type="email"
					icon={RiMailLine}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					placeholder="Senha atual"
					type="password"
					icon={RiLockLine}
					onChange={(e) => setCurrentPassword(e.target.value)}
				/>
				<Input
					placeholder="Nova senha"
					type="password"
					icon={RiLockLine}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
				<Button title="Salvar" type="submit" />
			</Form>
		</Container>
	);
}
