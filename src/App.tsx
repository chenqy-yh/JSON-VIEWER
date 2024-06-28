import Editor from '@/container/editor'
import ToolBar from '@/container/toolbar'
import styles from './App.module.scss'
import GraphView from "@/container/tree-view/graph-tree"

import { Allotment } from 'allotment'
import { useEffect, useRef, useState } from 'react'
import { debounce } from "lodash"
import "./App.module.scss"


function App() {

  const [jvSize, setJvSize] = useState({ width: 0, height: 0 });

  const paneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = debounce(() => {
      const boundingClientRect = paneRef.current?.getBoundingClientRect();
      setJvSize(() => ({
        width: boundingClientRect?.width || 0,
        height: boundingClientRect?.height || 0,
      }));
    }, 300)

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
        <Allotment.Pane
          preferredSize={450}
          minSize={300}
          maxSize={800}>
          <Editor />
        </Allotment.Pane>
        <Allotment.Pane ref={paneRef}>
          <GraphView size={jvSize} />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}


export default App
