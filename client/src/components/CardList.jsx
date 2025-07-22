import React from "react";
import Card from "./Card";

const CardList = ({ onEdit, tasks }) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <Card key={task.id} task={task} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default CardList;
