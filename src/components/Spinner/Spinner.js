import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';

const SpinnerContainer = styled.div`
  margin-top: 50px;
`;

const Spinner = () => {
  return (
    <SpinnerContainer>
      <Spin tip="Loading ...">
        <div />
      </Spin>
    </SpinnerContainer>
  );
};

export default Spinner;
