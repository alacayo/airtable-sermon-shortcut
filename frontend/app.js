import RecordList from "./recordList";
import SearchBar from "./searchBar";
import {
    Box,
    expandRecord,
    initializeBlock,
    useBase,
    useRecords
} from "@airtable/blocks/ui";
import React, { useState } from "react";

function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const base = useBase();
    const broadcastTable = base.getTableByName("Broadcast Schedule");;
    const sermonsTable = base.getTableByName("Imported table");
    // Add sort by newest options
    const sermonRecords = useRecords(sermonsTable);
    const filteredSermonRecords = sermonRecords
        .filter(record => {
            const sermonId = (record.getCellValue("Sermon ID") === null)
                ? "" : record.getCellValue("Sermon ID").toString();
            const sermonTitle = (record.getCellValue("Sermon Title") === null)
                ? "" : record.getCellValue("Sermon Title").toLowerCase();
            return (searchQuery === sermonId || sermonTitle.includes(searchQuery))
                ? true : false;
        })
        .slice(0,10);
 
    async function handleRecordClick(record) {
        try {
            const newRecord = await createRecordAsync(record)
            expandRecord(newRecord);   
        } catch (error) {
            console.log(error.message);
        }
    }

    async function createRecordAsync(clickedRecord) {
        try {
            const recordId = await broadcastTable.createRecordAsync({
                "Sermon ID": [{id: clickedRecord.id}],
                // "Broadcast Type": {name: "Radio"}
            });
            const queryResult = await broadcastTable.selectRecordsAsync();
            const NewRecord = queryResult.getRecordById(recordId);
            queryResult.unloadData();
            return NewRecord;
        } catch (error) {
            throw error;
        }
    }

    return (
        <Box padding="1">
            <SearchBar setSearchQuery={setSearchQuery} />
            <RecordList
                records={filteredSermonRecords}
                handleRecordClick={handleRecordClick}
            />
        </ Box>
    );
}

initializeBlock(() => <App />);
