import React from 'react';
import XLSX from 'xlsx';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AddAward from './AddAward';
import AwardTable from './AwardTable';

const AwardTracker = () => {

  const dispatch = useDispatch();
  // get state values from redux
  const { awardData } = useSelector(state => state)

  const awardTrackerContent =
    <React.Fragment>
      <h1>Award Tracker</h1>
      <AwardTable />
    </React.Fragment>

  const handleAwardImport = async (event) => {
    const importFile = event.target.files[0];
    try {
      const fileContents = await readFile(importFile);
      const workbook = XLSX.read(fileContents, {
        type: 'binary',
        cellDates: true,
      })
      let importFileContent = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

      // add each row as a separate entry
      importFileContent.forEach(awardEntry => {
        dispatch({
          type: 'ADDAWARDDATA',
          payload: {
            awardEntry: awardEntry,
          },
        });          
      })
    } catch (e) {
      console.log(e.message);
    }
  };
  
  // import from redux -> already uploaded a file in the 'task tracking'
  const exportAwardData = (awardData) => {    
    exportToXslx(awardData, 'awardData.xls');
  };

  const exportToXslx = (content, fileName) => {
    /* add to workbook */
    let wb = XLSX.utils.book_new();      
    let ws = XLSX.utils.json_to_sheet(content)
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* write workbook */
    XLSX.writeFile(wb, fileName);
  };

  // read the binary contents of the file
  const readFile = file => {
    const temporaryFileReader = new FileReader();
    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException('Problem parsing input file.'));
      };
      temporaryFileReader.onload = () => {
        let binary = "";
        const bytes = new Uint8Array(temporaryFileReader.result);
        const length = bytes.byteLength;
        for (let i = 0; i < length; i += 1) {
          binary += String.fromCharCode(bytes[i]);
        };
        resolve(binary);
      }
      temporaryFileReader.readAsArrayBuffer(file);
    });
  };

  return (
    <React.Fragment>
      <label>Import Award File: 
        <input 
          type="file" 
          id="awardInput" 
          onChange={handleAwardImport}
        />
      </label>
      <button onClick={() => exportAwardData(awardData)}>Export Award Data</button>
      {awardTrackerContent}
      <AddAward />
    </React.Fragment>
  );
};

export default AwardTracker;