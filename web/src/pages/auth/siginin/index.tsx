import { zodResolver } from '@hookform/resolvers/zod';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	toast,
} from '@/src/components';
import { useAuthQuery, useAuthStore } from '@/src/hooks';
import type { Login } from '@/src/models';
import { Auth } from '@/src/schemas';

export function Signin(): ReactElement {
	const navigate = useNavigate();

	const { login: loginStore } = useAuthStore();

	const { mutateAsync: loginQuery } = useAuthQuery({
		onError(error) {
			console.log(error);
			toast({
				title: 'Houve um erro ao tentar logar.',
				variant: 'destructive',
			});
		},
		onSuccess(data) {
			loginStore(data);

			navigate('/schemas');

			toast({
				title: 'Login efetuado.',
				className: 'bg-primary',
			});
		},
	});

	const form = useForm<Login>({
		resolver: zodResolver(Auth.Login),
		mode: 'onSubmit',
	});

	function onSubmit(data: Login): void {
		loginQuery(data);
	}

	return (
		<section className="w-full min-h-screen flex justify-center items-center border">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="max-w-md w-full space-y-4"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>E-mail</FormLabel>
								<FormControl>
									<Input
										placeholder="email@example.com"
										type="email"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-right" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Senha</FormLabel>
								<FormControl>
									<Input
										placeholder="••••••"
										type="password"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-right" />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="w-full uppercase font-bold text-white"
					>
						Entrar
					</Button>
				</form>
			</Form>
		</section>
	);
}
