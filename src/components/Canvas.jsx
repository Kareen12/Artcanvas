// /* eslint-disable no-unused-vars */
// import React, { useRef, useEffect, useState } from "react";
// import Options from "./Options";

// import {
//   StyledCanvas,
//   StyledDiv,
//   ToolsDiv,
//   Div,
//   StyledInput,
//   GlobalStyle,
// } from "./Styles";
// const Canvas = () => {
//   const canvasRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [context, setContext] = useState(null);
//   const [color, setColor] = useState("white");
//   const [lineWidth, setLineWidth] = useState(2);
//   const [drawingHistory, setDrawingHistory] = useState([]);
//   const [redoHistory, setRedoHistory] = useState([]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     setContext(ctx);
//   }, []);

//   const startDrawing = (event) => {
//     const { offsetX, offsetY } = event.nativeEvent;
//     setIsDrawing(true);
//     context.beginPath();
//     context.moveTo(offsetX, offsetY);
//   };

//   const draw = (event) => {
//     if (!isDrawing) return;
//     const { offsetX, offsetY } = event.nativeEvent;
//     context.lineTo(offsetX, offsetY);
//     context.strokeStyle = color;
//     context.lineWidth = lineWidth;
//     context.stroke();
//   };

//   const stopDrawing = () => {
//     setIsDrawing(false);
//     const canvas = canvasRef.current;
//     const updatedDrawingHistory = [...drawingHistory];
//     updatedDrawingHistory.push(canvas.toDataURL());
//     setDrawingHistory(updatedDrawingHistory);
//     setRedoHistory([]);
//   };

//   const clearCanvas = () => {
//     context.clearRect(0, 0, context.canvas.width, context.canvas.height);
//     setDrawingHistory([]);
//     setRedoHistory([]);
//   };

//   const redoDrawing = () => {
//     if (redoHistory.length > 0) {
//       const restoredDrawing = redoHistory.pop();
//       const updatedDrawingHistory = [...drawingHistory, restoredDrawing];
//       setDrawingHistory(updatedDrawingHistory);
//       const canvas = canvasRef.current;
//       const image = new Image();
//       image.onload = () => {
//         context.clearRect(0, 0, context.canvas.width, context.canvas.height);
//         context.drawImage(image, 0, 0);
//       };
//       image.src = restoredDrawing;
//       setRedoHistory(redoHistory);
//     }
//   };

//   const erase = () => {
//     setColor("black"); // Set color to white for erasing
//   };

//   const undoDrawing = () => {
//     if (drawingHistory.length > 0) {
//       const undoneDrawing = drawingHistory.pop();
//       const updatedRedoHistory = [...redoHistory, undoneDrawing];
//       setRedoHistory(updatedRedoHistory);
//       const canvas = canvasRef.current;
//       const image = new Image();
//       image.onload = () => {
//         context.clearRect(0, 0, context.canvas.width, context.canvas.height);
//         context.drawImage(image, 0, 0);
//       };
//       image.src = drawingHistory[drawingHistory.length - 1];
//       setDrawingHistory(drawingHistory);
//     }
//   };

//   const saveImage = () => {
//     const canvas = canvasRef.current;
//     const link = document.createElement("a");
//     link.href = canvas.toDataURL();
//     const fileName = prompt("enter a name to save file");
//     link.download = `${fileName}`;
//     link.download ? alert("saved successfully") : alert("problem");
//     link.click();
//   };

