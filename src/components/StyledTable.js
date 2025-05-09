import React from 'react';
import './StyledTable.css';

const StyledTable = ({ headers = [], data = [], renderRow }) => {
  return (
    <div className="patient-list-container">
      <div className="patient-table">
        <div className="table-header">
          {headers.map((h, i) => (
            <div key={i}>{h}</div>
          ))}
        </div>
        <div className="table-body">
          {data.map((item, index) => (
            <div className="table-row" key={item.id || index}>
              {renderRow(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StyledTable;
