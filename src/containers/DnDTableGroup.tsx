import React, { useState } from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import MessageIcon from '@mui/icons-material/Message';
import { DragDropContext, Droppable, Draggable, DroppableProvided, DraggableProvided } from '@hello-pangea/dnd';
import { Container, Paper, Stack, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

interface Props {
  columnKeys: { [key: string]: string };
  tables: {
    name: string;
    columns: string[];
    items: any[];
  }[];
  pendingQueueTableActionsClicked?: (actionType: "phone" | "message", data: any) => void
}

export const DndTableGroup: React.FC<Props> = ({ columnKeys, tables, pendingQueueTableActionsClicked }) => {
  const [columns, setColumns] = useState(tables);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    const sourceId = result.source.droppableId;
    const destinationId = result.destination.droppableId;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceId !== destinationId) {
      const sourceColumn = columns.find(column => column.name === sourceId);
      const destColumn = columns.find(column => column.name === destinationId);
      const sourceItems = sourceColumn?.items || [];
      const destItems = destColumn?.items || [];
      const [removed] = sourceItems.splice(sourceIndex, 1);
      destItems.splice(destinationIndex, 0, removed);
      setColumns(columns.map(column => {
        if (column.name === sourceId) {
          return { ...column, items: sourceItems };
        }
        if (column.name === destinationId) {
          return { ...column, items: destItems };
        }
        return column;
      }));
    } else {
      const column = columns.find(column => column.name === sourceId);
      const copiedItems = column?.items || [];
      const [removed] = copiedItems.splice(sourceIndex, 1);
      copiedItems.splice(destinationIndex, 0, removed);
      setColumns(columns.map(column => {
        if (column.name === sourceId) {
          return { ...column, items: copiedItems };
        }
        return column;
      }));
    }
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Container>
        <Stack spacing={2}>
          {columns.map((table, index) => (
            <Droppable droppableId={table.name} key={table.name}>
              {(provided: DroppableProvided) => (
                <TableContainer key={index} component={Paper} ref={provided.innerRef} {...provided.droppableProps}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {/* Render table column headers */}
                        {table.columns.map((column, index) => (
                          <TableCell key={index}>{column}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* Render table rows */}
                      {table.items.map((item, index) => (
                        <Draggable key={item.hn} draggableId={item.hn} index={index}>
                          {(provided: DraggableProvided) => (
                            <TableRow 
                              ref={provided.innerRef} 
                              {...provided.draggableProps} 
                              {...provided.dragHandleProps}
                            >
                              {/* Render table cells */}
                              {table.columns.map((column: any) => {
                                // If column is "Seq" and table is "pendingQueue", generate sequential numbers
                                if (column === 'Seq' && table.name === 'pendingQueue') {
                                  return <TableCell key={column}>{index + 1}</TableCell>;
                                } 
                                // If column is "Action", render icons
                                else if (column === 'Action') {
                                  return (
                                    <TableCell key={column}>
                                        <PhoneIcon
                                          onClick={() => {
                                            pendingQueueTableActionsClicked && pendingQueueTableActionsClicked("phone", item)
                                          }}
                                          style={{cursor: "pointer", marginRight: "12px"}}
                                        />
                                        <MessageIcon
                                          onClick={() => {
                                            pendingQueueTableActionsClicked && pendingQueueTableActionsClicked("message", item)
                                          }}
                                          style={{cursor: "pointer"}}
                                        />
                                    </TableCell>
                                  );
                                }
                                else {
                                  // Get the item property using columnKeys and render the corresponding cell value
                                  const itemProperty = (columnKeys[column] as unknown) as keyof typeof item;
                                  return <TableCell key={column}>{item[itemProperty]}</TableCell>;
                                }
                              })}
                            </TableRow>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Droppable>
          ))}
        </Stack>
      </Container>
    </DragDropContext>
  );
}