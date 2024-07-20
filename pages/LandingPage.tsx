"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudent } from "@/lib/features/Student/StudentSlice";

export default function LandingPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<string | any>({});
  let id: any = 0;
  const studentsData = useSelector((state: any) => state.student.studentData);

  const addRecord = (e: any) => {
    e.preventDefault();
    dispatch(addStudent(formData));
    setFormData({});
  };
  useEffect(() => {
    console.log(studentsData, "from use Effect");
  }, [studentsData]);
  return (
    <div className=" mx-auto mt-4">
      <div className="bg-gray-50 p-3">
        <h1 className="text-center text-3xl my-3">Welcome to Crud App</h1>
        <p className="text-lg text-gray-400 pl-3 text-center">
          You can add your information show as a table and can perform crud with
          the app
        </p>
      </div>
      <div className="flex justify-around">
        <form
          onSubmit={addRecord}
          className="mt-12 flex-1  max-w-3xl ml-20 bg-blue-50 p-5 rounded-xl"
        >
          {InputFields.map((student) => (
            <div key={student.id} className="flex flex-col gap-2 space-y-4">
              <label className="text-bold text-blue-800">
                {student.title}:
              </label>
              <input
                required
                value={formData[student.name] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                name={student.name}
                className="p-3 text-gray-600 ml-12 bg-white focus:outline-none border rounded-lg"
                type="text"
              />
            </div>
          ))}
          <button
            type="submit"
            className="m-5 bg-blue-500 text-white px-5 py-2 rounded-full"
          >
            Add Record
          </button>
        </form>
        <div className="border">
          {studentsData &&
            studentsData.map((student: string | any) => (
              <ul
                key={++id}
                className="flex gap-20 p-4 bg-gray-50 justify-between border "
              >
                <li className="cursor-pointer">{student.name}</li>
                <li className="cursor-pointer">{student.rollnumber}</li>
                <li className="cursor-pointer">{student.semester}</li>
                <li className="cursor-pointer">{student.degree}</li>
              </ul>
            ))}
        </div>
      </div>
    </div>
  );
}

const InputFields = [
  { id: "1", name: "name", title: "Name" },
  { id: "2", name: "rollnumber", title: "Roll Number" },
  { id: "3", name: "degree", title: "Degree Name" },
  { id: "4", name: "semester", title: "Semester" },
];
