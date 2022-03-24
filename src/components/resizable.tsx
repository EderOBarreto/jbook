import "./resizable.css";
import { ResizableBox, ResizableProps } from "react-resizable";
import { useEffect, useState } from "react";
import { clearTimeout } from "timers";

type Direction = "horizontal" | "vertical";

interface CustomResizableProps {
  direction: Direction;
}

const Resizable: React.FC<CustomResizableProps> = ({ direction, children }) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(innerWidth * 0.75);

  const resisableProps: { [key in Direction]: ResizableProps } = {
    horizontal: {
      className: "resize-horizontal",
      width: width,
      height: Infinity,
      resizeHandles: ["e"],
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      onResizeStop: (_, data) => {
        setWidth(data.size.width);
      },
    },
    vertical: {
      width: Infinity,
      height: 300,
      resizeHandles: ["s"],
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 36],
    },
  };

  useEffect(() => {
    let timer: any;

    if (timer) {
      clearTimeout(timer);
    }

    const listener = () => {
      setTimeout(() => {
        setInnerWidth(window.innerWidth);
        setInnerHeight(window.innerHeight);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
      clearTimeout(timer);
    };
  }, [width]);

  return <ResizableBox {...resisableProps[direction]}>{children}</ResizableBox>;
};

export default Resizable;
