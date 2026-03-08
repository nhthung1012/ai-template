import { useAppSelector, useAppDispatch } from "@/app/hooks"
import { logout } from "@/features/auth/authSlice"
import { resetChat } from "@/features/chat/chatSlice"

interface HeaderProps {
	onSignUpClick: () => void
}

export default function Header({ onSignUpClick }: HeaderProps) {

	const dispatch = useAppDispatch()

	const { user, isAuthenticated } = useAppSelector(
		(state) => state.auth
	)

	const handleLogout = () => {
		dispatch(logout())
		dispatch(resetChat())
	}

	return (
		<header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
			
			<div className="flex items-center space-x-2">
				<div className="text-xl font-bold">
					<span className="text-blue-600">TEMPLATE</span>
					<span className="text-gray-400">.NET</span>
				</div>
			</div>

			<div className="flex items-center space-x-8">

				{isAuthenticated ? (

					<div className="flex items-center gap-3">

						<span>{user?.fullName}</span>

						<button
							onClick={handleLogout}
							className="text-sm text-red-500"
						>
							Logout
						</button>

					</div>

				) : (

					<button onClick={onSignUpClick}>
						Login
					</button>

				)}

			</div>
		</header>
	)
}