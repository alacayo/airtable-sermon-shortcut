import React from "react";
import { Icon } from "@airtable/blocks/ui";

export default function RecordList({ handleRecordClick, records }) {
    return (
        <ul style= {{
            margin: "0",
            padding: "6px 0",
            listStyle: "none"
        }}>
            {records.map((record, index) => {
                return <li
                        key={record.id}
                        style={{
                            borderBottom: (index === records.length - 1)
                                ? "": "1px solid rgb(221,225,227)",
                            cursor: "default",
                            display: "flex",
                            justifyContent: "space-between",
                            lineHeight: "150%",
                            padding: "6px 10px",
                        }}
                    >
                        <span>{record.getCellValue("Sermon ID")}: {record.getCellValue("Sermon Title")}</span>
                        <span
                            onClick={() => handleRecordClick(record)}
                            style={{
                                alignItems: "center",
                                color: "blue",
                                cursor: "pointer",
                                display: "flex",
                            }}
                        >
                            <span>Schedule</span>
                            <Icon name="plus" size={13} />
                        </span>
                    </li>
            })}
        </ul>
    );
}
