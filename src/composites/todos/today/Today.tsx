import useTodoStore from "@/store/todos";
type Props = {};

const Today = (props: Props) => {
  const { todos, addTodo, removeTodo } = useTodoStore();
  const handleDeleteList = (index: number) => {
    removeTodo(index);
  };
  console.log("🚀 ~ Today ~ todos:", todos);
  return (
    <div>
      <div className="bg-gray-100 w-1/2 h-full m-4 rounded-md p-6">
        <h1 className="text-2xl font font-semibold underline">Today's Task</h1>

        {todos
          .filter((item) => item.category === "Today")
          .map((item, index) => (
            <ul key={index}>
              <li className="">
                {`${index} ${item.name}`}
                <button
                  className="text-xl bg-red-400 m-4 px-4"
                  onClick={() => handleDeleteList(index)}
                >
                  -
                </button>
              </li>
            </ul>
          ))}
      </div>
    </div>
  );
};

export default Today;
