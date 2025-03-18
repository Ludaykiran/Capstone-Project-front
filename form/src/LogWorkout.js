// import React, { useState, useEffect } from "react";
// import "./style.css";
// import "./Logworkout.css";

// const LogWorkout = () => {
//   const [workouts, setWorkouts] = useState([]);
//   const [workoutType, setWorkoutType] = useState("");
//   const [duration, setDuration] = useState("");
//   const [caloriesBurned, setCaloriesBurned] = useState("");
//   const [editingWorkout, setEditingWorkout] = useState(null);
//   const [editedWorkout, setEditedWorkout] = useState({});

//   // List of common workouts
//   const workoutOptions = [
//     "Push-ups",
//     "Squats",
//     "Lunges",
//     "Plank",
//     "Jump Rope",
//     "Running",
//     "Cycling",
//     "Yoga",
//     "Bench Press",
//     "Deadlifts",
//   ];

//   // 🔹 Fetch existing workouts from the database when the component loads
//   useEffect(() => {
//     fetch("https://localhost:7038/api/Diets")
//       .then((response) => response.json())
//       .then((data) => setWorkouts(data))
//       .catch((error) => console.error("Error fetching workouts:", error));
//   }, []);

//   // 🔹 Add workout (POST request)
//   const handleAddWorkout = async () => {
//     if (workoutType && duration && caloriesBurned) {
//       const newWorkout = {
//         workout: workoutType,
//         timeSpent: Number(duration),
//         caloriesBurnt: Number(caloriesBurned),
//       };

//       try {
//         const response = await fetch("https://localhost:7038/api/Diets", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(newWorkout),
//         });

//         if (response.ok) {
//           const savedWorkout = await response.json();
//           setWorkouts([...workouts, savedWorkout]); // Update UI
//           setWorkoutType("");
//           setDuration("");
//           setCaloriesBurned("");
//         } else {
//           console.error("Failed to add workout");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     }
//   };

//   // 🔹 Delete workout (DELETE request)
//   const handleDeleteWorkout = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this?");
//     if (confirmDelete) {
//       try {
//         const response = await fetch(`https://localhost:7038/api/Diets/${id}`, { method: "DELETE" });

//         if (response.ok) {
//           setWorkouts(workouts.filter((workout) => workout.id !== id)); // Remove from UI
//         } else {
//           console.error("Failed to delete workout");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     }
//   };

//   // 🔹 Edit workout
//   const handleEditWorkout = (workout) => {
//     setEditingWorkout(workout.id);
//     setEditedWorkout({ ...workout });
//   };

//   // 🔹 Confirm edit (PUT request)
//   const handleConfirmEdit = async () => {
//     const confirmEdit = window.confirm("Are you sure you want to save the changes?");
//     if (confirmEdit) {
//       try {
//         const response = await fetch(`https://localhost:7038/api/Diets`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(editedWorkout),
//         });

//         if (response.ok) {
//           setWorkouts(workouts.map((w) => (w.id === editedWorkout.id ? editedWorkout : w))); // Update UI
//           setEditingWorkout(null);
//         } else {
//           console.error("Failed to update workout");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditingWorkout(null);
//   };

//   return (
//     <div className="container">
//       <h2 className="logworkout-header">Log Workout</h2>
//       <div className="input-group">
//         <select className="input-group-select" value={workoutType} onChange={(e) => setWorkoutType(e.target.value)}>
//           <option value="">Select Workout</option>
//           {workoutOptions.map((exercise, index) => (
//             <option key={index} value={exercise}>
//               {exercise}
//             </option>
//           ))}
//         </select>
//         <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Time Spent (mins)" />
//         <input type="number" value={caloriesBurned} onChange={(e) => setCaloriesBurned(e.target.value)} placeholder="Calories Burned" />
//         <button onClick={handleAddWorkout}>Add Workout</button>
//       </div>

