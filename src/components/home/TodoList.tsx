function TodoList({ todos }: { todos: Array<{ id: number; title: string }> }) {
  return (
    <div className="overflow-y-scroll h-full">
      {todos.length === 0 ? (
        <div className="text-center">这里什么也没有!</div>
      ) : (
        <ul className="flex flex-col gap-2">
          {todos.map((todo) => (
            <li
              className="bg-sky-100 dark:bg-neutral-700 p-2 rounded-lg"
              key={todo.id}
            >
              {todo.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
