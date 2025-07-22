import { useTask } from '../context/TaskContext';

const Card = ({task, onEdit}) => {
   const { deleteTask } = useTask();
  const { title, desc, tags, id } = task;
  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 w-full max-w-md transition hover:shadow-lg">
      <div className='justify-between flex items-center mb-4'>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        {title}
      </h2>
      <div className='flex gap-2'>
        <button className='flex items-center gap-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200' onClick={() => onEdit(task)}>edit</button>
        <button className='flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200' onClick={() => deleteTask(id)}>delete</button>
      </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
        {desc}
      </p>
      
      <div className="flex flex-wrap gap-2">
  {Array.isArray(tags) && tags.length > 0 ? (
    tags.map((tag, index) => (
      <span
        key={index}
        className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-800 dark:text-blue-100"
      >
        {tag}
      </span>
    ))
  ) : (
    <span className="text-gray-400 text-xs">No tags</span>
  )}
</div>
    </div>
  );
};

export default Card