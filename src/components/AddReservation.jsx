import { Modal, Form, Input, DatePicker } from 'antd';

const AddReservation = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={visible}
      title="Add a new reservation"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="reservedBy"
          label="Reserved By"
          rules={[
            {
              required: true,
              message: 'Please input the name of the reserver!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="from"
          label="From"
          rules={[
            {
              required: true,
              message: 'Please select the start date!',
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="to"
          label="To"
          rules={[
            {
              required: true,
              message: 'Please select the end date!',
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item name="notes" label="Notes">
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddReservation;
