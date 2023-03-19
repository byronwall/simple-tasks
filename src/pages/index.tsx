import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const tasks = api.task.getAll.useQuery();

  const [taskName, setTaskName] = useState("");

  const addTask = api.task.add.useMutation();

  console.log("tasks", tasks.error);

  const handleTaskAdd = async () => {
    const newTask = addTask.mutateAsync({ title: taskName });
    console.log("newTask", newTask);
  };

  console.log("add task mutation", addTask);

  return (
    <>
      <Head>
        <title>simple tasks</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-2 ">
        <h1 className="text-4xl">simple tasks</h1>

        <div className="flex gap-2">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <button onClick={handleTaskAdd}>add task</button>
        </div>

        <div>
          <h2>all tasks</h2>
          <ul>
            {tasks.data?.map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};

export default Home;

// function to create a new Task and send to DB with Prisma
