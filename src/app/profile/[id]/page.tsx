
export default async function Profile({ params }: any) {
	const { id } = await params;
	return (
		<div className="flex flex-col items-center  gap-3 justify-center min-h-screen">
			<h1>Profile</h1>
			<p>id: <span  className="text-2xl bg-amber-700 text-black p-2 rounded">{id}</span></p>
		</div>
	);
}