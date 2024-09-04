import { updateStudent } from "@/lib/features/Student/StudentSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface PopUpEditorProps {
	// name: string;
	// rollnumber: string;
	// semester: string;
	// degree: string;
	student: any;
	closePopup: () => void;
}

const PopUpEditor = ({
	// name,
	// rollnumber,
	// semester,
	// degree,
	student,
	closePopup,
}: PopUpEditorProps) => {
	const [updatetedStudent, setUpdatedStudent] =
		useState<any>();
	const data = useSelector(
		(state: any) => state.student.studentData
	);
	const [isDuplicate, setIsDuplicate] =
		useState<boolean>(false);
	const dispatch = useDispatch();

	// console.log(data, "pop up");

	//  update logic

	const handleUpdate = (e: any) => {
		e.preventDefault();
		if (
			!student.rollnumber ==
			updatetedStudent?.rollnumber
		) {
			if (
				data.some(
					(std: any) =>
						std.rollnumber ===
						updatetedStudent?.rollnumber
				)
			) {
				setIsDuplicate(true);
				return;
			}
		}

		let newData = data?.map((std: any) => {
			if (std.rollnumber == student.rollnumber) {
				return {
					rollnumber:
						updatetedStudent.rollnumber ||
						std.rollnumber,
					name: updatetedStudent.name || std.name,
					degree:
						updatetedStudent.degree ||
						std.degree,
					semester:
						updatetedStudent.semester ||
						std.semester,
				};
			}
			return std;
		});

		dispatch(updateStudent(newData));

		// console.log(updatetedStudent, "From student");
	};
	return (
		<div className="fixed bg-opacity-40 inset-0 flex justify-center items-center h-screen bg-black">
			<div className="flex flex-col font-mono py-4 rounded-lg gap-8 w-2/6 px-4 bg-gray-50">
				<div className="flex justify-between items-center px-2">
					<h3 className="text-3xl font-semibold">
						Edit Record
					</h3>
					<p
						onClick={closePopup}
						className="text-xl font-bold cursor-pointer"
					>
						X
					</p>
				</div>
				<form onSubmit={handleUpdate}>
					<div>
						<label className="">Name: </label>
						<input
							required
							name="name"
							onChange={(e: any) =>
								setUpdatedStudent({
									...updatetedStudent,
									[e.target.name]:
										e.target.value,
								})
							}
							className="p-3 w-full focus:outline-dotted"
							type="text"
							defaultValue={student.name}
						/>
					</div>
					<div>
						<label className="">
							Roll Number:{" "}
						</label>
						<input
							required
							name="rollnumber"
							onChange={(e: any) => {
								if (
									student.rollnumber ===
									e.target.value
								) {
									setUpdatedStudent(
										(params: any) =>
											(params.rollnumber =
												"")
									);
									return;
								}
								setUpdatedStudent({
									...updatetedStudent,

									[e.target.name]:
										e.target.value,
								});
							}}
							className="p-3 w-full focus:outline-dotted"
							type="text"
							defaultValue={
								student.rollnumber
							}
						/>
					</div>
					<div>
						<label>Degree</label>
						<input
							required
							name="degree"
							onChange={(e: any) =>
								setUpdatedStudent({
									...updatetedStudent,
									[e.target.name]:
										e.target.value,
								})
							}
							className="p-3 w-full focus:outline-dotted"
							type="text"
							defaultValue={student.degree}
						/>
					</div>
					<div>
						<label>Semester</label>
						<input
							required
							name="semester"
							onChange={(e: any) =>
								setUpdatedStudent({
									...updatetedStudent,
									[e.target.name]:
										e.target.value,
								})
							}
							className="p-3 w-full focus:outline-dotted"
							type="text"
							defaultValue={student.semester}
						/>
					</div>
					<div className="self-center text-white">
						{isDuplicate && (
							<p className="text-red-600 pl-12 pt-4 font-semibold">
								Student duplication error
								(roll number can't be
								duplicate)
							</p>
						)}
						<button
							type="submit"
							className="bg-blue-600 px-5 py-2 rounded-full mt-4"
						>
							Update Record
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PopUpEditor;