//       <table className="workout-table">
//         <thead>
//           <tr className="row-color">
//             <th>Workout</th>
//             <th>Time Spent (mins)</th>
//             <th>Calories Burnt</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {workouts.map((workout) => (
//             <tr key={workout.id}>
//               {editingWorkout === workout.id ? (
//                 <>
//                   <td>
//                     <select value={editedWorkout.workout} onChange={(e) => setEditedWorkout({ ...editedWorkout, workout: e.target.value })}>
//                       {workoutOptions.map((exercise, index) => (
//                         <option key={index} value={exercise}>
//                           {exercise}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td>
//                     <input type="number" value={editedWorkout.timeSpent} onChange={(e) => setEditedWorkout({ ...editedWorkout, timeSpent: Number(e.target.value) })} />
//                   </td>
//                   <td>
//                     <input type="number" value={editedWorkout.caloriesBurnt} onChange={(e) => setEditedWorkout({ ...editedWorkout, caloriesBurnt: Number(e.target.value) })} />
//                   </td>
//                   <td>
//                     <div className="action-buttons">
//                       <button className="confirm-btn" onClick={handleConfirmEdit}>✔️ Confirm</button>
//                       <button className="cancel-btn" onClick={handleCancelEdit}>❌ Cancel</button>
//                     </div>
//                   </td>
//                 </>
//               ) : (
//                 <>
//                   <td>{workout.workout}</td>
//                   <td>{workout.timeSpent}</td>
//                   <td>{workout.caloriesBurnt} kcal</td>
//                   <td>
//                     <div className="action-buttons">
//                       <button className="edit-btn" onClick={() => handleEditWorkout(workout)}>✏️ Edit</button>
//                       <button className="delete-btn" onClick={() => handleDeleteWorkout(workout.id)}>🗑️ Delete</button>
//                     </div>
//                   </td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default LogWorkout;


// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addWorkout, deleteWorkout, updateWorkout } from "./workoutSlice";
// import "./style.css";
// import "./Logworkout.css";

// const LogWorkout = () => {
//   const dispatch = useDispatch();
//   const workouts = useSelector((state) => state.workouts);

//   const [workoutType, setWorkoutType] = useState("");
//   const [duration, setDuration] = useState("");
//   const [caloriesBurned, setCaloriesBurned] = useState("");
//   const [editingWorkout, setEditingWorkout] = useState(null);
//   const [editedWorkout, setEditedWorkout] = useState({});

//   // Common workouts
//   const workoutOptions = [
//     "Push-ups",
//     "Squats",
//     "Lunges",
//     "Plank",
//     "Jump Rope",
//     "Running",
//     "Cycling",
//     "Yoga",
//     "Bench Press",
//     "Deadlifts",
//   ];

//   // 🔹 Fetch existing workouts from the database
//   useEffect(() => {
//     fetch("https://localhost:5000/api/Diet") // Adjust API URL if needed
//       .then((res) => res.json())
//       .then((data) => {
//         localStorage.setItem("workouts", JSON.stringify(data)); // Sync with local storage
//         data.forEach((workout) => dispatch(addWorkout(workout))); // Dispatch to Redux
//       })
//       .catch((error) => console.error("Error fetching workouts:", error));
//   }, [dispatch]);

//   // 🔹 Add Workout
//   const handleAddWorkout = async () => {
//     if (workoutType && duration && caloriesBurned) {
//       const newWorkout = {
//         type: workoutType,
//         duration: Number(duration),
//         caloriesBurned: Number(caloriesBurned),
//         date: new Date().toISOString(),
//       };

//       try {
//         const response = await fetch("https://localhost:5000/api/Diet", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(newWorkout),
//         });

//         if (!response.ok) throw new Error("Failed to add workout");
//         const savedWorkout = await response.json();

//         dispatch(addWorkout(savedWorkout)); // Redux update
//         localStorage.setItem("workouts", JSON.stringify([...workouts, savedWorkout])); // Local Storage update

//         setWorkoutType("");
//         setDuration("");
//         setCaloriesBurned("");
//       } catch (error) {
//         console.error("Error adding workout:", error);
//       }
//     }
//   };

//   // 🔹 Delete Workout
//   const handleDeleteWorkout = async (id) => {
//     if (window.confirm("Are you sure you want to delete this?")) {
//       try {
//         const response = await fetch(`https://localhost:5000/api/Diet/${id}`, {
//           method: "DELETE",
//         });

