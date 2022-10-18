import React from 'react';

export const IndividualData = ({ individualExcelData }) => {
  return (
    <>
      <th>{individualExcelData.emailId}</th>
      <th>{individualExcelData.name}</th>
      <th>{individualExcelData.mobileNo}</th>
      <th>{individualExcelData.streetName}</th>
      <th>{individualExcelData.cityName}</th>
      <th>{individualExcelData.stateName}</th>
      <th>{individualExcelData.zipCode}</th>
      <th>{individualExcelData.countryName}</th>
      <th>{individualExcelData.intrestedIn}</th>
    </>
  );
};
