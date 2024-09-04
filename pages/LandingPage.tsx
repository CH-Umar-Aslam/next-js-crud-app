"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudent } from "@/lib/features/Student/StudentSlice";
import StudentField from "@/components/StudentField";

export default function LandingPage() {
	const dispatch = useDispatch();
	const [formData, setFormData] = useState<string | any>(
		{}
	);
	const [isDuplicate, setIsDuplicate] =
		useState<boolean>();
	let id: any = 0;
	const studentsData = useSelector(
		(state: any) => state.student.studentData
	);

	const addRecord = (e: any) => {
		e.preventDefault();
		if (
			studentsData.some(
				(student: any) =>
					student.rollnumber ===
					formData.rollnumber
			)
		) {
			setIsDuplicate(true);
			return;
		}
		dispatch(addStudent(formData));
		setFormData({});
	};
	useEffect(() => {
		// console.log(studentsData, "from use Effect");
	}, [studentsData]);
	return (
		<div className="container mx-auto mt-4 ">
			<div className="bg-gray-100 p-3">
				<h1 className="text-center text-3xl my-3">
					Welcome to Crud App
				</h1>
				<p className="text-lg text-gray-400 pl-3 text-center">
					You can add your information show as a
					table and can perform crud with the app
				</p>
			</div>
			<div className="flex  justify-center ">
				<form
					onSubmit={addRecord}
					className="mt-8  flex-1 ml-12 bg-blue-100 p-5 rounded-xl"
				>
					{InputFields.map((student) => (
						<div
							key={student.id}
							className="flex flex-col gap-2 space-y-4"
						>
							<label className="text-bold text-blue-800">
								{student.title}:
							</label>
							<input
								required
								value={
									formData[
										student.name
									] || ""
								}
								onChange={(e) =>
									setFormData({
										...formData,
										[e.target.name]:
											e.target.value,
									})
								}
								name={student.name}
								className="p-3 text-gray-600 ml-12 bg-white focus:outline-none border rounded-lg"
								type="text"
							/>
						</div>
					))}
					{isDuplicate && (
						<p className="text-red-600 pl-12 pt-4 font-semibold">
							Student duplication error (roll
							number can't be duplicate)
						</p>
					)}
					<button
						type="submit"
						className="m-5 bg-blue-500 text-white px-5 py-2 rounded-full"
					>
						Add Record
					</button>
				</form>
				<div className="border mx-8 mt-8 max-w-3xl  ">
					<ul className=" flex gap-12  p-4 bg-gray-600  text-white justify-between border">
						<li>Name</li>
						<li>Roll Number</li>
						<li>Semester</li>
						<li>Degree</li>
						<li>Operations</li>
					</ul>

					{studentsData &&
						studentsData.map(
							(student: string | any) => (
								<ul key={++id}>
									<StudentField
										// name={student.name}
										// rollnumber={student.rollnumber}
										// semester={student.degree}
										// degree={student.semester}
										data={studentsData}
										student={student}
									/>
								</ul>
							)
						)}
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
