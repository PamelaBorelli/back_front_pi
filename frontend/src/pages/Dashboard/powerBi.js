import React from 'react';
import styled from 'styled-components';

function PowerBi() {
  const url = "https://app.powerbi.com/groups/me/reports/579d785d-cdcb-415c-9d79-f8b13978ee14/ReportSection?redirectedFromSignup=1&experience=power-bi";

  return (
    <div>
      {/* Usando um botão com um manipulador de eventos */}
      <Button onClick={() => window.location.href = url}>
        <ButtonText>Power BI</ButtonText>
      </Button>
    </div>
  );
}

export default PowerBi;

const Button = styled.button`
  background-color: #2d81c2;
  border: 0.5px solid #ccc;
  border-radius: 5px;
  padding: 9px;
  margin-top: 20px;
  width: 110%;
  cursor: pointer;

`;

const ButtonText = styled.span`
  color: #fff;
  font-weight: bold;
  font-size: 15px;

`;

