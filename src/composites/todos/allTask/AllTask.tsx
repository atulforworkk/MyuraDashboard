import { Button } from "@/components/ui/button";
import useTodoStore from "@/store/todos";
import { useState } from "react";

type Props = {};

const AllTask = (props: Props) => {
  const { todos, removeTodo, removeAllTodo, editTodo } = useTodoStore();

  // state for inline editing
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleDeleteList = (index: number) => {
    removeTodo(index);
  };

  const handleClearAllTask = () => {
    removeAllTodo();
  };

  const startEditing = (index: number, currentName: string) => {
    setEditIndex(index);
    setEditValue(currentName);
  };

  const saveEdit = (index: number) => {
    if (editValue.trim() !== "") {
      editTodo(index, { name: editValue }); // 👈 update in store
    }
    setEditIndex(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditValue("");
  };

  const hasTodos = todos.length > 0;

  return (
    <div className="bg-gray-100 w-1/2 h-full m-4 rounded-md p-6">
      <h1 className="text-2xl font-semibold underline">All Task</h1>
      <ul>
        {todos.map((item, index) => (
          <li
            key={index}
            className="flex flex-row items-center justify-between my-2"
          >
            {editIndex === index ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit(index);
                  if (e.key === "Escape") cancelEdit();
                }}
                className="border p-1 rounded w-2/3"
              />
            ) : (
              <span>{`${index + 1}. ${item.name}`}</span>
            )}

            <div className="flex items-center space-x-2">
              {editIndex === index ? (
                <>
                  <Button size="sm" onClick={() => saveEdit(index)}>
                    Save
                  </Button>
                  <Button size="sm" variant="secondary" onClick={cancelEdit}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => startEditing(index, item.name)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="text-xl px-4"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteList(index)}
                  >
                    -
                  </Button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      {hasTodos ? (
        <Button onClick={handleClearAllTask} className="my-2">
          Remove All Tasks
        </Button>
      ) : (
        <Button disabled className="my-2">
          Remove All Tasks
        </Button>
      )}
    </div>
  );
};

export default AllTask;
