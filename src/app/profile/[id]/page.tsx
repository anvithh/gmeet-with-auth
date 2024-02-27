

export default function UserProfilePage({ params }: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>PROFILE PAGE</h1>
            <br></br>

            <p>The ID is <span className="p-2 rounded bg-gray-500 text-black">{params.id}</span></p>

        </div>
    )
}