//   return (
//     <>
//       <GlobalStyle />
//       <StyledDiv>
//         <StyledCanvas
//           ref={canvasRef}
//           width={1000}
//           height={700}
//           onMouseDown={startDrawing}
//           onMouseMove={draw}
//           onMouseUp={stopDrawing}
//           onMouseLeave={stopDrawing}
//           onTouchStart={startDrawing}
//           onTouchMove={draw}
//           onTouchEnd={stopDrawing}
//           title="Start drawing"
//         />
//         <ToolsDiv>
//           <StyledInput
//             type="color"
//             value={color}
//             onChange={(e) => setColor(e.target.value)}
//           />
//           <StyledInput
//             type="range"
//             min={1}
//             max={20}
//             value={lineWidth}
//             onChange={(e) => setLineWidth(parseInt(e.target.value))}
//           />
//           <Div>
//             <Options
//               method_props={{
//                 saveImage_prop: saveImage,
//                 clearCanvas_prop: clearCanvas,
//                 erase_prop: erase,
//                 undo_props: undoDrawing,
//                 redo_props: redoDrawing,
//               }}
//             />
//           </Div>
//         </ToolsDiv>
//       </StyledDiv>
//     </>
//   );
// };

// export default Canvas;

/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import Options from "./Options";

import {
  StyledCanvas,
  StyledDiv,
  ToolsDiv,
  Div,
  StyledInput,
  StyledInput1,
  GlobalStyle,
} from "./Styles";

const Canvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [color, setColor] = useState("white");
  const [lineWidth, setLineWidth] = useState(2);
  const [drawingHistory, setDrawingHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setContext(ctx);
    setDrawingHistory([canvas.toDataURL()]); // Initial empty canvas state
  }, []);

  const startDrawing = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    setIsDrawing(true);
    context.beginPath();
    context.moveTo(offsetX, offsetY);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = event.nativeEvent;
    context.lineTo(offsetX, offsetY);
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const updatedDrawingHistory = [...drawingHistory, canvas.toDataURL()];
    setDrawingHistory(updatedDrawingHistory);
    setRedoHistory([]);
    console.log("Stop Drawing - Drawing History:", updatedDrawingHistory);
  };

  const clearCanvas = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    setDrawingHistory([]);
    setRedoHistory([]);
    console.log("Clear Canvas");
  };

  const redoDrawing = () => {
    if (redoHistory.length > 0) {
      const restoredDrawing = redoHistory[redoHistory.length - 1];
      setRedoHistory(redoHistory.slice(0, -1));
      setDrawingHistory([...drawingHistory, restoredDrawing]);
      drawImageFromDataURL(restoredDrawing);
      console.log("Redo Drawing - Drawing History:", drawingHistory);
    }
  };

  const erase = () => {
    setColor("black");
    console.log("Erase Mode");
  };

  const undoDrawing = () => {
    if (drawingHistory.length > 1) {
      const undoneDrawing = drawingHistory[drawingHistory.length - 1];
      setRedoHistory([...redoHistory, undoneDrawing]);
      const previousDrawing = drawingHistory[drawingHistory.length - 2];
      drawImageFromDataURL(previousDrawing);
      setDrawingHistory(drawingHistory.slice(0, -1));
      console.log("Undo Drawing - Drawing History:", drawingHistory);
    } else {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      setDrawingHistory([]);
      console.log("Undo Drawing - Canvas Cleared");
    }
  };

  const drawImageFromDataURL = (dataURL) => {
    const image = new Image();
    image.onload = () => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.drawImage(image, 0, 0);
    };
    image.src = dataURL;
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    const fileName = prompt("enter a name to save file");
    if (fileName) {
      link.download = `${fileName}.png`;
      link.click();
      alert("saved successfully");
    } else {
      alert("problem");
    }
  };

  return (
    <>
      <GlobalStyle />
      <StyledDiv>
        <StyledCanvas
          ref={canvasRef}
          width={1000}
          height={700}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          title="Start drawing"
        />
        <ToolsDiv>
          <StyledInput
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <StyledInput
            type="range"
            min={1}
            max={20}
            value={lineWidth}
            onChange={(e) => setLineWidth(parseInt(e.target.value))}
          />
          <Div>
            <Options
              method_props={{
                saveImage_prop: saveImage,
                clearCanvas_prop: clearCanvas,
                erase_prop: erase,
                undo_props: undoDrawing,
                redo_props: redoDrawing,
              }}
            />
          </Div>
        </ToolsDiv>
      </StyledDiv>
    </>
  );
};

export default Canvas;
