import React, {useState, useEffect} from 'react';

function BorderGenerator() {

  const [topRange, setTopInput] = useState(50)
  const [rightRange, setRightInput] = useState(50)
  const [bottomRange, setBottomInput] = useState(50)
  const [leftRange, setLeftInput] = useState(50)
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)
  const [borderRad, setBorderRad] = useState({borderRadius: "50% 50% 50% 50% / 50% 50% 50% 50%"})

  useEffect(() => {
    const newBorderRad = calculateBorderRadius(topRange, rightRange, bottomRange, leftRange)
    setBorderRad(newBorderRad)
    setCopiedToClipboard(false)
  }, [topRange, rightRange, bottomRange, leftRange])

  const calculateBorderRadius = (topRange, rightRange, bottomRange, leftRange) => {
    return {borderRadius: `${topRange}% ${100 - topRange}% ${100 - bottomRange}% ${bottomRange}% / ${100 - leftRange}% ${100 - rightRange}% ${rightRange}% ${leftRange}%`}
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(borderRad.borderRadius)
    setCopiedToClipboard(true)
  }

  return (
    <>
      <input type="range" className="input-top-and-bottom" min="0" max="100" value={topRange} step="1"
             onChange={e => setTopInput(e.target.value)}/>
      <div>
        <div className="border-generator" style={borderRad}>
          <input type="range" className="input-left-and-right left" orient="vertical" min="0" max="100"
                 value={leftRange} step="1" onChange={e => setLeftInput(e.target.value)}/>
          <div>
            <span onClick={copyToClipboard}>
              {borderRad.borderRadius}
              <button>
                { copiedToClipboard ? "Copied!" : "Copy!" }
              </button>
            </span>
          </div>
          <input type="range" className="input-left-and-right right" orient="vertical" min="0" max="100"
                 value={rightRange} step="1" onChange={e => setRightInput(e.target.value)}/>
        </div>
      </div>
      <input type="range" className="input-top-and-bottom" min="0" max="100" value={bottomRange} step="1"
             onChange={e => setBottomInput(e.target.value)}/>
    </>
  );
}

export default BorderGenerator;