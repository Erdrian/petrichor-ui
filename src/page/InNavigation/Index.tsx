import { Button, Form } from 'antd'
import { createFormItem, formItem } from '../../utils/createFormItem'

export default () => {
	const [form] = Form.useForm()
	const formItems: formItem[] = [
		{
			type: 'richText',
			itemOptions: {
				name: '1',
				label: '富文本',
			},
		},
		{
			type:'upload',
			itemOptions:{
				name:'file',
				label:'上传'
			}
		}
	]
	return (
		<div style={{ width: '800px' }}>
			<Form form={form}>{formItems.map(createFormItem)}</Form>
			<Button onClick={() => form.setFieldValue('1', '<p>asd</p>')}>get</Button>
		</div>
	)
}
