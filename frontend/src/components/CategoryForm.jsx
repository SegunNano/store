const CategoryForm = ({ value, setvValue, handleSubmit, buttonText = "Submit", handleDelete }) => {
    return (
        <div className="p-3">
            <form onSubmit={handleSubmit} className="space-y-3">
                <input type="text" name="" id="" className="py-3 py-4 border rounded-lg w-full" placeholder="Category name" value={value} onChange={e => setvValue(e.target.value)} />

                <div className="flex justify-between">
                    <button className="bg-pink-500 text-white px-4 py-2 rounded-large hover:bg-pink-600 focus:outline-none focus:ring-2 focu:ring-pink-500 focus:ring-opacity-50">{buttonText}</button>

                    {handleDelete && (
                        <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-nonefocus:ring-2 focu:ring-pink-500 focus:ring-opacity-50">Delete</button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CategoryForm;
