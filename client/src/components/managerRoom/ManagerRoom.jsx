import * as xlsx from 'xlsx';
import dataService from '../../utils/dataService';

export default function ManagerRoom() {

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
        <div>
            <input type='file' onChange={(e) => readExcel(e)} ></input>
        </div>
    )    
}