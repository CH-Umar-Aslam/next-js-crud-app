"use client";
import { updateStudent } from "@/lib/features/Student/StudentSlice";
import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import PopUpEditor from "./PopUpEditor";

interface paramsType {
  // name: string;
  // rollnumber: string;
  // semester: string;
  // degree: string;
  data: any;
  student: any;
}
export default function StudentField({
  // name,
  // rollnumber,
  // semester,
  // degree,
  data,
  student,
}: paramsType) {
  const dispatch = useDispatch();

  const [popUPData, setpopUPData] = useState<any>(null);

  const closePopup = () => {
    setpopUPData(null);
  };
  const handleDelete = (id: string) => {
    console.log(data);

    const filteredData = data.filter(
      (student: any) => student.rollnumber !== id
    );
    dispatch(updateStudent(filteredData));
    console.log("filtetered data is :", filteredData);
  };
  return (
    <div className="flex p-4 gap-12 w-full  bg-gray-50 justify-between border">
      <li>{student.name}</li>
      <li>{student.rollnumber}</li>
      <li>{student.semester}</li>
      <li>{student.degree}</li>
      <div className="flex gap-4 600 text-xl  ">
        <MdModeEditOutline
          onClick={() => setpopUPData(data)}
          className="text-green-500  cursor-pointer"
        />
        <MdDelete
          className="text-red-500 cursor-pointer"
          onClick={() => handleDelete(student.rollnumber)}
        />
      </div>
      <div className="fixed">
        {popUPData && (
          <PopUpEditor
            closePopup={closePopup}
            // name={name}
            // rollnumber={rollnumber}
            // semester={semester}
            // degree={degree}
            student={student}
          />
        )}
      </div>
    </div>
  );
}