//         if (!response.ok) throw new Error("Failed to delete workout");

//         dispatch(deleteWorkout(id)); // Redux update
//         const updatedWorkouts = workouts.filter((workout) => workout.id !== id);
//         localStorage.setItem("workouts", JSON.stringify(updatedWorkouts)); // Local Storage update
//       } catch (error) {
//         console.error("Error deleting workout:", error);
//       }
//     }
//   };

//   // 🔹 Edit Workout
//   const handleEditWorkout = (workout) => {
//     setEditingWorkout(workout.id);
//     setEditedWorkout({ ...workout });
//   };

//   // 🔹 Confirm Edit
//   const handleConfirmEdit = async () => {
//     if (window.confirm("Are you sure you want to save the changes?")) {
//       try {
//         const response = await fetch(`https://localhost:5000/api/Diet/${editedWorkout.id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(editedWorkout),
//         });

//         if (!response.ok) throw new Error("Failed to update workout");

//         dispatch(updateWorkout({ id: editedWorkout.id, updatedData: editedWorkout })); // Redux update
//         const updatedWorkouts = workouts.map((workout) =>
//           workout.id === editedWorkout.id ? editedWorkout : workout
//         );
//         localStorage.setItem("workouts", JSON.stringify(updatedWorkouts)); // Local Storage update

//         setEditingWorkout(null);
//       } catch (error) {
//         console.error("Error updating workout:", error);
//       }
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="logworkout-header">Log Workout</h2>

//       <div className="input-group">
//         <select className="input-group-select" value={workoutType} onChange={(e) => setWorkoutType(e.target.value)}>
//           <option value="">Select Workout</option>
//           {workoutOptions.map((exercise, index) => (
//             <option key={index} value={exercise}>
//               {exercise}
//             </option>
//           ))}
//         </select>
//         <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Time Spent (mins)" />
//         <input type="number" value={caloriesBurned} onChange={(e) => setCaloriesBurned(e.target.value)} placeholder="Calories Burned" />
//         <button onClick={handleAddWorkout}>Add Workout</button>
//       </div>

//       <table className="workout-table">
//         <thead>
//           <tr className="row-color">
//             <th>Workout</th>
//             <th>Time Spent (mins)</th>
//             <th>Calories Burnt</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {workouts.map((workout) => (
//             <tr key={workout.id}>
//               {editingWorkout === workout.id ? (
//                 <>
//                   <td>
//                     <select value={editedWorkout.type} onChange={(e) => setEditedWorkout({ ...editedWorkout, type: e.target.value })}>
//                       {workoutOptions.map((exercise, index) => (
//                         <option key={index} value={exercise}>
//                           {exercise}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td>
//                     <input type="number" value={editedWorkout.duration} onChange={(e) => setEditedWorkout({ ...editedWorkout, duration: Number(e.target.value) })} />
//                   </td>
//                   <td>
//                     <input type="number" value={editedWorkout.caloriesBurned} onChange={(e) => setEditedWorkout({ ...editedWorkout, caloriesBurned: Number(e.target.value) })} />
//                   </td>
//                   <td>
//                     <button className="confirm-btn" onClick={handleConfirmEdit}>✔️ Confirm</button>
//                     <button className="cancel-btn" onClick={() => setEditingWorkout(null)}>❌ Cancel</button>
//                   </td>
//                 </>
//               ) : (
//                 <>
//                   <td>{workout.type}</td>
//                   <td>{workout.duration}</td>
//                   <td>{workout.caloriesBurned} kcal</td>
//                   <td>
//                     <button className="edit-btn" onClick={() => handleEditWorkout(workout)}>✏️ Edit</button>
//                     <button className="delete-btn" onClick={() => handleDeleteWorkout(workout.id)}>🗑️ Delete</button>
//                   </td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default LogWorkout;


// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addWorkout, deleteWorkout, updateWorkout } from "./workoutSlice";
// import "./style.css";
// import "./Logworkout.css";

