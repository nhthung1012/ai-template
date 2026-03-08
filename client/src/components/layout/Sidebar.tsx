import {
	LogOut,
} from 'lucide-react'

export default function Sidebar() {

	return (
		<div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-6">
			{/* Top Menu */}
			<div className="space-y-6 flex-1">
				
			</div>

			{/* Sign Out & Upgrade */}
			<div className="space-y-4 border-t border-gray-200 pt-4">
				<button
					className="flex flex-col items-center justify-center w-12 h-12 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
					title="Sign out"
				>
					<LogOut size={24} />
					<span className="text-xs mt-1">Sign in</span>
				</button>
			</div>
		</div>
	)
}
