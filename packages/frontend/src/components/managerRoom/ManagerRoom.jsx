import { useState } from 'react';
import * as xlsx from 'xlsx';
import dataService from '../../utils/dataService';
import { classes } from '../../utils/utils';
import './managerRoom.css';

export default function ManagerRoom() {
    const [excelFile, setExcelFile] = useState();

    const onUpdateClassesNumbersSubmit = () => {
        const data = {}
        classes.forEach(classRoom => {
            data[classRoom] = document.querySelector(`#${classRoom}`)?.value !== '' ? 
            document.querySelector(`#${classRoom}`)?.value : 0;
        });
        dataService.updateClassesNumbers(data);
    }

    const onChangeInput = (e) => {
        if (isNaN(e.target.value)) {
            e.target.value = e.target.value.slice(0, -1);
          }
          e.target.value = e.target.value.trim();
    }

    const readExcel = async(e) =>{
        const file = e.target.files[0];
        if (file){
            const data = await file.arrayBuffer(file);
            const convertedExcelFile = xlsx.read(data);
            setExcelFile(convertedExcelFile);
        }
    }

    const sendNewExcel = async () => {
        for (const spreadSheet of excelFile.SheetNames) {
            const excelSheet = excelFile.Sheets[spreadSheet];
            const data = xlsx.utils.sheet_to_json(excelSheet);
            await dataService.writeNewExcel(spreadSheet, data);
        }
    }

    return(
        <div className='manager-room-page'>
            <div>
                <input type='file' onChange={(e) => readExcel(e)}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, 
                application/vnd.ms-excel"
                />
                <button type="submit" onClick={sendNewExcel}>עדכן אקסל</button>
            </div>
            <div className='classes-numbers-container'>
                {classes.map((classRoom, index) => {
                    return( <div key={index}>
                    <div>{classRoom}</div> <input type='text' placeholder='מספר כיתות' 
                    id={classRoom} onChange={onChangeInput}/>    
                    </div>
                )})}
                <button type="submit" onClick={onUpdateClassesNumbersSubmit}>עדכן</button>
            </div>
        </div>
    )    
}