import TaskComponent from "@/components/taskComponent/TaskComponent";
import useTodoStore from "@/store/todos";
type Props = {};

const Tomorrow = (props: Props) => {
  const { todos, addTodo, removeTodo } = useTodoStore();
  const handleDeleteList = (index: number) => {
    removeTodo(index);
  };
  return (
    <div>
      <div className="bg-gray-100 w-1/2 h-full m-4 rounded-md p-6">
        <h1 className="text-2xl font font-semibold underline">
          Tomorrow's Task
          <TaskComponent todos={todos} />
        </h1>
      </div>
    </div>
  );
};

export default Tomorrow;
