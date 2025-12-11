import useTodoStore from "@/store/todos";
type Props = {};

const NextMonth = (props: Props) => {
  const { todos, addTodo, removeTodo } = useTodoStore();
  const handleDeleteList = (index: number) => {
    removeTodo(index);
  };
  return (
    <div>
      <div className="bg-gray-100 w-1/2 h-full m-4 rounded-md p-6">
        <h1 className="text-2xl font font-semibold underline">
          Next Month's Task
        </h1>
        <ul>
          {todos
            .filter((item) => item.category === "Month")
            .map((item, index) => (
              <li className="" key={index}>
                {`${index} ${item.name}`}
                <button
                  className="text-xl bg-red-400 m-4 px-4"
                  onClick={() => handleDeleteList(index)}
                >
                  -
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default NextMonth;
