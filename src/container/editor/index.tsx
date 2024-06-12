import { Editor, OnValidate } from '@monaco-editor/react'
import { debounce } from "lodash"
import { editor } from 'monaco-editor'
import { useEffect, useMemo, useState } from 'react'
import { useJson } from '@/store/use-json'

const defaultLanguage = 'json'

const defaultCode =
    `{
    "name": "John Doe",
    "age": 30,
    "cars": {
        "car1": "Ford",
        "car2": "BMW",
        "car3": "Fiat"
    }
}`

const editorHeight = '100vh'


function MonacoEditor() {

    const [preCode, setPreCode] = useState(defaultCode)
    const validate = useJson((state) => state.isValidate)
    const setValidate = useJson((state) => state.setValidate)
    const setCode = useJson((state) => state.setContent)

    useEffect(() => {
        if (!validate) return;
        setCode(preCode)
    }, [preCode])



    const handleEditorValidation: OnValidate = (markers) => {
        console.log('onValidate', markers)
        const isValidate = markers.length === 0
        setValidate(isValidate)
    }

    const debounceOnCodeChange = debounce((code) => {
        setPreCode(code)
    }, 300)

    const editorOptions: editor.IStandaloneEditorConstructionOptions = useMemo(() => ({
        lineNumbersMinChars: 3,
        fontFamily: 'consolas',
        fontSize: 12,
    }), [])

    return (
        <Editor
            height={editorHeight}
            language={defaultLanguage}
            theme='vs-dark'
            defaultValue={defaultCode}
            defaultLanguage={defaultLanguage}
            onValidate={handleEditorValidation}
            options={editorOptions}
            onChange={(val) => debounceOnCodeChange(val)}
        />
    )
}

export default MonacoEditor