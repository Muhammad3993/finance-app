// import React, { useState } from "react";

// const Calculator = () => {
//   const [input, setInput] = useState(""); // Displeyda ko'rsatiladigan qiymat
//   const [result, setResult] = useState(""); // Hisoblangan natija

//   // Tugmalarni bosishda ishlov beruvchi funksiya
//   const handleClick = (value) => {
//     setInput((prev) => prev + value);
//   };

//   // Natijani hisoblash
//   const calculate = () => {
//     try {
//       setResult(eval(input)); // Hisoblash (eval() ni faqat oddiy loyihalarda ishlatish tavsiya etiladi)
//     } catch (error) {
//       setResult("Error"); // Xato bo'lsa
//     }
//   };

//   // Displeyni tozalash
//   const clear = () => {
//     setInput("");
//     setResult("");
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.display}>
//         <p style={styles.input}>{input || "0"}</p>
//         <p style={styles.result}>{result ? `= ${result}` : ""}</p>
//       </div>
//       <div style={styles.buttons}>
//         {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "C", "+"].map(
//           (btn, index) => (
//             <button
//               key={index}
//               onClick={() => (btn === "C" ? clear() : handleClick(btn))}
//               style={styles.button}
//             >
//               {btn}
//             </button>
//           )
//         )}
//         <button onClick={calculate} style={styles.equals}>
//           =
//         </button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     width: "300px",
//     margin: "50px auto",
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//     padding: "10px",
//     boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//   },
//   display: {
//     backgroundColor: "#f7f7f7",
//     padding: "10px",
//     borderRadius: "8px",
//     textAlign: "right",
//     marginBottom: "10px",
//     fontSize: "1.5em",
//     fontWeight: "bold",
//   },
//   input: {
//     margin: 0,
//   },
//   result: {
//     margin: 0,
//     color: "green",
//   },
//   buttons: {
//     display: "grid",
//     gridTemplateColumns: "repeat(4, 1fr)",
//     gap: "10px",
//   },
//   button: {
//     padding: "15px",
//     fontSize: "1.2em",
//     borderRadius: "4px",
//     border: "1px solid #ddd",
//     backgroundColor: "#fff",
//     cursor: "pointer",
//   },
//   equals: {
//     gridColumn: "span 4",
//     padding: "15px",
//     fontSize: "1.2em",
//     backgroundColor: "#007BFF",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
// };

// export default Calculator;