// const LogWorkout = () => {
//   const dispatch = useDispatch();
//   const workouts = useSelector((state) => state.workouts);
//   const [workoutType, setWorkoutType] = useState("");
//   const [duration, setDuration] = useState("");
//   const [caloriesBurned, setCaloriesBurned] = useState("");
//   const [editingWorkout, setEditingWorkout] = useState(null);
//   const [editedWorkout, setEditedWorkout] = useState({});

//   // List of common workouts
//   const workoutOptions = [
//     "Push-ups",
//     "Squats",
//     "Lunges",
//     "Plank",
//     "Jump Rope",
//     "Running",
//     "Cycling",
//     "Yoga",
//     "Bench Press",
//     "Deadlifts",
//   ];

//   const handleAddWorkout = () => {
//     if (workoutType && duration && caloriesBurned) {
//       dispatch(
//         addWorkout({
//           id: Date.now(),
//           type: workoutType,
//           duration: Number(duration),
//           caloriesBurned: Number(caloriesBurned),
//           date: new Date().toISOString(),
//         })
//       );
//       setWorkoutType("");
//       setDuration("");
//       setCaloriesBurned("");
//     }
//   };

//   const handleDeleteWorkout = (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this?");
//     if (confirmDelete) {
//       dispatch(deleteWorkout(id));
//     }
//   };

//   const handleEditWorkout = (workout) => {
//     setEditingWorkout(workout.id);
//     setEditedWorkout({ ...workout });
//   };

//   const handleConfirmEdit = () => {
//     const confirmEdit = window.confirm("Are you sure you want to save the changes?");
//     if (confirmEdit) {
//       dispatch(updateWorkout({ id: editedWorkout.id, updatedData: editedWorkout }));
//       setEditingWorkout(null);
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditingWorkout(null);
//   };

//   return (
//     <div className="container">
//       <h2 className="logworkout-header">Log Workout</h2>
//       <div className="input-group">
//         {/* ✅ Dropdown for workout type */}
//         <select className="input-group-select" value={workoutType} onChange={(e) => setWorkoutType(e.target.value)}>
//           <option value="">Select Workout</option>
//           {workoutOptions.map((exercise, index) => (
//             <option key={index} value={exercise}>
//               {exercise}
//             </option>
//           ))}
//         </select>
//         <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Time Spent (mins)" />
//         <input type="number" value={caloriesBurned} onChange={(e) => setCaloriesBurned(e.target.value)} placeholder="Calories Burned" />
//         <button onClick={handleAddWorkout}>Add Workout</button>
//       </div>

//       <table className="workout-table">
//         <thead>
//           <tr className="row-color">
//             <th>Workout</th>
//             <th>Time Spent (mins)</th>
//             <th>Calories Burnt</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {workouts.map((workout) => (
//             <tr key={workout.id}>
//               {editingWorkout === workout.id ? (
//                 <>
//                   <td>
//                     <select value={editedWorkout.type} onChange={(e) => setEditedWorkout({ ...editedWorkout, type: e.target.value })}>
//                       {workoutOptions.map((exercise, index) => (
//                         <option key={index} value={exercise}>
//                           {exercise}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td>
//                     <input type="number" className="table-input" value={editedWorkout.duration} onChange={(e) => setEditedWorkout({ ...editedWorkout, duration: Number(e.target.value) })} />
//                   </td>
//                   <td>
//                     <input type="number" className="table-input" value={editedWorkout.caloriesBurned} onChange={(e) => setEditedWorkout({ ...editedWorkout, caloriesBurned: Number(e.target.value) })} />
//                   </td>
//                   <td>
//                     <div className="action-buttons">
//                       <button className="confirm-btn" onClick={handleConfirmEdit}>✔️ Confirm</button>
//                       <button className="cancel-btn" onClick={handleCancelEdit}>❌ Cancel</button>
//                     </div>
//                   </td>
//                 </>
//               ) : (
//                 <>
//                   <td>{workout.type}</td>
//                   <td>{workout.duration}</td>
//                   <td>{workout.caloriesBurned} kcal</td>
//                   <td>
//                     <div className="action-buttons">
//                       <button className="edit-btn" onClick={() => handleEditWorkout(workout)}>✏️ Edit</button>
//                       <button className="delete-btn" onClick={() => handleDeleteWorkout(workout.id)}>🗑️ Delete</button>
//                     </div>
//                   </td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default LogWorkout;



