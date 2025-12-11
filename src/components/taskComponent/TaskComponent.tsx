import { Cross1Icon } from "@radix-ui/react-icons";
type Todo = {
  name: string;
  category: string;
};

type Props = {
  todos: Todo[];
  handleDeleteList: (index: number) => void;
};
// new component
const TaskComponent = ({ todos, handleDeleteList }: Props) => {
  console.log("🚀 ~ TaskComponent ~ todos:", todos);
  return (
    <div>
      <ul>
        {todos
          .filter((item) => item.category === "Tomorrow")
          .map((item, index) => (
            <li className="" key={index}>
              <Cross1Icon />
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
  );
};

export default TaskComponent;
