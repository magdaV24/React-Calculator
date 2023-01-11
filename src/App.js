import { createContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";

export const DarkMode = createContext(null);
function App() {
  // theme
  const [mode, setMode] = useState("dark");
  const toggleMode = () => {
    setMode((curr) => (curr === "light" ? "dark" : "light"));
    console.log(mode);
  };

  // calculator

  const [result, setResult] = useState("");
  const [history, setHistory] = useState("");
  const [operation, setOperation] = useState("");
  const [isEqual, setIsEqual] = useState(false);
  const [isDecimal, setIsDecimal] = useState(false);
  const [index, setIndex] = useState(10);

  const readCalculator = (input) => {
    if (result === "") {
      setResult(input);
    } else {
      let newResult = result * 10 + input;
      setResult(newResult);
    }

    if (isEqual) {
      setResult(input);
      setIsEqual(false);
    }

    if (isDecimal) {
      let temp = result;
      let res = temp + input / index;
      setResult(res);
      setIndex(index*10)
    }
  };

  const calculateRadical = (input) => {
    let res = Math.sqrt(input);
    setResult(res);
    setIndex(10)
    setIsDecimal(false)
  };

  const calculatePercent = (input) => {
    let res = input / 100;
    setResult(res);
    setIndex(10)
    setIsDecimal(false)
  };

  const calculation = (op) => {
    // operations: sum, diff, times, division
    if (history === "") {
      setHistory(result);
      setResult("");
      setOperation(op);
      setIsDecimal(false);
      setIndex(10)
    } else {
      if (operation === "sum") {
        setHistory(result + history);
      } else if (operation === "diff") {
        setHistory(history - result);
      } else if (operation === "times") {
        setHistory(result * history);
      } else {
        setHistory(history / result);
      }
      setResult("");
      setOperation(op);
    }
  };

  const equal = () => {
    if (operation === "sum") {
      setResult(history + result);
    } else if (operation === "diff") {
      setResult(history - result);
    } else if (operation === "times") {
      setResult(history * result);
    } else {
      setResult(history / result);
    }
    setHistory("");
    setOperation("");
    setIsEqual(true);
    setIsDecimal(false);
    setIndex(10)
  };

  const makeDecimal = (input) =>{
    if(!Number.isInteger(input)){
      setIsDecimal(false)
      clean()
    }
    else{
      setIsDecimal(true)
    }

  }

  const clean = () => {
    setResult("");
    setHistory("");
    setOperation("");
    setIsEqual(false);
    setIsDecimal(false);
    setIndex(10);
  };
  return (
    <DarkMode.Provider value={{ mode, toggleMode }}>
      <div className="App" id={mode}>
        <header id={mode}>
          <button onClick={toggleMode}><FontAwesomeIcon icon={faPalette} /></button>
        </header>
        <div className="calculator" id={mode}>
          <div className="display" id={mode}>
            <div className="history">({history})</div>
            <div className="result">{result}</div>
          </div>
          <div className="buttons">
            <div className="rows">
              <div className="button" id={mode} onClick={() => clean()}>
                AC
              </div>
              <div
                className="button"
                id={mode}
                onClick={() => calculateRadical(result)}
              >
                √
              </div>
              <div
                className="button"
                id={mode}
                onClick={() => calculatePercent(result)}
              >
                %
              </div>
              <div
                className="button"
                id={mode}
                onClick={() => calculation("division")}
              >
                ÷
              </div>

              <div
                className="button"
                id={mode}
                onClick={() => readCalculator(7)}
              >
                7
              </div>
              <div
                className="button"
                id={mode}
                onClick={() => readCalculator(8)}
              >
                8
              </div>
              <div
                className="button"
                id={mode}
                onClick={() => readCalculator(9)}
              >
                9
              </div>
              <div
                className="button"
                id={mode}
                onClick={() => calculation("times")}
              >
                *
              </div>

              <div
                className="button"
                id={mode}
                onClick={() => readCalculator(4)}
              >
                4
              </div>
              <div
                className="button"
                id={mode}
                onClick={() => readCalculator(5)}
              >
                5
              </div>
              <div
                className="button"
                id={mode}
                onClick={() => readCalculator(6)}
              >
                6
              </div>
              <div
                className="button"
                id={mode}
                onClick={() => calculation("diff")}
              >
                -
              </div>

              <div
                className="button"
                id={mode}
                onClick={() => readCalculator(1)}
              >
                1
              </div>
              <div
                className="button"
                id={mode}
                onClick={() => readCalculator(2)}
              >
                2
              </div>
              <div
                className="button"
                id={mode}
                onClick={() => readCalculator(3)}
              >
                3
              </div>
              <div
                className="button"
                id={mode}
                onClick={() => calculation("sum")}
              >
                +
              </div>
            </div>

            <div className="last-row">
              <div
                className="button-zero"
                id={mode}
                onClick={() => readCalculator(0)}
              >
                0
              </div>
              <div
                className="button"
                id={mode}
                onClick={() => makeDecimal(result)}
              >
                ,
              </div>
              <div className="button" id={mode} onClick={() => equal()}>
                =
              </div>
            </div>
          </div>
        </div>
      </div>
    </DarkMode.Provider>
  );
}

export default App;
