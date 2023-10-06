import { Button, Checkbox, Form, InputNumber, notification, Slider } from 'antd';
import { useRef } from 'react';
import usePortrait from '../hooks/usePortrait';
import './Preferences.css';

function Preferences(props) {
  const formRef = useRef(null);
  const portrait = usePortrait()
  const { prefs, setPrefs, close } = props

  const onSubmit = (values) => {
    setPrefs(values)
    notification.success({
      message: 'Preferences updated'
    })
    close()
  }
  
  return (
    <Form
      id="preferences-form"
      ref={formRef}
      className='preferencesForm'
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      onFinish={onSubmit}
      initialValues={prefs}
      autoComplete="off"
    >
      <Form.Item
        label="Volume"
        name={["volume"]}
        rules={[{ required: true }]}
      >
        <Slider />
      </Form.Item>
      <Form.Item
        wrapperCol={!portrait && {offset: 8, span: 16}}
        label=""
        name={["enableQuickBet"]}
        valuePropName="checked"
        rules={[{ required: true }]}
      >
        <Checkbox>Enable quick bet</Checkbox>
      </Form.Item>
      <Form.Item
        label={`Quick bet 1`}
        name={["quickBets", 0]}
        rules={[{ required: true }]}
      >
        <InputNumber min={0} addonAfter="BB" />
      </Form.Item>
      <Form.Item
        label={`Quick bet 2`}
        name={["quickBets", 1]}
        rules={[{ required: true }]}
      >
        <InputNumber min={0} addonAfter="BB" />
      </Form.Item>
      <Form.Item
        label={`Quick bet 3`}
        name={["quickBets", 2]}
        rules={[{ required: true }]}
      >
        <InputNumber min={0} addonAfter="BB" />
      </Form.Item>
      <Form.Item
        label={`Quick bet 4`}
        name={["quickBets", 3]}
        rules={[{ required: true }]}
      >
        <InputNumber min={0} addonAfter="BB" />
      </Form.Item>
      <Form.Item
        label={`Quick bet 5`}
        name={["quickBets", 4]}
        rules={[{ required: true }]}
      >
        <InputNumber min={0} addonAfter="BB" />
      </Form.Item>
      <Form.Item
        label={`Bet warning`}
        name={"betThreshold"}
        rules={[{ required: true }]}
      >
        <InputNumber min={0} addonAfter="BB" placeholder='Set to 0 to disable' />
      </Form.Item>
      <Form.Item
        wrapperCol={!portrait && {offset: 8, span: 16}}
        label=""
        name={"darkFold"}
        valuePropName="checked"
        rules={[{ required: true }]}
      >
        <Checkbox>Fold without asking</Checkbox>
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

export default Preferences;
