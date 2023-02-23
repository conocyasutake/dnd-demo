import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import './App.css';


function App() {
  const [items, setItems] = useState([
    {id: 0,text: "item0"},
    {id: 1,text: "item1"},
    {id: 2,text: "item2"}])

  const onDragEnd = (result) =>{
    // console.log(result.source.index); スタート地点
    // console.log(result.destination.index);着地点
    // reorder(items,result.source.index,result.destination.index)
    const remove = items.splice(result.source.index,1);
    console.log(remove);
    items.splice(result.destination.index,0,remove[0]);
  };

  return (
    <div className="dragDropArea">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided)=>(
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                  <Draggable index={index} draggableId={item.text} key={item.id}>
                    {(provided) => (
                        <div className="item" 
                          {...provided.draggableProps} 
                          {...provided.dragHandleProps} 
                          ref={provided.innerRef}
                        >
                          {item.text}
                        </div>
                      )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
