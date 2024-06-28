import { useJson } from '@/store/use-json'
import { Editor, OnMount, OnValidate } from '@monaco-editor/react'
import { debounce } from "lodash"
import { editor } from 'monaco-editor'
import { useCallback, useMemo, useState } from 'react'

const defaultLanguage = 'json'

// const defaultCode =
//     `{
//         "squadName": "Super hero squad",
//         "homeTown": "Metro City",
//         "formed": 2016,
//         "secretBase": "Super tower",
//         "active": true,
//         "members": [
//           {
//             "name": "Molecule Man",
//             "age": 29,
//             "secretIdentity": "Dan Jukes",
//             "powers": [
//               "Radiation resistance",
//               "Turning tiny",
//               "Radiation blast"
//             ]
//           },
//           {
//             "name": "Madame Uppercut",
//             "age": 39,
//             "secretIdentity": "Jane Wilson",
//             "powers": [
//               "Million tonne punch",
//               "Damage resistance",
//               "Superhuman reflexes"
//             ]
//           },
//           {
//             "name": "Eternal Flame",
//             "age": 1000000,
//             "secretIdentity": "Unknown"
//           }
//         ]
//       }`

const defaultCode = `
  {
    "powers": [
        "Million tonne punch",
        "Damage resistance",
        "Superhuman reflexes"
    ]
  }
`

const editorHeight = '100vh'


function MonacoEditor() {

    const [preCode, setPreCode] = useState(defaultCode)
    const setCode = useJson((state) => state.setContent)

    const onMount: OnMount = useCallback(() => {
        setCode(preCode)
    }, [preCode, setCode])


    const handleEditorValidation: OnValidate = (markers) => {
        const isValidate = markers.length === 0
        isValidate && setCode(preCode)
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
            onMount={onMount}
        />
    )
}

export default MonacoEditor