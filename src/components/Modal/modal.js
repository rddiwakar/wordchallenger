import 'antd/dist/antd.css';
import React from 'react';
import { Modal } from 'antd';


function PopUp({isModalVisible,handleCancel,handleOk}){

  return (
    <>
    {isModalVisible &&
      <Modal title="Winner" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <h1>Winner winner, Chicken Dinner</h1>
      </Modal>}
    </>
  );
}
export default PopUp