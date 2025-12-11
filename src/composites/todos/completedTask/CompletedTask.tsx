import { Button } from "@/components/ui/button";
import useTodoStore from "@/store/todos";

const CompletedTasks = () => {
  const { completedTodos, undoTodo, removeCompletedTodo } = useTodoStore();

  return (
    <div className="bg-gray-100 w-1/2 h-full m-4 rounded-md p-6">
      <h1 className="text-2xl font-semibold underline">Completed Tasks</h1>
      <ul>
        {completedTodos.length === 0 ? (
          <p className="text-gray-500">No completed tasks yet.</p>
        ) : (
          completedTodos.map((item) => (
            <li
              key={item.id}
              className="flex flex-row items-center justify-between my-2"
            >
              <span>
                ✅ {item.name} <br />
                <span className="text-xs text-gray-500">
                  Completed on {new Date(item.completedAt).toLocaleString()}
                </span>
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => undoTodo(item.id)}
                >
                  Undo
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => removeCompletedTodo(item.id)}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CompletedTasks;
