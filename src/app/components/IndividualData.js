import React from 'react';

export const IndividualData = ({ individualExcelData }) => {
  return (
    <>
      <th>{individualExcelData.name}</th>
      <th>{individualExcelData.mobileNo}</th>
      <th>{individualExcelData.emailId}</th>
      <th>{individualExcelData.cityName}</th>
      <th>{individualExcelData.stateName}</th>
      <th>{individualExcelData.intrestedIn}</th>
      <th>{individualExcelData.platformName}</th>
      <th>{individualExcelData.expectedAmount}</th>
    </>
  );
};
