import * as xlsx from 'xlsx';
import dataService from '../../utils/dataService';
import './managerRoom.css';

const CLASSES = ['י','יא','יב']

export default function ManagerRoom() {

    const onUpdateClassesNumbersSubmit = () => {
        const data = {}
        CLASSES.forEach(classRoom => {
            data[classRoom] = document.querySelector(`#${classRoom}`)?.value !== '' ? 
            document.querySelector(`#${classRoom}`)?.value : 0;
        });

        const a = JSON.stringify(data);
        console.log(a);

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
            const excelFile = xlsx.read(data);
            console.log(excelFile);
            excelFile.SheetNames.forEach((spreadSheet) => {
                const excelSheet = excelFile.Sheets[spreadSheet];
                const data = xlsx.utils.sheet_to_json(excelSheet);
                console.log(data);
                dataService.writeNewExcel(spreadSheet, data);
            })
        }
    }

    return(
        <div className='manager-room-page'>
            <input type='file' onChange={(e) => readExcel(e)} ></input>
            <div className='classes-numbers-container'>
                {CLASSES.map((classRoom, index) => {
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