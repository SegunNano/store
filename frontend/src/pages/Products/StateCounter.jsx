
const StateCounter = ({ count }) => {
    return (
        <div className="absolute left-2 right-8">
            {
                count > 0 && (
                    <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">{count}</span>
                )
            }
        </div>
    );
};

export default StateCounter;
