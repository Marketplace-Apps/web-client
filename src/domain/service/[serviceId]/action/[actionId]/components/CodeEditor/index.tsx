import {ControlledEditor} from '@monaco-editor/react'
import {useRef, useState} from 'react'

interface ICodeEditorProps {
	onChange: (code: string) => void
	defaultValue: string
}

const CodeEditor = ({
	onChange,
	defaultValue
}: ICodeEditorProps) => {
	console.log({defaultValue})
	const [isReady, setIsReady] = useState<boolean>(false)
	const valueGetter = useRef()

	const handleEditorDidMount = (_valueGetter: any) => {
		setIsReady(true)
		valueGetter.current = _valueGetter
	}

	return (
		<>
			<h4 className="mt-4 mb-4">
				Code javascript tính giá tiền + mapping
			</h4>
			<ControlledEditor
				height="300px"
				language="javascript"
				value={defaultValue}
				editorDidMount={handleEditorDidMount}
				onChange={(ev, value) => onChange(value.replace("\n", "\r\n"))}
				options={{
					renderWhitespace: "all"
				}}
			/>
		</>
	)
}

export default CodeEditor