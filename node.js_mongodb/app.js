const DBHelper=require('./DB_helper');
//RunProgram();
bulkUpload();

let database_name="rsquared_zilla_upazilla_db";
async function RunProgram(){
    /* ---USING 'DB_helper' CRUD EXAMPLES--- */

    //add data
    let newData_id=await DBHelper.addData(database_name,"crud_data",[{username:'xyz', login:'123'}]);
    console.log("Data added: "+newData_id);

    //read all data
    let data = await DBHelper.getData(database_name,"crud_data");
    console.log("Data read: ",data);
    
    //update data
    let updateStat= await DBHelper.updateData(database_name,"crud_data",{_id:newData_id},{username:'shanzid', login:'123'});
    console.log("Data updated: "+updateStat+ " row(s) affected.");

    //search data
    let searchResults= await DBHelper.searchData(database_name,"crud_data",{username:'shanzid'});
    console.log("Data searched: ",searchResults);

    //delete data
    let deleteStat= await DBHelper.deleteData(database_name,"crud_data",{username:'shanzid'});
    console.log("Data deleted: "+deleteStat+ " row(s) affected.");
}

//---UPLOADING DATA IN BULK TO COLLECTION / DATA IMPORT---
async function bulkUpload(){
    let jsonFileName, collectionName;
    jsonFileName=["AllUpazilaData", "AllZilaData","UpazilaChildhealth","UpazilaEmployment","UpazilaHousehold","UpazilaLiteracyAttendance","UpazilaPopulation",
    "UpazilaPoverty", "ZilaChildhealth","ZilaEmployment","ZilaHousehold","ZilaLiteracyAttendance","ZilaLocation","ZilaPopulation","ZilaPoverty"];
    collectionName=["AllUpazilaData", "AllZilaData","UpazilaDataChildHealth","UpazilaDataEmployment","UpazilaDataHousehold","UpazilaDataLiteracyAttendance","UpazilaDataPopulation",
    "UpazilaDataPoverty","ZilaDataChildHealth","ZilaDataEmployment","ZilaDataHousehold","ZilaDataLiteracyAttendance","ZilaLocation","ZilaPopulation","ZilaPoverty"];
    for(var i=0;i<jsonFileName.length; i++){
        let db="rsquared_zilla_upazilla_db";
        var all_data = require('./data/'+jsonFileName[i]+".json");
        let deleteExisting= await DBHelper.deleteData(db,collectionName[i],{});
        console.log("Existing data from "+collectionName[i]+" deleted.", deleteExisting);
        var newData_id=await DBHelper.addData(db,collectionName[i],all_data);
        console.log("Data added to collection: "+collectionName[i]+" from: "+jsonFileName[i], newData_id);
    }
    console.log('TASK COMPLETED');
}