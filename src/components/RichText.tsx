import '@wangeditor/editor/dist/css/style.css'
import { useState, useEffect, useRef } from 'react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { debounce } from '../utils/common'
import { message } from 'antd'

export const StringToHtml = ({ htmlString }: { htmlString: string }) => {
	const createMarkup = () => {
		return { __html: htmlString }
	}
	return <div dangerouslySetInnerHTML={createMarkup()} />
}

const RichText = (props: any) => {
	let editor = useRef<IDomEditor>(null).current
	let { value = '', onChange } = props
	//----------------------------------------  ----------------------------------------
	const [html, sethtml] = useState<string | undefined>(undefined)
	let [ed, seted] = useState<IDomEditor | null>(null)
	//----------------------------------------  ----------------------------------------
	useEffect(() => {
		return () => {
			if (editor == null) return
			editor?.destroy()
			editor = null
		}
	}, [editor])
	useEffect(() => {
		html !== value && sethtml(value)
	}, [value])
	//----------------------------------------  ----------------------------------------
	const onHtmlChange: IDomEditor['onChange'] = debounce(() => {
		let _value = editor?.getHtml()
		sethtml(_value)
		onChange?.(_value)
	})

	//----------------------------------------  ----------------------------------------
	// 工具栏配置
	const toolbarConfig: Partial<IToolbarConfig> = {}

	// 编辑器配置
	const editorConfig: Partial<IEditorConfig> = {
		placeholder: '请输入内容...',
		customAlert(info, type) {
			switch (type) {
				case 'success':
					message.success(info)
					break
				case 'info':
					message.info(info)
					break
				case 'warning':
					message.warning(info)
					break
				case 'error':
					message.error(info)
					break
				default:
					message.info(info)
					break
			}
		},
	}
	return (
		<>
			<div style={{ width: '100%', border: '1px solid #ddeee1' }}>
				<Toolbar editor={ed} style={{ borderBottom: '1px solid #ddeee1' }} defaultConfig={toolbarConfig} />
				<Editor
					value={html}
					mode='default'
					onCreated={(ed) => {
						editor = ed
						seted(ed)
					}}
					onChange={onHtmlChange}
					defaultConfig={editorConfig}
					style={{ height: '300px', overflowY: 'hidden', width: '100%' }}
				/>
			</div>
		</>
	)
}
export default RichText
