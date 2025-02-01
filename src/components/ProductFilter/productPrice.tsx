
import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import NavTitle from "./productNavtitle";

interface MultiRangeSliderProps {
  min: number;
  max: number;
  onChange: (values: { min: number; max: number }) => void;
}

const SliderContainer = styled.div`
  height: 80px;
  display: flex;
  width: 100%;
`;


const Track = styled.div`
position: absolute;
  border-radius: 3px;
  height: 5px;
  background-color: #ced4da;
  width: 100%;
  z-index: 1;
  `;

  const SliderWrapper = styled.div`
    position: relative;
    width: 200px;
  `;

const Range = styled.div`
  position: absolute;
  border-radius: 3px;
  height: 5px;
  background-color: #749BA9;
  z-index: 2;
`;

const ValueLabel = styled.div`
  position: absolute;
  background-color: white; /* Box background */
  color: black;
  font-size: 15px;
  border: 1px solid grey;
  border-radius: 5px; /* Rounded corners */
  padding: 4px 5px;
  margin-top: 22px;
  width: auto;
  min-width: 52px;
  text-align: center;
  font-weight: semibold;
`;

const ThumbInput = styled.input`
  -webkit-appearance: none;
  -webkit-tap-highlight-color: white;
  pointer-events: none;
  position: absolute;
  height: 0;
  width: 200px;
  outline: none;
  background: none;

  
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: white;
    border-radius: 50%;
    border: 1px solid grey;
    cursor: pointer;
    height: 18px;
    width: 18px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
    z-index: 40;
  }
  
  &::-moz-range-thumb {
    background-color: #f1f5f7;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 1px 1px #ced4da;
    cursor: pointer;
    height: 18px;
    width: 18px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
  }
`;

const MultiRangeSlider: React.FC<MultiRangeSliderProps> = ({ min, max, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null);

  const getPercent = useCallback((value: number) => Math.round(((value - min) / (max - min)) * 100), [min, max]);

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);
    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);
    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div>
      <p className="mb-2">
          <NavTitle  title="Narxi "/>
      </p>
      <SliderWrapper>
          <Track />
          <Range ref={range} />
          <div style={{ position: "relative", display: "flex", justifyContent: "space-between", width: "100%" }}>
            <ValueLabel style={{ left: "6px" }}>{minVal}</ValueLabel>
            <ValueLabel style={{ right: "-4px" }}>{maxVal}</ValueLabel>
          </div>

        </SliderWrapper>
      <SliderContainer>
        <ThumbInput
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
          }}
          style={{ zIndex: minVal > max - 100 ? "5" : "auto" }}
        />
        <ThumbInput
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
          }}
        />

      </SliderContainer>
    </div>
  );
};

export default MultiRangeSlider;