import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWorkout, deleteWorkout, updateWorkout } from "./workoutSlice";
import "./style.css";
import "./Logworkout.css";

const LogWorkout = () => {
  const dispatch = useDispatch();
  const workouts = useSelector((state) => state.workouts);
  const [workoutType, setWorkoutType] = useState("");
  const [duration, setDuration] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [editedWorkout, setEditedWorkout] = useState({});

  // List of common workouts
  const workoutOptions = [
    "Push-ups",
    "Squats",
    "Lunges",
    "Plank",
    "Jump Rope",
    "Running",
    "Cycling",
    "Yoga",
    "Bench Press",
    "Deadlifts",
  ];

  const handleAddWorkout = () => {
    if (workoutType && duration && caloriesBurned) {
      dispatch(
        addWorkout({
          id: Date.now(),
          type: workoutType,
          duration: Number(duration),
          caloriesBurned: Number(caloriesBurned),
          date: new Date().toISOString(),
        })
      );
      setWorkoutType("");
      setDuration("");
      setCaloriesBurned("");
    }
  };

  const handleDeleteWorkout = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this?");
    if (confirmDelete) {
      dispatch(deleteWorkout(id));
    }
  };

  const handleEditWorkout = (workout) => {
    setEditingWorkout(workout.id);
    setEditedWorkout({ ...workout });
  };

  const handleConfirmEdit = () => {
    const confirmEdit = window.confirm("Are you sure you want to save the changes?");
    if (confirmEdit) {
      dispatch(updateWorkout({ id: editedWorkout.id, updatedData: editedWorkout }));
      setEditingWorkout(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingWorkout(null);
  };

  return (
    <div className="container">
      <h2 className="logworkout-header">Log Workout</h2>
      <div className="input-group">
        <select className="input-group-select" value={workoutType} onChange={(e) => setWorkoutType(e.target.value)}>
          <option value="">Select Workout</option>
          {workoutOptions.map((exercise, index) => (
            <option key={index} value={exercise}>
              {exercise}
            </option>
          ))}
        </select>
        <input type="number" className="table-input" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Time Spent (mins)" />
        <input type="number" className="table-input" value={caloriesBurned} onChange={(e) => setCaloriesBurned(e.target.value)} placeholder="Calories Burned" />
        <button onClick={handleAddWorkout}>Add Workout</button>
      </div>

      {/* ✅ Scrollable table container */}
      <div className="workout-table-container">
        <table className="workout-table">
          <thead>
            <tr className="row-color">
              <th>Workout</th>
              <th>Time Spent (mins)</th>
              <th>Calories Burnt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => (
              <tr key={workout.id}>
                {editingWorkout === workout.id ? (
                  <>
                    <td>
                      <select value={editedWorkout.type} onChange={(e) => setEditedWorkout({ ...editedWorkout, type: e.target.value })}>
                        {workoutOptions.map((exercise, index) => (
                          <option key={index} value={exercise}>
                            {exercise}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input type="number" className="table-input" value={editedWorkout.duration} onChange={(e) => setEditedWorkout({ ...editedWorkout, duration: Number(e.target.value) })} />
                    </td>
                    <td>
                      <input type="number" className="table-input" value={editedWorkout.caloriesBurned} onChange={(e) => setEditedWorkout({ ...editedWorkout, caloriesBurned: Number(e.target.value) })} />
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="confirm-btn" onClick={handleConfirmEdit}>✔️ Confirm</button>
                        <button className="cancel-btn" onClick={handleCancelEdit}>❌ Cancel</button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{workout.type}</td>
                    <td>{workout.duration}</td>
                    <td>{workout.caloriesBurned} kcal</td>
                    <td>
                      <div className="action-buttons">
                        <button className="edit-btn" onClick={() => handleEditWorkout(workout)}>✏️ Edit</button>
                        <button className="delete-btn" onClick={() => handleDeleteWorkout(workout.id)}>🗑️ Delete</button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogWorkout;
