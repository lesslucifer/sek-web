import { useRef } from 'react';
import { Form, InputNumber, Button } from 'antd';
import Swal from 'sweetalert2';
import Utils from '../utils/utils';
import './AdminSettings.css';
import usePortrait from '../hooks/usePortrait';

function AdminSettings(props) {
  const formRef = useRef(null);
  const portrait = usePortrait()
  const { settings, sendRequest, close } = props

  const onSubmit = Utils.autoError(async (values) => {
    sendRequest('UPDATE_SETTINGS', {
      ...values,
      actionTime: values.actionTime * 1000,
      showDownTime: values.showDownTime * 1000
    })
    await Swal.fire('Success', 'Settings will be updated on the next hand')
    close()
  }, 'Cannot update settings')

  return (
    <Form
      id="settings-form"
      ref={formRef}
      className='settingsForm'
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      onFinish={onSubmit}
      initialValues={{
        ...settings,
        actionTime: settings.actionTime / 1000,
        showDownTime: settings.showDownTime / 1000
      }}
      autoComplete="off"
    >
      <Form.Item
        label="Thinking time"
        name="actionTime"
        rules={[{ required: true }]}
      >
        <InputNumber min={3} max={300} placeholder="smaller is faster" addonAfter="secs" />
      </Form.Item>

      <Form.Item
        label="Small blind"
        name="smallBlind"
        rules={[{ required: true }]}
      >
        <InputNumber min={1} addonAfter="chip" />
      </Form.Item>

      <Form.Item
        label="Big blind"
        name="bigBlind"
        rules={[{ required: true }]}
      >
        <InputNumber min={1} addonAfter="chip" />
      </Form.Item>

      <Form.Item
        label="Game speed"
        name="gameSpeed"
        rules={[{ required: true }]}
      >
        <InputNumber min={100} max={10000} placeholder="smaller is faster" addonAfter="msec" />
      </Form.Item>

      <Form.Item
        label="Show down time"
        name="showDownTime"
        rules={[{ required: true }]}
      >
        <InputNumber min={1} max={120} placeholder="smaller is faster" addonAfter="secs" />
      </Form.Item>

      <Form.Item wrapperCol={!portrait && {offset: 8, span: 16}}>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
        <Button htmlType="button" onClick={() => formRef.current?.resetFields()}>
          Reset
        </Button>
        <Button type="default" htmlType="button" onClick={close}>
          Cancel
        </Button>
      </Form.Item>
    </Form>)
}

export default AdminSettings;
