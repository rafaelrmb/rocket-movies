import { Container, Form, Background } from "./styles";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { RiMailLine, RiLockLine } from "react-icons/ri";
import { useAuth } from "../../hooks/auth";
import { useState } from "react";

export function SignIn() {
	const { signIn } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleSignIn(e) {
		e.preventDefault();
		signIn({ email, password });
	}

	return (
		<Container>
			<Form>
				<h1>RocketMovies</h1>
				<p>Aplicação para acompanhar tudo que assistir!</p>
				<p>Faça seu login na plataforma</p>
				<Input
					placeholder="Digite seu email"
					type="email"
					icon={RiMailLine}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					placeholder="Digite sua senha"
					type="password"
					icon={RiLockLine}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button title="Entrar" onClick={handleSignIn} />
				<a href="/register">Criar conta</a>
			</Form>
			<Background />
		</Container>
	);
}
