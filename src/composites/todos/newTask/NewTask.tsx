import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useTodoStore, { Todo } from "@/store/todos";
import { Group, Notification, Radio } from "@mantine/core";
import { useRef, useState } from "react";
import AllTask from "../allTask/AllTask";
import { Label } from "@/components/ui/label";

const initialTodo: Todo = {
  name: "",
  isCompleted: false,
  category: "Today",
  priority: "Medium",
};

const NewTask = () => {
  const buttonRef = useRef(null);
  const [todo, setTodo] = useState<Todo>(initialTodo);
  const { todos, addTodo, removeTodo, removeAllTodo } = useTodoStore();
  const [todosLength, setTodosLength] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleAddTodo = () => {
    if (todo.name.trim() === "") {
      setShowAlert(true);
      return;
    }
    setShowAlert(false);
    addTodo(todo);
  };

  const handleChange = (e: any) => {
    setTodo({ ...todo, name: e.target.value });
  };
  const handleChangePriority = (value: any) => {
    setTodo({ ...todo, priority: value });
  };

  const handleChangeCategory = (value: any) => {
    setTodo({ ...todo, category: value });
  };

  return (
    <div className="flex flex-row">
      <div className="bg-gray-50 w-1/2 h-full m-4 rounded-md p-6">
        <div>
          {showAlert && (
            <Notification color="red" title="Bummer!">
              Something went wrong
            </Notification>
          )}
          <h1 className="text-2xl font font-semibold underline-offset-2 underline">
            New Task
          </h1>
          <Input
            placeholder="Task to be done "
            className="my-2 bg-white"
            onChange={handleChange}
            value={todo.name}
          />
          <div className="flex ">
            <div className="my-2 mx-4">
              <Radio.Group
                name="favoriteFramework"
                label="Priority"
                description="Select how important is the task "
                withAsterisk
                onChange={handleChangePriority}
              >
                <Group mt="xs">
                  <Radio value="High" label="High"   color="red"/>
                  <Radio value="Medium" label="Medium" />
                  <Radio
                    color="lime.4"
                    label="Low"
                    name="check"
                    value="check"
                  />
                </Group>
              </Radio.Group>
            </div>
            <div className="my-2 mx-4">
              <Radio.Group
                name="Category "
                label="Completion Date"
                description="Select when is the task to be completed  "
                withAsterisk
                onChange={handleChangeCategory}
              >
                <Group mt="xs">
                  <Radio value="Today" label="Today" />
                  <Radio value="Tomorrow" label="Tomorrow" />
                  <Radio value="Week" label="Next Week " />
                </Group>
              </Radio.Group>
            </div>
          </div>
          <div>
            <Label>
          Remarks (Optional)
            </Label>
          <Input
            placeholder="Remark  "
            className="my-2 bg-white"
            onChange={handleChange}
            value={todo.name}
          />
          </div>
          <Button onClick={handleAddTodo} className="my-2">
            Add Task
          </Button>
        </div>
      </div>
      <AllTask />
    </div>
  );
};

export default NewTask;
