import Editor from '@/container/editor'
import ToolBar from '@/container/toolbar'
import styles from './App.module.scss'
import GraphView from "@/container/tree-view/graph-tree"

import { Allotment } from 'allotment'
import { useEffect, useRef, useState } from 'react'


function App() {

  const [jvSize, setJvSize] = useState({ width: 0, height: 0 });

  const rightRef = useRef<HTMLDivElement>(null);
  const paneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {

      console.log("update size");

      const boundingClientRect = rightRef.current?.getBoundingClientRect();
      setJvSize(() => ({
        width: boundingClientRect?.width || 0,
        height: boundingClientRect?.height || 0,
      }));
    }

    const observer = new MutationObserver(updateSize);

    if (paneRef.current) {
      observer.observe(paneRef.current, { attributes: true });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.mainContent}>
      <ToolBar />
      <Allotment>
        <Allotment.Pane>
          <div className="left-area">
            <Editor />
          </div>
        </Allotment.Pane>
        <Allotment.Pane minSize={200} preferredSize="70%" ref={paneRef}>
          <div ref={rightRef} className={styles.rightArea}>
            {/* <JsonView size={jvSize} /> */}
            <GraphView size={jvSize} />
          </div>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}


export default App
