import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import './App.css';


function App() {
  const [items, setItems] = useState([
    { id: 0,
      text: "large-0",
      subItems: [{ id: 0,text: "small-0"},{ id: 1,text: "small-1"}]
    },
    { id: 1,
      text: "large-1",
      subItems: [{ id: 2,text: "small-2"},{ id: 3,text: "small-3"}]
    },
    { id: 3,
      text: "large-2",
      subItems: [{ id: 4,text: "small-4"},{ id: 5,text: "small-5"}]
    },
    ])

  /**
   * ドロップした時に発動
   */
  const onDragEnd = (result) =>{
    console.log('result',result)

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    // 出発点のindex
    const startIndex = result.source.index;
    // 着地点のindex
    const endIndex = result.destination.index;

    // 出発点のdroppableId
    const startDroppableId = result.source.droppableId;
    // 着地点のdroppableId
    const endDroppableId = result.destination.droppableId;

    // 大項目の入れ替え
    if(result.type === 'large'){
      reorder(items, startIndex, endIndex);
    } else {
      // droppableIdからリストのindexを取得
      const startArrayIndex = Number(startDroppableId.split('-')[1]);
      const endArrayIndex = Number(endDroppableId.split('-')[1]);

      // 同じリスト内の場合
      if(startDroppableId === endDroppableId){
        reorder(items[startArrayIndex].subItems, startIndex, endIndex);
      } else {
        // 項目跨ぎの場合
        move(items[startArrayIndex].subItems, items[endArrayIndex].subItems, startIndex, endIndex)
      }
    }
    setItems(items);
  };

  /**
   * 同じリスト内の移動
   */
  const reorder = (items, startIndex, endIndex) => {
    const remove = items.splice(startIndex,1);
    console.log('remove', remove);
    items.splice(endIndex, 0, remove[0]);
  };

  /**
  * 項目跨ぎの移動
  */
  const move = (sourceArray, destinationArray, startIndex, endIndex) => {
  const remove = sourceArray.splice(startIndex,1);
  destinationArray.splice(endIndex, 0, remove[0]);
  };


  return (
    <div className="dragDropArea">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" type="large">
          {(provided)=>(
            <div {...provided.droppableProps} ref={provided.innerRef} className="dropAreaLarge">
              {items.map((item, index) => (
                  <Draggable index={index} draggableId={`large-${item.id}`} key={item.id}>
                    {(provided) => (
                        <div className="largeItem" 
                          {...provided.draggableProps} 
                          ref={provided.innerRef}
                          >
                          <div {...provided.dragHandleProps} className="largeItemLabel">
                            {item.text}
                          </div>
                            <Droppable droppableId={`ind-${index}`} type="small">
                              {(provided)=>(
                                <div {...provided.droppableProps} ref={provided.innerRef} className="dropAreaSmall">
                                  {item.subItems.map((sub, subIndex) => (
                                    <Draggable index={subIndex} draggableId={`small-${sub.id}`} key={sub.id}>
                                      {(provided) => (
                                          <div className="smallItem" 
                                            key={sub.id}
                                            {...provided.draggableProps} 
                                            {...provided.dragHandleProps} 
                                            ref={provided.innerRef}
                                            >
                                            {sub.text}
                                          </div>
                                          )}
                                      </Draggable>
                                    ))}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          
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
