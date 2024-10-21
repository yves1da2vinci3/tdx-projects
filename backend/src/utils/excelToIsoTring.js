function excelToIsoString(excelDate) {
    // Excel dates are the number of days since January 0, 1900
    // JavaScript Date uses milliseconds since January 1, 1970
    // So we need to convert the Excel date to milliseconds
    const excelEpoch = new Date(1900, 0, 0)
    const milliseconds = (excelDate - 1) * 86400000
    const date = new Date(excelEpoch.getTime() + milliseconds)
    return date.toISOString()
  }

  export default excelToIsoString